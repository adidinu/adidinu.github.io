const canvas = document.getElementById('cv');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const isMobile = 'ontouchstart' in window;

// variabile globale
const MAX_ASTEROIDS = 60;
let ADD_AST = 7;
let OVER = false;
const REGEN_LIFE = 15;
let NEXT_LIFE = REGEN_LIFE;

// functii pentru numere random
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

// calcul coordonate triunghi intr-un cerc
calcEchTriangle = (r, ang, x, y) => {
	let points = {
		a: {
			x: r * Math.cos(ang) + x,
			y: r * Math.sin(ang) + y,
		},
		b: {
			x: r * Math.cos(ang + (2 * Math.PI) / 3) + x,
			y: r * Math.sin(ang + (2 * Math.PI) / 3) + y,
		},
		c: {
			x: r * Math.cos(ang + (4 * Math.PI) / 3) + x,
			y: r * Math.sin(ang + (4 * Math.PI) / 3) + y,
		},
	};
	return points;
};

let saved = false;
// functie restart joc, fie de la 0 fie atunci cand playerul moare
restartGame = (hard = false) => {
	if (hard) {
		player = new Ship();
		NEXT_LIFE = REGEN_LIFE;
		OVER = false;
	} else {
		player.x = canvas.width / 2;
		player.y = canvas.height / 2 - player.l - 20;
	}
	asteroids = [];
	ADD_AST = 7;
	if (player.lives < 0) {
		OVER = true;
		saved = false;
		document.addEventListener('keydown', listenRestart);
		document.addEventListener('keydown', saveScore);
	}
};

class Asteroid {
	constructor() {
		// pozitie random, in afara ecranului pe X sau pe Y)
		const isNegX = Math.random() < 0.5;
		const isNegY = Math.random() < 0.5;
		const dir = Math.random() < 0.5;
		// unde sa apara asteroizii
		if (dir) {
			// stanga dreapta
			this.x = isNegX ? randomNumber(-75, -45) : randomNumber(canvas.width + 45, canvas.width + 75);
			this.y = randomNumber(0, canvas.height);
		} else {
			// sus jos
			this.x = randomNumber(0, canvas.width);
			this.y = isNegY ? randomNumber(-75, -45) : randomNumber(canvas.height + 45, canvas.height + 75);
		}
		// setare raza random dintr-un array de raze, atribut static
		Asteroid.setR(this);
		this.life = Asteroid.sizes.indexOf(this.r) + 1;
		this.score = this.life;
		this.yv = randomFloat(1, 3);
		this.xv = this.yv;
		this.inside = false;
		this.dead = false;
		// setare culoare corespunzatoare razei
		this.color = Asteroid.colors[this.life - 1];
		this.calcAngle();

		// daca in 3 secunde de la spawn nu a intrat in ecran, asteroidul dispare
		setTimeout(() => {
			if (this.inside == false) {
				this.dead = true;
			}
		}, 3000);
	}

	// atribute statice cu razele si culorile corespunzatoare
	static sizes = [25, 30, 35, 45];
	static colors = ['hsl(0, 100%, 25%)', 'hsl(0, 100%, 21%)', 'hsl(0, 100%, 16%)', 'hsl(0, 100%, 10%)'];

	static setR(asteroid) {
		asteroid.r = Asteroid.sizes[randomNumber(0, Asteroid.sizes.length)];
	}

	// calcul unghiul traiectoriei -> spre player
	calcAngle() {
		this.ang = Math.atan2(player.y - this.y, player.x - this.x);
	}

	// scris text cu cate rachete trebuie sa loveasca asteroidul
	drawText() {
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '20px Arial';
		if (this.life > 0) {
			ctx.fillText(this.life, this.x, this.y + 7);
		}
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		this.drawText();
	}

