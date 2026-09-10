const CreateTemplate = () => {
    const $TEMPLATE = document.createElement("template");
    $TEMPLATE.innerHTML = `
        <style>
            :host {
                display: block;
                width: fit-content;
                margin: 10px auto;
            }
            :host * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            :host section {
                background: #ccffdd;
                padding: 5px;
            }
        </style>
        <section>
            <figure>
                <slot name="avatar"></slot>
                <figcaption>
                    <slot name="username"></slot>
                    <slot></slot>
                </figcaption>
            </figure>
        </section>
    `;
    return $TEMPLATE;
};

class ProfileCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.template = CreateTemplate().content.cloneNode(true);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.appendChild(this.template);
    }
}

window.customElements.define("dev-profile-card", ProfileCard);
