const btn = document.querySelector(".clockCnt__btn");
const changeClockDiv = document.querySelector(".changeClockMode");

class Clock {
	constructor() {
		this.init();
		this.changeClock();
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
		const template = document.querySelector("#analogClock");
		const clone = template.content.cloneNode(true);

		const title = clone.querySelector("h2");
		title.innerText = "isOk";

		change.append(clone);
	}

	digitTemplateModifier() {
		const change = document.querySelector(".changeClockMode");
		const el = document.querySelector("h2");
		const template = document.querySelector("#digitClock");
		const clone = template.content.cloneNode(true);

		const digitClock = clone.querySelector(".digitClock");

		setInterval(() => {
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

			digitClock.innerText =
				hour + ":" + minute + ":" + second;
		}, 1000);

		change.replaceChild(clone, el);
	}
}

new Clock();
