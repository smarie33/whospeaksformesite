 /**
 * File primary-navigation.js.
 *
 * Required to open and close the mobile navigation.
 */

/**
 * Toggle an attribute's value
 *
 * @since Twenty Twenty-One 1.0
 *
 * @param {Element} el - The element.
 * @param {boolean} withListeners - Whether we want to add/remove listeners or not.
 */
function twentytwentyoneToggleAriaExpanded( el, withListeners ) {
	if ( 'true' !== el.getAttribute( 'aria-expanded' ) ) {
		el.setAttribute( 'aria-expanded', 'true' );
		twentytwentyoneSubmenuPosition( el.parentElement );
		if ( withListeners ) {
			document.addEventListener( 'click', twentytwentyoneCollapseMenuOnClickOutside );
		}
	} else {
		el.setAttribute( 'aria-expanded', 'false' );
		if ( withListeners ) {
			document.removeEventListener( 'click', twentytwentyoneCollapseMenuOnClickOutside );
		}
	}
}

function twentytwentyoneCollapseMenuOnClickOutside( event ) {
	if ( ! document.getElementById( 'site-navigation' ).contains( event.target ) ) {
		document.getElementById( 'site-navigation' ).querySelectorAll( '.sub-menu-toggle' ).forEach( function( button ) {
			button.setAttribute( 'aria-expanded', 'false' );
		} );
	}
}

/**
 * Changes the position of submenus so they always fit the screen horizontally.
 *
 * @since Twenty Twenty-One 1.0
 *
 * @param {Element} li - The li element.
 */
function twentytwentyoneSubmenuPosition( li ) {
	var subMenu = li.querySelector( 'ul.sub-menu' ),
		rect,
		right,
		left,
		windowWidth;

	if ( ! subMenu ) {
		return;
	}

	rect = subMenu.getBoundingClientRect();
	right = Math.round( rect.right );
	left = Math.round( rect.left );
	windowWidth = Math.round( window.innerWidth );

	if ( right > windowWidth ) {
		subMenu.classList.add( 'submenu-reposition-right' );
	} else if ( document.body.classList.contains( 'rtl' ) && left < 0 ) {
		subMenu.classList.add( 'submenu-reposition-left' );
	}
}

/**
 * Handle clicks on submenu toggles.
 *
 * @since Twenty Twenty-One 1.0
 *
 * @param {Element} el - The element.
 */
function twentytwentyoneExpandSubMenu( el ) { // jshint ignore:line
	// Close other expanded items.
	el.closest( 'nav' ).querySelectorAll( '.sub-menu-toggle' ).forEach( function( button ) {
		if ( button !== el ) {
			button.setAttribute( 'aria-expanded', 'false' );
		}
	} );

	// Toggle aria-expanded on the button.
	twentytwentyoneToggleAriaExpanded( el, true );

	// On tab-away collapse the menu.
	el.parentNode.querySelectorAll( 'ul > li:last-child > a' ).forEach( function( linkEl ) {
		linkEl.addEventListener( 'blur', function( event ) {
			if ( ! el.parentNode.contains( event.relatedTarget ) ) {
				el.setAttribute( 'aria-expanded', 'false' );
			}
		} );
	} );
}

