function displayTechDetails(techSummary){
   var detailsDiv = document.getElementById("tech_details");
  
    detailsDiv.innerHTML = "<h2>"+techSummary.title+"</h2><br><p>details about current uses: "+techSummary.uses+"<br><table><tr><td></td></tr></table> </p>";
    
}

//json of 
var printSummary = {"title":"Print Maps", 
            "uses":"uses of print...", 
             "advantages":"d",
              "suggestions":"hdg",
              "notes":"shy"
             };

  var  GPSSummary = {"title":"GPS devices", 
             "uses":"fj", 
            "advantages":"styj",
              "suggestions":"fhk",
              "notes":"dfr"
             };
 
var GISSummary = {"title":"GIS Software", 
             "uses":"fj", 
            "advantages":"styj",
              "suggestions":"fhk",
              "notes":"Search organizations that use GIS software tend to rely on specific people with the expertise to use it."
             };

