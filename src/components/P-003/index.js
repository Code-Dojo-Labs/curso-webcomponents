// Permite agregar styles inyectados al componente
const STYLES = new CSSStyleSheet();
STYLES.replaceSync(`
    :host {
        --bg-active: #394d00;
        --bg-offline: #5a5a5a;
    }
    :host span {
        display: inline-block;
        color: white;
        font-weight: bold;
        font-size: 14px;
        font-style: italic;
        padding: 5px 20px;
        border-radius: 5px;
        text-transform: uppercase;
    }
    .badge-active {
        background-color: var(--bg-active);
    }
    .badge-offline {
        background-color: var(--bg-offline);
    }
`);

class StatusBadgeDom extends HTMLElement {
    #timer;
    constructor() {
        super();
        this.#timer = null;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [STYLES];
    }

    static get observedAttributes() {
        return ["state", "seconds"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === "state") this.render();
        }
    }

    connectedCallback() {
        this.render();
        this.#startTimer();
    }

    disconnectedCallback() {
        if (this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }
    }

    render() {
        // Buscamos si existe el atributo state para este caso utlizamos un atributto booleano
        const STATE = this.hasAttribute("state") || false;
        // Generamos el template HTML del componente
        this.shadowRoot.innerHTML = `
            <span class="badge badge-${STATE ? "active" : "offline"}">
                ${STATE ? "Online" : "Offline"}
            </span>
        `;
    }

    #startTimer() {
        const SECONDS = this.getAttribute("seconds") || 0;
        if (SECONDS > 0) {
            this.#timer = setInterval(
                () => {
                    const GET_ATTRIBUTES = this.hasAttribute("state") || false;

                    if (!GET_ATTRIBUTES) this.setAttribute("state", "");
                    else this.removeAttribute("state");
                },
                parseInt(SECONDS, 10) * 1000,
            );
        }
    }
}

window.customElements.define("status-badge-dom", StatusBadgeDom);
