//Global Variables: 
var map;


//the variable bookIcon is a divIcon that contains the book image. 
var bookIcon = L.divIcon({
		iconSize: (30,30), 
		className: "singlebookIcon",
		html: "<img src='images/bookicon.png' alt='book'/>"
	
	});
	


//begin script when window loads
window.onload = initialize();

//the first function called once the html is loaded
function initialize(){
	//passes the content of the json to any function called in callback that is passed the data parameter. 
	jQuery.getJSON("data/MapExtents_Jan6.geojson", callback);  

 };
 
 function callback(data){

	setMap(); //sets map, map tiles, zoom control. 

	extentMarkers(data);
 }
 
 function setMap(){
	// Provide your access token
	L.mapbox.accessToken = 'pk.eyJ1IjoiY2Fyb2xpbmVyb3NlIiwiYSI6Ik55TUFmMVEifQ.ybZm7IghE2N0ezsMfaDNFQ';
	// Create a map in the div #map
	map = L.mapbox.map('map', 'carolinerose.kemm00ah').setView([0,0], 1);
	
	L.control.zoom();
	
	
	/*	L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
		attribution: 'Map data &copy; <a href="www.stamen.com">StamenDesign</a>'
	}).addTo(map);
	 */
 };


 
function extentMarkers(data){
	
	var myExtentsLayer = L.geoJson(data, {
		
		style: stylePolygons,		
		onEachFeature: onEachFeature
	
	}).addTo(map);
	
	
} 

function stylePolygons (){
	
	return{color:"blue", fill:false, opacity:0.7, weight:2};
	
}

function onEachFeature(feature, layer){

	layer.on({
		click: function(){
			console.log(feature.properties.Map_Extent_Code+", "+feature.properties.Area_km2);
		},
		mouseover: function(e){
			//console.log(feature.properties.Map_Extent_Code+" highlight");
			this.setStyle({
				color:"yellow", weight:5
			});
		},
		mouseout: function(){
			//console.log(feature.properties.Map_Extent_Code+" dehighlight");
			this.setStyle({
				color:"blue", weight:2
			});
		}
		
	});
	
}



 