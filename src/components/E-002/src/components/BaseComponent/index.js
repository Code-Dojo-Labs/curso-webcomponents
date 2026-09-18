class BaseComponent extends HTMLElement {
    #isRedyForRendering = false;

    requestRender() {
        if (this.#isRedyForRendering) return;
        this.#isRedyForRendering = true;
        queueMicrotask(() => {
            this.#isRedyForRendering = false;
            this.render();
        });
    }

    render() {}
}

export default BaseComponent;
