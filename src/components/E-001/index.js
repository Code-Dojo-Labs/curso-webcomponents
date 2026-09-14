import TemplateToast from "./template.js";
import StyleToast from "./styles.js";

class NotificationToast extends HTMLElement {
    #btnClose = null;
    #toast = null;
    #toastTitle = null;
    #toastFooter = null;
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
        // se referencian aquí porque attributeChangedCallback puede dispararse antes que connectedCallback
        this.#btnClose = this.shadowRoot.querySelector("#btn-close");
        this.#toast = this.shadowRoot.querySelector("#toast");
        this.#toastTitle = this.shadowRoot.querySelector("#toast-title");
        this.#toastFooter = this.shadowRoot.querySelector("#toast-footer");
    }

    static get observedAttributes() {
        return ["type", "seconds"];
    }

    connectedCallback() {
        this.#btnClose.addEventListener("click", this.#handleManualClose);
        this.render();
    }

    disconnectedCallback() {
        if (this.#btnClose) {
            this.#btnClose.removeEventListener("click", this.#handleManualClose);
        }
        clearTimeout(this.#timer);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this.render();
        }
    }

    render() {
        const TYPE = this.getAttribute("type") || "default";
        const SECONDS = this.getAttribute("seconds") || 1;
        this.#toast.className = `toast ${this.#types[TYPE].style}`;
        this.#toastTitle.textContent = this.#types[TYPE].title;
        this.#toastFooter.style = `animation: progreso ${SECONDS}s linear forwards;`;
        this.#timer = setTimeout(
            () => {
                this.#removeToast(false);
            },
            parseFloat(SECONDS) * 1000,
        );
    }

    #handleManualClose = (isManual = true) => {
        this.#removeToast(isManual);
    };

    #removeToast(isManual = true) {
        this.dispatchEvent(
            new CustomEvent("toast-removed", {
                bubbles: true,
                composed: true,
                detail: {
                    type: this.getAttribute("type") || "default",
                    autoDismiss: isManual ? "manual" : "auto",
                },
            }),
        );
        this.remove();
    }
}

window.customElements.define("notification-toast", NotificationToast);

//se consume el evento "toast-removed" desde el componente padre
document.querySelector("notification-toast").addEventListener("toast-removed", ({ detail }) => {
    console.log(`Toast of type ${detail.type} was removed via ${detail.autoDismiss}`);
});
