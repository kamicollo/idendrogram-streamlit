(this["webpackJsonpidendrogram-streamlit"]=this["webpackJsonpidendrogram-streamlit"]||[]).push([[0],{102:function(t,n,e){t.exports=e(103)},103:function(t,n,e){"use strict";e.r(n);var r,i=e(2),a=e(8),o=e(4);e(108);!function(t){t.top="top",t.bottom="bottom",t.right="right",t.left="left"}(r||(r={})),a.a.events.addEventListener(a.a.RENDER_EVENT,(function(t){var n=t.detail,e=n.args.dendrogram,s=n.args.scale,l=n.args.show_nodes,c=n.args.margins,d={height:n.args.height,width:n.args.width,margin:c,innerHeight:0,innerWidth:0,orientation:n.args.orientation};d.innerHeight=d.height-d.margin.top-d.margin.bottom,d.innerWidth=d.width-d.margin.left-d.margin.right;var u,f,p=function(t){return o.i("#idendro")&&o.i("#idendro").remove(),o.i("body").append("svg").attr("id","idendro").attr("width",t.width).attr("height",t.height).append("g").attr("transform","translate("+t.margin.left+","+t.margin.top+")").attr("id","idendro-container")}(d),h=function(t,n,e,i){var a,s,l,c=e.x_domain,d=e.y_domain,u=[0,0],f=[0,0],p=[0,0];n.orientation===r.top||n.orientation===r.bottom?(a=[0,n.innerWidth],l=o.b,p=[0,0],n.orientation===r.top?(u=[n.innerHeight,0],s=o.a,f=[0,n.innerHeight]):(u=[0,n.innerHeight],s=o.d)):(l=o.a,a=[n.innerHeight,0],p=[0,n.innerHeight],n.orientation===r.left?(u=[n.innerWidth,0],s=o.c,f=[n.innerWidth,0]):(u=[0,n.innerWidth],s=o.b));var h,g,m=e.axis_labels.map((function(t){return t.x})),y=e.axis_labels.map((function(t){return t.label})),x=s(h=o.f().domain(c).range(a)).tickValues(m).tickFormat((function(t,n){return y[n]})).tickSize(3),v=t.append("g").attr("id","label-axis").attr("transform","translate("+f[0]+","+f[1]+")").call(x),b=e.axis_labels[0].labelAngle,k="start",w=1;b<0&&(k="end",w=-1),v.selectAll("text").attr("transform","rotate("+b+")").attr("y",Math.abs(90*w-b)/7).attr("x",b/5).attr("dy",".5em").style("text-anchor",k),(g="symlog"===i?o.h().constant(1):"log"===i?o.g():o.f()).domain(d),g.range(u);var H=l(g);return t.append("g").attr("id","value-axis").attr("transform","translate("+p[0]+","+p[1]+")").call(H),[h,g]}(p,d,e,s);d.orientation===r.top||d.orientation===r.bottom?(u=h[0],f=h[1],e.links.forEach((function(t){t.data=t.x.map((function(n,e){return{x:n,y:t.y[e]}}))}))):(f=h[0],u=h[1],e.links.forEach((function(t){t.data=t.x.map((function(n,e){return{y:n,x:t.y[e]}}))})),e.nodes.forEach((function(t){var n=t.x;t.x=t.y,t.y=n}))),function(t,n,e,r){t.selectAll(".link").data(n).enter().append("path").attr("fill","none").attr("stroke",(function(t){return t.fillcolor})).attr("stroke-width",(function(t){return t.strokewidth})).attr("stroke-opacity",(function(t){return t.strokeopacity})).attr("stroke-dasharray",(function(t){return t.strokedash})).attr("class","link").attr("d",(function(t){return o.e().x((function(t){return e(t.x)||0})).y((function(t){return r(t.y)||0}))(t.data)}))}(p.append("g").attr("class","link-container"),e.links,u,f),l&&function(t,n,e,r){var s=t.selectAll(".node").data(n).enter().append("g").attr("transform",(function(t){return"translate("+e(t.x)+","+r(t.y)+")"})).attr("class","node"),l=o.i("body").append("div").style("opacity",0).attr("class","idendro-tooltip").on("mouseover",(function(t,n){t.target&&o.i(this).style("opacity",1)})).on("mouseleave",(function(t,n){t.target&&(o.i(this).style("opacity",0),o.i(this).style("display","none"))})),c=function(t,n){if(l.style("opacity",1),l.style("display","initial"),l.style("left",t.x+"px").style("top",t.y+"px"),"string"===typeof n.hovertext)l.html(n.hovertext);else{for(var e="",r=0,a=Object.entries(n.hovertext);r<a.length;r++){var s=Object(i.a)(a[r],2);e+="<strong>"+s[0]+"</strong>: "+s[1]+"<br>"}l.html(e)}"circle"===this.nodeName&&o.i(this).attr("r",1.5*n.radius)},d=function(t,n){l.style("left",t.x+"px").style("top",t.y+"px"),"circle"===this.nodeName&&o.i(this).attr("r",1.5*n.radius)},u=function(t,n){l.style("opacity",0),"circle"===this.nodeName&&o.i(this).attr("r",n.radius)},f=function(t,n){a.a.setComponentValue(n),l.style("opacity",0),l.style("display","none")};s.append("circle").attr("fill",(function(t){return t.fillcolor})).attr("stroke",(function(t){return t.edgecolor})).attr("r",(function(t){return t.radius})).attr("opacity",(function(t){return t.opacity})).on("mouseover",c).on("mouseleave",u).on("mousemove",d).on("click",f),s.append("text").text((function(t){return t.label})).attr("fill",(function(t){return t.labelcolor})).attr("font-size",(function(t){return t.labelsize})).attr("opacity",(function(t){return t.opacity})).on("mouseover",c).on("mouseleave",u).on("mousemove",d).on("click",f)}(p.append("g").attr("class","node-container"),e.nodes,u,f),a.a.setFrameHeight()})),a.a.setComponentReady(),a.a.setFrameHeight()},108:function(t,n,e){}},[[102,1,2]]]);
//# sourceMappingURL=main.b350a90c.chunk.js.map