(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{323:function(t,n,e){"use strict";e(116);var o=e(90);n.a=Object(o.a)("layout")},325:function(t,n,e){"use strict";e.d(n,"a",(function(){return o}));e(91);function o(t){var n=t.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);return n&&{protocol:n[1],host:n[2],hostname:n[3],port:n[4],pathname:n[5],search:n[6],hash:n[7]}}},332:function(t,n,e){"use strict";e.r(n);e(38);var o=e(76),c=e.n(o),r=e(325),h={name:"index",data:function(){return{html:void 0}},created:function(){this.$store.dispatch("setTitle","Visual Essays"),this.$store.dispatch("setBanner","https://picsum.photos/1200/225")},mounted:function(){var t=this;c.a.get("".concat("http://localhost:5000","/").concat(this.$options.name,".md")).then((function(n){t.html=t.$marked(n.data),t.$nextTick((function(){var n=window.location.host;t.$refs.index.querySelectorAll("a").forEach((function(link){var e=Object(r.a)(link.href);e.host===n&&link.addEventListener("click",(function(n){n.preventDefault(),t.$router.push({path:"/essay",query:{src:"".concat("http://localhost:5000").concat(e.pathname)}})}))}))}))}))}},l=e(61),d=e(134),f=e.n(d),m=e(314),v=e(323),component=Object(l.a)(h,(function(){var t=this.$createElement,n=this._self._c||t;return n("v-layout",[n("v-flex",[n("div",{ref:"index",domProps:{innerHTML:this._s(this.html)}})])],1)}),[],!1,null,null,null);n.default=component.exports;f()(component,{VFlex:m.a,VLayout:v.a})}}]);