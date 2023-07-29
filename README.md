# idendrogram-streamlit-component

A D3-powered bi-directional Streamlit component for idendrogram library that visualizes dendrograms created by hierarchical clustering algorithms (SciPy, scikit-learn and hdbscan compatible).

Demo available at https://idendrogram.streamlit.app/. 

Docs @ https://kamicollo.github.io/idendrogram/

## Customizing the component

If you would like to go beyond customization supported by this component out of the box (e.g. do some **_really fancy_** tooltips), you'll need:

* To be familiar with [bi-directional Streamlit component development](https://docs.streamlit.io/library/components/components-api#create-a-bi-directional-component)
* Clone this repo
* Make adjustments! The D3 component is written in a single file (`index.tsx`), and the tooltip creation is part of `draw_nodes()` function. 
* Run the npm server locally with `npm run start`
* In your Streamlit app, [use the `StreamlitConverter(release=False)`](https://kamicollo.github.io/idendrogram/streamlit/#customizing-streamlit-dendrograms) to get idendrogram to look for the local NPM server. 