<template>
  <v-container :style="containerStyle">
	  <i class="fa fa-flag"></i>
	  <div id="cy"></div>
  </v-container>
</template>

<script>
/*
	const nodes = [
      {data: {id: 'lewis'}},
      {data: {id: 'frederick'}},
      {data: {id: 'rosetta'}},
      {data: {id: 'charles'}},
      {data: {id: 'joseph'}},
    ]

    const edges = [
      {data: {source: 'lewis', target: 'frederick'}},
      {data: {source: 'frederick', target: 'rosetta'}},
      {data: {source: 'frederick', target: 'charles'}},
      {data: {source: 'charles', target: 'joseph'}},
    ]
  }

  const layout = {
    name: 'breadthfirst',
    directed: true,
    padding: 10
  }
*/

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
		console.log('BFSNetwork.mounted')
      let cy = cytoscape({
		  container: document.getElementById('cy'),

		  boxSelectionEnabled: false,
		  autounselectify: true,

		  style: cytoscape.stylesheet()
			.selector('node')
				.style({
					'content': 'data(id)'
				})
		      .css({
				  'content': 'data(id)',
		        'height': 80,
		        'width': 80,
		        'background-fit': 'cover',
		        'border-color': '#000',
		        'border-width': 3,
		        'border-opacity': 0.5
		      })
		    .selector('.eating')
		      .css({
		        'border-color': 'red'
		      })
		    .selector('.eater')
		      .css({
		        'border-width': 9
		      })
		    .selector('edge')
		      .css({
		        'curve-style': 'bezier',
		        'width': 6,
		        'target-arrow-shape': 'triangle',
		        'line-color': '#ffaaaa',
		        'target-arrow-color': '#ffaaaa'
		      })
		    .selector('#lewis')
			    .css({
					'background-image': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Lewis_Henry_Douglass.jpg',
					'content': 'data(name)',
        			'text-valign': 'center',
        			'color': 'white',
        			'text-outline-width': 2,
        			'text-outline-color': '#888',
			    })
			  .selector('#frederick')
			    .css({
					//'background-image': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Pinus_sylvestris_Glenmuick.jpg'
			      'background-image': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Frederick_Douglass_%28circa_1879%29.jpg'
			    })
			  .selector('#rosetta')
			    .css({
			      'background-image': 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Frederick_Douglass_first_child_Rosetta_Douglass_Sprague.png'
			    })
			  .selector('#charles')
			    .css({
			      'background-image': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Frederick_Douglass_4th_child_Charles_Remond_Douglass.png'
			    })
			  .selector('#joseph')
			    .css({
			      'background-image': 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Frederick_Douglass_%26_grandson_Joseph%2C_c1890s.jpg'
			    }),

			  elements: {

				/*
			    nodes: [
			      {data: {id: 'lewis', relationship: "father"}},
			      {data: {id: 'frederick', relationsihp: "subject"}},
			      {data: {id: 'rosetta', relationship: "daughter"}},
			      {data: {id: 'charles', relationship: "son"}},
			      {data: {id: 'joseph', relationship: "great-grandchild"}},
			    ],
			    edges: [
			      {data: {source: 'lewis', target: 'frederick'}},
			      {data: {source: 'frederick', target: 'rosetta'}},
			      {data: {source: 'frederick', target: 'charles'}},
			      {data: {source: 'charles', target: 'joseph'}},
			    ]
			  },
			  */
			 nodes: [{
				data: {
					id: "a"
				}
				}, {
				data: {
					id: "b"
				}
				}],
				edges: [{
				data: {
					id: "ab",
					source: "a",
					target: "b"
				}
				}]
			  },

			  layout: {
			    name: 'breadthfirst',
			    directed: true,
			    padding: 10
			  }
		}) // cy init
	
		console.log('BFSNetwork.here')
		/*
		cy.on('mouseover', 'node', function(event) {

			console.log('in here');
			var node = event.cyTarget;
			node.qtip({
					content: 'hello',
					show: {
						event: event.type,
						ready: true,
						solo: true
					},
					hide: {
						event: 'mouseout unfocus'
					}
			}, event);
		});
		*/

		/*
		cy.on('mouseover', 'node', function(evt){
			console.log('in mouseover!');
			var node = evt.target;
			console.log( 'mouse on node ' + node.data('id') );
		});
		*/

		/*
		function makePopper(ele) {
			console.log('in makePopper', ele)
			let ref = ele.popperRef(); // used only for positioning
			//let ref = ele;

			ele.tippy = tippy(ref, { // tippy options:
				content: () => {
				let content = document.createElement('div');

				content.innerHTML = ele.id();

				return content;
				},
				trigger: 'manual' // probably want manual mode
			});
		}
		*/

		
		cy.on('mouseover', 'node', function(evt){
			var node = evt.target;
			evt.target.tippy.show();
			console.log( 'Relationship: ' + node.data('relationship') );
		});
		

		
		function makePopper(ele) {
			console.log('in makePopper', ele)
			let ref = ele.popperRef(); // used only for positioning
			
			let dummyDomEle = document.querySelectorAll('node');

			ele.tippy = tippy(ele, { // tippy options:

				//trigger: 'manual', // call show() and hide() yourself
				content: () => {
				let content = document.createElement('div');

				content.innerHTML = ele.id();

				return content;
				},
			});
		}

		cy.ready(function() {
			console.log('in cy.ready');
			cy.elements().forEach(function(ele) {
				console.log('ele', ele);
				makePopper(ele);
			});
		});

		cy.elements().unbind('mouseover');
		cy.elements().bind('mouseover', (event) => event.target.tippy.show());

		cy.elements().unbind('mouseout');
		cy.elements().bind('mouseout', (event) => event.target.tippy.hide());
		

		cy.on('tap', 'node', function(){
		  var nodes = this;
		  var tapped = nodes;
		  var food = [];
			
		  nodes.addClass('eater');

		  console.log('in tap');
		  console.log('nodes', nodes);
		  console.log('food', food);

			/*
		  for(;;){
		    var connectedEdges = nodes.connectedEdges(function(el){
		      return !el.target().anySame( nodes );
		    });

		    var connectedNodes = connectedEdges.targets();

		    Array.prototype.push.apply( food, connectedNodes );

		    nodes = connectedNodes;

		    if( nodes.empty() ){ break; }
		  }

		  var delay = 0;
		  var duration = 500;
		  for( var i = food.length - 1; i >= 0; i-- ){ (function(){
		    var thisFood = food[i];
		    var eater = thisFood.connectedEdges(function(el){
		      return el.target().same(thisFood);
		    }).source();

		    thisFood.delay( delay, function(){
		      eater.addClass('eating');
		    } ).animate({
		      position: eater.position(),
		      css: {
		        'width': 10,
		        'height': 10,
		        'border-width': 0,
		        'opacity': 0
		      }
		    }, {
		      duration: duration,
		      complete: function(){
		        thisFood.remove();
		      }
		    });

		    delay += duration;
		  })(); }
		*/
		});
		

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