	checkCollision(asteroids) {
		// verificare coliziune intre asteroizi
		asteroids.forEach((ast) => {
			if (ast != this) {
				const distance = Math.sqrt(Math.pow(ast.x - this.x, 2) + Math.pow(ast.y - this.y, 2));
				if (distance < ast.r + this.r) {
					// daca se intersecteaza, se muta asteroizii astfel incat sa nu mai se intersecteze
					const overlap = 0.5 * (distance - ast.r - this.r);
					this.x -= (overlap * (this.x - ast.x)) / distance;
					this.y -= (overlap * (this.y - ast.y)) / distance;

					ast.x += (overlap * (this.x - ast.x)) / distance;
					ast.y += (overlap * (this.y - ast.y)) / distance;

					// se calculeaza un unghi corespunzator pentru urmatoarea traiectorie a asteroizilor care s-au lovit
					this.ang = Math.atan2(this.y - ast.y, this.x - ast.x);
					ast.ang = Math.atan2(ast.y - this.y, ast.x - this.x);
				}
			}
		});
	}

	// verificare daca asteroidul este in afara ecranului sau daca a intrat in ecran de cand a fost creat
	checkBorder() {
		if (this.inside == false) {
			if (this.x - this.r >= 2 && this.x + this.r <= canvas.width - 2 && this.y - this.r >= 0 && this.y + this.r <= canvas.height - 2) {
				this.inside = true;
				return false;
			}
		} else {
			if (this.x + this.r <= 0 || this.x - this.r >= canvas.width || this.y - this.r >= canvas.height || this.y + this.r <= 0) {
				return true;
			}
		}
	}

	update() {
		this.checkCollision(asteroids);
		if (this.checkBorder()) {
			this.dead = true;
		} else if (this.life <= 0) {
			this.dead = true;
			player.score += this.score;
			// verificare daca jucatorul a ajuns la numarul de puncte necesar pentru a primi inca o viata
			if (player.score >= NEXT_LIFE) {
				NEXT_LIFE += REGEN_LIFE;
				player.lives = Math.min(player.lives + 1, 2);
			}
		} else {
			this.x += this.xv * Math.cos(this.ang);
			this.y += this.yv * Math.sin(this.ang);
		}
	}
}

// clasa pentru racheta
class Projectile {
	constructor(x, y, angle, ship, vel = 5) {
		this.x = x;
		this.y = y;
		this.vel = vel;
		this.angle = angle;
		this.r = 4;
		this.ship = ship;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.fillStyle = 'lime';
		ctx.fill();
		ctx.closePath();
	}

	update() {
		// verificare daca a iesit racheta din ecran
		if (this.isOutOfBounds()) {
			this.ship.removeAddAmmo(this);
		}
		// verificare daca racheta a lovit asteroidul
		asteroids.forEach((ast) => {
			const distance = Math.sqrt(Math.pow(ast.x - this.x, 2) + Math.pow(ast.y - this.y, 2));
			if (distance < ast.r + this.r) {
				ast.life--;
				ast.r = Asteroid.sizes[ast.life - 1];
				ast.color = Asteroid.colors[ast.life - 1];
				// eliminare racheta de pe ecran si adaugare inapoi la numarul de rachete
				this.ship.removeAddAmmo(this);
			}
		});
		this.x += this.vel * Math.cos(this.angle);
		this.y += this.vel * Math.sin(this.angle);
	}

	// verificare daca racheta este in afara ecranului
	isOutOfBounds() {
		return this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0;
	}
}

