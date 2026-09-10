// inicialización del componente P-001
class StatusBadge extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    // Renderiza el componente
    render() {
        // Buscamos si existe el atributo state para este caso utlizamos un atributto booleano
        const STATE = this.hasAttribute("state") || false;
        // Generamos el template HTML del componente
        this.innerHTML = `
            <span class="badge badge-${STATE ? "active" : "offline"}">
                ${STATE ? "Online" : "Offline"}
            </span>
        `;
    }
}

// Registramos el componente personalizado
window.customElements.define("status-badge", StatusBadge);
