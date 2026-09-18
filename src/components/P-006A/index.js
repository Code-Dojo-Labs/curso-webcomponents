import "./view.js";

class ToastManager extends HTMLElement {
    #timer = null;

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.fetchNotification();
    }

    async fetchNotification() {
        // Simulación de respuesta de API
        const data = {
            type: "success",
            title: "Operación Exitosa",
            message: "Los datos han sido guardados correctamente.",
        };
        // Renderiza el componente presentacional pasándole las propiedades
        this.shadowRoot.innerHTML = `
            <toast-view
                type="${data.type}"
                title="${data.title}"
                message="${data.message}"
                seconds="10">
            </toast-view>
        `;

        // Escucha el evento emitido por el componente de presentación
        this.shadowRoot.querySelector("toast-view").addEventListener("toast-close-view", (event) => {
            console.log(event.detail.message);
            //this.dismissToast();
        });

        // Lógica de temporizador (Auto-dismiss a los 5 segundos)
        this.#timer = setTimeout(() => {
            this.dismissToast();
        }, 10000);
    }

    dismissToast() {
        if (this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = "";
        }
    }
}

window.customElements.define("toast-manager", ToastManager);
