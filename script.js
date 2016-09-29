/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";

	/* global google: false */
	
	/*-------------------------------------------------*/
	/* =  Banner slider
	/*-------------------------------------------------*/

	var sliderBanner = $('.bxslider');
	try{		
		sliderBanner.bxSlider({
			auto: true,
			mode: 'vertical'
		});
	} catch(err) {
	}

	/*-------------------------------------------------*/
	/* =  Scroll to TOP
	/*-------------------------------------------------*/

	var scrollTopElem = $('a.go-to-top'),
		htmlBody = $('html, body');


	scrollTopElem.click(function(){
		htmlBody.animate({scrollTop: 0}, 'slow');
		return false;
	});






	/* ---------------------------------------------------------------------- */
	/*	accordion
	/* ---------------------------------------------------------------------- */
		try {
			var tabContent = $("#tabs");
			tabContent.tabs();
		} catch(err) {

		}

		var acordDivHide = $('.accordion div'),
			acordHeadClick = $('.accordion h2');


		acordDivHide.addClass('hide');

		acordHeadClick.on('click', function() {
			var $this = $(this);
			
			if ( !$this.hasClass('active')) {
			acordHeadClick.removeClass('active');
			$this
				.addClass('active')
				.next()
					.slideDown(300)
					.siblings('.accordion div')
						.slideUp(300);
			}
			else {
				$(this).removeClass('active')
						.next()
						.slideUp(300);
			}
		});



	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});


	/* ---------------------------------------------------------------------- */
	/*	Slitslider
	/* ---------------------------------------------------------------------- */
	try{
		slitslider();
	} catch(err) {
	}
	
	winDow.bind('resize', function(){
		try{
			slitslider();			
		} catch(err) {
		}
	});
});

function slitslider() {
	"use strict";

	var Page = (function() {

			var $navArrows = $( '#nav-arrows' ),
				$nav = $( '#nav-dots > span' ),
				slitslider = $( '#slider' ).slitslider( {
					onBeforeChange : function( slide, pos ) {

						$nav.removeClass( 'nav-dot-current' );
						$nav.eq( pos ).addClass( 'nav-dot-current' );
					}
				} ),
				init = function() {
					initEvents();
				},
				initEvents = function() {
					// add navigation events
					$navArrows.children( ':last' ).on( 'click', function() {
						slitslider.next();
						return false;
					} );
					$navArrows.children( ':first' ).on( 'click', function() {
						slitslider.previous();
						return false;
					} );
					$nav.each( function( i ) {
						$( this ).on( 'click', function() {
							var $dot = $( this );
							if( !slitslider.isActive() ) {
								$nav.removeClass( 'nav-dot-current' );
								$dot.addClass( 'nav-dot-current' );
							}
							slitslider.jump( i + 1 );
							return false;
						} );
					} );
				};
			return { init : init };
		})();
		Page.init();

}