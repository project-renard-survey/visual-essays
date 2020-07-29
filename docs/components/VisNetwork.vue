<template>
  <v-container :style="containerStyle">
    <div id="vis">
      <i class="fa fa-flag"></i>
      <div id="mynetwork"></div>
    </div>
  </v-container>
</template>

<script>

const defaults = {
  //basemap: 'OpenStreetMap',
  //center: [25, 0],
  //zoom: 2.5,
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

         var self = this;

         var nodes = null;
         var edges = null;
         var network = null;

         var nodeslist = [];
         var edgeslist = [];

         const componentsBaseURL = window.location.hostname === 'localhost' ? '' : 'https://jstor-labs.github.io/visual-essays'

         console.log('this.items[0].layout', this.items[0].layout);
         console.log('this.items[0].file', this.items[0].file);
         if (this.items[0].layout == 'hierarchy'){
            var nodes = new vis.DataSet([
               { id: 1, label: "lewis", title: 'Lewis Douglass', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Lewis_Henry_Douglass.jpg' },
               { id: 2, label: "frederick", title: 'Frederick Douglass', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Frederick_Douglass_%28circa_1879%29.jpg' },
               { id: 3, label: "rosetta", title: 'Rosetta Douglass', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Frederick_Douglass_first_child_Rosetta_Douglass_Sprague.png' },
               { id: 4, label: "charles", title: 'Charles Douglass', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Frederick_Douglass_4th_child_Charles_Remond_Douglass.png'},
               { id: 5, label: "joseph", title: 'Joseph Douglass', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg' }
            ]);

            // create an array with edges
            var edges = new vis.DataSet([
               { from: 1, to: 2 },
               { from: 2, to: 3 },
               { from: 2, to: 4 },
               { from: 4, to: 5 },
            ]);

            var options = {
               interaction: { hover: true },
               layout: {
                  hierarchical: {
                     direction: 'UD',
                     parentCentralization: true,
                     levelSeparation: 150,
                     nodeSpacing: 100,
                  }
               }
            };
         }

         //grouped nodes
         else if (this.items[0].layout == 'group'){
            /* 
            //basic example
            var nodes = new vis.DataSet([
               { id: 1, label: "Node 1" },
               { id: 2, label: "Node 2" },
               { id: 3, label: "Node 3" },
               { id: 4, label: "Node 4" },
               { id: 5, label: "Node 5" }
            ]);

            // create an array with edges
            var edges = new vis.DataSet([
               { from: 1, to: 3 },
               { from: 1, to: 2 },
               { from: 2, to: 4 },
               { from: 2, to: 5 },
               { from: 3, to: 3 }
            ]);
            var options = {};
            */

            //grouped nodes example
            var nodes = [
            { id: 0, label: "0", group: "source" },
            { id: 1, label: "1", group: "icons" },
            { id: 2, label: "2", group: "icons" },
            { id: 3, label: "3", group: "icons" },
            { id: 4, label: "4", group: "icons" },
            { id: 5, label: "5", group: "icons" },
            { id: 6, label: "6", group: "icons" },
            { id: 7, label: "7", group: "icons" },
            { id: 8, label: "8", group: "icons" },
            { id: 9, label: "9", group: "icons" },
            { id: 10, label: "10", group: "mints" },
            { id: 11, label: "11", group: "mints" },
            { id: 12, label: "12", group: "mints" },
            { id: 13, label: "13", group: "mints" },
            { id: 14, label: "14", group: "mints" },
            { id: 15, group: "dotsWithLabel" },
            { id: 16, group: "dotsWithLabel" },
            { id: 17, group: "dotsWithLabel" },
            { id: 18, group: "dotsWithLabel" },
            { id: 19, group: "dotsWithLabel" },
            { id: 20, label: "diamonds", group: "diamonds" },
            { id: 21, label: "diamonds", group: "diamonds" },
            { id: 22, label: "diamonds", group: "diamonds" },
            { id: 23, label: "diamonds", group: "diamonds" }
            ];
            var edges = [
            { from: 1, to: 0 },
            { from: 2, to: 0 },
            { from: 4, to: 3 },
            { from: 5, to: 4 },
            { from: 4, to: 0 },
            { from: 7, to: 6 },
            { from: 8, to: 7 },
            { from: 7, to: 0 },
            { from: 10, to: 9 },
            { from: 11, to: 10 },
            { from: 10, to: 4 },
            { from: 13, to: 12 },
            { from: 14, to: 13 },
            { from: 13, to: 0 },
            { from: 16, to: 15 },
            { from: 17, to: 15 },
            { from: 15, to: 10 },
            { from: 19, to: 18 },
            { from: 20, to: 19 },
            { from: 19, to: 4 },
            { from: 22, to: 21 },
            { from: 23, to: 22 },
            { from: 23, to: 0 }
            ];

            var options = {
            interaction: { hover: true },
            manipulation: {
               enabled: true
            },
            nodes: {
               shape: "dot",
               size: 20,
               font: {
                  size: 15,
                  color: "#ffffff"
               },
               borderWidth: 2
            },
            edges: {
               width: 2
            },
            groups: {
               diamonds: {
                  color: { background: "red", border: "white" },
                  shape: "diamond"
               },
               dotsWithLabel: {
                  label: "I'm a dot!",
                  shape: "dot",
                  color: "cyan"
               },
               mints: { color: "rgb(0,255,140)" },
               icons: {
                  shape: "icon",
                  icon: {
                  //face: "FontAwesome",
                  code: "\uf0c0",
                  size: 50,
                  color: "orange"
                  }
               },
               source: {
                  color: { border: "white" }
               }
            }
            };

         }

         //network layout (sample data)
         else if (this.items[0].layout == 'network'){
            var nodes = new vis.DataSet([
               { id: 1, qid: "", label: "Maria Dorothea Wilhelmina Freiin von Metternich Angelelli", title: 'Maria Dorothea Wilhelmina Freiin von Metternich Angelelli', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Lewis_Henry_Douglass.jpg' },
               { id: 2, qid: "", label: "Pietro Neri Lorenzo, Marquis Angelelli", title: 'Pietro Neri Lorenzo, Marquis Angelelli', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Vittoria_Francesca_of_Savoy%2C_illegitimate_daughter_of_the_Duke_of_Savoy_by_an_unknown_artist.jpg' },
               { id: 3, qid: "Q2399148", label: "Maria Vittoria of Savoy", title: 'Maria Vittoria of Savoy', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Frederick_Douglass_first_child_Rosetta_Douglass_Sprague.png' },
               { id: 4, qid: "Q2254102", label: "Victor Amadeus of Savoy, Prince of Carigon", title: 'Victor Amadeus of Savoy, Prince of Carigon', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Frederick_Douglass_4th_child_Charles_Remond_Douglass.png'},
               { id: 5, qid: "Q7738", label: "Louis XV, King of France", title: "Louis XV, King of France", shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Cardinal_de_Fleury_by_Rigaud.jpg' },
               { id: 6, qid: "Q233181", label: "Anna Maria Luisa de' Medici", title: "Anna Maria Luisa de' Medici", shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg' },
               { id: 7, qid: "Q439144", label: "Cardinal Fluery", title: "Cardinal Fluery", shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg' },
               { id: 8, qid: "Q455392", label: "Louis Henri, Duke of Bourbon", title: "Louis Henri, Duke of Bourbon", shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg' },
               { id: 9, qid: "", label: "Johanna Isabella von Bouscheidt (von Schaesberg)", title: "Johanna Isabella von Bouscheidt (von Schaesberg)", shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg' },
               { id: 10, qid: "", label: "Caspar Franz Edmund von Bourscheidt", title: "Caspar Franz Edmund von Bourscheidt", shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg' },
               { id: 11, qid: "", label: "Charles III Philip, Elector Palatine", title: "Charles III Philip, Elector Palatine", shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg' },
               { id: 12, qid: "", label: "Baroness Massimiliana von Moltke", title: "Baroness Massimiliana von Moltke", shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg' },
               { id: 13, qid: "", label: "Charles VI, Holy Roman Emperor", title: "Charles VI, Holy Roman Emperor", shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg' },
            
            ]);

            // create an array with edges
            var edges = new vis.DataSet([
               { from: 1, to: 6, title: 'received portions of and persmission to distribute the infant convulsion powder of'},
               { from: 1, to: 2, title: 'married to' },
               { from: 2, to: 6, title: 'informant of' },
               { from: 3, to: 6, title: 'received infant convulsion powder from'},
               { from: 3, to: 4, title: 'married to' },
               { from: 4, to: 5, title: 'was the master of ceremonies at the court of' },
               { from: 3, to: 7, title: 'had a close relationship with' },
               { from: 3, to: 8, title: 'had a close relationship with' },
               { from: 7, to: 5, title: 'served as the chief minister to' },
               { from: 8, to: 5, title: 'was related to and served as prime minister to' },
               { from: 9, to: 6, title: 'received infant convulsion powder from' },
               { from: 9, to: 10, title: 'married to' },
               { from: 10, to: 11, title: 'member of the court of' },
               { from: 12, to: 6, title: 'received portions of and persmission to distribute the infant convulsion powder of' },
               { from: 12, to: 13, title: 'member of the court of' },

            ]);

            var options = {
               interaction: { hover: true },
               layout: {
                  randomSeed: undefined,
                  improvedLayout:true,
                  clusterThreshold: 150,
                  hierarchical: false,
               }
            };

         }

         //options determined in above if/else statements

         //get input data here from file

         
         self.getInput(this.items[0].file)
            .then(function(result){
               self.parseText(result, nodeslist, edgeslist);
               //self.getImages(nodeslist);            
            })
            
            
            .then(function(result){
            
               self.getImages(nodeslist)
                  .then(function(result){
                     
                  console.log('nodeslist', nodeslist);
                  console.log('edgeslist', edgeslist);

                  nodes = new vis.DataSet(nodeslist);
                  edges = new vis.DataSet(edgeslist);


                  var container = document.getElementById("mynetwork");
                  var data = {
                     nodes: nodes,
                     edges: edges
                  };
                  console.log(
                     'nodes', nodes, 'edges', edges
                  )
                  var options = {
                     interaction: { hover: true },
                     layout: {
                        randomSeed: undefined,
                        improvedLayout:true,
                        clusterThreshold: 150,
                        hierarchical: false,
                     }
                  };
               
                  var network = new vis.Network(container, data, options);

                  network.on( 'click', function(properties) {
                     var ids = properties.nodes;
                     var clickedNodes = nodes.get(ids);
                     console.log('clicked nodes:', clickedNodes);
                     self.setSelectedItemID(clickedNodes[0].qid);
                     //self.addEventHandlers(network, clickedNodes[0].qid)
                     //self.active.add(clickedNodes[0].qid)
                  });

                  network.body.emitter.emit('_dataChanged');
                  network.redraw();

               })

            })
            
            /*
            .then(function(result){
                  
               console.log('nodeslist', nodeslist);
               console.log('edgeslist', edgeslist);

               nodes = new vis.DataSet(nodeslist);
               edges = new vis.DataSet(edgeslist);


               var container = document.getElementById("mynetwork");
               var data = {
                  nodes: nodes,
                  edges: edges
               };
               console.log(
                  'nodes', nodes, 'edges', edges
               )
               var options = {
                  interaction: { hover: true },
                  layout: {
                     randomSeed: undefined,
                     improvedLayout:true,
                     clusterThreshold: 150,
                     hierarchical: false,
                  }
               };
            
               var network = new vis.Network(container, data, options);

               network.on( 'click', function(properties) {
                  var ids = properties.nodes;
                  var clickedNodes = nodes.get(ids);
                  console.log('clicked nodes:', clickedNodes);
                  self.setSelectedItemID(clickedNodes[0].qid);
                  //self.addEventHandlers(network, clickedNodes[0].qid)
                  //self.active.add(clickedNodes[0].qid)
               });

               network.body.emitter.emit('_dataChanged');
               network.redraw();

            })
         */

         //call /entity endpoint to get wikidata from QIDs

         //console.log('nodeslist', nodeslist);
         //console.log('edgeslist', edgeslist);
      
         //alternatively, if qids are selected as entities, check cache for
         //wikidata information
         
         
         //populate nodes and edges
         //nodes = new vis.DataSet(nodeslist);
         //edges = new vis.DataSet(edgeslist);

         /*
         var container = document.getElementById("mynetwork");
         var data = {
            nodes: nodes,
            edges: edges
         };

      
         var network = new vis.Network(container, data, options);

         network.on( 'click', function(properties) {
            var ids = properties.nodes;
            var clickedNodes = nodes.get(ids);
            console.log('clicked nodes:', clickedNodes);
            self.setSelectedItemID(clickedNodes[0].qid);
            //self.addEventHandlers(network, clickedNodes[0].qid)
            //self.active.add(clickedNodes[0].qid)
         });
         */

/*
         function destroy() {
         if (network !== null) {
            network.destroy();
            network = null;
         }
         }

         function draw() {
         destroy();
         // randomly create some nodes and edges
         var nodeCount = document.getElementById("nodeCount").value;
         //var data = getScaleFreeNetwork(nodeCount);
         var data = {
            nodes: nodes,
            edges: edges
         }

         // create a network
         var container = document.getElementById("mynetwork");
         var directionInput = document.getElementById("direction").value;
         var options = {
            layout: {
               hierarchical: {
               direction: directionInput
               }
            }
         };
         network = new vis.Network(container, data, options);

         // add event listeners
         network.on("select", function(params) {
            document.getElementById("selection").innerHTML =
               "Selection: " + params.nodes;
         });
         }


*/
      },
      methods: {
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
            // console.log(`addPopup: id=${id} label=${label} lagLng=${latLng} offset=${offset}`)
            const popup = L.popup({ ...defaults.popupOptions, ...{ offset: L.point(0, offset || 0)}})
            popup.setLatLng(latLng)
            popup.setContent(`<h1 data-eid="${id}">${label}</h1>`)
            popup.options.id = id
            this.popups[id] = popup
            }
         },
         //fetch input from CSV file and parse to json
         getInput() {
            //var file = this.items[0].file;
            let filepath = `${this.componentsBaseURL}/components/${this.items[0].file}`
            console.log('filepath', filepath);
            return fetch(filepath).then(resp => resp.text())

         },

         parseText(text, nodes, edges){
            
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
                     //console.log('obj in 2nd for loop', obj);
                     //populate edges array
                     //to do: check here if obj contains at least to, from, label
                     
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

         callEntities(nodeslist){
            for (var i = 0; i < nodeslist.length; i++){
               console.log('nodeslist[i]', nodeslist[i]);
               if (nodeslist[i].qid != ""){
                  //edit to accept node.qid as a parameter
                  console.log('nodelist[i].qid', nodeslist[i].qid);
                  var imageobj;
                  this.getEntity(nodeslist[i].qid).then(function(result){
                     console.log('result from getEntity()', result);
                     imageobj = result['summary info'].originalimage;
                     console.log(imageobj, nodeslist[i]);
                  
                  });
                  console.log('imageobj', imageobj);
                  nodeslist[i].image = imageobj.source;
               }
            }
         },

         //get entity (image) for a single node
         getImage(node){
            this.getEntity(node.qid).then(function(result){
               console.log('result from getEntity', result);
               var imageobj = result['summary info'].originalimage;
               console.log('imageobj', imageobj);
               node.image = imageobj.source;
               node.title = imageobj.source;
               node.shape = "circularImage";
            })
            return node;
         },

         getImages(nodeslist){
            /*
            for (var i = 0; i < nodeslist.length; i++){
                  if (nodeslist[i].qid != ""){
                     this.getImage(nodeslist[i]);
                     //nodeslist[i] = node;
                     //self.getImage(nodeslist[i]);
                  }
            }
            return nodeslist;
            */

            return nodeslist.forEach((node) => {
               if (node.qid != ""){
                     this.getImage(node);
                  }
            });
            //return nodeslist;
         },

         //from EntityInfoBox.vue - /entity python API call
         toQueryString(args) {
            const parts = []
            Object.keys(args).forEach((key) => {
            parts.push(`${key}=${encodeURIComponent(args[key])}`)
            })
            return parts.join('&')
         },
         getEntity(eid) {
            let url = `${this.apiBaseURL}/entity/${encodeURIComponent(eid)}`
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

      },
      /*
      watch: {
         selectedItemID: {
            handler: function (itemID, prior) {
            const layer = Object.values(this.layers).find(layer => layer.options.id === (itemID || prior))
            console.log(`VisNetwork.selectedItemID: value=${itemID} prior=${prior}`)
            },
            immediate: true
         },
         selected: {
            handler: function (value, prior) {
            const map = document.getElementById('map')
            if (this.isSelected && map && map.style.display === 'none') {
               map.style.display = 'block'
            }
            },
            immediate: true
         },
      },
      */
   }
</script>

<style>
   .vis-network {overflow:visible;}

   body {
      color: #d3d3d3;
      font: 12pt arial;
      background-color: #222222;
   }

   #mynetwork {
   width: 600px;
   height: 600px;
   border: 1px solid lightgray;
   }
</style>