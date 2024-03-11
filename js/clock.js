const btn = document.querySelector(".clockCnt__btn");
const changeClockDiv = document.querySelector(".changeClockMode");

class Clock {
	constructor() {
		// this.hour = date.getHours;

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
		const template = document.querySelector("#digitClock");
		const clone = template.content.cloneNode(true);

		const title = clone.querySelector("h2");
		title.innerText = "isOk2";

		change.append(clone);
	}
}

new Clock();
