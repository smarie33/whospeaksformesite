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

	    	mceInit.toolbar1 = 'fontsizeselect,'+ mceInit.toolbar1;
	    	mceInit.fontsize_formats = '9px 10px 12px 13px 14px 16px 18px 21px 24px 28px 32px 36px 38px 40px 42px 44px 46px 48px 50px 52px 54px 58px 60px 62px';

	    	// if(field.parents('.layout').attr('data-layout') == 'two_columns'){
	    	// 	let fullcolor = field.next().find('.acf-input input').val();
	    	// 	let onlyHex = fullcolor.split('#')[1];
			// 	eachColor[id] = onlyHex;
			// 	let addClass = 'bgcolor-'+onlyHex;
			// 	mceInit.body_class = mceInit.body_class + ' ' + addClass
	    	// }else{
				let allSibs = field.siblings();
				allSibs.each(function() {
					let t = $(this);
					if(t.hasClass('acf-field-color-picker')){
						let fullcolor = t.find('.acf-input input').val();
						let onlyHex = fullcolor.split('#')[1];
						eachColor[id] = onlyHex;
						let addClass = 'bgcolor-'+onlyHex;
						mceInit.body_class = mceInit.body_class + ' ' + addClass
						return false;
					}
				})
			//} 

		    return mceInit;

		});
	    	    
	});

	//on pallette change, change wysiwyg background to this color

})(jQuery);