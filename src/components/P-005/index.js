import CardStyles from "./styles.js";
import CardTemplate from "./template.js";

class UserProfileEvent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [CardStyles];
        this.shadowRoot.appendChild(CardTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.$slotState = this.shadowRoot.querySelector("slot[name='status']");
        this.$btn = this.shadowRoot.querySelector("#logout");
        this.$btn.addEventListener("click", () => this.#toggleState());
    }

    #toggleState() {
        const $ELEMENT = this.$slotState.assignedElements({ flatten: true })[0];

        if (!$ELEMENT) return null;
        const hasState = $ELEMENT.hasAttribute("state");
        if (hasState) $ELEMENT.removeAttribute("state");
        else $ELEMENT.setAttribute("state", "active");

        this.$btn.classList.toggle("logout", !hasState);
        this.$btn.classList.toggle("login", hasState);
    }
}

// Registration of the custom element
window.customElements.define("user-profile-event", UserProfileEvent);

//se consume el evento "status-change" desde el componente padre
document.querySelector("user-profile-event").addEventListener("status-change", ({ detail }) => {
    console.log(`User is ${detail.active ? "active" : "inactive"}`);
});
