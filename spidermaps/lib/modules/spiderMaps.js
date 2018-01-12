define([
    "esri/Map",
    "esri/views/MapView", 
    "esri/geometry/Polyline",
    "esri/geometry/Point",
    "esri/geometry/geometryEngine",
    "esri/symbols/SimpleLineSymbol",
    "esri/layers/FeatureLayer", 
    "esri/Graphic",
    ], function(Map, MapView, Polyline, Point, geometryEngine, SimpleLineSymbol, FeatureLayer, Graphic){

    var creatingLegs = function(view, startPointLongLatt, FLname, lineSymbol, geodesic, quality) {
        
        var qualityNum = 1000
                
        if (quality === "ultra"){
            qualityNum = 500
        } else if (quality === "high"){
            qualityNum = 1000
        } else if (quality === "medium"){
            qualityNum = 10000
        } else if (quality === "low"){
            qualityNum = 100000
        } else if (quality === "super-low"){
            qualityNum = 1000000
        }
         
        FLname.queryFeatures().then(function(results) {
            pointsOnMap = results.features
            loopThroughArray();
        });
        
        function loopThroughArray() {
            for (i = 0; i < pointsOnMap.length; i++) {
                Createline(startPointLongLatt, [pointsOnMap[i].geometry.longitude, pointsOnMap[i].geometry.latitude])
            }
        }

        function Createline(startCoords, endCoords) {
            var polyline = new Polyline({
                paths: [
                    startCoords,
                    endCoords
                ]
            });

            if (geodesic === true){
                 polyline = geometryEngine.geodesicDensify(polyline, qualityNum);
            }

            var polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
            })

            view.graphics.add(polylineGraphic)       
        }     
    }
    
    function updating(view, startPointLongLatt, FLname, lineSymbol, geodesic, quality){
        var qualityNum = 1000

        if (quality === "ultra"){
            qualityNum = 500
        } else if (quality === "high"){
            qualityNum = 1000
        } else if (quality === "medium"){
            qualityNum = 10000
        } else if (quality === "low"){
            qualityNum = 100000
        } else if (quality === "super-low"){
            qualityNum = 1000000
        }
        
    
        FLname.queryFeatures().then(function(results) {
            pointsOnMap = results.features
            loopThroughArray();
        });

        function loopThroughArray() {
            for (i = 0; i < pointsOnMap.length; i++) {
                Createline(startPointLongLatt, [pointsOnMap[i].geometry.longitude, pointsOnMap[i].geometry.latitude])
            }
        }
        view.graphics.removeAll()

        function Createline(startCoords, endCoords) {
            var polyline = new Polyline({
                paths: [
                    startCoords,
                    endCoords
                ]
            });

            if (geodesic === true){
                 polyline = geometryEngine.geodesicDensify(polyline, qualityNum);
            }

            var polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
            })

            view.graphics.add(polylineGraphic)       
        }     
    }
    
        return {
            create: creatingLegs,
            update: updating
        };
   
});





