**[◀️ Regresar](../../../README.md)**

# 📕 Lección 6: Clean Code & Patrones de Diseño en WebComponents

Al escalar aplicaciones grandes con WebComponents nativos, el código puede volverse desordenado si no aplicamos patrones de diseño de software. En este módulo aplicaremos tres patrones esenciales:

1.  Patrón Render Trigger (Batching / Debounce):
    Evita re-renderizados innecesarios del DOM cuando múltiples atributos cambian al mismo tiempo. En lugar de llamar a render() en cada cambio de atributo, programamos la actualización para el siguiente microtask usando queueMicrotask() o requestAnimationFrame().

2.  Patrón Container / Presentational Component:
    Separación de responsabilidades:

        -   Presentational Component: Solo se encarga de cómo se ven las cosas (recibe datos vía atributos/props y emite eventos).

        -   Container Component: Se encarga de la lógica de negocio, llamadas a APIs y gestión de estado.

3.  Patrón Observer / Unidirectional State Store:
    Suscripción de componentes a un estado global centralizado sin acoplarlos entre sí.

## Ejemplo Práctico

```javascript
export class BaseComponent extends HTMLElement {
    #isPendingRender = false;

    /**
     * Programa el renderizado para el siguiente microtask,
     * evitando múltiples re-renders si cambian varios atributos seguidos.
     */
    requestRender() {
        if (this.#isPendingRender) return;
        this.#isPendingRender = true;

        queueMicrotask(() => {
            this.#isPendingRender = false;
            this.render();
        });
    }

    render() {
        // Método que debe ser sobrescrito por las clases hijas
    }
}
```

## Complemento de la explicación

Cuando creas un WebComponent pequeño (como un botón o una etiqueta), el código es simple. Pero cuando tu aplicación crece, te enfrentas a tres grandes problemas:

1.  **Rendimiento visual feo o lento:** El navegador redibuja la pantalla muchas veces por segundo sin necesidad.

2.  **Código revuelto:** Mezclas la interfaz gráfica con llamadas a la base de datos o APIs.

3.  **Desorden de datos:** Un componente no sabe qué está haciendo el otro y actualizar información en pantalla se vuelve un caos.

## Patrón Render Trigger (Batching / Agrupamiento)

💡 La Analogía del Mesero en el Restaurante
Imagínate que estás en un restaurante.

-   **Sin Render Trigger (Mal rendimiento):** Le dices al mesero "Tráeme un vaso de agua". El mesero va a la cocina y regresa con el agua. Luego le dices "Tráeme una servilleta". El mesero va a la cocina y regresa con la servilleta. Luego "Tráeme ketchup". Va y regresa. Hizo 3 viajes para 3 cosas que pediste en un lapso de 5 segundos.

-   **Con Render Trigger (Batching/Optimizado):** Le dices al mesero "Quiero un vaso de agua, una servilleta y ketchup". El mesero espera a que termines de hablar, hace un solo viaje a la cocina y te trae todo junto.

#### ¿Qué pasa en el navegador sin este patrón?

Si en tu WebComponent tienes 3 atributos observables: nombre, apellido, edad.

### EJEMPLO

```javascript
miComponente.setAttribute("nombre", "Jorge");
miComponente.setAttribute("apellido", "Méndez");
miComponente.setAttribute("edad", "30");
```

El método `attributeChangedCallback` se va a disparar 3 veces seguidas, llamando a `render()` 3 veces casi al mismo milisegundo. Esto hace que el navegador destruya y vuelva a dibujar la pantalla 3 veces innecesariamente.

### Explicación del código BaseComponent paso a paso

```javascript
export class BaseComponent extends HTMLElement {
    // 1. Una bandera (switch) privada que nos dice si ya hay un render programado.
    #isPendingRender = false;

    requestRender() {
        // 2. Si YA programamos un render hace un instante, ¡NO hagas nada más!
        // Quédate esperando a que se ejecute el que ya está en cola.
        if (this.#isPendingRender) return;

        // 3. Encendemos la bandera: "Atención, hay un render pendiente".
        this.#isPendingRender = true;

        // 4. queueMicrotask le dice al navegador:
        // "Espera a que termine de ejecutarse todo el bloque de código actual en JS,
        // y JUSTO ANTES de pintar la pantalla, ejecuta este render() UNA SOLA VEZ".
        queueMicrotask(() => {
            this.#isPendingRender = false; // Apagamos la bandera
            this.render(); // Llamamos al render real
        });
    }

    render() {
        // Método vacío para que tus componentes hijos lo rellenen con su propio HTML
    }
}
```

#### ¿Cómo lo usas en un componente real?

Haces que tu componente herede de BaseComponent:

```javascript
import { BaseComponent } from "./BaseComponent.js";

class UserCard extends BaseComponent {
    static get observedAttributes() {
        return ["nombre", "apellido", "edad"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            // EN LUGAR de llamar a this.render() directamente,
            // llamas a this.requestRender()
            this.requestRender();
        }
    }

    render() {
        console.log("¡Se ejecutó render()!");
        this.innerHTML = `<p>${this.getAttribute("nombre")} ${this.getAttribute("apellido")}</p>`;
    }
}
```

Resultado: Si cambias `nombre, apellido y edad` uno tras otro en el mismo hilo de ejecución, `requestRender()` agrupará las 3 peticiones y la consola dirá `¡Se ejecutó render()!` solo 1 vez.

### EJEMPLO SUPER CLARO

¡Claro que sí! Vamos a armar un archivo de ejemplo completo e interactivo que puedes probar directamente en tu navegador o mediante un script.

Con este ejemplo verás claramente la diferencia entre usar `render()` directo (3 renders) vs usar `requestRender()` (1 solo render).

