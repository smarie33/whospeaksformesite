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
    	this.drawTransparentPart();
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

	function isElementInViewport(element){
	  const rect = element.getBoundingClientRect();
	  return (
	    rect.top >= 0 &&
	    rect.left >= 0 &&
	    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	  );
	}

	function isElementPeaking(element){
	  const rect = element.getBoundingClientRect();
	  if(rect.top <= ((window.innerHeight || document.documentElement.clientHeight) + 50)){
	  	return true;
	  }
	}

	function highlightNavLink(sections,navLinks) {
	    let linkHighlighted = false;

	    sections.forEach((section, index) => {
	        if (isElementInViewport(section)) {
	            navLinks[index].classList.add('at-section');
	            linkHighlighted = true;
	        } else {
	            navLinks[index].classList.remove('at-section');
	        }
	    });

	    if (!linkHighlighted && window.pageYOffset < sections[0].offsetTop) {
	        navLinks[0].classList.add('highlighted');
	    }
	}

	function highlightLinkOnClick(allLinks, toHighlight, theClass){
		allLinks.forEach( jump => {
			jump.classList.remove(theClass);
		})
		toHighlight.classList.add(theClass);
	}


	function updateScrollBarHeight(scrollBar) {
	    const windowHeight = window.innerHeight;
	    const documentHeight = document.documentElement.scrollHeight;
	    const scrollPosition = window.pageYOffset;

	    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

	    scrollBar.style.height = scrollPercentage + 'vh';
	}


	function showTooltip(event) {
		if(window.innerWidth > 1249){
			const toolTipRO = event.srcElement;
			const tooltip = event.srcElement.firstElementChild;
			if(tooltip != null){
				tooltip.classList.add('show_tooltip');
				tooltip.classList.remove('hide_tooltip');

			    const tooltipRect = tooltip.getBoundingClientRect();
			    const rolloverRect = toolTipRO.getBoundingClientRect();
			    const viewportWidth = window.innerWidth;
			    const viewportHeight = window.innerHeight;

			    let left = 0;
			    let top = 40;

			    // if (tooltipRect.left + tooltipRect.width > viewportWidth) {
			    // 	left = - (tooltipRect.width);
			    // }

			    if((rolloverRect.bottom + tooltipRect.height) >= (window.innerHeight || document.documentElement.clientHeight)){
			    	top = -tooltipRect.height;
			    }

			    tooltip.style.left = left + 'px';
			    tooltip.style.top = top + 'px';
			}
		}
	}

	function hideTooltip(event) {
		let tooltip = event.srcElement.firstElementChild;
		if(tooltip != null){
			tooltip.classList.add('hide_tooltip');
			tooltip.classList.remove('show_tooltip');
		}
	}

	function setCookie(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
  	}

  function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
  }

  function getValuesByKey(obj, key) {
	  let result = [];

	  function recursiveSearch(innerObj, key) {
	    for(let i in innerObj) {
	      if(!innerObj.hasOwnProperty(i)) continue;
	      if(i === key) {
	        result.push(innerObj[i]);
	      } else if (typeof innerObj[i] === 'object') {
	        recursiveSearch(innerObj[i], key);
	      }
	    }
	  }

	  recursiveSearch(obj, key);
	  return result;
  }

  function getAllNodeInfo(node) {
	  let obj = {};

	  obj['tagName'] = node.tagName;

	  if (node.attributes.length > 0) {
	    obj['attributes'] = {};
	    for (let j = 0; j < node.attributes.length; j++) {
	      let attr = node.attributes[j];
	      obj['attributes'][attr.name] = attr.value;
	    }
	  }

	  if (node.hasChildNodes()) {
	    obj['childTags'] = [];
	    let childNodes = node.childNodes;
	    for (let i = 0; i < childNodes.length; i++) {
	      let child = childNodes[i];
	      if (child.nodeType === Node.ELEMENT_NODE) { // Only process element nodes
	        obj['childTags'].push(getAllNodeInfo(child));
	      }
	    }
	  } else {
	    obj['innerHTML'] = node.innerHTML;
	  }

	  return obj;
	}

	function getSiblingValuesByValue(obj, targetValue) {
    let siblingValues = null;

    function traverse(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                traverse(obj[key]);
            } else {
                if (obj[key] === targetValue) {
                    siblingValues = Object.values(obj);
                }
            }
        }
    }

	    traverse(obj);
	    return siblingValues;
	}


