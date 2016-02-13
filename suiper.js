
$(document).ready(function () {

	function loadData(){
		var url = 'http://localhost:8000/data.json';
		$.ajax({
			url: url,
			dataType: 'json',
			success: function(data){
				// console.log('Success', data);
				$.each( data, function (i, val){
					var slide = '<div class="swiper-slide" data-hash="slide'+i+'" id="swiper-slide5"> \
									<!-- begin slider vertical --> \
									<div class="swiper-container swiper-container-v"> \
										<div class="swiper-wrapper"> \
											<div class="swiper-slide swiper-slide-head" style="background-color:'+val.color+'"> \
												<h1>'+val.title+'</h1> \
											</div> \
											<div class="swiper-slide"> \
												<!-- begin slider scroll --> \
												<div class="swiper-container swiper-container-scroll"> \
													<div class="swiper-wrapper"> \
														<div class="swiper-slide swiper-slide-body"> \
															'+val.body+' \
														</div> \
													</div> \
													<!-- scroll bar --> \
													<div class="swiper-scrollbar"></div> \
												</div> \
												<!-- end slider scroll --> \
											</div> \
										</div> \
									</div> \
									<!-- end slider vertical --> \
								</div>';
					// $('#last-slide').before(slide);

					$(slide).appendTo('.swiper-container-h > .swiper-wrapper');
				});
			},
		    error: function (request, status, error){
		    	console.log('Error', error);
		    },
		    complete: function(){
		    	// console.log('Complete');
		    	initColors();
		    	initSwipers();
				initTextFill();
		    }
		});
	}

	var rainbow = new Rainbow(); // by default, range is 0 to 100

	function initColors(){

		var colors = [];
//		$("[data-hash]").each(function(n){
		$(".swiper-slide-head").each(function(n){
			colors[n] = rgbToHex($(this).css('backgroundColor'));
			$(this).css('background-color', '');
		});
		rainbow.setSpectrumByArray(colors);
	}

	function initSwipers(){

		var swiperH = new Swiper('.swiper-container-h', {
			spaceBetween: 0,
			keyboardControl:true,
			mousewheelControl: false,
			hashnav: true,
			grabCursor: true,
			onInit(swiper){
				$('body').css('background-color', '#' + rainbow.colourAt(swiper.progress*100) );
			},
			onTouchMove(swiper, event){
				$('body').css('background-color', '#' + rainbow.colourAt(swiper.progress*100) );
			},			
			onTransitionStart(swiper){
				$('body').stop(); // stop any running anims
				$('body').animate({ backgroundColor: '#'+rainbow.colourAt(swiper.progress*100) }, swiper.speed);
			}
		}); 

		// http://www.idangero.us/swiper/forum/#!/questions:any-idea-if-this-can-be-mad
		$('.swiper-container-v').each(function () {
			var swiperV = new Swiper(this, {
				direction: 'vertical',
				spaceBetween: 0,
				keyboardControl:true,
				mousewheelControl: false,
				resistanceRatio: 0 // disable resistance at bounds
			});

		});
		$('.swiper-container-scroll').each(function () {
			var swiperScroll = new Swiper(this, {
				direction: 'vertical',
				spaceBetween: 0,
				keyboardControl:false,
				mousewheelControl: true,
				freeMode: true,
				slidesPerView: 'auto',
				nested: true,
				resistanceRatio: 0 , // disable resistance at bounds
				scrollbar: $(this).find('.swiper-scrollbar')[0]
			});
		});

	}

	function initTextFill(){
		$('.swiper-slide-head').textfill({
			maxFontPixels: 120,
			innerTag: "h1"
		});
	}

	$(window).on('resize', function(){
		initTextFill();
	});

	loadData();

	function rgbToHex(rgb) {
	    var parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	    delete(parts[0]);
	    for (var i = 1; i <= 3; ++i) {
	        parts[i] = parseInt(parts[i]).toString(16);
	        if (parts[i].length == 1) parts[i] = '0' + parts[i];
	    }
	    color = '#' + parts.join('');
	    return color;
	}

	function hexToRgb(hex) {
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	        return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}


});