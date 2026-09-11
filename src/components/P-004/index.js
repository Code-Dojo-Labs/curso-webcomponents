import CardStyles from "./styles.js";
import CardTemplate from "./template.js";

class UserProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [CardStyles];
        this.shadowRoot.appendChild(CardTemplate.content.cloneNode(true));
    }
}

// Registration of the custom element
window.customElements.define("user-profile", UserProfile);
