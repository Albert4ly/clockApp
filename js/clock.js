const btn = document.querySelector(".clockCnt__btn");
const changeClockDiv = document.querySelector(".changeClockMode");
const clockCnt = document.querySelector(".clockCnt");
const clockCntClock = document.querySelector(".clockCnt__clock");

class Clock {
	constructor() {
		this.windowProperty = {
			cursorX: 0,
			cursorY: 0,
			isDraggable: false,
			left: 0,
			top: 0,
			transformOffset: 0,
		};

		this.init();
		this.changeClock();
		window.addEventListener(
			"mouseDown",
			(event) => console.log(event)
			// this.handleMouseDown(event);
		);
		window.addEventListener(
			"mouseUp",
			(event) => (this.windowProperty.isDraggable = false)
		);
		window.addEventListener(
			"mouseDown",
			(event) => (this.windowProperty.isDraggable = false)
		);
		window.addEventListener("mouseDown", (event) =>
			this.draggClockWindow(event)
		);
	}

	handleMouseDown(event) {
		const { top, left, width } = this.clockElement.getBoundingClientRect();

		this.windowProperty = {
			cursorX: event.clientX,
			cursorY: event.clientY,
			isDraggable: true,
			left,
			top,
			transformOffset: width / 2,
		};
	}

	draggClockWindow(event) {
		if (!this.windowProperty.isDraggable) {
			return;
		}

		this.clockElement.style.left = `${
			event.clientX -
			this.windowProperty.cursorX +
			this.windowProperty.left +
			this.windowProperty.transformOffset
		}px `;
		this.clockElement.style.top = `${
			event.clientY -
			this.windowProperty.cursorY +
			this.windowProperty.top +
			this.windowProperty.transformOffset
		}px `;
	}

	init() {
		this.analogTemplateModifier();
	}

	changeClock() {
		btn.addEventListener("click", (e) => {
			changeClockDiv.classList.toggle("changeClockMode--analog");

			if (changeClockDiv.classList.contains("changeClockMode--analog")) {
				this.analogTemplateModifier();
			}
			if (!changeClockDiv.classList.contains("changeClockMode--analog")) {
				this.digitTemplateModifier();
			}
		});
	}

	analogTemplateModifier() {
		const change = document.querySelector(".changeClockMode");
		const template = document.querySelector("#analogClockCnt");
		const el = document.querySelector(".digitClockCnt");
		const clone = template.content.cloneNode(true);

		let hr = clone.querySelector(".arrowHr");
		let mi = clone.querySelector(".arrowMin");
		let se = clone.querySelector(".arrowSec");

		setInterval(() => {
			let date = new Date();

			let hour = date.getHours();
			let min = date.getMinutes();
			let sec = date.getSeconds();

			let hrRotation = 30 * hour + min / 2;
			let minRotation = 6 * min;
			let secRotation = 6 * sec;

			hr.style.transform = `rotate(${hrRotation}deg)`;
			mi.style.transform = `rotate(${minRotation}deg)`;
			se.style.transform = `rotate(${secRotation}deg)`;
		}, 1000);

		if (!el) {
			change.append(clone);
		}

		if (el) {
			change.replaceChild(clone, el);
		}
	}

	digitTemplateModifier() {
		const change = document.querySelector(".changeClockMode");
		const el = document.querySelector(".analogClock");
		const template = document.querySelector("#digitClockCnt");
		const clone = template.content.cloneNode(true);

		const digitClock = clone.querySelector(".digitClock");

		const digitInter = setInterval(() => {
			let date = new Date();

			let hour = date.getHours();
			let minute = date.getMinutes();
			let second = date.getSeconds();

			if (hour < 10) {
				hour = "0" + date.getHours();
			}
			if (minute < 10) {
				minute = "0" + date.getMinutes();
			}
			if (second < 10) {
				second = "0" + date.getSeconds();
			}

			digitClock.innerText = hour + ":" + minute + ":" + second;
		}, 1000);

		change.replaceChild(clone, el);
	}
}

new Clock();
