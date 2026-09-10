**[◀️ Regresar](../../../README.md)**

# 📕 Lección 2: Custom Elements (v1) & Lifecycle Callbacks Avanzados

Los Lifecycle Callbacks (Callbacks del Ciclo de Vida) son métodos especiales que el navegador ejecuta automáticamente en diferentes etapas de la existencia de tu Custom Element.

Para dominar el ciclo de vida de nivel profesional, debes conocer sus 4 hooks nativos:

1.  constructor(): Se ejecuta al instanciar el elemento. Regla de Clean Code: No leas atributos ni modifiques el DOM aquí. Solo inicializa estados o variables privadas.

2.  connectedCallback(): Se ejecuta cuando el elemento se inserta en el DOM. Es el lugar adecuado para realizar renderizados iniciales, peticiones HTTP o suscribirse a eventos.

3.  disconnectedCallback(): Se ejecuta cuando el elemento se remueve del DOM. Es crítico para el limpieza de memoria (remover eventListeners, detener timers o cancelar suscripciones).

4.  attributeChangedCallback(name, oldValue, newValue): Se ejecuta cuando un atributo observado cambia, se añade o se elimina.

## Mapeo Reactivo de Atributos

Para que attributeChangedCallback funcione, es obligatorio declarar el getter estático observedAttributes:

```javascript
static get observedAttributes() {
  return ['state', 'label']; // Lista de atributos que activarán el callback
}
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
