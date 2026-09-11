**[◀️ Regresar](../../../README.md)**

# 📕 Lección 4: `<template>` y `<slot>` (Composición de UI)

Hasta el momento, tus componentes han renderizado su contenido insertando directamente cadenas de texto HTML mediante innerHTML. Aunque es funcional, en componentes complejos reescribir todo el marcado mediante strings puede penalizar el rendimiento y dificulta la composición.

La especificación de WebComponents resuelve esto con dos elementos nativos:

1.  Etiqueta `<template>`: Permite declarar fragmentos de HTML inertes que el navegador parsea una sola vez pero no renderiza hasta que son clonados e instanciados en JS.

2.  Mecanismo de Proyección `<slot>`: Actúa como un placeholder o "puerto" dentro de tu Shadow DOM donde el usuario del componente puede inyectar su propio marcado HTML desde el documento principal.

## Tipos de Slots

-   Default Slot (`<slot></slot>`): Captura todo el contenido hijo que no tenga un atributo slot especificado.

-   Named Slots (`<slot name="header"></slot>`): Capturan únicamente los elementos que coincidan con slot="header".

## Adopted StyleSheets (Práctica Profesional)

En lugar de inyectar etiquetas `<style>` dentro de cada instancia como un string (lo cual consume memoria innecesaria), la especificación moderna utiliza CSSStyleSheet() y adoptedStyleSheets para compartir estilos compilados entre múltiples instancias.

## Ejemplo Práctico

A continuación se muestra la forma profesional y limpia de adjuntar un Shadow DOM utilizando attachShadow y hojas de estilo adoptadas:

```javascript
//Archivo: src/components/ui-card.js
const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: block;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      font-family: system-ui, sans-serif;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #f5f5f5;
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
      font-weight: bold;
    }
    .body {
      padding: 16px;
    }
    .footer {
      padding: 12px 16px;
      background-color: #fafafa;
      border-top: 1px solid #e0e0e0;
      text-align: right;
    }
  </style>

  <div class="card">
    <div class="header">
      <!-- Slot con nombre para el título -->
      <slot name="title">Título por defecto</slot>
    </div>
    <div class="body">
      <!-- Slot por defecto para el contenido principal -->
      <slot></slot>
    </div>
    <div class="footer">
      <!-- Slot con nombre para acciones/botones -->
      <slot name="actions"></slot>
    </div>
  </div>
`;

export class UICard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // Clonamos el contenido del template inerte de forma eficiente
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("ui-card", UICard);
```

## EJEMPLO PRÁCTICO

A continuación verás un contador que reacciona a cambios de atributo y limpia sus timers al desmontarse.

```javascript
/**
 * Componente temporizador reactivo.
 * Demuestra el uso completo del ciclo de vida y reactividad nativa.
 * Archivo: src/components/timer-counter.js
 */
export class TimerCounter extends HTMLElement {
    constructor() {
        super();
        this._count = 0;
        this._timerId = null;
    }

    // 1. Especificamos qué atributos queremos observar
    static get observedAttributes() {
        return ["step"];
    }

    // 2. Hook al insertarse en el DOM
    connectedCallback() {
        this.render();
        this.startTimer();
    }

    // 3. Hook al cambiar atributos observados
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && name === "step") {
            console.log(`[TimerCounter] El paso cambió de ${oldValue} a ${newValue}`);
        }
    }

    // 4. Hook de limpieza cuando se elimina del DOM
    disconnectedCallback() {
        console.log("[TimerCounter] Removiendo componente del DOM. Limpiando timers...");
        clearInterval(this._timerId);
    }

    get step() {
        return parseInt(this.getAttribute("step") || "1", 10);
    }

    startTimer() {
        this._timerId = setInterval(() => {
            this._count += this.step;
            this.render();
        }, 1000);
    }

    render() {
        this.innerHTML = `
      <div class="timer-box">
        <p>Segundos transcurridos: <strong>${this._count}</strong> (Incremento: ${this.step})</p>
      </div>
    `;
    }
}

customElements.define("timer-counter", TimerCounter);
```

---

```html
<!-- index.html -->
<!doctype html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>WebComponents Mastery</title>
    </head>
    <body>
        <!-- Uso de nuestro WebComponent nativo -->
        <ui-card>
            <h2 slot="title">Perfil de Usuario</h2>
            <p>Esta información es proyectada dentro del slot por defecto del Shadow DOM.</p>
            <button slot="actions">Editar</button>
        </ui-card>
        <script type="module" src="./src/components/ui-card.js"></script>
    </body>
</html>
```

Como podemos ver este ejemplo base de un webcomponent.

### [USO DE IA EN DESARROLLO] Asistencia para la Generación de Templates

> Nota de IA: En el desarrollo moderno con WebComponents, puedes apoyarte en un asistente de IA para solicitar layouts de templates optimizados utilizando el siguiente Prompt Pattern:

"Genera un `<template>` HTML nativo de WebComponent encapsulado con Shadow DOM que contenga slots para [Header, Body, Footer]. Aplica estilos CSS estructurados con Flexbox/Grid y CSS variables para personalización."
