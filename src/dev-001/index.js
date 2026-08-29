class Alert extends HTMLElement {
    constructor() {
        super();
        // Creamos un shadow root
        this.attachShadow({ mode: "open" });
    }
    // Se monta el componente en el DOM
    connectedCallback() {
        this.render();
    }

    // Se realiza el renderizado del componente
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
                    background-color: #ffe6f0;
                    border: 2px solid #ff3385;
                    border-radius: 10px;
                    padding: 15px;
                    width: 300px;
                }
                :host div p {
                    color: #99003d;
                    font-size: 1.2rem;
                    text-align: center;
                    font-weight: bold;
                }
                :host div:hover {
                    background-color: #4d001f;
                    border: 2px solid #ffe6f0;
                    cursor: pointer;
                    color: #FFF;
                }
                :host div:hover p {
                    color: #FFF;
                    font-style: italic;
                }
            </style>
            <div>
                <p>
                    <slot></slot>
                </p>
            </div>
        `;
    }
}

// Registramos el componente personalizado
window.customElements.define("web-alert", Alert);
