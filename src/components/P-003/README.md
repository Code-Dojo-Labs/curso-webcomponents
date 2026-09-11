**[◀️ Regresar](../../../README.md)**

# 📕 Lección 3: Shadow DOM & Encapsulamiento Visual

Uno de los mayores problemas en el desarrollo web tradicional es la colisión de estilos CSS y la manipulación accidental del DOM interno de un componente desde scripts globales.

El Shadow DOM soluciona esto proporcionando un árbol DOM separado y adjunto al elemento (denominado Shadow Root). Sus ventajas principales son:

1.  Aislamiento de CSS: Los estilos definidos dentro del Shadow DOM no se filtran hacia el documento principal, y los estilos globales (a menos que sean variables CSS) no afectan el interior del componente.

2.  DOM Aislado: Métodos como document.querySelector() en el documento principal no seleccionarán nodos que vivan dentro del Shadow Root.

## Modos de Shadow DOM

-   mode: 'open': El Shadow Root es accesible desde JavaScript exterior usando element.shadowRoot.

-   mode: 'closed': El Shadow Root no se expone externamente (rara vez utilizado, ya que dificulta pruebas y herramientas de desarrollo).

## Adopted StyleSheets (Práctica Profesional)

En lugar de inyectar etiquetas `<style>` dentro de cada instancia como un string (lo cual consume memoria innecesaria), la especificación moderna utiliza CSSStyleSheet() y adoptedStyleSheets para compartir estilos compilados entre múltiples instancias.

## Ejemplo Práctico

A continuación se muestra la forma profesional y limpia de adjuntar un Shadow DOM utilizando attachShadow y hojas de estilo adoptadas:

```javascript
// Creación de una hoja de estilo reusable en memoria
// Archivo: src/components/user-card.js
const styles = new CSSStyleSheet();
styles.replaceSync(`
  :host {
    display: block;
    font-family: system-ui, sans-serif;
  }
  .card {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    background: #f9f9f9;
  }
  h3 {
    margin: 0 0 8px 0;
    color: #333;
  }
`);

export class UserCard extends HTMLElement {
    constructor() {
        super();
        // Adjuntamos el Shadow DOM en modo 'open'
        this.attachShadow({ mode: "open" });
        // Adoptamos la hoja de estilo aislada
        this.shadowRoot.adoptedStyleSheets = [styles];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // Escribimos dentro del shadowRoot, NO de this.innerHTML
        this.shadowRoot.innerHTML = `
      <div class="card">
        <h3>Card de Usuario</h3>
        <p>Este contenido y sus estilos están 100% aislados del documento global.</p>
      </div>
    `;
    }
}

customElements.define("user-card", UserCard);
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
        <timer-counter step="2"></hello-world>

        <script type="module" src="./src/components/hello-world.js"></script>
    </body>
</html>
```

Como podemos ver este ejemplo base de un webcomponent.