function fadeThingsIn(item, type){
  	let word = '';
  	let aria = item.textContent;
  	let allInfo = getAllNodeInfo(item)
  	switch(type) {
	  case 'letter':
	    word =  item.textContent.split('');
	    break;
	  case 'word':
	   	word = item.textContent.split(' ');
	    break;
	  case 'section':
	    word = item;
	    break;
	  default:
	}

	//console.log(allInfo);

	if(type == 'letter' || type == 'word'){
		item.textContent = '';
		item.setAttribute('aria-label', aria);

		if(type == 'letter'){
			let sup = getSiblingValuesByValue(allInfo, 'SUP');
			if(sup != null){
				word = [];
				let divide = aria.split("TM");
				divide.forEach( (area,index) => {
					let breakUp = area.split('');
					breakUp.forEach(theBreak =>{
						word.push(theBreak);
					})
					if(index < divide.length - 1){
						word.push('&trade;');
					}
				})
			}

		}

		let styles = getValuesByKey(allInfo, 'style');
		let boldness = getValuesByKey(allInfo, 'tagName');

		if(boldness.includes("STRONG")){
			styles.push('font-weight:bold;');
		}
		if(boldness.includes("EM")){
			styles.push('font-style: italic;');
		}
		styles.push('visibility: visible;');
		item.setAttribute('style', styles.join(' '));
		item.setAttribute('class', 'shown');

		setTimeout(() => {
			for(let i = 0; i < word.length; i++) {
			    var span = document.createElement('span');
			    span.innerHTML = word[i];

			    //span.style.animationDelay = `${i * 1}s`; // Adjust the timing as needed

			    span.style.opacity = 0;
			    span.style.animation = `fadeIn 1s ease-in-out ${i * .02}s forwards`;
			    item.appendChild(span);
			}
		}, "500");
	}else{
		item.setAttribute('class', 'shown fade-this-in');
		//item.style.opacity = 0;
		//item.style.animation = `fadeIn 1s ease-in-out .5s forwards`;
	}
}

function runReveals(elements, type){
	elements.forEach( function( element ) {
		if(!element.classList.contains('shown')){
			if(isElementInViewport(element)){
				fadeThingsIn(element, type);
			}
		}
	})
}