class Ship {
	constructor(l = 30, vel = 4) {
		this.score = 0;
		this.l = l;
		this.x = canvas.width / 2;
		this.y = canvas.height / 2 - this.l - 20;
		this.r = (this.l * Math.sqrt(3)) / 2;
		this.angle = -Math.PI / 2;
		this.xVel = vel;
		this.yVel = vel;
		this.lives = 2;
		this.points = calcEchTriangle(this.r, this.angle, this.x, this.y);
		this.color = 'white';
		this.controls = {
			left: false,
			right: false,
			up: false,
			down: false,
			rotateRight: false,
			rotateLeft: false,
		};
		this.ammo = 3;
		this.projectiles = [];

		// listener pentru controalele jucatorului
		document.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'x':
					if (this.ammo > 0) {
						this.projectiles.push(new Projectile(this.points.a.x, this.points.a.y, this.angle, this));
						this.ammo -= 1;
					}
					break;
				case 'c':
					this.controls.rotateRight = true;
					break;
				case 'z':
					this.controls.rotateLeft = true;
					break;
				case 'ArrowLeft':
					this.controls.left = true;
					break;
				case 'ArrowRight':
					this.controls.right = true;
					break;
				case 'ArrowUp':
					this.controls.up = true;
					break;
				case 'ArrowDown':
					this.controls.down = true;
					break;
			}
		});
		document.addEventListener('keyup', (e) => {
			switch (e.key) {
				case 'c':
					this.controls.rotateRight = false;
					break;
				case 'z':
					this.controls.rotateLeft = false;
					break;
				case 'ArrowLeft':
					this.controls.left = false;
					break;
				case 'ArrowRight':
					this.controls.right = false;
					break;
				case 'ArrowUp':
					this.controls.up = false;
					break;
				case 'ArrowDown':
					this.controls.down = false;
					break;
			}
		});
	}

	// calcul coordonate triunghi
	calcPoints() {
		this.points = calcEchTriangle(this.r, this.angle, this.x, this.y);
	}

	// desen triunghi
	drawTriangle() {
		ctx.strokeStyle = this.color;
		ctx.lineWidth = '3';
		ctx.beginPath();
		ctx.moveTo(this.points.a.x, this.points.a.y);
		ctx.lineTo(this.points.b.x, this.points.b.y);
		ctx.moveTo(this.points.a.x, this.points.a.y);
		ctx.lineTo(this.points.c.x, this.points.c.y);
		ctx.stroke();
		ctx.closePath();
	}

	// desen cerc, un fel de hitbox
	drawCircleOutline() {
		ctx.beginPath();
		ctx.fillStyle = 'rgba(255,255,255,0.3)';
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	// desen
	drawSmallTriangle() {
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = '4';
		ctx.beginPath();
		ctx.moveTo(this.points.a.x, this.points.a.y);
		let nextX = (this.points.b.x - this.points.a.x) / 2.5;
		let nextY = (this.points.b.y - this.points.a.y) / 2.5;
		ctx.lineTo(this.points.a.x + nextX, this.points.a.y + nextY);
		ctx.moveTo(this.points.a.x, this.points.a.y);
		nextX = (this.points.c.x - this.points.a.x) / 2.5;
		nextY = (this.points.c.y - this.points.a.y) / 2.5;
		ctx.lineTo(this.points.a.x + nextX, this.points.a.y + nextY);
		ctx.stroke();
		ctx.closePath();
	}

	// desen nava + proiectile
	draw() {
		this.calcPoints();
		// this.drawCircleOutline();
		this.drawTriangle();
		this.drawSmallTriangle();
		this.projectiles.forEach((proj) => {
			proj.draw();
		});
	}

	// verificare daca iese nava din ecran
	isOutOfBounds() {
		const dir = {
			l: false,
			r: false,
			u: false,
			d: false,
		};
		if (this.x + this.r > canvas.width - 1) {
			dir.r = true;
		}
		if (this.x - this.r < 1) {
			dir.l = true;
		}
		if (this.y + this.r >= canvas.height) {
			dir.d = true;
		}
		if (this.y - this.r <= 0) {
			dir.u = true;
		}
		return dir;
	}

	// functie pentru a scoate racheta si a adauga una noua
	removeAddAmmo(proj) {
		this.projectiles.splice(this.projectiles.indexOf(proj), 1);
		this.ammo += 1;
	}

	// verificare coliziune cu asteroizii + restart
	checkCollision() {
		asteroids.forEach((ast) => {
			const distance = Math.sqrt(Math.pow(ast.x - this.x, 2) + Math.pow(ast.y - this.y, 2));
			if (distance <= ast.r + this.r) {
				this.lives = Math.max(this.lives - 1, -1);
				restartGame();
			}
		});
	}

	// update nava + proiectile trase
	update() {
		this.checkCollision();
		this.projectiles.forEach((proj) => {
			proj.update();
		});
		if (this.controls.rotateRight) {
			this.angle = (this.angle % (2 * Math.PI)) + 0.06;
		}
		if (this.controls.rotateLeft) {
			this.angle = (this.angle % (2 * Math.PI)) - 0.06;
		}
		const dir = this.isOutOfBounds();
		// daca nu iese din ecran si este apasat butonul, miscare nava
		if (!dir.l && this.controls.left) {
			this.x = this.x - this.xVel;
		}
		if (!dir.r && this.controls.right) {
			this.x = this.x + this.xVel;
		}
		if (!dir.u && this.controls.up) {
			this.y = this.y - this.yVel;
		}
		if (!dir.d && this.controls.down) {
			this.y = this.y + this.yVel;
		}
	}
}

