**[◀️ Regresar](../../../README.md)**

# 📕 Lección 6A: Container / Presentational Component

Este patrón se basa en separar la interfaz de usuario (UI) de la lógica de negocio y datos. Divide los Web Components en dos categorías bien definidas:

1.  Presentational Components (Componentes de Presentación o "Tontos"):

    -   Responsabilidad: ¿Cómo se ven las cosas?

    -   Características:

        -   No saben de dónde vienen los datos (no hacen fetch a APIs ni leen bases de datos).

        -   Reciben información únicamente a través de atributos o propiedades.

        -   Comunican las acciones del usuario emitiendo Eventos Customizados (CustomEvent).

        -   Son 100% reutilizables en diferentes partes o proyectos.

2.  Container Components (Componentes Contenedores o "Inteligentes"):

    -   Responsabilidad: ¿Cómo funcionan las cosas?

    -   Características:

        -   Se encargan de la lógica de negocio, llamadas a APIs (fetch), manejo de temporizadores o del estado.

        -   Escuchan los eventos emitidos por los componentes de presentación.

        -   Pasan la información procesada hacia los componentes de presentación para que la muestren.

## 💡 Ejemplo Práctico: Sistema de Notificaciones

A. Componente Presentacional (`<toast-view>`)

Solo pinta el toast y avisa cuando el usuario da clic en cerrar.

```javascript
// toast-view.js (Presentational)
class ToastView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["type", "title", "message"];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.isConnected) this.render();
    }

    render() {
        const type = this.getAttribute("type") || "info";
        const title = this.getAttribute("title") || "";
        const message = this.getAttribute("message") || "";

        this.shadowRoot.innerHTML = `
            <style>
                .toast {
                    padding: 12px;
                    border-radius: 6px;
                    color: #fff;
                    display: flex;
                    justify-content: space-between;
                    font-family: sans-serif;
                }
                .info { background-color: #2196F3; }
                .success { background-color: #4CAF50; }
                .error { background-color: #f44336; }
                button { background: none; border: none; color: white; cursor: pointer; }
            </style>
            <div class="toast ${type}">
                <div>
                    <strong>${title}</strong>
                    <p>${message}</p>
                </div>
                <button id="btn-close">❌</button>
            </div>
        `;

        // Al dar clic en cerrar, NO borra el nodo directamente.
        // Emite un evento avisando al componente superior.
        this.shadowRoot.querySelector("#btn-close").addEventListener("click", () => {
            this.dispatchEvent(
                new CustomEvent("toast-close-click", {
                    bubbles: true,
                    composed: true,
                }),
            );
        });
    }
}
customElements.define("toast-view", ToastView);
```

B) Componente Contenedor (`<toast-manager>`)

Maneja la lógica, simula llamadas a API o temporizadores y coordina los views.

```javascript
// toast-manager.js (Container)
class ToastManager extends HTMLElement {
    #timer = null;

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        // El contenedor obtiene los datos (simulando una API o lógica interna)
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
                message="${data.message}">
            </toast-view>
        `;

        // Escucha el evento emitido por el componente de presentación
        this.shadowRoot.querySelector("toast-view").addEventListener("toast-close-click", () => {
            this.dismissToast();
        });

        // Lógica de temporizador (Auto-dismiss a los 5 segundos)
        this.#timer = setTimeout(() => {
            this.dismissToast();
        }, 5000);
    }

    dismissToast() {
        clearTimeout(this.#timer);
        this.shadowRoot.innerHTML = `<p><em>Sin notificaciones pendientes.</em></p>`;
    }
}
customElements.define("toast-manager", ToastManager);
```
