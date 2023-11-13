const select = document.querySelector('#section-select');

const OPTIONS = {
	hero: {
		html: `<section class="hero-section">
	<div class="hero">
	<img class="img-hero" src="./imgs/hero.webp" alt="">
	<div class="corners">
		<img class="corner tr" src="./imgs/corner.svg" alt="">
		<img class="corner br" src="./imgs/corner.svg" alt="">
		<img class="corner bl" src="./imgs/corner.svg" alt="">
		<img class="corner tl" src="./imgs/corner.svg" alt="">
	</div>
		<div class="container hero-content-container">
			<div class="hero-content">
				<h1>Rotate animation<br/> Second row</h1>
				<p>Integrated Annual Report 2023</p>
				<button class="main-btn">Click</button>
			</div>
		</div>
	</div>
</section>`,
		optionsElementSelector: "section.hero-section",
		animateElementSelector: ".corners",
		classes: ["rotate", "scale", "fade","inverse-scale"]
	},
	trapesoid: {
		html: `<section class="menu-section container">
	<div class="text-img">
		<h2>Letter by our chair and ceo</h2>
		<p class="p1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet quam ipsa earum quas nulla possimus laborum a alias ipsam eligendi architecto quasi. Eveniet quam ipsa earum quas nulla possimus laborum a alias ipsam eligendi architecto quasi</p>
		<p class="p2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab pariatur eos atque sequi rerum perspiciatis, nemo nihil. Ab pariatur eos atque sequi rerum perspiciatis, nemo nihil</p>
		<button class="main-btn blue">View letter in full</button>
		<div class="img-cont">
			<img class="trap" src="./imgs/trapesoid.svg" alt="">
			<img class="main-img" src="./imgs/hero.webp" alt="">
		</div>
	</div>
</section>`,
		optionsElementSelector: "div.text-img",
		animateElementSelector: ".trap",
		classes: ["ltr", "rtl", "btt", "ttb"]
	},
	trianglesBasic: {
		html: `<section class="container blue-bg">
	<div class="text-img sec basic">
		<h2>Letter by our chair and ceo</h2>
		<p class="p1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet quam ipsa earum quas nulla possimus laborum a alias ipsam eligendi architecto quasi. Eveniet quam ipsa earum quas nulla possimus laborum a alias ipsam eligendi architecto quasi</p>
		<p class="p2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab pariatur eos atque sequi rerum perspiciatis, nemo nihil. Ab pariatur eos atque sequi rerum perspiciatis, nemo nihil</p>
		<button class="main-btn blue">View letter in full</button>
		<div class="img-cont-2">
			<img class="triangles" src="./imgs/triangles.svg" alt="">
			<img class="main-img" src="./imgs/hero.webp" alt="">
		</div>
	</div>
</section>`,
		optionsElementSelector: "div.text-img.sec.basic",
		animateElementSelector: ".triangles",
		classes: ["ltr", "rtl", "btt", "ttb"]
	},
	trianglesComp: {
		html: `<section class="container blue-bg">
	<div class="text-img sec complicated">
		<h2>Letter by our chair and ceo</h2>
		<p class="p1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet quam ipsa earum quas nulla possimus laborum a alias ipsam eligendi architecto quasi. Eveniet quam ipsa earum quas nulla possimus laborum a alias ipsam eligendi architecto quasi</p>
		<p class="p2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab pariatur eos atque sequi rerum perspiciatis, nemo nihil. Ab pariatur eos atque sequi rerum perspiciatis, nemo nihil</p>
		<button class="main-btn blue">View letter in full</button>
		<div class="img-cont-2">
			<div class="triangles-container">
				<svg width="152" height="154" viewBox="0 0 152 154" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_1034_8173)">
					<path d="M0 25.8399C2.02 12.7799 12.34 2.44994 25.41 0.439941H0V25.8499V25.8399Z" fill="#B1B3B3"/>
					<path d="M31.4319 25.8399C33.4519 12.7799 43.7719 2.44994 56.8319 0.439941H31.4219V25.8499L31.4319 25.8399Z" fill="#B1B3B3"/>
					<path d="M62.8516 25.8399C64.8716 12.7699 75.1916 2.44993 88.2616 0.429932H62.8516V25.8399Z" fill="#B1B3B3"/>
					<path d="M94.2812 25.8399C96.3012 12.7699 106.621 2.44993 119.691 0.429932H94.2812V25.8399Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					<path d="M125.711 25.8401C127.731 12.7701 138.051 2.45005 151.121 0.430054H125.711V25.8401Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					<path d="M0 57.7201C2.02 44.6501 12.34 34.3301 25.41 32.3101H0V57.7201Z" fill="#B1B3B3"/>
					<path d="M31.4297 57.7201C33.4497 44.6501 43.7697 34.3301 56.8397 32.3101H31.4297V57.7201Z" fill="#B1B3B3"/>
					<path d="M62.8516 57.7201C64.8716 44.6501 75.1916 34.3301 88.2616 32.3101H62.8516V57.7201Z" fill="#B1B3B3"/>
					<path d="M94.2812 57.7201C96.3012 44.6501 106.621 34.3301 119.691 32.3101H94.2812V57.7201Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					<path d="M125.711 57.7201C127.731 44.6501 138.051 34.3301 151.121 32.3101H125.711V57.7201Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					<path d="M0 89.5999C2.02 76.5299 12.34 66.2099 25.41 64.1899H0V89.5999Z" fill="#B1B3B3"/>
					<path d="M31.4297 89.5999C33.4497 76.5299 43.7697 66.2099 56.8397 64.1899H31.4297V89.5999Z" fill="#B1B3B3"/>
					<path d="M62.8516 89.5999C64.8716 76.5299 75.1916 66.2099 88.2616 64.1899H62.8516V89.5999Z" fill="#B1B3B3"/>
					<path d="M94.2812 89.5999C96.3012 76.5299 106.621 66.2099 119.691 64.1899H94.2812V89.5999Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					<path d="M125.711 89.5999C127.731 76.5299 138.051 66.2099 151.121 64.1899H125.711V89.5999Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					<path d="M0 121.48C2.02 108.41 12.34 98.0899 25.41 96.0699H0V121.48Z" fill="#B1B3B3"/>
					<path d="M31.4297 121.48C33.4497 108.41 43.7697 98.0901 56.8397 96.0701H31.4297V121.48Z" fill="#B1B3B3"/>
					<path d="M62.8516 121.48C64.8716 108.41 75.1916 98.0901 88.2616 96.0701H62.8516V121.48Z" fill="#B1B3B3"/>
					<path d="M94.2812 121.48C96.3012 108.41 106.621 98.0901 119.691 96.0701H94.2812V121.48Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					<path d="M125.711 121.48C127.731 108.41 138.051 98.0899 151.121 96.0699H125.711V121.48Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					<path d="M0 153.36C2.02 140.29 12.34 129.97 25.41 127.95H0V153.36Z" fill="#B1B3B3"/>
					<path d="M31.4297 153.36C33.4497 140.29 43.7697 129.97 56.8397 127.95H31.4297V153.36Z" fill="#B1B3B3"/>
					<path d="M62.8516 153.36C64.8716 140.29 75.1916 129.97 88.2616 127.95H62.8516V153.36Z" fill="#B1B3B3"/>
					<path d="M94.2812 153.36C96.3012 140.29 106.621 129.97 119.691 127.95H94.2812V153.36Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					<path d="M125.711 153.36C127.731 140.29 138.051 129.97 151.121 127.95H125.711V153.36Z" stroke="white" stroke-width="0.87" stroke-miterlimit="10"/>
					</g>
					<defs>
					<clipPath id="clip0_1034_8173">
					<rect width="151.18" height="153.42" fill="white"/>
					</clipPath>
					</defs>
					</svg>
			</div>
			<img class="main-img" src="./imgs/hero.webp" alt="">
		</div>
	</div>
</section>`,
		optionsElementSelector: ".triangles-container",
		animateElementSelector: ".triangles-container",
		classes: ["row-by-row"]
	}
}