let player = new Ship(30);
let asteroids = [];

let alive = 0;

// controale mobile (touch)
const mobileUp = {
	r: 25,
	x: 75,
	y: canvas.height - 140,
	pressed: false,
	key: 'ArrowUp',
	text: '⬆️',
};
const mobileDown = {
	r: 25,
	x: 75,
	y: canvas.height - 40,
	pressed: false,
	key: 'ArrowDown',
	text: '⬇️',
};
const mobileLeft = {
	r: 25,
	x: 35,
	y: canvas.height - 90,
	pressed: false,
	key: 'ArrowLeft',
	text: '⬅️',
};
const mobileRight = {
	r: 25,
	x: 115,
	y: canvas.height - 90,
	pressed: false,
	key: 'ArrowRight',
	text: '➡️',
};
const rotateLeft = {
	r: 20,
	x: canvas.width - 100,
	y: canvas.height - 40,
	pressed: false,
	key: 'z',
	text: '↪️',
};
const rotateRight = {
	r: 20,
	x: canvas.width - 50,
	y: canvas.height - 40,
	pressed: false,
	key: 'c',
	text: '↩️',
};
const shoot = {
	r: 20,
	x: canvas.width - 75,
	y: canvas.height - 90,
	pressed: false,
	key: 'x',
	text: '🚀',
};
const restart = {
	l: 100,
	h: 50,
	x: canvas.width / 2 - 150,
	y: canvas.height - 75,
	pressed: false,
	keyCode: 'Enter',
	text: 'Restart',
};
const saveMobile = {
	l: 100,
	h: 50,
	x: canvas.width / 2 + 50,
	y: canvas.height - 75,
	pressed: false,
	keyCode: 'Space',
	text: 'Save',
};
const mobileControls = [mobileUp, mobileDown, mobileLeft, mobileRight, rotateLeft, rotateRight, shoot];
const mobileMenus = [restart, saveMobile];

const checkMobileTouch = (control, x, y) => {
	if (x >= control.x - control.r && x <= control.x + control.r && y >= control.y - control.r && y <= control.y + control.r) {
		return true;
	}
	return false;
};

const checkMobileMenuTouch = (control, x, y) => {
	if (x >= control.x && x <= control.x + control.l && y >= control.y && y <= control.y + control.h) {
		return true;
	}
	return false;
};

// listenere controale mobile
mobileControls.forEach((control) => {
	document.addEventListener('touchstart', (e) => {
		const touch = e.touches[0];
		const x = touch.clientX;
		const y = touch.clientY;
		control.pressed = checkMobileTouch(control, x, y);
		if (!OVER && control.pressed) {
			document.dispatchEvent(new KeyboardEvent('keydown', { key: control.key }));
		}
	});
	document.addEventListener('touchend', (e) => {
		control.pressed = false;
		document.dispatchEvent(new KeyboardEvent('keyup', { key: control.key }));
	});
});
mobileMenus.forEach((control) => {
	document.addEventListener('touchstart', (e) => {
		const touch = e.touches[0];
		const x = touch.clientX;
		const y = touch.clientY;
		control.pressed = checkMobileMenuTouch(control, x, y);
		if (OVER && control.pressed) {
			document.dispatchEvent(new KeyboardEvent('keydown', { code: control.keyCode, bubbles: true }));
		}
	});
});

// localStorage.removeItem('scores');

// listener pentru restart
const listenRestart = (e) => {
	if (e.key === 'Enter' || e.code === 'Enter') {
		// DEZACTIVAT - salvare scor cu nume random in local storage daca userul nu a introdus numele
		// if (saved === false && player.score > 0) {
		// 	const randomNr = randomNumber(0, 10000);
		// 	const noName = `NoName-${randomNr}`;
		// 	const scores = JSON.parse(localStorage.getItem('scores')) || {};
		// 	scores[noName] = player.score;
		// 	localStorage.setItem('scores', JSON.stringify(scores));
		// }
		document.removeEventListener('keydown', listenRestart);
		restartGame(true);
	}
};

