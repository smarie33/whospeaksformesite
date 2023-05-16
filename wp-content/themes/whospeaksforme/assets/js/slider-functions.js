/* slick slider functions */

(function($) {
	$('.acf-slider-area').slick({
	  centerMode: true,
	  centerPadding: '400px',
	  slidesToShow: 1,
	  responsive: [
	  	{
	      breakpoint: 1490,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '300px',
	        slidesToShow: 1
	      }
	    },
	    {
	      breakpoint: 1330,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '200px',
	        slidesToShow: 1
	      }
	    },
	    {
	      breakpoint: 1150,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '125px',
	        slidesToShow: 1
	      }
	    },
	    {
	      breakpoint: 980,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '50px',
	        slidesToShow: 1
	      }
	    },
	    {
	      breakpoint: 768,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '0',
	        slidesToShow: 1
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 1
	      }
	    }
	  ]
	});
})( jQuery );