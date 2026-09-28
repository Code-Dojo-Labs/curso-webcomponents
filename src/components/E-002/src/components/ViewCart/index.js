import BaseComponent from "../BaseComponent";
import Template from "./Template.js";
import Styles from "./Styles.js";
import { store } from "../../store/Store.js";

class ViewCart extends BaseComponent {
    #btn_view = null;
    #modal = null;
    #modalContent = null;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(Template.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [Styles];
        this.#btn_view = this.shadowRoot.querySelector("#view-cart");
        this.#modal = this.shadowRoot.querySelector("#modal");
        this.#modalContent = this.shadowRoot.querySelector("#modal-content");
    }

    connectedCallback() {
        this.requestRender();
    }

    #printer() {
        const items = store.getState().items;
        const TAGS = items
            .map(
                (item) => `
                <item-view
                    id="${item.id}"
                    name="${item.name}"
                    poster="${item.poster}"
                    description="${item.description}"
                    price="${item.price}"
                    remove
                >
                </item-view>`,
            )
            .join("");
        this.#modalContent.innerHTML = TAGS;
        this.#modalContent.querySelectorAll("item-view").forEach((itemView) => {
            itemView.addEventListener("item-add", (event) => {
                store.removeItem(event.detail.id);
                itemView.remove();
                store.getState().items.length <= 0 && this.#modal.close();
            });
        });
    }

    render() {
        if (this.#btn_view) {
            this.#btn_view.addEventListener("click", () => {
                if (this.#modal) {
                    this.#modal.showModal();
                    this.#printer();
                }
            });
        }
        if (this.#modal) {
            this.#modal.addEventListener("click", (event) => {
                if (event.target === this.#modal) {
                    this.#modal.close();
                }
            });
        }
    }
}

window.customElements.define("view-cart", ViewCart);