// listener pentru salvat scor
const saveScore = (e) => {
	if ((e.keyCode === 32 || e.code === 'Space') && player.score > 0) {
		let inputName = prompt('Enter your name(max 15 char)', '');
		// salvare scor in local storage
		const scores = JSON.parse(localStorage.getItem('scores')) || {};
		if (inputName.length > 15) {
			inputName = inputName.substring(0, 15);
		}
		scores[inputName] = player.score;
		localStorage.setItem('scores', JSON.stringify(scores));
		saved = true;
		document.removeEventListener('keydown', saveScore);
	}
};

function loop() {
	ctx.fillStyle = '#111';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	if (isMobile) {
		ctx.font = '24px Arial';
	} else {
		ctx.font = '36px Arial';
	}
	ctx.textAlign = 'center';
	// verificare daca jocul este in desfasurare sau s-a terminat
	if (!OVER) {
		player.draw();
		player.update();
		asteroids.forEach((asteroid) => {
			asteroid.draw();
			asteroid.update();
		});
		// numarat asteroizi ramasi
		asteroids = asteroids.filter((asteroid) => !asteroid.dead);
		alive = asteroids.length;

		if (isMobile) {
			// desenat controale mobile
			mobileControls.forEach((control) => {
				ctx.beginPath();
				ctx.arc(control.x, control.y, control.r, 0, 2 * Math.PI);
				ctx.fillStyle = control.pressed ? 'red' : 'white';
				ctx.fill();
				ctx.font = '20px Arial';
				ctx.fillText(control.text, control.x, control.y + 5);
				ctx.closePath();
			});
		}
	} else {
		ctx.fillText(`Game Over`, canvas.width / 2, canvas.height / 2 - 100);
		ctx.fillText("Press 'enter' to restart", canvas.width / 2, canvas.height / 2 - 50);
		ctx.fillText(`YOUR SCORE WAS: ${player.score}`, canvas.width / 2, canvas.height / 2);
		ctx.fillText("Press 'space' to save your score", canvas.width / 2, canvas.height / 2 + 50);
		// desenat meniu mobil
		if (isMobile) {
			mobileMenus.forEach((control) => {
				ctx.fillStyle = 'white';
				ctx.fillRect(control.x, control.y, control.l, control.h);
				ctx.fillStyle = 'black';
				ctx.fillText(control.text, control.x + control.l / 2, control.y + control.h / 2 + 5);
			});
		}

		// lista scoruri in dreapta sus
		const scores = JSON.parse(localStorage.getItem('scores')) || {};
		const sortedScores = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
		ctx.textAlign = 'right';
		ctx.font = '24px Arial';
		ctx.fillStyle = 'white';
		ctx.fillText('Highscores', canvas.width - 20, 40);
		ctx.font = '20px Arial';
		for (let i = 0; i < Math.min(5, sortedScores.length); i++) {
			ctx.fillText(`${sortedScores[i]} -- ${scores[sortedScores[i]]}`, canvas.width - 20, 90 + i * 30);
		}
	}

	ctx.fillStyle = 'white';
	ctx.font = '24px Arial';
	ctx.textAlign = 'center';
	// texte informationale in stanga sus
	ctx.fillText(`Lives: ${player.lives + 1}`, 60, 50);
	ctx.fillText(`Score: ${player.score}`, 60, 100);
	ctx.fillText(`Life at: ${NEXT_LIFE}`, 68, 150);
	// ctx.fillText(`Incrementing asteroids by: ${ADD_AST}`, 165,200);
	// ctx.fillText(`Asteroids: ${alive}`, 80, 250);
}

setInterval(loop, 1000 / 60);

// adaugare asteroizi la 2 secunde
setInterval(() => {
	const newAsteroids = Array.from({ length: ADD_AST }, () => new Asteroid());
	if (alive < MAX_ASTEROIDS) {
		asteroids.push(...newAsteroids);
	}
}, 2000);

// o data la 30 de secunde, creste cu 5 numarul de asteroizi adaugati
setInterval(() => (ADD_AST += 5), 30000);
