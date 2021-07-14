{   
   
   function createMap(earthQuakes) {
    
        // Create the tile layer that will be the background of our map
        var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "light-v10",
            accessToken: API_KEY
        });

        // Create a baseMaps object to hold the lightmap layer
        var baseMaps = {
            "Light Map": lightmap
        };
        
        //Create an overlayMaps object to hold the earthQuakes
        var overlayMaps = {
            "Earth Quakes": earthQuakes
        };
    
        // Create the map object with options
        var map = L.map("map", {
            center: [19.8097343, -98.5556199],
            zoom: 3,
            layers: [lightmap, earthQuakes]
        })

        // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(map);


    }

 

    function createMarkers(response) {

        // Pull the features from url
        var locations = response.features;
        console.log(locations)

        // Initialize an array to hold markers
        var quakeMarkers = [];
        
        // Loop through the array
        for (var index = 0; index < locations.length; index++) {
            var location = locations[index];
            var r = location.properties.mag
            console.log(r)
                //scale for colors of magnitude
                function getColor(r) {
                    return r >= 6 ? '#B22222' :
                    r >= 5 ? '#FF0000' :
                    r >= 4 ? '#FF8C00' :
                    r >= 3 ? '#FFA500' :
                    r >= 2 ? '#FFFF00' :
                    '#32CD32';
                }
            
            //create markers
            var quakeMarker = L.circleMarker([location.geometry.coordinates[1], location.geometry.coordinates[0]],{radius: location.properties.mag * 2, color: getColor(location.properties.mag), fillcolor: getColor(location.properties.mag), fillOpacity: .7})
            console.log(quakeMarker)

            quakeMarkers.push(quakeMarker);

            //Popup with more information
            quakeMarker.bindPopup("Information: " + location.properties.title);
            
        }
            


        
    createMap(L.layerGroup(quakeMarkers));

    }

 
 

    //EARTHQUAKE URL
    d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson').then(createMarkers);



}   