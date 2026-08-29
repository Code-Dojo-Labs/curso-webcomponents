class Timer extends HTMLElement {
    constructor() {
        super();
        this.count = 0;
        this.temporizador = null;
        this.attachShadow({ mode: "open" });
    }

    // 1. Detecta el componente montado en el DOM
    connectedCallback() {
        this.render();
        if (this.hasAttribute("seconds")) {
            this.count = parseInt(this.getAttribute("seconds"), 10);
            this.#updateTimer();
            this.#startTimer();
        }
        console.log("Component mounted in the DOM");
    }

    // 2. Detecta el componente desmontado del DOM
    disconnectedCallback() {
        if (this.temporizador !== null) {
            clearInterval(this.temporizador);
            this.temporizador = null;
            this.count = 0;
            console.log("Component unmounted from the DOM");
        }
    }

    // 3. Definicion de los atributos que se van a observar
    static get observedAttributes() {
        return ["seconds"];
    }

    // 4. Detecta cambios en los atributos observados
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
        if (name === "seconds") {
            this.render();
            this.count = parseInt(newValue, 10);
            this.#startTimer();
        }
    }

    // 4. Permite rederizar el componente
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host * {
                    padding: 0;
                    margin: 0;
                }
                :host {
                    display: block;
                    width: fit-content;
                    margin: 10px auto;
                }
                :host div {
                    background-color: #e6f9ff;
                    border: 2px solid #0099cc;
                    border-radius: 10px;
                    padding: 15px;
                    width: 300px;
                }
                :host div p {
                    color: #004d66;
                    font-size: 1.2 rem;
                    font-weight: bold;
                    text-align: center;
                }
                :host div:hover {
                    background-color: #00394d;
                    border: 2px solid #e6f9ff;
                    cursor: pointer;
                    color: #FFF;
                }
                :host div:hover p {
                    color: #FFF;
                }
            </style>
            <div>
                <p>
                    ${this.count} SECONDS
                </p>
            </div>
        `;
    }

    // metodos privados
    #startTimer() {
        if (this.temporizador === null) {
            this.temporizador = setInterval(() => {
                this.count--;
                this.#updateTimer();
                if (this.count === 0) {
                    clearInterval(this.temporizador);
                    this.temporizador = null;
                    this.setAttribute("seconds", "60");
                }
            }, 100);
        }
    }

    #updateTimer() {
        const DISPLAY = this.shadowRoot.querySelector("p");
        if (DISPLAY) {
            DISPLAY.textContent = `${this.count} SECOND${this.count > 1 ? "S" : ""}`;
        }
    }
}

window.customElements.define("dev-timer", Timer);
