import { Router } from "@vaadin/router";

class ButtonComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();
		this.render();

		let style = document.createElement("style");
		style.textContent = `
        .button {
			min-width: 150px;
			width: 300px;
			height: 50px;
			font-family: "Open Sans", sans-serif;
			font-weight: 500;
			font-size: 17px;
			text-align: center;
			border: none;
			border-radius: 50px;
			color: #272A32;
			box-shadow: 0 0px 7px var(--blue);
            transition: 0.15s;
        }

		  .button:hover {
			cursor: pointer;
		  }

		@media (min-width: 768px) {
			.button {
				width: 380px;
			}
		}

		.resized-btn {
			width: 150px;
		}

		.blue-btn {
			color: #EEEEEE;
			background: var(--blue);
		}

        .blue-btn:hover {
            background: var(--lightblue);
        }
		`;

		this.shadow.appendChild(style);
		this.addListeners();
	}

	render() {
		this.shadow.innerHTML = `
        <button class="button
		${this.hasAttribute("resizedBtn") ? "resized-btn" : ""}
		${this.hasAttribute("blueBtn") ? "blue-btn" : ""} 
		"
		type="submit"
		${this.hasAttribute("path") ? `path="${this.getAttribute("path")}"` : ""}
		${this.hasAttribute("link") ? `link="${this.getAttribute("link")}"` : ""}
		>
            ${this.textContent}
        </button>
        `;
	}

	addListeners() {
		const buttonEl = this.shadow.querySelector(
			".button"
		) as HTMLButtonElement;

		buttonEl.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;
			if (target.hasAttribute("path")) {
				const route = target.getAttribute("path");
				Router.go(route);
			} else if (target.hasAttribute("link")) {
				const url = target.getAttribute("link");
				window.open(url, "_blank");
			}
		});
	}
}
customElements.define("btn-comp", ButtonComponent);
