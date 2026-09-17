// -----------------------------------------------------------------
// 1. BASE COMPONENT (Patrón Render Trigger)
// -----------------------------------------------------------------
class BaseComponent extends HTMLElement {
    #isPendingRender = false;

    requestRender() {
        if (this.#isPendingRender) return;
        this.#isPendingRender = true;

        queueMicrotask(() => {
            this.#isPendingRender = false;
            this.render();
        });
    }

    render() {}
}

// -----------------------------------------------------------------
// 2. STORE CENTRAL (Patrón Observer / Unidirectional Store)
// -----------------------------------------------------------------
class NotificationStore {
    #state = { notifications: [] };
    #listeners = new Set();

    getState() {
        return { ...this.#state };
    }

    subscribe(listener) {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }

    #notify() {
        this.#listeners.forEach((listener) => listener(this.getState()));
    }

    add(item) {
        this.#state.notifications = [...this.#state.notifications, item];
        this.#notify();
    }

    remove(id) {
        this.#state.notifications = this.#state.notifications.filter((n) => n.id !== id);
        this.#notify();
    }

    clear() {
        this.#state.notifications = [];
        this.#notify();
    }
}

const store = new NotificationStore();

// -----------------------------------------------------------------
// 3. PRESENTATIONAL COMPONENT (Componente Vista)
// -----------------------------------------------------------------
class NotificationItemView extends BaseComponent {
    static get observedAttributes() {
        return ["message", "item-id"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this.requestRender();
        }
    }

    connectedCallback() {
        this.requestRender();
    }

    render() {
        const msg = this.getAttribute("message") || "";
        const id = this.getAttribute("item-id");

        this.innerHTML = `
                    <div style="display:flex; justify-between; background:#222; padding:8px; margin:4px 0; border-radius:4px;">
                        <span>${msg}</span>
                        <button class="btn-del" data-id="${id}" style="margin-left:10px; cursor:pointer;">Eliminar</button>
                    </div>
                `;

        this.querySelector(".btn-del")?.addEventListener("click", () => {
            this.dispatchEvent(
                new CustomEvent("delete-item", {
                    bubbles: true,
                    composed: true,
                    detail: { id: Number(id) },
                }),
            );
        });
    }
}
customElements.define("notification-item-view", NotificationItemView);

// -----------------------------------------------------------------
// 4. CONTAINER COMPONENT (Componente Contenedor)
// -----------------------------------------------------------------
class NotificationListContainer extends BaseComponent {
    #unsubscribe = null;
    #items = [];

    connectedCallback() {
        this.#unsubscribe = store.subscribe((state) => {
            this.#items = state.notifications;
            this.requestRender();
        });

        this.addEventListener("delete-item", (e) => {
            store.remove(e.detail.id);
        });

        this.requestRender();
    }

    disconnectedCallback() {
        if (this.#unsubscribe) this.#unsubscribe();
    }

    render() {
        if (this.#items.length === 0) {
            this.innerHTML = `<p><em>No hay notificaciones.</em></p>`;
            return;
        }

        this.innerHTML = this.#items
            .map(
                (item) => `
                    <notification-item-view
                        item-id="${item.id}"
                        message="${item.message}">
                    </notification-item-view>
                `,
            )
            .join("");
    }
}
customElements.define("notification-list-container", NotificationListContainer);

// -----------------------------------------------------------------
// 5. OTROS COMPONENTES SUSCRITOS
// -----------------------------------------------------------------
class NotificationBadge extends BaseComponent {
    #unsubscribe = null;
    #count = 0;

    connectedCallback() {
        this.#unsubscribe = store.subscribe((state) => {
            this.#count = state.notifications.length;
            this.requestRender();
        });
        this.requestRender();
    }

    disconnectedCallback() {
        if (this.#unsubscribe) this.#unsubscribe();
    }

    render() {
        this.innerHTML = ` Total en el Store: <strong>${this.#count}</strong>`;
    }
}
customElements.define("notification-badge", NotificationBadge);

class NotificationActions extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                    <button id="add">Agregar Notificación</button>
                    <button id="clear">Vaciar Todo</button>
                `;

        this.querySelector("#add").addEventListener("click", () => {
            store.add({
                id: Date.now(),
                message: `Notificación recibida a las ${new Date().toLocaleTimeString()}`,
            });
        });

        this.querySelector("#clear").addEventListener("click", () => {
            store.clear();
        });
    }
}
customElements.define("notification-actions", NotificationActions);
