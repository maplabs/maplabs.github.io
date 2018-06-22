$(function() {

	var div = $(".slider");
	//Setup each of the sliders with properties and functions
	div.each(function () {
		$(this).slider({
			value: 0,
			min: $(this).data("minval"),
			max: $(this).data("maxval"),
			step: $(this).data("stepval"),
			value: $(this).data("editvalue"),
			
			//When the user moves the slider (during adjustment):
			slide: function (event, ui) {
				$(this).data("editvalue", ui.value);
				$(this).parent().find('label > span').html(ui.value);
				var ss = '';
				//Check to see whether the slider is the hue rotate or not as this has a different format
				$('.slider-holder').each(function(){								
					if($(this).attr('id') === 'hue-rotate') {
						ss += " " + $(this).attr('id') + "(" + $(this).find('.slider').data('editvalue')+"deg)";
					} else {
						ss += " " + $(this).attr('id') + "(" + $(this).find('.slider').data('editvalue')+")";
					}
				});							
				//console.log(ss);
				$('[id*="_container"]').css("-webkit-filter",ss);
				// Make the relevant CSS available to the user 
				$('#output').html('<h3>CSS output</h3><code>[id*="_container"] {<br />-webkit-filter: \n'+ ss +';<br />}</code>');
			},
			
			//When the user lets go of the slider (final position):
			stop: function (event, ui) {
				$(this).data("editvalue", ui.value);
				var ss = '';							
				$('.slider-holder').each(function(){								
					if($(this).attr('id') === 'hue-rotate') {
						ss += " " + $(this).attr('id') + "(" + $(this).find('.slider').data('editvalue')+"deg)";
					} else {
						ss += " " + $(this).attr('id') + "(" + $(this).find('.slider').data('editvalue')+")";
					}
				});							
				//console.log(ss);
				$('[id*="_container"]').css("-webkit-filter",ss);
				$('#output').html('<h3>CSS output</h3><code>[id*="_container"] {<br />-webkit-filter: \n'+ ss +';<br />}</code>');
			}
		});
	});
	
	// Custom filter menu
	$('#adv-menu').sidr({
		side: 'right',
		onOpen: function() {
			$('#switcher-list').fadeOut();
			$('body').removeClass();
		},
		onClose: function() {
			$('#switcher-list').fadeIn();
			reset();
		}
	});

	$('#switcher-list a').click(function(e){
		e.preventDefault();
		var title = $(this).attr("title");
		$('#switcher-list a').removeClass("active");
		$(this).addClass("active");
		$('body').removeClass().addClass(title);
	});

	$('#reset').click(function(e){
		e.preventDefault();
		reset();
	});
	
	// reset all of the UI and data values to their defaults
	function reset() {
		$('#map_container').css("-webkit-filter", "");
		$("#grayscale .slider").slider('value',0);
		$("#grayscale .slider").data('editvalue',0);
		$("#grayscale label span").html("0");
		$("#sepia .slider").slider('value',0);
		$("#sepia .slider").data('editvalue',0);
		$("#sepia label span").html("0");
		$("#saturate .slider").slider('value',1);
		$("#saturate .slider").data('editvalue',1);
		$("#saturate label span").html("1");
		$("#hue-rotate .slider").slider('value',0);
		$("#hue-rotate .slider").data('editvalue',0);
		$("#hue-rotate label span").html("0");
		$("#invert .slider").slider('value',0);
		$("#invert .slider").data('editvalue',0);
		$("#invert label span").html("0");
		$("#opacity .slider").slider('value',1);
		$("#opacity .slider").data('editvalue',1);
		$("#brightness label span").html("1");
		$("#brightness .slider").slider('value',1);
		$("#brightness .slider").data('editvalue',1);
		$("#brightness label span").html("1");
		$("#contrast .slider").slider('value',1);
		$("#contrast .slider").data('editvalue',1);
		$("#contrast label span").html("1");

		$('#output').html('<h3>CSS output</h3><code>[id*="_container"] {<br />-webkit-filter: grayscale(0) sepia(0) saturate(1) hue-rotate(0deg) invert(0) opacity(1) brightness(1) contrast(1);<br />}</code>');
	}

});