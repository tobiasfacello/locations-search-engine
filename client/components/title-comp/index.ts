class TitleComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		this.render();

		const style = document.createElement("style");
		style.textContent = `

        .title {
            margin: 0 auto;
            padding: 5px;
            font-family: "Montserrat", sans-serif;
            font-weight: Bold;
            text-align: center;
            color: var(--white);
        }

        @media (min-width: 375px) {
            .title {
                font-size: 50px;
                line-height: 55px;
                word-spacing: 10px;
            }
        }

        @media (min-width: 580px) {
            .title {
                width: 500px;
                font-size: 50px;
                line-height: 60px;
            }
        }

        @media (min-width: 768px) {
            .title {
                font-size: 50px;
                line-height: 60px;
            }
        }

        @media (min-width: 960px) {
            .title {
                width: 70%;
                font-size: 70px;
                line-height: 75px;    
            }
        }
        `;

		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <h1 class="title">${this.textContent}</h1>
        `;
	}
}

customElements.define("title-comp", TitleComponent);
