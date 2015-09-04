//Global Variables: 
var map;

L.mapbox.accessToken = 'pk.eyJ1IjoiY2Fyb2xpbmVyb3NlIiwiYSI6Ik55TUFmMVEifQ.ybZm7IghE2N0ezsMfaDNFQ';

//begin script when window loads
window.onload = initialize();

//the first function called once the html is loaded
function initialize(){
	setMap();
 };
 

 function setMap(){

	map = L.map('map').setView([0,0], 2);
	
/*	L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
    attribution: 'Map data &copy; <a href="www.stamen.com">StamenDesign</a>'
}).addTo(map);*/
     
    var basemaps =  L.control.layers(
        {
            'Mapbox Satellite': L.mapbox.tileLayer('mapbox.satellite').addTo(map), 
            'Mapbox Outdoors': L.mapbox.tileLayer('mapbox.outdoors'), 
            'Mapbox Run-Bike-Hike': L.mapbox.tileLayer('mapbox.run-bike-hike'),
            'Mapbox Emerald': L.mapbox.tileLayer('mapbox.emerald'),
            'Mapbox Streets': L.mapbox.tileLayer('mapbox.streets'),
            'Mapbox Streets-Satellite': L.mapbox.tileLayer('mapbox.streets-satellite'),  
            'Mapbox Comic': L.mapbox.tileLayer('mapbox.comic'), 
            'Mapbox Pencil': L.mapbox.tileLayer('mapbox.pencil'), 
            'Mapbox High Contrast': L.mapbox.tileLayer('mapbox.high-contrast'),
            'Mapbox Streets-Basic': L.mapbox.tileLayer('mapbox.streets-basic'),
            'Mapbox wheatpaste': L.mapbox.tileLayer('mapbox.wheatpaste'),
            'Mapbox Pirates': L.mapbox.tileLayer('mapbox.pirates') 
            
            
        }
    ).addTo(map);
	
 
 }; //end set map