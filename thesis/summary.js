function displayTechDetails(techSummary){
   var detailsDiv = document.getElementById("tech_details");
  
    detailsDiv.innerHTML = "<h2>"+techSummary.title+"</h2><br><p>details about "+techSummary.uses+" this tech...</p>";
    
}

//json of 
var printSummary = {"title":"Print Maps", 
            "uses":"fy", 
             "advantages":"d",
              "suggestions":"hdg",
              "notes":"shy"
             };

    GPSSummary = {"title":"GPS devices", 
             "uses":"fj", 
            "advantages":"styj",
              "suggestions":"fhk",
              "notes":"dfr"
             };
 
