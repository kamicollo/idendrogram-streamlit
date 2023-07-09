import setuptools

setuptools.setup(
    name="idendro-streamlit",
    version="0.1",
    author="Aurimas Racas",
    author_email="mail@aurimas.eu",
    description="Bi-directional Streamlit component for creating interactive dendrograms",
    long_description="D3-powered bi-directional Streamlit component for idendro library that visualizes dendrograms created by hierarchical clustering algorithms (SciPy, scikit-learn and hdbscan compatible)",
    long_description_content_type="text/plain",
    url="https://github.com/kamicollo/idendro-streamlit",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.8",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.63"        
    ],
)