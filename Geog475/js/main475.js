//Global Variables: 
var map;
var addStoryButton = document.getElementById("addStoryButton");
var closeAccordionButton = document.getElementById("accordionCloseButton");
//global array for accordion items
var accordionItems = new Array();
var accordion = document.getElementById("storiesAccordion");
var storiesSection = document.getElementById("allStories");

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
	jQuery.getJSON("data/CRpoints.geojson", callback);  
	
 };
 
 function callback(data){
	setMap(); //sets map, map tiles, zoom control. 
	storiesMarkers(data);
	buttonListeners();
	window.alert("Welcome to Caroline's LifeMap!\n\nPlease select a book icon to view stories related to that location.\n\nZoom in on the colored circles to view all stories in that area.");
 }
 
 function buttonListeners(){
	//listener event for click calls the function openStories
	addStoryButton.onclick=function(){
		console.log("you clicked the add stories button");
		window.alert("Sorry, this functionality has not been implemented yet... \nbut you can click on icons to read stories.");
	};
	
	//listener event for close storiesAccordion 
	closeAccordionButton.onclick=function(){
		accordion.style.display="none";
	}
 }
 
 function setMap(){
	// Provide your access token
	L.mapbox.accessToken = 'pk.eyJ1IjoiY2Fyb2xpbmVyb3NlIiwiYSI6Ik55TUFmMVEifQ.ybZm7IghE2N0ezsMfaDNFQ';
	// Create a map in the div #map
	map = L.mapbox.map('map', 'carolinerose.kemm00ah').setView([20, -0], 2);
	
	L.control.zoom();
	//worldCopyJump?
	
	/*	L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
		attribution: 'Map data &copy; <a href="www.stamen.com">StamenDesign</a>'
	}).addTo(map);
	 */
 };


 
function storiesMarkers(data){

	var mygeoJSONStoryPointsLayer = L.geoJson(data, {
		pointToLayer: function(feature, latlng){
			return L.marker(latlng, {icon: bookIcon});
		},
		onEachFeature: onEachFeature
	
	});
	//.addTo(map);
	
	var clusterMarkers = new L.markerClusterGroup;
	
	clusterMarkers.addLayer(mygeoJSONStoryPointsLayer);
	map.addLayer(clusterMarkers);
	
} 

function onEachFeature(feature, layer){

	layer.on({
		click: function(){
			createAccordion(feature.properties.name, feature.properties.code);
		}
	});
	
}


function createAccordion(name, code){
	
	var topTitle = document.getElementById("storiesAccordionName");
	topTitle.innerHTML = "<h3>"+name+"</h3>";
	
	//clear out the stories section
	storiesSection.innerHTML = "";
	
	//style to make visible
	accordion.style.display="block";
	
	var titleString = "<p>"+name+"</p>";
	
	findStories(accordion, name, code);
	
	//initialize the accordion interactivity
	init();
	
}

function findStories(accordion, name, code){
	//for each story entry that matches the location
	storiesArray.forEach(function(entry){
		if (code==entry.placeCode){
			addStoryToAccordion(accordion, entry.title, entry.story);
		}
	});

	if(allStories.hasChildNodes()==false){
		allStories.innerHTML = allStories.innerHTML + "<p>Caroline was here...</p>";
	}
	
}

function addStoryToAccordion(accordion, title, story){
//	console.log("add to accordion: ", title, story);
//	console.log(accordion.childNodes);
	var storyHTML = "<div class='accordionItem'><h2>"+title+"</h2><div><p>"+story+"</p></div></div>";
	allStories.innerHTML = allStories.innerHTML + storyHTML;

}

/*---------- Accordion ----------*/

function init(){   //called from the initialize function
	//clear out the accordionItems array
	accordionItems = [];

	//grab accordion items from page 
	var divs = document.getElementsByTagName('div');
	for (var i=0; i< divs.length; i++){
		if ( divs[i].className == 'accordionItem') accordionItems.push(divs[i]);
	}
	
	//assign onclick events to the accordion item headings
	for (var i=0; i<accordionItems.length; i++){
		var h2 = getFirstChildWithTagName(accordionItems[i], 'H2');
		h2.onclick = toggleItem;
	}
	
	//Hide all accordion item bodies except the first 
	for (var i=1; i < accordionItems.length; i++){
		accordionItems[i].className = 'accordionItem hide';
		$(accordionItems[i]).find('div').slideUp();
	}
}

function toggleItem(){

	var itemClass = this.parentNode.className;
	
	//hide all items
	for (var i=0; i<accordionItems.length; i++){
		accordionItems[i].className = 'accordionItem hide';
		$(accordionItems[i]).find('div').slideUp();
	}
	

	//hide the item if it was open 
	if (itemClass == 'accordionItem'){
		this.parentNode.className = 'accordionItem hide';
		$(this).parent().find('div').slideUp();
	}
	

	//show this item if it was previously hidden 
	if (itemClass == 'accordionItem hide'){
		this.parentNode.className = 'accordionItem';
		$(this).parent().find('div').slideDown();
	}
	
	
}

function getFirstChildWithTagName(element, tagName){

	for (var i=0; i< element.childNodes.length; i++){
		if (element.childNodes[i].nodeName == tagName) return element.childNodes[i];
	}
} 


 