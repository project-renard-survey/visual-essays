<template>
  <v-container :style="containerStyle">
    <div id="vis">
      <div id="mynetwork"></div>
    </div>
  </v-container>
</template>

<script>
const dependencies = [
    'https://unpkg.com/vis-network/styles/vis-network.min.css',
    'https://unpkg.com/vis-data@latest/peer/umd/vis-data.min.js',
    'https://unpkg.com/vis-network@latest/peer/umd/vis-network.min.js'
]
const defaults = {
  popupOptions: { autoClose: false, closeButton: false, closeOnClick: false }
}
   module.exports = {
      name: 'visNetwork',
      props: {
         items: { type: Array, default: () => ([]) },
         selected: String,
         width: Number,
         height: Number,
         hoverItemID: String,
         selectedItemID: String
      },
      data: () => ({
         activeWindow: undefined,
         popups: {},
         active: new Set(),
      }),
      computed: {
         containerStyle() { return { width: `${this.width}px`, height: `${this.height}px`, overflowY: 'auto !important' } },
         activeElements() { return this.$store.getters.activeElements },
         entities() { return this.itemsInActiveElements.filter(item => item.tag === 'entity') },
         itemsInActiveElements() { return this.$store.getters.itemsInActiveElements },
         apiBaseURL() { return window.location.origin },
         componentsBaseURL() {return window.location.hostname === 'localhost' ? '' : 'https://jstor-labs.github.io/visual-essays'},
      },
      mounted() {
        console.log(this.$options.name, this.items)
        this.init();
        //this.loadDependencies(dependencies, 0, this.init)
      },
      methods: {
            init() {
                var nodeslist = [];
                var edgeslist = [];
                //get input data here from file
                this.getInput(this.items[0].file)
                .then(result => {
                    this.parseText(result, nodeslist, edgeslist);     
                })
                .then(result => this.getImages(nodeslist))
                .then(result => {
                    console.log('result', result)
                    this.renderGraph(nodeslist, edgeslist)
                })
            },
            renderGraph(nodeslist, edgeslist) {
                console.log('renderGraph')
                let nodes = new vis.DataSet(nodeslist);
                let edges = new vis.DataSet(edgeslist);
                console.log('nodeslist', nodeslist);
                console.log('edgeslist', edgeslist);
                var container = document.getElementById("mynetwork");
                var data = {
                    nodes: nodes,
                    edges: edges
                };

                let options = {
                    interaction: { hover: true },
                    layout: {
                        randomSeed: undefined,
                        improvedLayout:true,
                        clusterThreshold: 150,
                        hierarchical: this.items[0].layout === 'hierarchy' ? true : false,
                    },
                      edges:{
                        arrows: this.items[0].arrows,
                        //color: 'red',
                        scaling:{
                           label: true,
                        },
                        shadow: true,
                        smooth: true,
                     }
                };
                //init network
                var network = new vis.Network(container, data, options);
               network.on(('click'), properties => {
                  var ids = properties.nodes;
                  var clickedNodes = nodes.get(ids);
                  console.log('clicked nodes:', clickedNodes);
                  if (clickedNodes[0].length > 0) {
                     this.setSelectedItemID(clickedNodes[0].qid);
                  }
               });
                network.body.emitter.emit('_dataChanged');
                network.redraw();
            },
            setHoverItemID(itemID) {
                this.$emit('hover-id', itemID)
            },
            setSelectedItemID(itemID) {
                console.log('in setSelectedItemID', itemID);
                this.$emit('selected-id', itemID)
            },
            addEventHandlers(elem, itemId) {
                elem.on('click', () => { this.setSelectedItemID(itemId) })
                elem.on('mouseover', () => { this.setHoverItemID(itemId) })
                elem.on('mouseout', () => { this.setHoverItemID() })
            },
            addPopup(id, label, latLng, offset) {
                if (!this.popups[id]) {
                const popup = L.popup({ ...defaults.popupOptions, ...{ offset: L.point(0, offset || 0)}})
                popup.setLatLng(latLng)
                popup.setContent(`<h1 data-eid="${id}">${label}</h1>`)
                popup.options.id = id
                this.popups[id] = popup
                }
            },
            getInput() {
                //let filepath = this.items[0].file
                //console.log('filepath', filepath);
               let filepath = `${this.componentsBaseURL}/components/${this.items[0].file}`
                return fetch(filepath).then(resp => resp.text())
            },
            parseText(text, nodes, edges) {
                    var lines = text.split(/\r?\n/);
                    var edgeBreak = lines.length;
                    for (var i = 2; i < edgeBreak-2; i++){
                        //find edgeBreak
                        if (lines[i].includes('Edges')){
                            edgeBreak = i;
                        }
                        var obj = lines[i].split('\t');
                        
                        //populate nodes array
                        //make sure nodeobj has at least id and title
                        if (!(isNaN(obj[0])) && obj[0] != ""){
                            nodeobj = {
                            id: obj[0],
                            qid: obj[2],
                            title: obj[1],
                            label: obj[1],
                            }
                            nodes.push(nodeobj);
                        }
                    }
                    for (var i = edgeBreak+2; i < lines.length; i++){
                        var obj = lines[i].split('\t');
                        //populate edges array
                        if (!(isNaN(obj[0])) && obj[0] != ""){
                            edgeobj = {
                            from: obj[0],
                            to: obj[1],
                            title: obj[2],
                            }
                            edges.push(edgeobj);
                        }
                    }
            },
         
            //get entity (image) for a single node
            getImage(node){
                return this.getEntity(node.qid).then(result => {
                    console.log('result from getEntity', result);
                    var imageobj = result['summary info'].originalimage;
                    node.image = imageobj.source;
                    node.shape = "circularImage";
                    return node
                })
                // return node;
            },
            getImages(nodeslist){
                const promises = nodeslist
                    .filter(node => node.qid)
                    .map(node => this.getImage(node))
                console.log('promises', promises)
                return Promise.all(promises)
                /*
                return nodeslist.forEach((node) => {
                if (node.qid != ""){
                        this.getImage(node);
                    }
                });
                */
            },
            toQueryString(args) {
                const parts = []
                Object.keys(args).forEach((key) => {
                parts.push(`${key}=${encodeURIComponent(args[key])}`)
                })
                return parts.join('&')
            },
            getEntity(eid) {
                let url = `https://visual-essays.app/entity/${encodeURIComponent(eid)}`
                const args = {}
                if (this.context) args.context = this.context
                //if (this.entity.article) args.article = this.entity.article
                if (Object.keys(args).length > 0) {
                    url += `?${this.toQueryString(args)}`
                }
                console.log(`getEntity=${url}`)
                return fetch(url).then(resp => resp.json())
            },
            getSummaryInfo() {
                console.log('getSummaryInfo', this.eid, this.entity)
                if (this.entity['summary info'] === undefined && !this.requested.has(this.entity.id)) {
                this.requested.add(this.entity.id)
                this.getEntity()
                .then((updated) => {
                    if (!updated['summary info']) {
                    updated['summary info'] = null
                    }
                    updated.id = this.eid
                    this.$store.dispatch('updateItem', updated)
                })
                }
            }
        }
    }
</script>

<style>
    .vis-network {
        overflow: visible;
    }
    body {
        color: #d3d3d3;
        font: 12pt arial;
        background-color: #222222;
    }
    #vis, #mynetwork {
        width: 100%;
        height: 100%;
    }
</style>