select.addEventListener('change', (e) => {
	const value = e.target.value;
	const container = document.querySelector('.builder-preview');
	const chosenSection = OPTIONS[value];
	container.innerHTML = chosenSection?.html;
	if(value === 'trianglesComp') {
		const triangleCont = container.querySelector('.triangles-container');
		Array.from(triangleCont.querySelectorAll('path')).forEach((path, i) => {
			path.style = `--row: ${Math.floor(i / 5)}; --col: ${i % 5};`
		}); 
	}

	const builderButtons = document.querySelector('.builder-buttons');

	const toRemove = document.querySelectorAll('.builder-buttons > *:not(#section-select):not(.add-to-page)');
	toRemove.forEach((el) => {
		el.remove();
	});

	const animationSelect = document.createElement('select');
	animationSelect.classList.add('animation-select');
	const options = chosenSection?.classes;
	options.forEach((option) => {
		const optionEl = document.createElement('option');
		optionEl.value = option;
		optionEl.innerHTML = option;
		animationSelect.appendChild(optionEl);
	});

	builderButtons.appendChild(animationSelect);

	const activeClasses = document.createElement('div');
	activeClasses.classList.add('active-classes');
	builderButtons.appendChild(activeClasses);

	const addClassBtn = document.createElement('button');
	addClassBtn.classList.add('add-class-btn');
	addClassBtn.innerHTML = 'Add/Remove class';
	builderButtons.appendChild(addClassBtn);

	addClassBtn.addEventListener('click', (e) => {
		const value = animationSelect.value;
		const alreadyActive = activeClasses.querySelector(`.${value}`);
		const optionsElement = container.querySelector(chosenSection?.optionsElementSelector);
		console.log(chosenSection?.optionsElementSelector)
		if(alreadyActive) {
			alreadyActive.remove();
			optionsElement.classList.remove(value);
		} else {
			const activeClass = document.createElement('span');
			activeClass.classList.add('active-class', value);
			activeClass.innerHTML = value;
			activeClasses.appendChild(activeClass);
			optionsElement.classList.add(value);
		}
	});

	const resetAnimationBtn = document.createElement('button');
	resetAnimationBtn.classList.add('reset-animation-btn');
	resetAnimationBtn.innerHTML = 'Reset animation';
	builderButtons.appendChild(resetAnimationBtn);

	resetAnimationBtn.addEventListener('click', async () => {
		const animateElement = container.querySelector(chosenSection?.animateElementSelector);
		animateElement.classList.remove('animate');
		await new Promise(r => setTimeout(r, 500));
		animateElement.classList.add('animate');
	});
});