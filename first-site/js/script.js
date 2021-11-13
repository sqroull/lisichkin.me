"use strict";
(function () {

	document.addEventListener("DOMContentLoaded", function() {
	
	const services = document.getElementById('services');
	const heroSection = document.getElementsByClassName('section-hero')[0];
	const heroContainer = document.getElementsByClassName('section-hero__container')[0];
	const heroParallax = document.getElementsByClassName('section-hero_parallax')[0];
	const heroTitleParallax = document.getElementsByClassName('section-hero__title_parallax')[0];
	const heroEllipse = document.getElementsByClassName('section-hero__ellipse')[0];
	const sitesParallax = document.getElementsByClassName('section-sites_parallax')[0];
	const sitesParallaxWrapper = document.getElementsByClassName('section-sites__parallax-wrapper')[0];
	const contactsParallax = document.getElementsByClassName('section-contacts_parallax')[0];
	const tag = Array.from(document.getElementsByClassName('tag'));
	const menu = document.getElementById('menu');
	const formWrapper = document.getElementsByClassName('form-wrapper')[0];
	const smoothLinks = document.querySelectorAll('a[href^="#"]');
	const closeMenu = document.getElementById('closeMenu');
	const closeForm = document.getElementById('closeForm');

	if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0){
		sitesParallax.style.backgroundAttachment = 'scroll';
		heroParallax.style.backgroundAttachment = 'scroll';
		contactsParallax.style.backgroundAttachment = 'scroll';
	}

	function checkMediaQuery() {
		let hHeight = services.clientHeight;
		if (window.innerWidth > 768) {
			sitesParallax.style.paddingTop = hHeight + 'px';
			sitesParallax.style.top = -hHeight + 'px';
			sitesParallax.style.marginBottom = -hHeight + 'px';
			heroTitleParallax.classList.add('section-hero__title_parallax');
			heroContainer.style.transform = 'initial';
			if (window.innerWidth > 1024) {
				sitesParallaxWrapper.style.minHeight = (hHeight + 145) + 'px';
				tag[1].style.animationName = 'move-right';
				tag[4].style.animationName = 'move-left';
				tag[3].innerHTML = '&lt;div&gt;';
			} else {
				sitesParallaxWrapper.style.minHeight = (hHeight + 235) + 'px';
				tag[1].style.animationName = 'move-right';
				tag[4].style.animationName = 'move-left';
				tag[3].innerHTML = '&lt;/&gt;';
			}
		} else {
			tag[1].style.animationName = 'move-right';
			heroTitleParallax.classList.remove('section-hero__title_parallax');
			if (window.innerWidth > 380) {
				sitesParallax.style.top = (-hHeight + 30) + 'px';
				sitesParallax.style.marginBottom = (-hHeight + 30) + 'px';
				sitesParallax.style.paddingTop = (hHeight + 200) + 'px';
				sitesParallaxWrapper.style.minHeight = (hHeight + 240) + 'px';
			} else {
				sitesParallax.style.paddingTop = (hHeight) + 'px';
				sitesParallax.style.top = (-hHeight + 150) + 'px';
				sitesParallax.style.marginBottom = (-hHeight + 150) + 'px';
				sitesParallaxWrapper.style.minHeight = (hHeight + 100) + 'px';
			}
		}
		if (pageYOffset > 950) {
			heroTitleParallax.style.visibility = 'hidden';
		}
	};
	checkMediaQuery();
	window.addEventListener('resize', checkMediaQuery);

	function formOnClick(e) {
		if (e.target.classList.contains('callme')) {
			formWrapper.classList.toggle('is-active');
			menu.classList.remove('is-active');
			if (formWrapper.classList.contains('is-active')) {
				document.body.classList.add('stop-scrolling');
			} else {
				document.body.classList.remove('stop-scrolling');
			}
		} else if (e.target.contains(closeMenu)) {
			menu.classList.remove('is-active');
			document.body.classList.remove('stop-scrolling');
		} else if (e.target.contains(closeForm)) {
			formWrapper.classList.toggle('is-active');
			document.body.classList.remove('stop-scrolling');
		} else if (e.target.classList.contains('callburger')) {
			menu.classList.toggle('is-active');
			formWrapper.classList.remove('is-active');
			if (menu.classList.contains('is-active')) {
				document.body.classList.add('stop-scrolling');
			} else {
				document.body.classList.remove('stop-scrolling');
			}
		}
	}
	document.body.addEventListener('click', formOnClick);

	function navigateOnClick() {
		for (let smoothLink of smoothLinks) {
			smoothLink.addEventListener('click', function (e) {
				e.preventDefault();
				const id = smoothLink.getAttribute('href');
				document.querySelector(id).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
				menu.classList.remove('is-active');
				document.body.classList.remove('stop-scrolling');
			});
		};
	}
	navigateOnClick();

	function scrollWindowY() {
		let scrollY = pageYOffset;
		if (scrollY > 800) {
			heroTitleParallax.style.visibility = 'hidden';
		} else {
			heroTitleParallax.style.visibility = 'visible';
		  if (window.innerWidth < 769) {
			heroSection.style.opacity = 1 - scrollY / 750;
			heroContainer.style.transform = 'translateY(' + scrollY / 5 + 'px)';
			heroEllipse.style.transform = 'translateX(' + scrollY / 0.75 + 'px)';
		  } else {
			heroEllipse.style.transform = 'translateX(' + scrollY / 1.5 + 'px)';
		  }
		}
	}
	window.addEventListener('scroll', scrollWindowY);


	// var mySwiper = new Swiper ('#target')
	

	const swiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		autoplay: {
			delay: 1000,
			disableOnInteraction: true,
		},
		pagination: {
			el: '.swiper-pagination',
			dinamicBullets: true,
			dynamicMainBullets: 1,
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			300: {
				slidesPerView: 1,
				spaceBetween: 40
			},
			769: {
				slidesPerView: 2,
				slidesPerGroup: 1,
				spaceBetween: 40,
				navigation: {
					nextEl: null,
					prevEl: null,
				},
			},
			1025: {
				slidesPerView: 3,
				spaceBetween: 30,
			}
		}
	});

	swiper.el.addEventListener("mouseenter", function(event) {   
		swiper.autoplay.stop();
	}, false);

	let selector = document.querySelectorAll('input[type="tel"]');
	let im = new Inputmask('+7 (999) 999 99 99');
	im.mask(selector);
	let selector2 = document.querySelector('input[type="tel"]');
	selector2.addEventListener('input', function () {
		const re = /^\d*(\.\d+)?$/
	});

	let validateForms = function (selector, rules) {
		new window.JustValidate(selector, {
			rules: rules,
			submitHandler: function (form) {
				let formData = new FormData(form);
				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							formWrapper.classList.remove('is-active');
							alert('Отлично! Ожидайте звонка в ближайшее время...');
						}
					}
				}
				xhr.open('POST', 'mail.php', true);
				xhr.send(formData);
				form.reset();
			}
		});
	}
	validateForms('.form', {
		email: {
			required: true,
			email: true
		},
		tel: {
			required: true
		},
		agruement: {
			required: true
		}
	});

});
})();
