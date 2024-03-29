const btn = document.querySelector(".clockCnt__btn");
const changeClockDiv = document.querySelector(".changeClockMode");

class Clock {
	constructor() {
		this.init();
		this.changeClock();

		this.handleResizeClock(changeClockDiv);
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

	handleResizeClock(changeClockDiv) {
		const maxSize =
			window.innerWidth > window.innerHeight
				? window.innerHeight
				: window.innerWidth;
		let g = changeClockDiv.style.getPropertyValue(
			"--changeClockMode-width"
		);
		let scale = maxSize > 800 ? 800 / g : maxSize / g;
		changeClockDiv.style.setProperty(g, scale);
	}
}

new Clock();