( function() {
	/**
	 * Menu Toggle Behaviors
	 *
	 * @since Twenty Twenty-One 1.0
	 *
	 * @param {string} id - The ID.
	 */
	var navMenu = function( id ) {
		var wrapper = document.body, // this is the element to which a CSS class is added when a mobile nav menu is open
			mobileButton = document.getElementById( id + '-mobile-menu' ),
			navMenuEl = document.getElementById( 'site-navigation' );

		// If there's no nav menu, none of this is necessary.
		if ( ! navMenuEl ) {
			return;
		}

		if ( mobileButton ) {
			mobileButton.onclick = function() {
				wrapper.classList.toggle( id + '-navigation-open' );
				wrapper.classList.toggle( 'lock-scrolling' );
				twentytwentyoneToggleAriaExpanded( mobileButton );
				mobileButton.focus();
			};
		}

		/**
		 * Trap keyboard navigation in the menu modal.
		 * Adapted from Twenty Twenty.
		 *
		 * @since Twenty Twenty-One 1.0
		 */
		document.addEventListener( 'keydown', function( event ) {
			var modal, elements, selectors, lastEl, firstEl, activeEl, tabKey, shiftKey, escKey;
			if ( ! wrapper.classList.contains( id + '-navigation-open' ) ) {
				return;
			}

			modal = document.querySelector( '.' + id + '-navigation' );
			selectors = 'input, a, button';
			elements = modal.querySelectorAll( selectors );
			elements = Array.prototype.slice.call( elements );
			tabKey = event.keyCode === 9;
			shiftKey = event.shiftKey;
			escKey = event.keyCode === 27;
			activeEl = document.activeElement; // eslint-disable-line @wordpress/no-global-active-element
			lastEl = elements[ elements.length - 1 ];
			firstEl = elements[0];

			if ( escKey ) {
				event.preventDefault();
				wrapper.classList.remove( id + '-navigation-open', 'lock-scrolling' );
				twentytwentyoneToggleAriaExpanded( mobileButton );
				mobileButton.focus();
			}

			if ( ! shiftKey && tabKey && lastEl === activeEl ) {
				event.preventDefault();
				firstEl.focus();
			}

			if ( shiftKey && tabKey && firstEl === activeEl ) {
				event.preventDefault();
				lastEl.focus();
			}

			// If there are no elements in the menu, don't move the focus
			if ( tabKey && firstEl === lastEl ) {
				event.preventDefault();
			}
		} );

		/**
		 * Close menu and scroll to anchor when an anchor link is clicked.
		 * Adapted from Twenty Twenty.
		 *
		 * @since Twenty Twenty-One 1.1
		 */
		document.getElementById( 'site-navigation' ).addEventListener( 'click', function( event ) {
			// If target onclick is <a> with # within the href attribute
			if ( event.target.hash ) {
				wrapper.classList.remove( id + '-navigation-open', 'lock-scrolling' );
				twentytwentyoneToggleAriaExpanded( mobileButton );
				// Wait 550 and scroll to the anchor.
				setTimeout(function () {
					var anchor = document.getElementById(event.target.hash.slice(1));
					if ( anchor ) {
						anchor.scrollIntoView();
					}
				}, 550);
			}
		} );

		navMenuEl.querySelectorAll( '.menu-wrapper > .menu-item-has-children' ).forEach( function( li ) {
			li.addEventListener( 'mouseenter', function() {
				this.querySelector( '.sub-menu-toggle' ).setAttribute( 'aria-expanded', 'true' );
				twentytwentyoneSubmenuPosition( li );
			} );
			li.addEventListener( 'mouseleave', function() {
				this.querySelector( '.sub-menu-toggle' ).setAttribute( 'aria-expanded', 'false' );
			} );
		} );

		document.getElementById( 'main-menu-toggle' ).addEventListener( 'click', function( event ) {
			//console.log(event.target);
			if(event.target.classList.contains('menu-active')){
				event.target.classList.remove('menu-active');
				event.target.innerHTML = 'Menu';
				document.getElementById( 'masthead' ).classList.remove('menu-active');
			}else{
				event.target.classList.add('menu-active');
				document.getElementById( 'masthead' ).classList.add('menu-active');
				event.target.innerHTML = 'Close';
			}
		})
	};

	window.addEventListener( 'load', function() {
		new navMenu( 'primary' );
	} );

	let runDemImages = [];

	document.querySelectorAll('.acf-three_columns .column:not(align-bottom) img').forEach( function( disImg ) {
		runDemImages.push(moveImage(disImg));
	})

	function moveImage(curImg){
		let useThis, container, scrollAmt, diff, conStartP;
		useThis = (curImg.parentElement.nodeName == 'figure') ? curImg.parentNode : curImg;
		container = useThis.closest('.column');
		conP = container.getBoundingClientRect();
		diff = container.offsetHeight - useThis.offsetHeight;
		scrollAmt = conP.top + diff;
		if(isInViewport(container)){
			let useP, changeTop;
			useP = useThis.getBoundingClientRect()
			let curPos = conP.top - useP.top;
			if(scrollingDown()){
				changeTop = parseInt(useThis.style.top, 10);
			}else{
				changeTop = parseInt(useThis.style.top, 10);
			}
			if(curPos > -30 && curPos < scrollAmt){
				console.log(changeTop);
				useThis.style.top = changeTop+'px';
			}
		}

	}

	function isInViewport(element){
		var viewportHeight = window.innerHeight;
		var rect = element.getBoundingClientRect();
		var position = rect.top/viewportHeight;
		if (position >= 0 && position <= 1) {
			return true;
		} else {
			return false;
		}
	}

	window.onscroll = function() {
		runDemImages.forEach(function(func){
		     func(); // run your function
		});
	}


	function scrollingDown(){
	  var lastScroll = 0;

	  window.onscroll = function() {
	      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value

	      if (currentScroll > 0 && lastScroll <= currentScroll){
	        lastScroll = currentScroll;
	        return true;
	      }else{
	        lastScroll = currentScroll;
	        return false
	      }
	  };
	}


// function moveImages(curImg){
// 	let useThis;
// 	useThis = (curImg.parentElement.nodeName == 'figure') ? curImg.parentNode : curImg;

// 	var _containerHeight = useThis.closest('.column').offsetHeight;
// 	var _height = useThis.offsetHeight;

// 	newMeasurements = ifResize(_containerHeight, );

// 	var _width, _scrollHeight;
// 	var _movingElements = [];
// 	var _scrollPercent = 0;
// 	var pre = prefix();
// 	var _jsPrefix  = pre.lowercase;
// 	if(_jsPrefix == 'moz') _jsPrefix = 'Moz'
// 	var _cssPrefix = pre.css;
// 	var _positions = []

// 	window.addEventListener('resize', ifResize);
// 	loop();
// }

// function initMovingElements() {
//   for (var i = 0; i < _positions.length; i++) {
//     _positions[i].diff = {
//       percent: _positions[i].end.percent - _positions[i].start.percent,
//       x: _positions[i].end.x - _positions[i].start.x,
//       y: _positions[i].end.y - _positions[i].start.y,
//     }
//     _positions[i].target = {};
//     _positions[i].current = {};
//     var el = document.getElementsByClassName('boy '+_positions[i].name)[0];
//     _movingElements.push(el);
//   }
// }

// function updateElements(p) {
//     if(_scrollPercent <= p.start.percent) {
//       p.target.x = p.start.x*_width;
//       p.target.y = p.start.y*_containerHeight;
//     } else if(_scrollPercent >= p.end.percent) {
//       p.target.x = p.end.x*_width;
//       p.target.y = p.end.y*_containerHeight;
//     } else {
//       p.target.x = p.start.x*_width + (p.diff.x*(_scrollPercent-p.start.percent)/p.diff.percent*_width);
//       p.target.y = p.start.y*_containerHeight + (p.diff.y*(_scrollPercent-p.start.percent)/p.diff.percent*_containerHeight);
//     }
    
//     // lerp
//     if(!p.current.x) {
//       p.current.x = p.target.x;
//       p.current.y = p.target.y;
//     } else {
//       p.current.x = p.current.x + (p.target.x - p.current.x)*0.1;
//       p.current.y = p.current.y + (p.target.y - p.current.y)*0.1;
//     }
//     _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+p.current.x+'px, '+
//         p.current.y+'px, 0px)';
// }



// function loop() {
//   _scrollOffset = window.pageYOffset || window.scrollTop;
//   _scrollPercent = _scrollOffset/_scrollHeight || 0;
//   updateElements();
  
//   requestAnimationFrame(loop);
// }


// function ifResize(containerHeight, height) {
// 	var sh = containerHeight-height;

//   return {
//   	width: window.innerWidth;
//   	height: window.innerHeight;
//   	scrollHeight = sh;
//   }
// }


// /* prefix detection http://davidwalsh.name/vendor-prefix */

// function prefix() {
//   var styles = window.getComputedStyle(document.documentElement, ''),
//     pre = (Array.prototype.slice
//       .call(styles)
//       .join('') 
//       .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
//     )[1],
//     dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
//   return {
//     dom: dom,
//     lowercase: pre,
//     css: '-' + pre + '-',
//     js: pre[0].toUpperCase() + pre.substr(1)
//   };
// }

}() );