function runRevealsWithPeak(elements, type){
	elements.forEach( function( element ) {
		if(!element.classList.contains('shown')){
			if(isElementPeaking(element)){
				fadeThingsIn(element, type);
			}
		}
	})
}


	window.addEventListener('load', function() {
		const scrollBar = document.getElementById('vertical-scroll-bar');
		const jumpNav = document.querySelector('.acf-jump-link-nav');
		const sections = document.querySelectorAll('.acf-jump_link a');
		const navLinks = document.querySelectorAll('.acf-jump-link-nav .jump-link');
		const toolTipROs = document.querySelectorAll('.tooltip-hover');
		const mainPopup = document.getElementById('main-popup');
		const body = document.getElementsByTagName('body');
		const sliderAreas = document.querySelectorAll('.acf-slider');
	    //const customCursor = document.querySelectorAll('.custom-cursor');
	    const jumpLinks = document.querySelectorAll('.acf-jump_link');
	    let halfPage = window.innerWidth / 2;
	    let isPopupClosed = getCookie("popupClosed");
	    let spaceAboveJump, aboveJump;

	    if(jumpNav != null){
	    	aboveJump = jumpNav.previousSibling.previousSibling;
	    	spaceAboveJump = aboveJump.offsetHeight;
	    	highlightNavLink(sections,navLinks);
			if(window.pageYOffset > spaceAboveJump){
				jumpNav.classList.add('fix');
		    }else{
		    	jumpNav.classList.remove('fix');
		    }
	    }
		
		let banners = document.querySelectorAll('h1, h2, h3');
		let paragraphs = document.querySelectorAll('p');
		let team = document.querySelectorAll('.member-info');
		let reveals = [];

		paragraphs.forEach( p => {
			let cnt = 0;
			for (const child of p.children){
			  if(child.tagName == 'IMG' || child.classList.contains('button') || child.classList.contains('tooltip')){
			  	cnt++;
			  	break;
			  }
			}
			if(cnt > 0){
				p.classList.add('no-reveal');
			}else{
				reveals.push(p);
			}
		})
		
		runReveals(banners, 'letter');
		runRevealsWithPeak(reveals, 'section');
		if(team.length > 0){
			runRevealsWithPeak(team, 'section');
		}

		let runDemImages = [];
		let isScrolling, start = 0, end = 0, distance = 0, lastDistance = 0, current = 0;
		let previousScrollPosition = 0;


		if(mainPopup != null && !isPopupClosed){
			mainPopup.style.width = window.innerWidth + 'px';
			mainPopup.style.height = window.innerHeight + 'px';
			body[0].classList.add('popup-on');
			mainPopup.classList.add('show_popup');

			document.querySelector('#main-popup .close').addEventListener('click', event => {
				body[0].classList.remove('popup-on');
				mainPopup.classList.remove('show_popup');
				setCookie("popupClosed", true, 5);
			})
		}


		 updateScrollBarHeight(scrollBar);

		if(toolTipROs != null){
			toolTipROs.forEach( toolTipRO => {
				toolTipRO.addEventListener('mouseover',(event) => {
					showTooltip(event);
				})
				toolTipRO.addEventListener('mousemove',(event) => {
					showTooltip(event);
				})
				toolTipRO.addEventListener('mouseleave',(event) => {
					hideTooltip(event);
				});
			});
		}

		//adject full width images in two column layouts
		const fullImages = document.querySelectorAll('.full-width-images img');
		if(fullImages.length > 0){
			fullImages.forEach( function( img ) {
				let p = img.parentElement;
				p.style.position = 'relative';
				p.style.width = '100%';
				p.style.height = img.offsetHeight+'px';
			})
		}

		document.querySelectorAll('.column.scroll-image img').forEach( disImg => {
			useThis = (disImg.parentElement.nodeName == 'FIGURE') ? disImg.parentNode : disImg;
			useThis = (disImg.parentElement.nodeName == 'P') ? useThis.parentNode : useThis;
			runDemImages.push(useThis);
		})

		let allJumpLinks = document.querySelectorAll('.jump-link');
		let jumpLinkNav = document.querySelector('.acf-jump-link-nav');

		if(jumpLinks.length > 0){
			jumpLinks.forEach( (link,indx) => {
				link.querySelector('a').id = allJumpLinks[indx].getAttribute('href').split('#')[1];
			})
		}

		if(jumpLinkNav != null){
			jumpLinkNav.addEventListener('click', function (event) {
				let targetId, jump;
				if(event.target.tagName === 'SPAN'){
					//console.log(event.target.dataset.target);
					targetId = event.target.dataset.target;
					jump = event.target.parentElement;
				}else{
					targetId = this.getAttribute('href'); 
					jump = this;
				}
			        event.preventDefault();

			        highlightLinkOnClick(allJumpLinks, jump, 'at-section');

			        const headerSizes = 250;

			        const targetElement = document.querySelector(targetId);

			        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

			        const scrollOptions = {
			            top: targetPosition - headerSizes,
			            behavior: 'smooth'
			        };

			        window.scrollTo(scrollOptions);
			});
		}

		window.addEventListener("resize", () => {
			halfPage = window.innerWidth / 2;
		})

		window.addEventListener("scroll", () => {

			runReveals(banners, 'letter');
			runRevealsWithPeak(reveals, 'section');
			if(team.length > 0){
				runRevealsWithPeak(team, 'section');
			}



			if(jumpNav != null){
				highlightNavLink(sections,navLinks);
				if (window.pageYOffset > 30) {
			        jumpNav.classList.add('roll-up');
			    } else {
			        jumpNav.classList.remove('roll-up');
			    }


			    if(window.pageYOffset > spaceAboveJump){
					jumpNav.classList.add('fix');
			    }else{
			    	jumpNav.classList.remove('fix');
			    }
			}

			updateScrollBarHeight(scrollBar);
			

			let runThese = [];

			runDemImages.forEach((img) => {
				if(!isElementInViewport(img.parentElement)) {
					img.style.transform = `translateY(0px)`;
				}		
			});

			runDemImages.forEach((img) => {
				if(isElementInViewport(img.parentElement)) {
					runThese.push(img);
				}		
			});

			if (runThese.length < 1) {
				return;
			}

			runThese.forEach((img) => {
				const container = img.parentElement;
				const theTop = 50;
				const scrollY = window.scrollY;
				const containerHeight = container.offsetHeight;
				const imageHeight = img.offsetHeight;
				const maxTranslateY = containerHeight - imageHeight;

				let translateY = (container.offsetTop > 500) ? (container.offsetTop - scrollY) : -scrollY;

				//let translateY = -scrollY;
				//console.log(container.offsetTop - scrollY);

				if (translateY < (theTop * -1)) {
					translateY = (theTop * -1);
				}

				if(translateY > maxTranslateY){
					translateY = maxTranslateY;
				}

				img.style.transform = `translateY(${translateY}px)`;
			})
		});
	});


}() );
