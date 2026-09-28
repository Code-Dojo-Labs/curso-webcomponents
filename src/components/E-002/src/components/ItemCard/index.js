import "./ItemViews.js";
import { products } from "./productos.js";
import { store } from "../../store/Store.js";

class ItemStore extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.#printer();
    }

    #printer() {
        for (const product of products) {
            this.shadowRoot.innerHTML += `
                <item-view
                    name="${product.name}"
                    poster="${product.poster}"
                    description="${product.description}"
                    price="${product.price}">
                </item-view>
            `;
        }
        this.shadowRoot.querySelectorAll("item-view").forEach((itemView) => {
            itemView.addEventListener("item-add", (event) => {
                store.addItem(event.detail);
            });
        });
    }
}

customElements.define("item-store", ItemStore);
