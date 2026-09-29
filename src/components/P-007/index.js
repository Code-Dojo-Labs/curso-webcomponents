import { LitElement } from "lit";

import Template from "./Template.js";
import { Styles } from "./Styles.js";

class BadgeLit extends LitElement {
    // se declara la propiedad 'state' que refleja su valor en el atributo HTML
    static properties = {
        state: { type: Boolean, reflect: true, default: false },
    };
    // Casgando estilos
    static styles = [Styles];

    constructor() {
        super();
        this.state = false;
    }

    render() {
        return Template({ state: this.state });
    }
}

window.customElements.define("badge-lit", BadgeLit);
