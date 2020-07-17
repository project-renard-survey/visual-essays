<template>
  <v-container :style="containerStyle">
    <div id="cy"></div>
      <cytoscape ref="cy" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode">
         <cy-element
            v-for="def in elements"
            :key="`${def.data.id}`"
            :definition="def"
            v-on:mousedown="deleteNode($event, def.data.id)"
         />
         </cytoscape>
  </v-container>
</template>

<script>

  module.exports = {
    name: 'BFSNetwork',
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
       const config = {
         style: [
            {
               selector: 'node',
               style: {
               'background-color': '#666',
               'label': 'data(id)'
               }
            }, {
               selector: 'edge',
               style: {
               'width': 3,
               'line-color': '#ccc',
               'target-arrow-color': '#ccc',
               'target-arrow-shape': 'triangle'
               }
            }
         ],
         layout: {
            name: 'grid',
            rows: 1
         }
         }
   },
    methods: {
		
    }

  }

</script>

<style>
	body { 
	  font: 14px helvetica neue, helvetica, arial, sans-serif;
	}

	#cy {
	  height: 100%;
	  width: 100%;
	  position: absolute;
	  left: 0;
	  top: 0;
	}

	#eat {
	  position: absolute;
	  left: 1em;
	  top: 1em;
	  font-size: 1em;
	  z-index: -1;
	  color: #c88;
	}
</style>