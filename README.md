# idendrogram-streamlit-component

A D3-powered bi-directional Streamlit component for idendrogram library that visualizes dendrograms created by hierarchical clustering algorithms (SciPy, scikit-learn and hdbscan compatible).

Demo [TBD]

Docs @ https://kamicollo.github.io/idendrogram/

## Customizing the component

If you would like to go beyond customization supported by this component out of the box (e.g. do some **_really fancy_** tooltips), you'll need:

* To be familiar with [bi-directional Streamlit component development](https://docs.streamlit.io/library/components/components-api#create-a-bi-directional-component)
* Clone this repo
* Adjust the release flag in `idendrogram_streamlit_component/__init__.py` file to `False`, so it runs against the local development server
* Make adjustments! The D3 component is written in a single file (`index.tsx`), and the tooltip creation is part of `draw_nodes()` function. 