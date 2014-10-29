//global variables
var map; //map object
var floor = 0; //variable to determine the floor displayed on the map

var floorBembed = "<iframe width='100%' height='600px' frameBorder='0' src='http://a.tiles.mapbox.com/v3/carolinerose.h807619k/mm/zoompan,zoomwheel,geocoder,share.html'></iframe>"
var floor0embed = "<iframe width='100%' height='600px' frameBorder='0' src='http://a.tiles.mapbox.com/v3/carolinerose.h7p6dog0/mm/zoompan,zoomwheel,geocoder,share.html'></iframe>"
var floor1embed ="<iframe width='100%' height='600px' frameBorder='0' src='http://a.tiles.mapbox.com/v3/carolinerose.h8090en3/mm/zoompan,zoomwheel,geocoder,share.html'></iframe>"
var floor2embed ="<iframe width='100%' height='600px' frameBorder='0' src='http://a.tiles.mapbox.com/v3/carolinerose.h80hh948/mm/zoompan,zoomwheel,geocoder,share.html'></iframe>"
var floor3embed ="<iframe width='100%' height='600px' frameBorder='0' src='http://a.tiles.mapbox.com/v3/carolinerose.h80ho9k0/mm/zoompan,zoomwheel,geocoder,share.html'></iframe>"
var floor4embed ="<iframe width='100%' height='600px' frameBorder='0' src='http://a.tiles.mapbox.com/v3/carolinerose.h80i1lj7/mm/zoompan,zoomwheel,geocoder,share.html'></iframe>"



window.onload = initialize();

//the first function called once the html is loaded
function initialize(){

	setProfile();
	//setFloorListener();
} 

function setProfile(){
	d3.xml('images/capitol_profile.svg', "image/svg+xml", function(xml) {
		var profile = document.getElementById("profile");
		profile.appendChild(xml.documentElement).id = "profileSVG";
//		var mySVG = document.getElementById("profileSVG");
//		console.log(mySVG);
//		var myfloors = document.getElementById("floors");
	//	console.log(myfloors);
		var basementFloor = document.getElementById("basement");
		var groundFloor = document.getElementById("ground");
		var firstFloor = document.getElementById("first_1_");
		var secondFloor = document.getElementById("second");
		var thirdFloor = document.getElementById("third");
		var fourthFloor = document.getElementById("fourth");
		
		var floorsArray = [basementFloor,groundFloor];
		
		console.log("groundFloor is ",groundFloor);
		
	//listeners for mouseover and mouseout events
		$(basementFloor).mouseover(function () {
				basementFloor.style.fill="#424242";
			});
		$(basementFloor).mouseout(function () {
				basementFloor.style.fill="white";
		});		
		$(groundFloor).mouseover(function () {
				groundFloor.style.fill="#424242";
			});
		$(groundFloor).mouseout(function () {
				groundFloor.style.fill="white";
		});
		$(firstFloor).mouseover(function () {
				firstFloor.style.fill="#424242";
			});
		$(firstFloor).mouseout(function () {
				firstFloor.style.fill="white";
		});
		$(secondFloor).mouseover(function () {
				secondFloor.style.fill="#424242";
			});
		$(secondFloor).mouseout(function () {
				secondFloor.style.fill="white";
		});
		$(thirdFloor).mouseover(function () {
				thirdFloor.style.fill="#424242";
			});
		$(thirdFloor).mouseout(function () {
				thirdFloor.style.fill="white";
		});
		$(fourthFloor).mouseover(function () {
				fourthFloor.style.fill="#424242";
			});
		$(fourthFloor).mouseout(function () {
				fourthFloor.style.fill="white";
		});
		
	//listeners for click event
		$(basementFloor).click(function () {
			floorSet(-1);
			
			basementFloor.style.stroke="red";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="black";
		});
		$(groundFloor).click(function () {
			floorSet(0);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="red";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="black";
		});
		$(firstFloor).click(function () {
			floorSet(1);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="red";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="black";
		});
		$(secondFloor).click(function () {
			floorSet(2);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="red";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="black";
		});
		$(thirdFloor).click(function () {
			floorSet(3);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="red";
			fourthFloor.style.stroke="black";
		});
		$(fourthFloor).click(function () {
			floorSet(4);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="red";
		});
		
	});

} //end setProfile function


function floorSet (floor){
	console.log("display floor ", floor);
	if (floor == -1){
		document.getElementById('mapTitle').innerHTML = "<p>Basement</p>";
		document.getElementById('map').innerHTML = floorBembed;
	};
	if (floor == 0){
		document.getElementById('mapTitle').innerHTML = "<p>Ground Floor</p>";
		document.getElementById('map').innerHTML = floor0embed;
	};
	if (floor == 1){
		document.getElementById('mapTitle').innerHTML = "<p>First Floor</p>";
		document.getElementById('map').innerHTML = floor1embed;
	};
	if (floor == 2){
		document.getElementById('mapTitle').innerHTML = "<p>Second Floor</p>";
		document.getElementById('map').innerHTML = floor2embed;
	};
	if (floor == 3){
		document.getElementById('mapTitle').innerHTML = "<p>Third Floor</p>";
		document.getElementById('map').innerHTML = floor3embed;
	};
	if (floor == 4){
		document.getElementById('mapTitle').innerHTML = "<p>Fourth Floor</p>";
		document.getElementById('map').innerHTML = floor4embed;
	};
	
}

function setMap() {
	
	//create the map and set its initial view
	map = L.map('map', {minZoom: 6}).setView([43.0747,-89.3842], 20); //[center lat, center lon], zoom
	

	
	setOperators();
	
	
}

function setOperators(){
	//listeners for buttons added to the webpage
	
	$("#resetZoom").click(function () {
		resetZoom ();
	});
}


function resetZoom () {
	map.setView([43.0747,-89.3842], 19);
}
