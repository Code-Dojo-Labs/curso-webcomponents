class StatusBadgeTimer extends HTMLElement {
    #timer;

    constructor() {
        super();
        this.#timer = null;
    }

    connectedCallback() {
        this.render();
        this.#startTimer();
    }

    // Limpia el temporizador cuando el componente se desconecta del DOM
    disconnectedCallback() {
        if (this.#timer) {
            clearInterval(this.#timer);
            this.#timer = null;
        }
    }

    // Listado de atributos del componente
    static get observedAttributes() {
        return ["state", "seconds"];
    }

    // Tomamos acción cuando alguno de los atributos observados cambia
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
            if (name === "state") this.render();
        }
    }

    // Renderiza el componente
    render() {
        // Buscamos si existe el atributo state para este caso utlizamos un atributto booleano
        const STATE = this.hasAttribute("state") || false;
        // Generamos el template HTML del componente
        this.innerHTML = `
            <span class="badge badge-${STATE ? "active" : "offline"}">
                ${STATE ? "Online" : "Offline"}
            </span>
        `;
    }

    // Inicia el temporizador que alterna el estado del badge cada cierto número de segundos
    #startTimer() {
        const SECONDS = this.getAttribute("seconds") || 1;
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

// Definición del custom element "status-badge-timer"
window.customElements.define("status-badge-timer", StatusBadgeTimer);
