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

class DonutGraph {
    constructor(canvas, percentageElement, targetPercentage, animatedCircleColor, behindCircleColor) {
    	// console.log('percentageElement', percentageElement);
    	// console.log('targetPercentage', targetPercentage);
    	// console.log('animatedCircleColor', animatedCircleColor);
    	// console.log('behindCircleColor',behindCircleColor);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.percentageElement = percentageElement;
        this.startAngle = -0.5 * Math.PI;
        this.strokeWidth = 5;
        this.thinnerStrokeWidth = 1;
        this.targetPercentage = targetPercentage;
        this.animationDuration = 2000;
        this.donutAnimationDuration = 1500;
        this.animationStartTime = null;
        this.donutAnimationDelay = this.animationDuration - 1000;
        this.observer = new IntersectionObserver(this.startAnimation.bind(this), { threshold: 1.0 });
        this.animatedCircleColor = animatedCircleColor;
        this.behindCircleColor = behindCircleColor;
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    drawTransparentPart() {
        const ctx = this.ctx;
        const canvas = this.canvas;
        const strokeWidth = this.strokeWidth;
        const thinnerStrokeWidth = this.thinnerStrokeWidth;
        const behindCircleColor = this.behindCircleColor;
        const lessen = 60;

        const parent = canvas.parentNode;
        const parentStyle = getComputedStyle(parent);
        const makeSize = parseInt(parentStyle.width, 10) - lessen;
        canvas.style.width = makeSize + "px";
        canvas.style.height = makeSize + "px";


        // Draw transparent part
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.width - strokeWidth) / 2, this.startAngle, this.startAngle + 2 * Math.PI);
        ctx.lineWidth = thinnerStrokeWidth;
        ctx.strokeStyle =  behindCircleColor;
        ctx.stroke();
    }

    drawDonut(percentage) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        const strokeWidth = this.strokeWidth;
        const animatedCircleColor = this.animatedCircleColor;
        const lessen = 30;

        const parent = canvas.parentNode;
        const parentStyle = getComputedStyle(parent);
        const makeSize = parseInt(parentStyle.width, 10) - lessen;
        canvas.style.width = makeSize + "px";
        canvas.style.height = makeSize + "px";

        const endAngle = this.startAngle + 2 * Math.PI * percentage / 100;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the transparent part
        this.drawTransparentPart();

        // Draw red part
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.width - strokeWidth) / 2, this.startAngle, endAngle);
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = animatedCircleColor;
        ctx.stroke();
    }

    animate(timestamp) {
    	if (!this.animationStartTime) {
            this.animationStartTime = timestamp;
        }

        const elapsedTime = timestamp - this.animationStartTime;
        const progress = this.easeInOutCubic(Math.min(elapsedTime / this.animationDuration, 1));

        if (elapsedTime <= this.animationDuration) {
            const currentPercentage = this.targetPercentage * progress;
            this.percentageElement.innerText = Math.floor(currentPercentage);
        }

        if (elapsedTime > this.donutAnimationDelay) {
            const donutProgress = this.easeInOutCubic(Math.min((elapsedTime - this.donutAnimationDelay) / this.donutAnimationDuration, 1));
            const currentPercentage = this.targetPercentage * donutProgress;
            this.drawDonut(currentPercentage);
        }

        if (elapsedTime <= this.animationDuration * 2 + this.donutAnimationDelay) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    startAnimation(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.drawTransparentPart(); // Draw the transparent part initially
                requestAnimationFrame(this.animate.bind(this));
                this.observer.unobserve(this.canvas);
            }
        });
    }

    observe() {
        this.observer.observe(this.canvas);
    }
}

function resizeCanvas(canvas) {
  const parent = canvas.parentNode;
  const parentStyle = getComputedStyle(parent);
  const lessen = 30;
  const makeSize = parseInt(parentStyle.width, 10) - lessen;
  canvas.style.width = makeSize + "px";
  canvas.style.height = makeSize + "px";
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
	};

	window.addEventListener( 'load', function() {
		new navMenu( 'primary' );
	});

	let runDemImages = [];
	let isScrolling, start = 0, end = 0, distance = 0, lastDistance = 0, current = 0;
	let previousScrollPosition = 0;

	if (!start) {
		start = window.pageYOffset;
	}


	document.querySelectorAll('.acf-three_columns .column:not(align-bottom) img').forEach( function( disImg ) {
		useThis = (disImg.parentElement.nodeName == 'FIGURE') ? disImg.parentNode : disImg;
		runDemImages.push(useThis);
	})

	function moveImage(useThis){
		let container, scrollAmt, diff, conStartP;
		container = useThis.closest('.column');
		if(isInViewport(container)){
			if(lastDistance !== current){
				lastDistance = current;
			}

			current = window.pageYOffset;
			// if(useThis.classList.contains('wp-image-137')){
			// 	console.log(current+" "+lastDistance);
			// }
			let conP, useP, changeTop, curPos, scrollAmt, top, amt;
			amt = current - lastDistance;
			conP = container.getBoundingClientRect();
			useP = useThis.getBoundingClientRect()
			curPos = useP.top - conP.top;
			scrollAmt = container.offsetHeight - useThis.offsetHeight;
			top = (useThis.style.top == '') ? 0 : parseInt(useThis.style.top, 10);
			//changeTop = isScrollingDown() ? top + amt : top - amt;
			changeTop = top + amt;
			if(changeTop < 0){
				changeTop = 0;
			}else if(changeTop > scrollAmt){
				changeTop = scrollAmt;
			}
			useThis.style.top = changeTop+'px';
		}		
	}

	function isInViewport(element){
		var viewportHeight = window.innerHeight;
		var rect = element.getBoundingClientRect();
		var position = rect.top/viewportHeight;
		//console.log(rect.top+" "+position)
		if (position >= 0 && position <= 1) {
			return true;
		} else {
			return false;
		}
	}

	document.onscroll = function() {
		setTimeout(() => {
			runDemImages.forEach(function(img){
			     moveImage(img);
			});
		},1000)
	}

}() );