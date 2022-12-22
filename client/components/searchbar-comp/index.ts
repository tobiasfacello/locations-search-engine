const redLocIcon = require("url:../../assets/icon-red-loc.png");

class InputComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();
		this.render();

		const style = document.createElement("style");

		style.textContent = `
			.input-container {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 25px;
				background: rgba(0, 0, 0, 0.2);
				box-shadow: 0 0px 3px rgba(0, 0, 0, 0.5);
			}
		
			.icon {
				width: 10%;
				margin: 5px;
			}

			.input {
                width: 90%;
                height: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-family: "Montserrat", sans-serif;
                font-weight: 500;
                font-size: 17px;
				color: var(--light);
				text-align: center;
				border: none;
				border-radius: 0 25px 25px 0;
				background: transparent;

			}

			.input::placeholder {
				font-weight: 400;
			}

			@media (min-width: 1024px) {
				.input::placeholder {
					color: var(--light-placeholder);
				}
			}

			.input:focus {
				outline: none;
				background:rgba(255, 255, 255, 0.1);
				box-shadow: 0 0px 3px rgba(255, 255, 255, 0.5);
			}
        `;

		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <div class="input-container">
			<img class="icon" src="${redLocIcon}">
			<input type="text" class="input" name="location" placeholder="${this.textContent}">
        </div>
        `;
	}

	// addListeners() {}
}

customElements.define("search-bar", InputComponent);
