class Store {
    #state = { items: [] };
    #listeners = new Set();

    getState() {
        return { items: [...this.#state.items] };
    }

    subscribe(listener) {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }

    #notify() {
        this.#listeners.forEach((listener) => listener(this.getState()));
    }

    addItem(item) {
        this.#state.items = [...this.#state.items, item];
        this.#notify();
    }

    removeItem(id) {
        this.#state.items = this.#state.items.filter((item) => item.id !== id);
        this.#notify();
    }

    clearCart() {
        this.#state.items = [];
        this.#notify();
    }
}

export const store = new Store();
