import streamlit as st
import numpy as np
import pywt as pywt
from scipy.sparse import csr_matrix
import hdbscan
import idendrogram
import json
import altair as alt
import pandas as pd


def get_sparse_wavelet_matrix(signals):
        coeffs = pywt.wavedec(signals, "db1", mode='zero', level=7, axis=1) #list of 7 x [100 x #no_coeffs]
        unraveled = coeffs[0]
        for level in coeffs[1:]:
            unraveled = np.concatenate([unraveled, level], axis=1)

        unraveled[np.abs(unraveled) < 30] = 0 #threshold at a hardcoded value of 30 (chosen based on experience)
        sparse_matrix = csr_matrix(unraveled)
        return sparse_matrix

@st.cache_data()
def get_data():
    impaired_signals = np.load("data/impaired_signals.npy", allow_pickle=True)
    ideal_signal = np.load("data/ideal_signal.npy", allow_pickle=True)
    network_clusters = np.load("data/network_clusters.npy", allow_pickle=True)
    sparse_matrix = get_sparse_wavelet_matrix(impaired_signals)

    return impaired_signals, ideal_signal, network_clusters, sparse_matrix

impaired_signals, ideal_signal, network_clusters, sparse_matrix = get_data()

@st.cache_data()
def do_cluster():
    clusterer = hdbscan.HDBSCAN()
    clusterer.fit(sparse_matrix)
    return clusterer

clusterer = do_cluster()
cl_data = idendrogram.HDBSCANClusteringData(clusterer)

#copy pasted code from the original case study (except data processing)
@st.cache_data()
def setup_dendrogram():
    
    idd = idendrogram.idendrogram()
    idd.set_cluster_info(cluster_data=cl_data)

    def my_custom_tooltip(data, linkage_id):
        _, nodelist = data.get_tree()
        original_ids = nodelist[linkage_id].pre_order(lambda x: x.id)
        signals = impaired_signals[original_ids, :]
        network_segments = np.unique(network_clusters[original_ids])    
        in_cluster_variability_std = np.quantile(np.std(signals, axis=0), [.25, .5, .75])
        in_cluster_variability_min_max = np.quantile(np.max(signals, axis=0) - np.min(signals, axis=0), [.25, .5, .75])

        diff_to_ideal = np.abs(signals - ideal_signal.reshape(1, -1))

        return {        
            'items': str(nodelist[linkage_id].get_count()),         
            'In-cluster variability (std)': in_cluster_variability_std.round(2).tolist(),
            'In-cluster variability (min-max)': in_cluster_variability_min_max.round(2).tolist(),
            'Delta to ideal signal (MAE)': diff_to_ideal.sum(axis=1).mean().round(0),
            "Network segments": ", ".join([str(i) for i in network_segments]),        
        }

    dendrogram = idd.create_dendrogram(
        truncate_mode='lastp', p=20, 
        leaf_label_func = lambda *_: "",
        node_hover_func= my_custom_tooltip
    )

    for n in dendrogram.nodes:
        obs_count = int(idendrogram.callbacks.counts(cl_data, n.id))
        n.radius = max(2, np.log2(obs_count ** 2))

    return dendrogram


st.markdown("""
    ## Signal clustering

In this example, clustering (HDBSCAN) is used to identify impaired network nodes based on patterns
in the their [FBC](https://broadbandlibrary.com/full-band-capture-revisited/) scans. You can find the full case study in 
[idendrogram documentation](https://kamicollo.github.io/idendrogram/case-studies/signal-demo/). 

Here, we pick up where the case study ended - with a custom dendrogram that visualizes the identified network clusters.
With Streamlit, we can make it interactive - now you can click on a node on the dendrogram and see the min/mean/max of the signals in the original observations that represent this node.

With this, it's very easy to visually inspect the dendrogram - if you try the orange nodes, 
you'll see that the 0th cluster actually contains a couple of different signal patterns. On the other hand,
the clusters 2-5 that were produced by HDBSCAN weren't perfect and actually all represent the same impairment.
""")

dendrogram = setup_dendrogram()

p = dendrogram.plot(
    backend="streamlit", width=800, height=600, 
    orientation="top", scale="symlog",
)

placeholder = st.container()

if p:
    placeholder.write(f"Selected Node ID: {p.id}")
    _, nodelist = cl_data.get_tree()
    original_ids = nodelist[p.id].pre_order(lambda x: x.id)
    placeholder.write(f"Total underlying signals: {len(original_ids)}")
    node_signals = impaired_signals[original_ids, :]
    signal_df = pd.DataFrame({        
        'avg': np.mean(node_signals, axis=0),
        'max': np.max(node_signals, axis=0),
        'min': np.min(node_signals, axis=0),
        'Hz': np.linspace(1, 1000, 1000)
    }).melt(['Hz'])

    alt.data_transformers.disable_max_rows()
    c = alt.Chart(signal_df).mark_line().encode(
        alt.X("Hz"), alt.Y("value", title='log(dB)'), 
        alt.Color('variable', title='statistic'),
    ).properties(width=900, height=200)

    placeholder.altair_chart(c)



