**[◀️ Regresar](../../../)**

# 📕 Lección 1: Introducción y Fundamentos de WebComponents

Los WebComponents son un conjunto de APIs nativas de la plataforma web (HTML, CSS y JS) que te permiten crear etiquetas HTML personalizadas, reutilizables y completamente encapsuladas.

A diferencia de frameworks como React, Angular o Vue, los WebComponents no requieren librerías de terceros para ejecutarse en el navegador. Se basan en tres pilares nativos fundamentalmente:

1. Custom Elements: La API que permite definir nuevas etiquetas HTML (ej. `<user-card>`).

2. Shadow DOM: Un árbol DOM aislado que encapsula los estilos y la estructura interna para evitar colisiones CSS.

3. HTML Templates (`<template> y <slot>`): Mecanismos nativos para definir marcado inerte reutilizable y proyectar contenido dinámico.

## Reglas de Clean Code para WebComponents

-   Nombres de etiquetas en Kebab-Case con guion obligatorio: Toda etiqueta personalizada debe tener al menos un guion (ej. app-button, no appbutton) para evitar colisiones con futuras etiquetas nativas de HTML.

-   Principio de Responsabilidad Única (SRP): Un WebComponent solo debe encargarse de una tarea conceptual dentro de la UI.

-   Sin efectos secundarios en el constructor: El constructor solo debe usarse para inicializar estados internos básicos. Las manipulaciones del DOM se hacen en el callback de ciclo de vida connectedCallback.

## EJEMPLO PRÁCTICO

Crearemos nuestro primer Custom Element aplicando clases modernas de ES6+ y herencia de HTMLElement.

```javascript
/**
    - Custom Element representativo para bienvenida.
    - Sigue las reglas de Clean Code: nomenclatura kebab-case y principio SRP.
    - Archivo: src/components/hello-world.js
 */
export class HelloWorld extends HTMLElement {
    constructor() {
        super();
        // Buenas prácticas: Declaración explicita de miembros
        this.name = "Gakusei";
    }

    connectedCallback() {
        // Renderizado seguro cuando el componente entra al DOM
        this.render();
    }

    render() {
        this.innerHTML = `
<div class="hello-container">
        <h1>¡Hola, ${this.name}! Bienvenido a WebComponents.</h1>
      </div>
    `;
    }
}

// Registro en el CustomElementRegistry
customElements.define("hello-world", HelloWorld);
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
        <hello-world></hello-world>

        <script type="module" src="./src/components/hello-world.js"></script>
    </body>
</html>
```

Como podemos ver este es el primer ejemplo base de un webcomponent.
