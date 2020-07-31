<param ve-config
       title="Vis network example"
       banner="https://upload.wikimedia.org/wikipedia/commons/f/f9/Wikidata-knowledge-graph-fuzheado-metobjects-2.png"
       layout="vtl"
       author="Labs">

## Vis network

This essay demonstrates the use of the `ve-vis-network` essay tag.  This tag creates a network viewer using the [vis.js](https://visjs.org/) [network library](https://visjs.github.io/vis-network/docs/network/).  This component reads input data from a delimited text file that can be retrieved via a URL.  The file consists of multiple lines (rows), the first of which is assumed to be a header row with keys for the data values in the following rows.  The column delimiters can be either commas or tabs and are signified by the extension used in the file URL (i.e., '.csv' or '.tsv').  The data file used for this example is a tab-delimited file and can be seen [here](https://github.com/JSTOR-Labs/plant-humanities/blob/master/graphs/medici.tsv).
<param ve-vis-network 
       file="https://raw.githubusercontent.com/jstor-labs/plant-humanities/master/graphs/medici.tsv"
       layout="network"
       arrows="to">
