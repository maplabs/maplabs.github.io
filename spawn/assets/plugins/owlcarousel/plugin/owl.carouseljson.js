/**
 * Owl Carousel JSON load plugin
 * @since 2.0.0
 * @author maksbd19 
 * @link http://stackoverflow.com/questions/35838983/
 */

;(function ( $, window, document, undefined ) {

    var Insatances =  undefined;

    var JSONload = function(carousel){

    this._core = carousel;

    this.options = {};

    this._handlers = {
        'initialized.owl.carousel': $.proxy(function(e) {
            if (!e.namespace || !this._core.settings || !this._core.settings.path) {
                return;
            }

            Insatances = Insatances || [];

            if( !pathExists(this._core.settings.path, Instances) ){
                Instances.push({
                    path: this._core.settings.path,
                    onSuccess: this._core.settings.onSuccess,
                    onError: this._core.settings.onError,
                    loading: false
                });
            }

            for( var i in Instances ){
                if( Instances.hasOwnProperty(i) && Instances[i].path != '' && !Instances[i].loading ){

                    Instances[i].loading = true;

                    $.getJSON(Instances[i].path, $.proxy(function (data) {
                        if (typeof Instances[i].onSuccess === "function") {
                            Instances[i].onSuccess.call(this, data);
                        }
                    }, this)).fail($.proxy(function (data) {
                        if (typeof Instances[i].onError === "function") {
                            Instances[i].onError.apply(this, [data]);
                        }
                    }, this));
                }
            }

            function pathExists(path, instance){
                if(instance.length == 0){
                    return false;
                }
                for( var i=0; i<instance.length; i++ ){
                    if( instance[i].path == path ){
                        return true;
                    }
                }

                return false;
            }

        }, this)
    };

    this.options = $.extend(JSONload.Defaults, this._core.options);
    this._core.$element.on(this._handlers);
}

JSONload.Defaults = {
    path: '',
    onSuccess:'',
    onError:''
};

$.fn.owlCarousel.Constructor.Plugins['JSONload'] = JSONload;
})( window.Zepto || window.jQuery, window,  document );