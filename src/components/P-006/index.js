import TemplateToast from "./template.js";
import StyleToast from "./styles.js";
import BaseComponent from "./BaseComponent.js";

class ToastCard extends BaseComponent {
    #btnClose = null;
    #toast = null;
    #toastTitle = null;
    #toastFooter = null;
    #toastMessage = null;
    #timer = null;

    #types = {
        success: {
            style: "success",
            title: "Success",
        },
        info: {
            style: "info",
            title: "Information",
        },
        error: {
            style: "error",
            title: "Error",
        },
        warn: {
            style: "warn",
            title: "Warning",
        },
        default: {
            style: "default",
            title: "Default",
        },
    };

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // inicializamos la carga de estillos y el template del componente
        this.shadowRoot.adoptedStyleSheets = [StyleToast];
        this.shadowRoot.appendChild(TemplateToast.content.cloneNode(true));
        this.#btnClose = this.shadowRoot.querySelector("#btn-close");
        this.#toast = this.shadowRoot.querySelector("#toast");
        this.#toastTitle = this.shadowRoot.querySelector("#toast-title");
        this.#toastFooter = this.shadowRoot.querySelector("#toast-footer");
        this.#toastMessage = this.shadowRoot.querySelector("#toast-message");
    }

    connectedCallback() {
        // Hacemos el primer render al conectar el componente
        this.requestRender();
    }

    static get observedAttributes() {
        return ["type", "seconds", "message"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this.requestRender();
        }
    }

    render() {
        const TYPE = this.getAttribute("type") || "default";
        const { style, title } = this.#types[TYPE] || this.#types["default"];
        this.#toast.className = `toast ${style}`;
        this.#toastTitle.textContent = title;
        this.#toastMessage.textContent = this.getAttribute("message") || "";
        const SECONDS = this.getAttribute("seconds") || 3;
        this.#toastFooter.style.animation = "none";
        void this.#toastFooter.offsetHeight; // Forzar reflow
        this.#toastFooter.style = `animation: progreso ${SECONDS}s linear forwards;`;
        console.log("🚀 %c[RENDER EJECUTADO EN EL DOM]", "color: #00ff00; font-weight: bold;");
    }
}

window.customElements.define("toast-card", ToastCard);

const types = ["success", "info", "error", "warn", "default"];

const $COMPONENT = document.querySelector("toast-card");
const $BTN = document.querySelector("#btn-random");
$BTN.addEventListener("click", () => {
    const random = Math.floor(Math.random() * (6 - 1) + 1);
    $COMPONENT.setAttribute("type", types[random - 1]);
    $COMPONENT.setAttribute("message", `This is a ${types[random - 1]} notification.`);
    $COMPONENT.setAttribute("seconds", random * 2);
});
