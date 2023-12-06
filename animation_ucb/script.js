// get .text-img element, when it is viewport add animate class to .trap

const textImg = document.querySelectorAll('.text-img:not(.sec)');

const options = {
	root: null,
	threshold: 0.7,
};

const observer = new IntersectionObserver(function (entries, observer) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.querySelector('.trap').classList.add('animate');
		}
	});
}
, options);

textImg.forEach((textImg) => {
	observer.observe(textImg);
});

const corners = document.querySelectorAll('.corners');

const options2 = {
	root: null,
	threshold: 0.7,
};

const observer2 = new IntersectionObserver(function (entries, observer2) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate');
		}
	});
}, options2);

corners.forEach((corners) => {
	observer2.observe(corners);
});

const textImgSecBasic = document.querySelectorAll('.text-img.sec.basic');

const options3 = {
	root: null,
	threshold: 0.7,
}

const observer3 = new IntersectionObserver(function (entries, observer3) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.querySelector('.triangles').classList.add('animate');
		}
	});
}, options3);

textImgSecBasic.forEach((textImgSec) => {
	observer3.observe(textImgSec);
});

const trianglesContainer = document.querySelectorAll('.triangles-container');

Array.from(trianglesContainer).forEach((cont) => {
	Array.from(cont.querySelectorAll('path')).forEach((path, i) => {
		path.style = `--row: ${Math.floor(i / 5)}; --col: ${i % 5};`
	}); 
})

const options4 = {
	root: null,
	threshold: 0.8,
}

const observer4 = new IntersectionObserver(function (entries, observer4) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate');
		}
	});
}, options4);

trianglesContainer.forEach((trianglesContainer) => {
	observer4.observe(trianglesContainer);
});

const sections = document.querySelectorAll('.menu-section');

// add "on" class to span element which is in div with data-pos the same as section data-pos
// add "after" class to span element after the scroll is after the section

window.addEventListener('scroll', () => {
	const offset = 200;
	sections.forEach((section) => {
		const el = document.querySelector(`div[data-pos="${section.dataset.pos}"]`);
		const bigMenu = document.querySelector('.big-menu');
		// log distance from current scroll to top of big-menu;
		const bigMenuTop = bigMenu.offsetTop;
		const scrollY = window.scrollY;
		const currentScroll = Math.max(0, Math.floor(scrollY - bigMenuTop + (offset / 2)));
		// calculate percentage of scroll out of big-menu height
		const percentage = currentScroll / bigMenu.offsetHeight;
		// set .line element variable --end-bkg to percentage
		const max = document.body.classList.contains('selected') ? 70 : 100;
		document.querySelector('.line').style.setProperty('--end-bkg', Math.min(percentage * 100, max) + '%');

		
		
		
		if (window.scrollY >= section.offsetTop - offset) {
			el.classList.add('on');
		} else {
			if(section.dataset.pos !== '1'){
				el.classList.remove('on');
			}
		}
		if (window.scrollY >= section.offsetTop + section.offsetHeight - offset) {
			el.classList.add('after');
		} else {
			el.classList.remove('after');
		}
	});
});


let aosDelay = 0;
const heroContents = document.querySelectorAll('.hero-content');
const textImgs = document.querySelectorAll('.text-img');

Array.from(heroContents).forEach((heroContent) => {
	aosDelay = 0;
	Array.from(heroContent.children).forEach((child) => {
		child.setAttribute('data-aos-delay', aosDelay);
		aosDelay += 100;
		child.setAttribute('data-aos', 'fade-up');
	})
});

Array.from(textImgs).forEach((textImg) => {
	aosDelay = 0;
	Array.from(textImg.children).forEach((child) => {
		child.setAttribute('data-aos-delay', aosDelay);
		aosDelay += 100;
		child.setAttribute('data-aos', 'fade-up');
	})
});