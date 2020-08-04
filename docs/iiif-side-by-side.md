<param ve-config
       title="IIIF side by side image viewer example"
       banner="https://upload.wikimedia.org/wikipedia/commons/d/d7/Graphical_network.png"
       layout="vtl"
       author="Labs">

## IIIF side by side image viewer

This essay demonstrates the use of the `ve-iiif-compare` essay tag.  This tag creates an IIIF image viewer using
Leaflet and the [Leaflet-IIIF](https://github.com/mejackreed/Leaflet-IIIF) plugin.  The viewer displays 2 images in a
side-by-side view with a slider for controlling how much of each image is displayed.  The tag requires two attributes (`url1` and `url2`) for the IIIF image URLs of each image to display.
<param ve-iiif-compare
       url1="https://free.iiifhosting.com/iiif/54d7fcd7cb16edd725cee58c12e37c5b22cfdf2bc9f5c177709b784a82571e93/info.json"
       url2="https://free.iiifhosting.com/iiif/416ed96853ac926261ea1f37a35b55b0116b255feba7c7173178888ad76f0ce0/info.json">
