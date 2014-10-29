//global variables
var map; //map object
var currentFloor = 0; //variable to determine the floor displayed on the map
var currentVector = floor0vector;
var displayedVector;

var floorBtile = 'carolinerose.hmoh3m0b';
var floor0tile = 'carolinerose.hmok6jga';
var floor1tile = 'carolinerose.hmop8bme';
var floor2tile = 'carolinerose.hmp0d9bh';
var floor3tile = 'carolinerose.hmp1b275';
var floor4tile = 'carolinerose.hmp1g40c';


//move to front function
d3.selection.prototype.moveToFront = function() {
	return this.each(function(){
		this.parentNode.appendChild(this);
	});
};

window.onload = initialize();

//the first function called once the html is loaded
function initialize(){
	setMap();
	setProfile();
	
} 

function setMap() {  //called by initialize function

	//create the map and set its initial view
	//start on the ground floor.
	map = L.mapbox.map('map', 'carolinerose.hmok6jga',{minZoom: 16})
		.setView([43.0746,-89.3842], 20);

		
	// add functionality for reset zoom button	
	//setOperators();


	//add the json overlay to the map
	leafJSON(map);

} //end setMap function


function leafJSON(map){

	//add the json overlay to the map
	console.log("add geoJSON");
	console.log(currentVector);
	
	
	//default style is invisible
	var defaultStyle = {
			color: "none",
			fillColor: "#424242",
            fillOpacity: 0.0
		};
	
	var highlightStyle = {
		fillColor: '#000000', //black
		fillOpacity: 0.5
	};
	
	displayedVector = L.geoJson(currentVector, {
		style: defaultStyle,
		onEachFeature: function (feature, layer){
				
				layer.on("mouseover", function() {
					layer.setStyle(highlightStyle);
					highlight(feature);
					
				});
				layer.on("mouseout", function(){
					layer.setStyle(defaultStyle);
					dehighlight(feature);
				});
				layer.on("mousemove", function(){
					moveLabel (feature);
				});
				
		} //ends onEachFeature
				
	}).addTo(map);
	
		


} //close leafJSON function

function highlight(feature){

	var labelText = String(feature.properties.label);
//	console.log(labelText);
	if (labelText != "null"){
		var infolabel = d3.select("body").append("div") 
			.attr("class","infolabel") //class for styling label 
			.attr("id", labelText+"label") //id for label div
			.html(labelText); //add text 
	};
	if (feature.properties.photoLink){
//		var photoLink = "<img src="+String(feature.properties.photoLink)+' alt='+String(labelText)+"/>";
		
		var photo = document.createElement("img");
			photo.setAttribute("src", String(feature.properties.photoLink));
			//photo.setAttribute("width", "70");
			photo.setAttribute("class", "infoWindowPhoto");
			photo.setAttribute("alt",String(feature.properties.label));
		
		document.getElementById(labelText+"label").appendChild(photo);

	}
} //close highlight function

function dehighlight(feature){

	//remove the information label
	labelID = String(feature.properties.label+"label");

	infoLabel = document.getElementById(labelID);
	d3.select(infoLabel).remove();

}

function moveLabel(feature) {
	

	console.log("move label");
	
/*	var xMouse;
	var yMouse;
	
	document.getElementById('map').onmouseover = function(evt) {
		var xMouse = evt.clientX;
		var yMouse = evt.clientY;
		console.log("coords: "+xMouse+", "+yMouse);
	} */

//	var x=event.clientX;
//	var y=event.clientY;
//	console.log("X coords: " + x + ", Y coords: " + y);
  
//	var coordinates = [0, 0];
//	coordinates = d3.mouse(this);
//	console.log(coordinates);
//	var x = coordinates[0];
	
//	var xPosition = d3.event.clientX+20; //horizontal label coordinate 
//	var yPosition = d3.event.clientY-15; //vertical label coordinate 
	
//	var divID = String("#"+feature.properties.label+"label");
//	console.log(divID);


/*	labelID = String(feature.properties.label+"label");
	
	infoLabel = document.getElementById(labelID);
	
	d3.select(infoLabel) //select the label div for moving 
		.style("left", xMouse+"px") //reposition label horizontal 
		.style("top", yMouse+"px"); //reposition label vertical
*/		

}; //end moveLabel function

/* example code from #Sandy
//retrieve and process topojson file containing hexagons
	d3.json("data/hexagons_topo.json", function(error, NYC) { 
		
		//grab all the hexagons in the json
		jsonHexes = NYC.objects.hexagons.geometries;
		
		//add shape below basemap to show water
		var water = map.append("rect") //create rectangle element 
			.attr("width","840px")
			.attr("height","1020px") 
			.attr("x","20px") //pixels from the left side
			.attr("y","27px") //pixels from the top 
			.attr("class", "water") //class for styling
			.style("fill", "#001C1D");

		//add hexagons to the map
		var hexagons = map.selectAll(".hexbins")
			.data(topojson.object(NYC, 
						NYC.objects.hexagons).geometries) 
			.enter()
			.append("path") 
			.attr("class", "hexbins") //class name for styling
			.style("fill", "black")
			.style("stroke", "#444444") //stroke is grey 
			.attr("d", path) //project data as geometry in svg
			.on("mouseover", function (d){
				highlight(this, d);
			})
			.on("mouseout", function (d){
				dehighlight(this, d);
			})
			.on("mousemove", moveLabel)
			; 
	}); //end d3.json function for hexagons
*/

