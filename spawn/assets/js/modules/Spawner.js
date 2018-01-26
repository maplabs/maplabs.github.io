define([
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/symbols/WebStyleSymbol"
], function(GraphicsLayer, Graphic, WebStyleSymbol) {

    var clickCount = 0
    var cachedY
    var cachedX
    var styleName = "EsriRealisticSignsandSignalsStyle"
    var mainName = "Campfire"

    //Constructor for a new MapController
    var Spawner = function() {

        $(document).on('click', '.owl-item', function() {

            mainName = $(this).context.children[0].childNodes[2].innerText
            styleName = $(this).context.children[0].childNodes[3].innerText
            var $this = $(this);
			$(".owl-item").removeClass("clicked");
			$this.addClass('clicked');
        });

    }

    //Builds the default map
    Spawner.prototype.spawn = function(event, view) {
        var that = this;
        clickCount++

        cachedY = event.y
        cachedX = event.x

        view.hitTest(event)

        .then(function(response) {
            spawnObject(response.results[0].mapPoint.longitude, response.results[0].mapPoint.latitude, clickCount)
        })

        function spawnObject(long, lat, clickCount) {

            var point = {
                type: "point",
                longitude: long,
                latitude: lat
            };

            var webStyleSymbol = {
                type: "web-style",
                name: mainName,
                portal: {
                    url: "https://www.arcgis.com"
                },
                styleName: styleName
            };


            var pointGraphic = new Graphic({
                geometry: point,
                symbol: webStyleSymbol
            });

            view.graphics.add(pointGraphic);

            pointGraphic.symbol.fetchSymbol().then(function(newLayer) {
                
                newLayer.symbolLayers.items[0].heading = 360 * Math.random()
                
                pointGraphic.symbol = newLayer

                var pointGraphicNew = new Graphic({
                    geometry: point,
                    symbol: newLayer
                });
                
                view.graphics.add(pointGraphicNew)
            })

            view.graphics.remove(pointGraphic)
        }
    }
    
    //Stuff to make public
    return {
        Spawner: Spawner
    };
});