**[◀️ Regresar](../../../README.md)**

# 📕 Lección 5: Custom Events & Arquitectura de Comunicación Unidireccional

En arquitecturas web modernas, el principio fundamental de comunicación entre componentes UI es:

"Props down, Events up" (Propiedades / Atributos hacia abajo, Eventos hacia arriba).

Los WebComponents no deben modificar directamente el estado de componentes padre ni manipular elementos externos fuera de su Shadow DOM. En su lugar, cuando ocurre una acción del usuario dentro del componente (ej. dar clic en un botón), el WebComponent emite un Evento Personalizado (CustomEvent) hacia el DOM exterior.

## Opciones Clave de CustomEvent

bubbles: true: Permite que el evento suba por el árbol DOM (propogación).

composed: true: Crucial para WebComponents. Permite que el evento atraviese la frontera del Shadow DOM hacia el DOM principal.

detail: Un objeto JS donde enviamos la carga útil de datos (payload).

## Ejemplo Práctico

A continuación se muestra la forma profesional y limpia de adjuntar un Shadow DOM utilizando attachShadow y hojas de estilo adoptadas:

```javascript
//Archivo: src/components/action-button.js
export class ActionButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
      <button id="btn" style="padding: 10px 15px; cursor: pointer;">
        <slot>Ejecutar Acción</slot>
      </button>
    `;

        this.shadowRoot.querySelector("#btn").addEventListener("click", () => {
            // Disparamos un evento que atraviesa el Shadow DOM (composed: true)
            this.dispatchEvent(
                new CustomEvent("status-toggle", {
                    bubbles: true,
                    composed: true,
                    detail: { timestamp: Date.now(), source: "user-click" },
                }),
            );
        });
    }
}

customElements.define("action-button", ActionButton);
```

Como podemos ver este ejemplo base de un webcomponent.

### [USO DE IA EN DESARROLLO] Asistencia para la Generación de Templates

> Nota de IA: Puedes solicitar a tu modelo de IA que diseñe interfaces o estructuras de payload seguras para tus CustomEvents con el siguiente prompt:

"Diseña la estructura de un CustomEvent de JavaScript para un componente de formulario. Incluye la interfaz TypeScript del objeto detail con validaciones de tipo y la configuración de bubbles y composed."

"Genera un `<template>` HTML nativo de WebComponent encapsulado con Shadow DOM que contenga slots para [Header, Body, Footer]. Aplica estilos CSS estructurados con Flexbox/Grid y CSS variables para personalización."
