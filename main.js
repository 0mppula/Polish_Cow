// Variables
const buttonContainer = document.querySelector('.button-container');
const startBtn = document.getElementById('start-btn');
const container = document.querySelector('.container');
const grid = document.getElementById('cow-grid');
const boxes = document.querySelectorAll('.box');
const boxesArray = Array.from(boxes);
const output = document.getElementById('output');
let isAppActive = false;

// Sound
/* Song used in this website:
Cypis - Gdzie jest biały węgorz ? (Zejście)
https://www.youtube.com/watch?v=qrxv0JNVtgY&ab_channel=Cypisolo */
const music = new Audio('audio/cow.mp3');

// Evenlisteners
startBtn.addEventListener('click', appStart); /* starts app */
window.addEventListener('keyup', appStop); /* stops timer and initializes app */
window.addEventListener('load', initialState); // App initial state

// Cow Dance Loop
setInterval(animateCows, 123510); // 123.5s 2min 3.5s || 4min 7s

// Start App
function appStart() {
	grid.style.display = 'block';
	isAppActive = true;
	spawnCows(1);
	animateCows();
	startTimer();
	buttonContainer.style.display = 'none';
	music.loop = true; // loop music
	music.play();
	let body = document.body;
	body.style.backgroundImage = 'none';
	setTimeout(() => {
		output.style.display = 'block';
	}, 500);
}

// Kill App
function appStop(e) {
	let userInput = e.keyCode;
	if (userInput === 27) {
		isAppActive = false;
		stopTimer();
		initialState();
		buttonContainer.style.display = 'flex';
		music.pause();
		music.currentTime = 0;
		window.clearTimeout();
		console.log('timer reset, app restarted');
	}
}

// first cow
function initialCow() {
	let newCow = document.createElement('div');
	newCow.classList.add('box');
	/* Dancing cow GIF by:
	https://tenor.com/es/ver/cow-dancing-animal-gif-16570099 */
	newCow.innerHTML = `<img src="images/cow_right.gif" alt="">`;
	grid.append(newCow);
}

// spawn cows
function spawnCows(amount) {
	for (let i = 0; i < amount; i++) {
		let newCow = document.createElement('div');
		newCow.classList.add('box');
		/* Dancing cow GIF by:
		https://tenor.com/es/ver/cow-dancing-animal-gif-16570099 */
		newCow.innerHTML = `<img src="images/cow_right.gif" alt="">`;
		grid.append(newCow);
	}
}

// App initial state
function initialState() {
	grid.innerHTML = '';
	grid.style.display = 'none';
	output.style.display = 'none';
	document.body.style.backgroundImage = 'radial-gradient(#fff, #aaa)';
}

// Cow dance logic
function animateCows() {
	let delay = 3000;

	setTimeout(() => {
		twoColGrid(), spawnCows(1);
	}, delay); // 2cows
	setTimeout(() => {
		spawnCows(2);
	}, delay * 2); // 4 cows
	setTimeout(() => {
		fourColGrid();
		spawnCows(4);
	}, delay * 3); // 8 cows
	setTimeout(() => {
		eightColGrid();
		spawnCows(8);
	}, delay * 4); // 16 cows
	setTimeout(() => {
		eightColGrid();
		spawnCows(16);
	}, delay * 5); // 32 cows
	setTimeout(() => {
		removeEightColGrid();
	}, delay * 6); // 8 cows
	setTimeout(() => {
		removeFourColGrid();
	}, delay * 7); // 4 cows
	setTimeout(() => {
		removeTwoColGrid();
	}, delay * 8); // 2 cows
	setTimeout(() => {
		removeGrid();
	}, delay * 9); // 1 cow
}

function twoColGrid() {
	grid.style.display = 'grid';
} // 2x2

function fourColGrid() {
	grid.style.cssText =
		'grid-template-columns: repeat(4, 1fr);, grid-template-rows: repeat(2, 1fr);';
} // 4x2

function eightColGrid() {
	grid.style.cssText = 'grid-template-columns: repeat(4, 1fr);';
} // 4x4

function removeEightColGrid() {
	grid.style.cssText =
		'grid-template-columns: repeat(4, 1fr);, grid-template-rows: repeat(2, 1fr);';
	for (let i = 0; i <= 15; i++) {
		grid.children[0].remove();
	}
} // 4x2

function removeFourColGrid() {
	grid.style.cssText = 'grid-template-columns: repeat(2, 1fr);';
	for (let i = 0; i <= 7; i++) {
		grid.children[0].remove();
	}
} // 2x2

function removeTwoColGrid() {
	grid.style.cssText = 'grid-template-columns: repeat(2, 1fr);';
	for (let i = 0; i <= 1; i++) {
		grid.children[0].remove();
	}
} // 2x1

function removeGrid() {
	grid.style.display = 'block';
	for (let i = 0; i <= 0; i++) {
		grid.children[0].remove();
	}
} // 1
// End Cow dance logic

// Timer
let isRunning = false;
let time = 0;

// Start timer
function startTimer() {
	if (isRunning == false) {
		isRunning = true;
		increment();
		console.log('timer running');
	}
}

// Stop timer
function stopTimer() {
	isRunning = false;
	time = -1;
	output.innerHTML = '0:00:00:00';
}

function increment() {
	if (isRunning == true) {
		setTimeout(() => {
			time++;
			let hours = Math.floor(time / 10 / 60 / 60);
			let mins = Math.floor(time / 10 / 60);
			let secs = Math.floor((time / 10) % 60); // returns remainder when divided (always shows a number below 60)
			let tenths = time % 10; // returns remainder when divided (always shows a number below 10)
			if (mins < 10) {
				mins = '0' + mins;
			}
			if (secs < 10) {
				secs = '0' + secs;
			}
			output.innerHTML = hours + ':' + mins + ':' + secs + ':' + tenths + '0';
			increment();
		}, 100);
	}
}
