<param ve-config
       title="Vis network example"
       banner="https://upload.wikimedia.org/wikipedia/commons/d/d7/Graphical_network.png"
       layout="vtl"
       author="Labs">

<param ve-entity title="Maria Vittoria of Savoy" eid="Q2399148">
<param ve-entity title="Victor Amadeus of Savoy, Prince of Carigon" eid="Q2254102">
<param ve-entity title="Louis XV, King of France" eid="Q7738">
<param ve-entity title="Anna Maria Luisa de' Medici" eid="Q233181">
<param ve-entity title="Cardinal Fluery" eid="Q439144">
<param ve-entity title="Louis Henri, Duke of Bourbon" eid="Q455392">

## Vis network

This essay demonstrates the use of the `ve-vis-network` essay tag.  This tag creates a network viewer using the [vis.js](https://visjs.org/) [network library](https://visjs.github.io/vis-network/docs/network/).  This component reads input data from a delimited text file that can be retrieved via a URL.  The file consists of multiple lines (rows), the first of which is assumed to be a header row with keys for the data values in the following rows.  The column delimiters can be either commas or tabs and are signified by the extension used in the file URL (i.e., '.csv' or '.tsv').  The data file used for this example is a tab-delimited file and can be seen [here](https://github.com/JSTOR-Labs/plant-humanities/blob/master/graphs/medici.tsv).
<param ve-vis-network 
       file="https://raw.githubusercontent.com/jstor-labs/plant-humanities/master/graphs/medici.tsv"
       layout="network"
       arrows="to">
