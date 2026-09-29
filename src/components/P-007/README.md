**[◀️ Regresar](../../../README.md)**

# 📕 Lección 7: Herramientas del Ecosistema Moderno (Lit Element)

Crear WebComponents con la API nativa de JavaScript nos otorga un entendimiento profundo del navegador. Sin embargo, en la industria profesional se suelen utilizar librerías ultraligeras que abstraen el código repetitivo sin perder el estándar nativo.

La herramienta estándar por excelencia es Lit (creada por Google). Lit no es un framework pesado como React o Angular; es una capa delgada (~5KB) sobre WebComponents nativos que nos da:

1. Atributos y Propiedades Reactivas: Actualizaciones automáticas del DOM cuando cambia el estado sin necesidad de escribir observedAttributes ni llamar manualmente a un render().

2. Plantillas Asíncronas e Inmutables (`html``): Uso de Tagged Template Literals nativos para actualizar únicamente los nodos que cambian.

3. Encapsulamiento CSS Simplificado (`css``): Definición directa de hojas de estilo dentro de la clase.

## EJEMPLO PRÁCTICO

Con lit

```javascript
import { LitElement, html, css } from 'lit';

export class SimpleBadge extends LitElement {
  // 1. Declaración de propiedades reactivas
  static properties = {
    active: { type: Boolean },
    label: { type: String }
  };

  // 2. Estilos encapsulados con CSS nativo
  static styles = css`
    :host {
      display: inline-block;
    }
    .badge {
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: bold;
      color: white;
    }
    .active { background-color: #2e7d32; }
    .inactive { background-color: #c62828; }
  `;

  constructor() {
    super();
    this.active = false;
    this.label = 'Offline';
  }

  // 3. Plantilla declarativa optimizada
  render() {
    return html`
      <span class="badge ${this.active ? 'active' : 'inactive'}">
        ${this.label}
      </span>
    `;
  }
}

customElements.define('simple-badge', SimpleBadge);
`

```