// (function($) {

// 	var scrollDirectionDown = true;

// 	$('.acf-three_columns .column:not(align-bottom) img').forEach( function( disImg ) {
// 		moveImages(disImg);
// 	})

// 	function moveImages(disImg){
// 		let useThis;
// 	 	useThis = (disImg.parents('figure').length > 0) ? disImg.parents('figure') : disImg;
// 		let containerHeight = useThis.parents('.column').height;
// 		let disImgHeight = useThis.height;
// 		let scrollAmt = containerHeight - disImgHeight;
// 		$(window).scroll(function(event) {
// 			canUserSeeIt = inViewport(disImg);
// 			//var started = false;
//        		if(canUserSeeIt){
//        			var position = disImg.position();
// 				var pt = position.top;
// 				var curMarg = useThis.outerWidth(true) - useThis.outerWidth();
// 				let newmarg = 0;
//        			if(scrollDirectionDown){
// 					newmarg = curMarg+1;
// 				}else{
// 					newmarg = curMarg-1;
// 				}
// 				if(pt > 0 && pt < scrollAmt){
// 					useThis.css({'margin-top': newmarg+'px'});
// 				}
//        		}
// 		})
// 	}

// 	var scrollPosition = $(window).scrollTop();
//     $(window).scroll(function() {
//         var scroll = $(window).scrollTop();
//         if (scroll > scrollPosition) {
//             scrollDirectionDown = true;
//         } else {
//            scrollDirectionDown = false;
//         }
//         position = scroll;
//     });
    
//     //check if el is visible in viewport
//     function inViewport($ele) {
//       var lBound = $(window).scrollTop(),
//         uBound = lBound + $(window).height(),
//         top = $ele.offset().top,
//         bottom = top + $ele.outerHeight(true);

//       return (top > lBound && top < uBound) ||
//         (bottom > lBound && bottom < uBound) ||
//         (lBound >= top && lBound <= bottom) ||
//         (uBound >= top && uBound <= bottom);
//     }
	
// })( jQuery );