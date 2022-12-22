class FormComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();
		this.render();

		const style = document.createElement("style");

		style.textContent = `
            .form {
                width: 100%;
                height: 200px;
				display: flex;
                flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
			}
        `;

		this.shadow.appendChild(style);
		this.addListeners();
	}

	render() {
		this.shadow.innerHTML = `
        <form class="form">
            <search-bar class="search">Enter a location</search-bar>
		    <btn-comp class="submit-btn" blueBtn resizedBtn>Search</btn-comp>
        </form>
        `;
	}

	addListeners() {
		const searchFormEl: HTMLFormElement =
			this.shadow.querySelector(".form");
		const searchCompEl: HTMLElement = this.shadow.querySelector(".search");
		const shadowInputEl: HTMLInputElement =
			searchCompEl.shadowRoot.querySelector(".input");
		const btnEl: HTMLElement = this.shadow.querySelector(".submit-btn");
		const shadowBtnEl: HTMLButtonElement =
			btnEl.shadowRoot.querySelector(".button");

		searchFormEl.addEventListener("submit", (e) => {
			e.preventDefault();
			const locationValue = shadowInputEl.value;
			console.log(locationValue);
		});

		shadowBtnEl.addEventListener("click", (e) => {
			e.preventDefault();
			searchFormEl.requestSubmit();
		});
	}
}

customElements.define("form-comp", FormComponent);
