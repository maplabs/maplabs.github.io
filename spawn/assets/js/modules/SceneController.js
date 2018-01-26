define([
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/layers/SceneLayer",
    "esri/tasks/support/Query",
    "dojo/domReady!"
  ], function(WebScene, SceneView, FeatureLayer, SceneLayer, Query) {


    //Constructor for a new MapController
    var SceneController = function (viewDiv){
        this.viewDiv = viewDiv;
        var view;
    }
    
    //Builds the default map
    SceneController.prototype.buildScene = function(){
        var that = this;

        // Create the web scene
        var map = new WebScene({
            portalItem: {
                id: "5fc6fb0e4fe445baa203eeff93902a58"
              }
        });

        // Create the view
        that.view = new SceneView({
            container: "viewDiv",
            map: map,
            
            environment: {
                lighting: {
                date: new Date("June 15, 2015 19:00:00 GMT"),
                directShadowsEnabled: true,
                ambientOcclusionEnabled: true
                },
                atmosphere:{
                    quality: "high"
                }
            }
        });
    }

    SceneController.prototype.getView = function(){
        return this.view;
    }

    return {
        SceneController: SceneController
        
    };
});