<template>
  <v-container :style="containerStyle">
    <div id="vis">
      <i class="fa fa-flag"></i>
      <div id="mynetwork"></div>
    </div>
  </v-container>
</template>

<script>

   module.exports = {
      name: 'visNetwork',
      props: {
         items: { type: Array, default: () => ([]) },
         selected: { type: String },
         width: Number,
         height: Number
      },
      data: () => ({
         activeWindow: undefined
      }),
      computed: {
         containerStyle() { return { width: `${this.width}px`, height: `${this.height}px`, overflowY: 'auto !important' } },
      },
      mounted() {

         var nodes = null;
         var edges = null;
         var network = null;

         console.log('this.items[0].layout', this.items[0].layout);
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

         else {
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
         });

         //hierarchical layout network
         /*
         var nodes = new vis.DataSet([
            { id: 1, label: "lewis", title: 'Lewis Douglass', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Lewis_Henry_Douglass.jpg' },
            { id: 2, label: "frederick", title: 'Frederick Douglass', shape: "circularImage", image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Pinus_sylvestris_Glenmuick.jpg' },
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
            layout: {
               hierarchical: {
               direction: directionInput
               }
            }
         };
         var data = {
            nodes: nodes,
            edges: edges
         };
         var network = new vis.Network(container, data, options);
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

         var directionInput = document.getElementById("direction");
         var btnUD = document.getElementById("btn-UD");
         btnUD.onclick = function() {
         directionInput.value = "UD";
         draw();
         };
         var btnDU = document.getElementById("btn-DU");
         btnDU.onclick = function() {
         directionInput.value = "DU";
         draw();
         };
         var btnLR = document.getElementById("btn-LR");
         btnLR.onclick = function() {
         directionInput.value = "LR";
         draw();
         };
         var btnRL = document.getElementById("btn-RL");
         btnRL.onclick = function() {
         directionInput.value = "RL";
         draw();
         };

         window.addEventListener("load", () => {
         draw();
         });

*/
      },
      methods: {
         setHoverItemID(itemID) {
            this.$emit('hover-id', itemID)
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

      }
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