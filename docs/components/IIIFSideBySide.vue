<template>
  <div id="lmap" :style="containerStyle"/>
</template>

<script>

/* global L */

const dependencies = [
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://cdn.rawgit.com/mejackreed/Leaflet-IIIF/v2.0.1/leaflet-iiif.js',
    'https://cdn.rawgit.com/digidem/leaflet-side-by-side/6ea4567fe8d1b3e6ea3b0e9ca05d311f5be125a3/leaflet-side-by-side.js'
]

module.exports = {
    name: 'IIIFSideBySide',
    props: { items: Array, width: Number, height: Number },
    computed: {
        containerStyle() { return { width: `${this.width}px`, height: `${this.height}px`, overflowY: 'auto !important' } },
    },
    mounted() {
        console.log(this.$options.name, this.items)
        this.loadDependencies(dependencies, 0, this.init)
    },
    methods: {
        init() {
            const map = L.map('lmap', { center: [0, 0], crs: L.CRS.Simple, zoom: 0 })
            const layer1 = L.tileLayer.iiif(this.items[0].url1, { fitBounds: true }).addTo(map)
            const layer2 = L.tileLayer.iiif(this.items[0].url2).addTo(map)
            L.control.sideBySide(layer1, layer2).addTo(map)                
        }
    }
}

</script>

<style scoped>
    #lmap{
        height: 100%;
        margin: 0;
    }
    .leaflet-container {
        background: #fff !important;
    }
    .leaflet-sbs-range {
        width: 100%;
        height: 0;
    }
</style>