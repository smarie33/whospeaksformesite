/* ACF js for admin area */

(function($) {

	let eachColor = new Array();

	//limit acf color pallete
	acf.add_filter('color_picker_args', function( args, field ){
	      args.palettes = ['#CA2162', '#262661', '#ffffff', '#000000', '#f45696', '#353584', '#19193f'];
	      // return colors
	      return args;
	 });

	

	//on page load change wysiwyg background to this color
	acf.add_action('ready', function( $el ){
    
	    // $el will be equivalent to $('body')
	    acf.add_filter('wysiwyg_tinymce_settings', function( mceInit, id, field ){

			let parent = $(this).parents('.acf-field');
			//let color = parent.prev().find('.acf-color-picker input').val();
			if(field.prev().attr('data-type') == 'color_picker'){
				//let assocColor = field.prev().find('.acf-input input').val();
				let fullcolor = field.prev().find('.acf-input input').val();
				let onlyHex = fullcolor.split('#')[1];
				eachColor[id] = onlyHex;
				let addClass = 'bgcolor-'+onlyHex;
				mceInit.body_class = mceInit.body_class + ' ' + addClass

			}

		    return mceInit;

		});
	    	    
	});

	//on pallette change, change wysiwyg background to this color

})(jQuery);