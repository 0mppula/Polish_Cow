// Variables
const body = document.body;
const buttonContainer = document.querySelector('.button-container');
const startBtn = document.getElementById('start-btn');
const container = document.querySelector('.container');
const grid = document.getElementById('cow-grid');
const boxes = document.querySelectorAll('.box');
const boxesArray = Array.from(boxes);
const timer = document.querySelector('.timer');
const timerOutput = document.getElementById('timer-output');
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

// Cow Dance Loop
function startDance() {
	interval = setInterval(animateCows, 50000); // 123.5s 2min 3.5s || 4min 7s
}
function stopDance() {
	clearInterval(interval);
}

// Start App
function appStart() {
	isAppActive = true;
	toggleMusic();
	populateGrid(1, 1);
	animateCows();
	startTimer();
	toggleUI();
	startDance();
}

// Kill App
function appStop(e) {
	let userInput = e.keyCode;
	if (userInput === 27) {
		isAppActive = false;
		toggleMusic();
		stopTimer();
		toggleUI();
		animateCows();
		stopDance();
	}
}

function toggleMusic() {
	if (isAppActive) {
		music.loop = true; // loop music
		music.play();
	} else {
		music.pause();
		music.currentTime = 0;
	}
}

function toggleUI() {
	if (isAppActive) {
		buttonContainer.classList.toggle('hide', true);
		body.style.backgroundImage = 'none';
		body.style.backgroundColor = '#fbfbfb';
	} else {
		initialState();
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
	timer.classList.toggle('show', false);
	body.style.backgroundImage = 'radial-gradient(#fff, #aaa)';
	buttonContainer.classList.toggle('hide', false);
}

let timeOuts = [];
// Cow dance logic
function animateCows() {
	let delay = 5000;

	if (isAppActive) {
		timeOuts[0] = setTimeout(() => populateGrid(2, 1), delay); // 2cows
		timeOuts[1] = setTimeout(() => populateGrid(2, 2), delay * 2); // 4 cows
		timeOuts[2] = setTimeout(() => populateGrid(4, 4), delay * 3); // 8 cows
		timeOuts[3] = setTimeout(() => populateGrid(8, 8), delay * 4); // 16 cows
		timeOuts[4] = setTimeout(() => populateGrid(8, 16), delay * 5); // 32 cows
		timeOuts[5] = setTimeout(() => dePopulateGrid(8, 16), delay * 6); // 16 cows
		timeOuts[6] = setTimeout(() => dePopulateGrid(4, 8), delay * 7); // 8 cows
		timeOuts[7] = setTimeout(() => dePopulateGrid(2, 4), delay * 8); // 4 cows
		timeOuts[8] = setTimeout(() => dePopulateGrid(2, 2), delay * 9); // 2 cows
		timeOuts[9] = setTimeout(() => dePopulateGrid(1, 1), delay * 10); // 1 cow
	} else {
		timeOuts.forEach((timeOut) => {
			clearTimeout(timeOut);
		});
	}
}
// End Cow dance logic

function populateGrid(columns, cows) {
	grid.style.cssText = `grid-template-columns: repeat(${columns}, 1fr);`;
	spawnCows(cows);
}

function dePopulateGrid(columns, cows) {
	grid.style.cssText = `grid-template-columns: repeat(${columns}, 1fr);`;
	despawnCows(cows);
}

// Timer
let isRunning = false;
let time = 0;

function startTimer() {
	timer.classList.toggle('show', true);
	if (isRunning == false) {
		isRunning = true;
		increment();
	}
}

function stopTimer() {
	isRunning = false;
	time = -1;
	timerOutput.innerHTML = '0:00:00:00';
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
				mins = `0${mins}`;
			}
			if (secs < 10) {
				secs = `0${secs}`;
			}
			timerOutput.innerHTML = `${hours}:${mins}:${secs}:${tenths}0`;
			increment();
		}, 100);
	}
}
