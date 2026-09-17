**[◀️ Regresar](../../../README.md)**

# 📕 Lección 6B: Observer / Unidirectional State Store

Cuando la aplicación escala, pasar información de un componente a otro usando eventos o atributos (lo que se conoce como prop drilling o acoplamiento) se vuelve insostenible.

Este patrón resuelve el problema creando un Estado Global Centralizado (Store) que funciona bajo la arquitectura unidireccional:

1.  Store (Sujeto / Estado Central): Mantiene los datos de la aplicación y expone métodos para modificarlos.

2.  Suscripción (Observer): Los Web Components se suscriben al Store al conectarse al DOM (connectedCallback) y se desuscriben al desconectarse (disconnectedCallback).

3.  Flujo Unidireccional:

    -   Responsabilidad: ¿Cómo funcionan las cosas?

    -   Características:

        -   Se encargan de la lógica de negocio, llamadas a APIs (fetch), manejo de temporizadores o del estado.

        -   Escuchan los eventos emitidos por los componentes de presentación.

        -   Pasan la información procesada hacia los componentes de presentación para que la muestren.

## Ejemplo Práctico: Store de Notificaciones y Contador

A. El Store Central (NotificationStore.js)

```javascript
// NotificationStore.js
class NotificationStore {
    #state = {
        notifications: [],
        theme: "dark",
    };

    #listeners = new Set(); // Guarda los componentes suscritos

    // Retorna una copia de lectura del estado (Inmutabilidad)
    getState() {
        return { ...this.#state };
    }

    // Método para suscribir componentes
    subscribe(listener) {
        this.#listeners.add(listener);
        // Retorna función para desuscribirse fácilmente
        return () => this.#listeners.delete(listener);
    }

    // Notifica a todos los suscriptores cuando hay un cambio
    #notify() {
        this.#listeners.forEach((listener) => listener(this.getState()));
    }

    // Acciones para modificar el estado
    addNotification(notification) {
        this.#state.notifications = [...this.#state.notifications, notification];
        this.#notify();
    }

    clearNotifications() {
        this.#state.notifications = [];
        this.#notify();
    }
}

// Exportamos una única instancia (Singleton)
export const notificationStore = new NotificationStore();
```

## B. Componente Suscrito 1: Contador en Navbar ( `<notification-badge>`)

Maneja la lógica, simula llamadas a API o temporizadores y coordina los views.

```javascript
import { notificationStore } from "./NotificationStore.js";
import BaseComponent from "./BaseComponent.js";

class NotificationBadge extends BaseComponent {
    #unsubscribe = null;
    #count = 0;

    connectedCallback() {
        // Nos suscribimos al Store
        this.#unsubscribe = notificationStore.subscribe((state) => {
            this.#count = state.notifications.length;
            this.requestRender(); // Usamos nuestro patrón Render Trigger
        });
    }

    disconnectedCallback() {
        // Limpiamos la suscripción para evitar fugas de memoria
        if (this.#unsubscribe) this.#unsubscribe();
    }

    render() {
        this.innerHTML = `
            <div style="font-family: sans-serif;">
                🔔 Notificaciones pendientes: <strong>${this.#count}</strong>
            </div>
        `;
    }
}
customElements.define("notification-badge", NotificationBadge);
```

## C) Componente Suscrito 2: Botón de Acción (`<notification-actions>`)

```javascript
import { notificationStore } from "./NotificationStore.js";

class NotificationActions extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <button id="btn-add">Agregar Notificación</button>
            <button id="btn-clear">Limpiar Todoo</button>
        `;

        this.querySelector("#btn-add").addEventListener("click", () => {
            notificationStore.addNotification({
                id: Date.now(),
                message: "Nueva actividad en tu cuenta",
            });
        });

        this.querySelector("#btn-clear").addEventListener("click", () => {
            notificationStore.clearNotifications();
        });
    }
}
customElements.define("notification-actions", NotificationActions);
```
