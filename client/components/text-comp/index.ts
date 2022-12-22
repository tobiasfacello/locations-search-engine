class SmallTextComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
            .text {
                width: 100%;
                margin: 0;
                padding: 0;
                margin-bottom: 10px;
                font-family: "Open Sans", sans-serif;
                font-weight: 500;
                font-size: 20px;
                text-align: center;
                color: var(--light);
            }

            @media (min-width: 768px) {
                .text {
                    width: 380px;
                }
            }

            .text.centered {
                width: 100%;
                margin: 0;
            }

            .title-styled {
                margin: 0;
                font-family: "Montserrat", sans-serif;
            }
        `;

		this.render();
		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <p class="text 
        ${this.hasAttribute("isCentered") ? "centered" : ""}
        ${this.hasAttribute("titleStyled") ? "title-styled" : ""}
        ">
            ${this.textContent}
        </p>
        `;
	}
}
customElements.define("text-comp", SmallTextComponent);
