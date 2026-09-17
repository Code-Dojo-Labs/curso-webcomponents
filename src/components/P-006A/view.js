import BaseComponent from "./base.js";
import Template from "./template.js";
import StyleToast from "./styles.js";

class ToastView extends BaseComponent {
    #btnAction = null;
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
        this.shadowRoot.adoptedStyleSheets = [StyleToast];
        this.shadowRoot.appendChild(Template.content.cloneNode(true));
        this.#btnAction = this.shadowRoot.querySelector("#btn-close");
    }

    connectedCallback() {
        this.requestRender();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.isConnected) this.requestRender();
    }

    static get observedAttributes() {
        return ["title", "type", "message", "seconds"];
    }

    render() {
        const title = this.getAttribute("title") || "";
        const type = this.getAttribute("type") || "default";
        const message = this.getAttribute("message") || "";
        const SECONDS = this.getAttribute("seconds") || 3;
        this.shadowRoot.getElementById("toast-title").textContent = title;
        this.shadowRoot.getElementById("toast-message").textContent = message;
        this.shadowRoot.getElementById("toast").className = `toast ${this.#types[type].style}`;
        this.shadowRoot.getElementById("toast-footer").style.animation = `progreso ${SECONDS}s linear forwards`;

        this.#handleButtonClick();
    }

    #handleButtonClick() {
        this.#btnAction.addEventListener("click", () => {
            this.dispatchEvent(
                new CustomEvent("toast-close-view", {
                    bubbles: true,
                    composed: true,
                }),
            );
        });
    }
}

window.customElements.define("toast-view", ToastView);
