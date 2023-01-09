const canvas = document.getElementById('cv');
const ctx = canvas.getContext('2d');

let handleClick = null;
let handleMove = null;

let interval = null;

const buttons = document.querySelectorAll('.butoane button');
buttons.forEach((but) => {
	but.addEventListener('click', (e) => {
		clearInterval(interval);
		canvas.removeEventListener('click', handleClick);
		canvas.removeEventListener('mousemove', handleMove);
		const cerinta = e.target.dataset.cerinta;
		const func = loop.find((l) => l.cerinta == cerinta)?.func;
		func && func();
	});
});

const loop = [];

// cerinta 2
const cerinta2 = () => {
	const bila = {
		x: canvas.width,
		y: canvas.height,
		r: 25,
	};
	clearInterval(interval);
	interval = setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.arc(bila.x, bila.y, bila.r, 0, 2 * Math.PI);
		ctx.fillStyle = 'red';
		ctx.fill();
		const viteza = 5;
		bila.x -= viteza;
		// impartirea asta penala e facuta ca sa mearga fix din colt in colt ca nu e patrat..
		// fmm matematica
		bila.y -= (canvas.height / canvas.width) * viteza;
		if (bila.x + bila.r < 0 || bila.y + bila.r < 0) {
			bila.x = canvas.width;
			bila.y = canvas.height;
		}
	}, 1000 / 60);
};
loop.push({ cerinta: 2, func: cerinta2 });
// end cerinta 2

// cerinta 3
const cerinta3 = () => {
	const img = document.createElement('img');
	img.src = 'pisica.png';
	img.onload = () => {
		ctx.drawImage(img, 0, 0);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};
	let xPos = 0;
	let yPos = 0;

	handleClick = (e) => {
		xPos = e.offsetX;
		yPos = e.offsetY;
		// scria 30 da nu se vede nimic am pus mai mult
		ctx.drawImage(img, xPos - 40, yPos - 40, 80, 80, xPos - 40, yPos - 40, 80, 80);
	};
	canvas.addEventListener('click', handleClick);
};
loop.push({ cerinta: 3, func: cerinta3 });
// end cerinta 3

// cerinta 4
const cerinta4 = () => {
	clearInterval(interval);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#2ad4e7';
	ctx.fillRect(100, 200, 100, 300);
	ctx.fillStyle = '#dfd35d';
	ctx.fillRect(350, 250, 350, 225);
	ctx.fillStyle = '#9567ba';
	ctx.fillRect(200, 100, 200, 100);
	// asta rosu e pus de test ca daca se face albastru merge bn
	ctx.fillStyle = '#ff0000';
	ctx.fillRect(500, 50, 100, 100);

	const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	handleMove = (e) => {
		ctx.putImageData(originalData, 0, 0);
		const newData = ctx.getImageData(e.offsetX - 10, e.offsetY - 10, 20, 20);
		const pixels = newData.data;
		for (let i = 0; i < pixels.length; i += 4) {
			let r = pixels[i];
			let b = pixels[i + 2];
			pixels[i] = b;
			pixels[i + 2] = r;
		}
		ctx.putImageData(newData, e.offsetX - 10, e.offsetY - 10);
	};
	canvas.addEventListener('mousemove', handleMove);
};
loop.push({ cerinta: 4, func: cerinta4 });
// end cerinta 4
