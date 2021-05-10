// Variables
const buttonContainer = document.querySelector('.button-container');
const startBtn = document.getElementById('start-btn');
const container = document.querySelector('.container');
const grid = document.getElementById('cow-grid');
const boxes = document.querySelectorAll('.box');
const boxesArray = Array.from(boxes);
const output = document.getElementById('output');
let isAppActive = false;
let interval;

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
function startDance() {
	// interval = setInterval(animateCows, 123510); // 123.5s 2min 3.5s || 4min 7s
	interval = setInterval(animateCows, 10000); // 123.5s 2min 3.5s || 4min 7s
}
function stopDance() {
	clearInterval(interval);
}

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
	startDance();
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
		animateCows();
		stopDance();
	}
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

function despawnCows(amount) {
	for (let i = 0; i < amount; i++) {
		grid.children[0].remove();
	}
}

// App initial state
function initialState() {
	grid.innerHTML = '';
	output.style.display = 'none';
	document.body.style.backgroundImage = 'radial-gradient(#fff, #aaa)';
}

let timeOuts = [];
let counter = 1;

// Cow dance logic
function animateCows() {
	let delay = 1000;

	if (isAppActive) {
		timeOuts[0] = setTimeout(() => {
			populateGrid(2, 1);
		}, delay); // 2cows
		timeOuts[1] = setTimeout(() => {
			populateGrid(2, 2);
		}, delay * 2); // 4 cows
		timeOuts[2] = setTimeout(() => {
			populateGrid(4, 4);
		}, delay * 3); // 8 cows
		timeOuts[3] = setTimeout(() => {
			populateGrid(8, 8);
		}, delay * 4); // 16 cows
		timeOuts[4] = setTimeout(() => {
			populateGrid(8, 16);
		}, delay * 5); // 32 cows
		timeOuts[5] = setTimeout(() => {
			dePopulateGrid(8, 16);
		}, delay * 6); // 16 cows
		timeOuts[6] = setTimeout(() => {
			dePopulateGrid(4, 8);
		}, delay * 7); // 8 cows
		timeOuts[7] = setTimeout(() => {
			dePopulateGrid(2, 4);
		}, delay * 8); // 4 cows
		timeOuts[8] = setTimeout(() => {
			dePopulateGrid(2, 2);
		}, delay * 9); // 2 cows
		timeOuts[9] = setTimeout(() => {
			removeGrid();
		}, delay * 10); // 1 cow
	} else {
		timeOuts.forEach((timeOut) => {
			clearTimeout(timeOut);
		});
	}
}

function populateGrid(columns, cows) {
	grid.style.cssText = `grid-template-columns: repeat(${columns}, 1fr);`;
	spawnCows(cows);
}

function dePopulateGrid(columns, cows) {
	grid.style.cssText = `grid-template-columns: repeat(${columns}, 1fr);`;
	despawnCows(cows);
}

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
	output.style.display = 'block';
	if (isRunning == false) {
		isRunning = true;
		increment();
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
