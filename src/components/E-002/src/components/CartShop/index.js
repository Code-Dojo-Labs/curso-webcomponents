import BaseComponent from "../BaseComponent";
import Template from "./Template";
import Style from "./Style";
import { store } from "../../store/Store.js";

class ShopCart extends BaseComponent {
    #unsubscribe = null;
    #count = 0;
    #total = 0;
    #cartCount = null;
    #cartTotal = null;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(Template.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [Style];
        this.#cartCount = this.shadowRoot.querySelector("#cart-count");
        this.#cartTotal = this.shadowRoot.querySelector("#cart-total");
    }

    connectedCallback() {
        this.#unsubscribe = store.subscribe((state) => {
            this.#count = state.items.length;
            this.#total = state.items.reduce((total, item) => total + parseFloat(item.price), 0);
            this.requestRender();
        });
        this.requestRender();
    }

    disconnectedCallback() {
        if (this.#unsubscribe) this.#unsubscribe();
    }

    render() {
        if (this.#cartCount) {
            this.#cartCount.textContent = this.#count;
            this.#cartTotal.textContent = this.#total.toFixed(2);
        }
    }
}

window.customElements.define("cart-shop", ShopCart);