function setProfile(){  //called by initialize function
	d3.xml('images/capitol_profile.svg', "image/svg+xml", function(xml) {
		var profile = document.getElementById("profile");
		profile.appendChild(xml.documentElement).id = "profileSVG";

		var basementFloor = document.getElementById("basement");
		var groundFloor = document.getElementById("ground");
		var firstFloor = document.getElementById("first_1_");
		var secondFloor = document.getElementById("second");
		var thirdFloor = document.getElementById("third");
		var fourthFloor = document.getElementById("fourth");
		
		
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
			floorSet(currentFloor, -1);
			
			basementFloor.style.stroke="red";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="black";
		});
		$(groundFloor).click(function () {
			floorSet(currentFloor, 0);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="red";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="black";
		});
		$(firstFloor).click(function () {
			floorSet(currentFloor, 1);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="red";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="black";
		});
		$(secondFloor).click(function () {
			floorSet(currentFloor, 2);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="red";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="black";
		});
		$(thirdFloor).click(function () {
			floorSet(currentFloor, 3);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="red";
			fourthFloor.style.stroke="black";
		});
		$(fourthFloor).click(function () {
			floorSet(currentFloor, 4);
			
			basementFloor.style.stroke="black";
			groundFloor.style.stroke="black";
			firstFloor.style.stroke="black";
			secondFloor.style.stroke="black";
			thirdFloor.style.stroke="black";
			fourthFloor.style.stroke="red";
		});
		
	});

} //end setProfile function


function floorSet (currentFloor, newFloor){ 
	//accepts an integer from -1 to 4 to determine which floor to display and which to stop displaying.. may not need to 'stop/remove' previous layer...
	console.log("remove floor ", currentFloor);
	console.log("display floor ", newFloor);
	
	//reset the currentFloor variable
	//currentFloor = newFloor;
	
//	map.removeLayer(currentFloor);
	
	if (newFloor == -1){
		document.getElementById('floorLabel').innerHTML = '<p>now viewing: <br/><span class="bold15em">Basement</span></p>';
		map.addLayer(L.mapbox.tileLayer(floorBtile));
		
		//remove the currently displayed json:
		map.removeLayer(displayedVector);
		//reset the vector geojson variable
		currentVector = floorBvector;
		//add the json overlay to the map
		leafJSON(map);
		
		//reset the currentFloor variable
		currentFloor = -1;
	};
	if (newFloor == 0){
		document.getElementById('floorLabel').innerHTML = '<p>now viewing: <br/><span class="bold15em">Ground <br/>Floor</span></p>';
		map.addLayer(L.mapbox.tileLayer(floor0tile));
		
		//remove the currently displayed json:
		map.removeLayer(displayedVector);
		//reset the vector geojson layer
		currentVector = floor0vector;
		//add the json overlay to the map
		leafJSON(map);
		
		//reset the currentFloor variable
		currentFloor = 0;
	};
	if (newFloor == 1){
		document.getElementById('floorLabel').innerHTML = '<p>now viewing: <br/><span class="bold15em">First<br/>Floor</span></p>';
		map.addLayer(L.mapbox.tileLayer(floor1tile));
		
		//remove the currently displayed json:
		map.removeLayer(displayedVector);
		//reset the vector geojson layer
		currentVector = floor1vector;
		//add the json overlay to the map
		leafJSON(map);
		
		//reset the currentFloor variable
		currentFloor = 1;
	};
	if (newFloor == 2){
		document.getElementById('floorLabel').innerHTML = '<p>now viewing: <br/><span class="bold15em">Second <br/>Floor</span></p>';
		map.addLayer(L.mapbox.tileLayer(floor2tile));
		
		//remove the currently displayed json:
		map.removeLayer(displayedVector);
		//reset the vector geojson layer
		currentVector = floor2vector;
		//add the json overlay to the map
		leafJSON(map);
		
		//reset the currentFloor variable
		currentFloor = 2;
	};
	if (newFloor == 3){
		document.getElementById('floorLabel').innerHTML = '<p>now viewing: <br/><span class="bold15em">Third <br/>Floor</span></p>';
		map.addLayer(L.mapbox.tileLayer(floor3tile));
		
		//remove the currently displayed json:
		map.removeLayer(displayedVector);
		//reset the vector geojson layer
		currentVector = floor3vector;
		//add the json overlay to the map
		leafJSON(map);
		
		//reset the currentFloor variable
		currentFloor = 3;
	};
	if (newFloor == 4){
		document.getElementById('floorLabel').innerHTML = '<p>now viewing: <br/><span class="bold15em">Fourth <br/>Floor</span></p>';
		map.addLayer(L.mapbox.tileLayer(floor4tile));
		
		//remove the currently displayed json:
		map.removeLayer(displayedVector);
		//reset the vector geojson layer
		currentVector = floor4vector;
		//add the json overlay to the map
		leafJSON(map);
		
		//reset the currentFloor variable
		currentFloor = 4;
	};
} //end floorSet function

function setOperators(){ //called by the setMap function
	//listeners for buttons added to the webpage
	
	$("#resetZoom").click(function () {
		resetZoom ();
	});
}

//not currently implemented. 
function resetZoom () {
	map.setView([43.0747,-89.3842], 20);
}
