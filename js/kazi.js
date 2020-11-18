var map = new L.map('map').setView([-6.164653, 39.208925], 14 );

var osmlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
var said = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);




 //layer style
 var style_shehia = {
     "color":"#fcfcfc",
     "weight": 0.2,
     "opacity": 1,
     "dashArray": '5,5',
    "fillColor": "#f5fcfc",
     "fillOpacity": "1" ,
};
 var style_buildings = {
     "color":"#cccfcf",
     "weight": 0.5,
     "opacity": 0.5,
     "dashArray": '5,5',
    "fillColor": "#cccfcf",
     "fillOpacity": 1
};
var style_wastepoints = {
    "color":"#14ade0",
    "radius": 16.5,
    "weight": 0.5,
    "opacity": 0,
    "fillColor": "#7034a8",
    "fillOpacity": 1
};
var styleWater = {
    "color":"#122be3",
    "weight": 0.5,
    "opacity": 0,
    "fillColor": "#14ade0",
    "fillOpacity": 1
};
var styleFloodpronearea = {
    "color":"#e66363",
	 "radius": 16.5,
    "weight": 0.5,
    "opacity": 0,
    "fillColor": "#e66363",
    "fillOpacity": 1
};

 function styleDrainage(b) {
     return b == 'yes' ? '#ff0505' :
            b == 'no'  ? '#00db37' :
                       '#07cdf0';
 }
 function drainageStyle(feature,map) {
     return { 
         opacity:1,
         weight:2,
		 color: styleDrainage(feature.properties.blockage),
         fillOpacity:1
     };
	}
	
var bufferStyle = {
    "color":"#e66363",
    "weight": 4,
    "opacity": 5,
    "fillColor": "#e66363",
    "fillOpacity": 0.5
};
	
 function styleBlockage(b) {
     return b == 'concrete' ? '#f037be' :
            b == 'dirt'  ? '#f5e50a' :
			b == 'dirty'  ? '#f5e50a' :
			b == 'metal'  ? '#00db37' :
			b == 'grass or plant'  ? '#1a26d6' :
			b == 'grass or plants'  ? '#1a26d6' :
			b == 'grass_or_plant'  ? '#1a26d6' :
			b == 'rubish or solid_waste'  ? '#242322' :
			b == 'rubish_or_solid_waste'  ? '#242322' :
			b == 'solid waste or rubish'  ? '#242322' :
			b == 'no'  ? '#0dbf7e' :
                       '';
 }
 function blockStyle(feature,map) {
     return { 
         opacity:1,
         weight:5,
		 color: styleBlockage(feature.properties.blockage_m),
         fillOpacity:1
     };
	}

	
// data layers
var shehias = L.geoJson(shehias,{style:style_shehia}).addTo(map); //shehias
var buildings = L.geoJson(building,{style:style_buildings}).addTo(map).bindPopup("Buildings");; //buildings

//threats
var drainages = L.geoJson(drainage,{style:drainageStyle}).bindPopup("Drainage"); //drainage
//var wastepoints = L.geoJson(wastepoints,{style:style_wastepoints}) //wastepoints
var waterbodies = L.geoJson(waterbodies,{style:styleWater}).bindPopup("Water Body"); //waterbodies
var wastepoints = L.geoJson(wastepoints, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style_wastepoints).bindPopup("Dump Site.");
    },
    //onEachFeature:onEachShop
});



//impact
var floodpronearea = L.geoJson(floodpronearea,{style:styleFloodpronearea}).bindPopup("Flooded Area."); //floodpronearea
var floodedbuffer = L.geoJson(floodbuffer,{style:bufferStyle}).bindPopup("Flooded Area"); //floodpronebuffer

//blockage material
var blocked = L.geoJson(drainage,{style:blockStyle}).bindPopup("Blockage Materials"); //drainage


//groups
var threats= L.layerGroup([waterbodies,wastepoints,drainages]).addTo(map);
var impact= L.layerGroup([floodpronearea,floodedbuffer]).addTo(map);
var blockages= L.layerGroup([blocked]).addTo(map);


//layer control
 var overlays = {
             "Threat toward Drainage blockage":threats,
			 "Flooding Impact of Drainage Blockage ":impact,
			 "Blockage material":blockages
			}; 
 var basemaps = {
    "Setalite View":said,
             "OpenStreetMap":osmlayer
            
         };

L.control.layers(overlays,basemaps,{position:'topright'}).addTo(map);


//legends
var legend_drainage = L.control({position: 'bottomleft'});

legend_drainage.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["ditch", "drain","stream","underground_drain"],
        labels = [];
    div.innerHTML += '<b></b><br><img src="../images/legend.PNG">' 
	
    return div;
};
map.addControl(legend_drainage);


var legend_drainage1 = L.control({position: 'bottomright'});

legend_drainage1.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["ditch", "drain","stream","underground_drain"],
        labels = [];
    div.innerHTML += '<b></b><br><img src="./images/materials.png">' 
    return div;
};
map.addControl(legend_drainage);






