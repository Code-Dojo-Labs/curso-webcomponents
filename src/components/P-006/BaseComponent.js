class BaseComponent extends HTMLElement {
    // Bandera para identificar si existe un render pendiente
    #isRenderPending = false;

    // Metodo para marcar que hay un render pendiente
    requestRender() {
        // si existe un render pendiente, salir
        if (this.#isRenderPending) return;
        // Marcar que hay un render pendiente
        this.#isRenderPending = true;
        // permite en colar los cambios existentes
        queueMicrotask(() => {
            this.#isRenderPending = false;
            this.render();
        });
    }

    // Metodo render
    render() {}
}

export default BaseComponent;
