import Template from "./Template.js";
import Styles from "./Styles.js";

import BaseComponent from "../BaseComponent/";

class ItemView extends BaseComponent {
    #name = null;
    #add = null;
    #poster = null;
    #description = null;
    #price = null;
    #id = null;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [Styles];
        this.shadowRoot.appendChild(Template.content.cloneNode(true));
        this.#name = this.shadowRoot.querySelector("#name");
        this.#add = this.shadowRoot.querySelector("#add");
        this.#poster = this.shadowRoot.querySelector("#poster");
        this.#description = this.shadowRoot.querySelector("#description");
        this.#price = this.shadowRoot.querySelector("#price");
        this.#id = self.crypto.randomUUID();
    }

    connectedCallback() {
        this.requestRender();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.isConnected) this.requestRender();
    }

    static get observedAttributes() {
        return ["name", "poster", "description", "price", "remove"];
    }

    render() {
        const $NAME = this.getAttribute("name") || "";
        const $POSTER = this.getAttribute("poster") || "";
        const $DESCRIPTION = this.getAttribute("description") || "";
        const $PRICE = this.getAttribute("price") || "";
        const $REMOVE = this.hasAttribute("remove") || false;
        if ($NAME) this.#name.textContent = $NAME;
        if ($POSTER) this.#poster.src = $POSTER;
        if ($DESCRIPTION) this.#description.textContent = $DESCRIPTION;
        if ($PRICE) this.#price.textContent = parseFloat($PRICE).toFixed(2);
        if ($REMOVE) this.#add.classList.add("remove");
        this.#handleAddClick($REMOVE);
    }

    #handleAddClick(remove) {
        if (this.#add) {
            this.#add.addEventListener("click", () => {
                this.dispatchEvent(
                    new CustomEvent("item-add", {
                        bubbles: true,
                        composed: true,
                        detail: {
                            id: this.getAttribute("id") || this.#id,
                            name: this.getAttribute("name") || "",
                            poster: this.getAttribute("poster") || "",
                            description: this.getAttribute("description") || "",
                            price: this.getAttribute("price") || "",
                            action: remove ? "remove" : "add",
                        },
                    }),
                );
            });
        }
    }
}

customElements.define("item-view", ItemView);
