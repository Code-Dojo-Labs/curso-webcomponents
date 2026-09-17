class BaseComponent extends HTMLElement {
    #isRenderPending = false;
    requestRender() {
        if (this.#isRenderPending) return;
        this.#isRenderPending = true;
        queueMicrotask(() => {
            this.#isRenderPending = false;
            this.render();
        });
    }
    render() {}
}

export default BaseComponent;