#### 1. El código de prueba (index.html)

Puedes crear un archivo index.html e insertar el siguiente código:

```HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Demostración Render Trigger</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        .box { border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        button { padding: 8px 16px; cursor: pointer; }
    </style>
</head>
<body>

    <h2>Demostración: Render Trigger (Batching)</h2>
    <p>Abre la consola del navegador (F12) para ver los logs de los renders.</p>

    <div class="box">
        <h3>Componente de Usuario</h3>
        <!-- Nuestro WebComponent personalizado -->
        <user-card id="mi-usuario" nombre="Juan" apellido="Pérez" edad="25"></user-card>
    </div>

    <button id="btn-cambiar">Cambiar 3 atributos a la vez</button>

    <script type="module">
        // 1. CLASE BASE (Con el patrón Render Trigger)
        class BaseComponent extends HTMLElement {
            #isPendingRender = false;

            requestRender() {
                if (this.#isPendingRender) return;
                this.#isPendingRender = true;

                // Espera a que termine la ráfaga de cambios actual
                queueMicrotask(() => {
                    this.#isPendingRender = false;
                    this.render();
                });
            }

            render() {
                // Implementado por la clase hija
            }
        }

        // 2. COMPONENTE HIJO
        class UserCard extends BaseComponent {
            static get observedAttributes() {
                return ["nombre", "apellido", "edad"];
            }

            connectedCallback() {
                // Hacemos el primer render al conectar el componente
                this.requestRender();
            }

            attributeChangedCallback(name, oldValue, newValue) {
                // Cada vez que un atributo cambia y es diferente al anterior:
                if (oldValue !== newValue && this.isConnected) {

                    // ❌ MODO MALO (Sin Render Trigger):
                    // Si pusieras this.render() aquí, se ejecutaría 3 VECES al dar clic.

                    // ✅ MODO OPTIMIZADO (Con Render Trigger):
                    this.requestRender();
                }
            }

            render() {
                // Imprimimos en la consola cada vez que el DOM REAL se vuelve a pintar
                console.log("🚀 %c[RENDER EJECUTADO EN EL DOM]", "color: #00ff00; font-weight: bold;");

                const nombre = this.getAttribute("nombre") || "";
                const apellido = this.getAttribute("apellido") || "";
                const edad = this.getAttribute("edad") || "";

                this.innerHTML = `
                    <p><strong>Nombre completo:</strong> ${nombre} ${apellido}</p>
                    <p><strong>Edad:</strong> ${edad} años</p>
                `;
            }
        }

        window.customElements.define("user-card", UserCard);


        // 3. PRUEBA EN VIVO CON EL BOTÓN
        const userCard = document.querySelector("#mi-usuario");
        const btn = document.querySelector("#btn-cambiar");

        btn.addEventListener("click", () => {
            console.log("\n--- 🖱️ Clic en el botón: Cambiando 3 atributos seguidos ---");

            // Modificamos los 3 atributos en el mismo "bloque de código" (hilo síncrono)
            userCard.setAttribute("nombre", "Jorge");
            userCard.setAttribute("apellido", "Méndez");
            userCard.setAttribute("edad", "30");

            console.log("--- Fin del bloque síncrono de JavaScript ---");
        });
    </script>
</body>
</html>
```

#### ¿Qué sucede en la Consola al hacer clic en el botón?

Si abres la consola de tu navegador y haces clic en el botón, verás la siguiente salida ordenada:

```plaintext
--- 🖱️ Clic en el botón: Cambiando 3 atributos seguidos ---
--- Fin del bloque síncrono de JavaScript ---
🚀 [RENDER EJECUTADO EN EL DOM]
```

#### ¿Qué paso exactamente interna y cronológicamente?

1.  Se ejecuta setAttribute("nombre", "Jorge"):

    -   attributeChangedCallback se dispara.
    -   Llama a requestRender().
    -   requestRender() ve que #isPendingRender es false, así que enciende la bandera (#isPendingRender = true) y programa una microtarea en la cola (queueMicrotask).

2.  Se ejecuta setAttribute("apellido", "Méndez"):

    -   attributeChangedCallback se dispara.
    -   Llama a requestRender().
    -   requestRender() ve que #isPendingRender ya es true, por lo que el if (this.#isPendingRender) return; lo detiene inmediatamente. No programa nada nuevo.

3.  Se ejecuta setAttribute("edad", "30"):

    -   attributeChangedCallback se dispara.
    -   Llama a requestRender().
    -   De nuevo se ignora porque #isPendingRender sigue siendo true.

4.  El script termina y se imprime "--- Fin del bloque síncrono de JavaScript ---".

5.  El hilo principal de JavaScript queda libre por un milisegundo. El navegador revisa la cola de microtareas (microtask queue), encuentra la única tarea que dejamos programada y ejecuta render() una sola vez con los 3 valores ya actualizados.

#### Experimento (Para comprobar la diferencia)

Prueba cambiar la línea de attributeChangedCallback en el script por un render directo sin pasar por requestRender():

```javascript
// Prueba esto temporalmente:
attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
        this.render(); // Sin requestRender
    }
}
```

Si haces clic en el botón con ese cambio, verás esto en la consola:

```Plaintext
--- 🖱️ Clic en el botón: Cambiando 3 atributos seguidos ---
🚀 [RENDER EJECUTADO EN EL DOM]  <-- Por cambiar 'nombre'
🚀 [RENDER EJECUTADO EN EL DOM]  <-- Por cambiar 'apellido'
🚀 [RENDER EJECUTADO EN EL DOM]  <-- Por cambiar 'edad'
--- Fin del bloque síncrono de JavaScript ---
```
