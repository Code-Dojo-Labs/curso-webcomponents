**[◀️ Regresar](../../../README.md)**

# 📕 Examen Parcial de Certificación (Patrones de diseño)

Para poner a prueba lo aprendido, te sugiero resolver el siguiente ejercicio basándote en la arquitectura previa:

Reto: "Carrito de Compras / Contador de Productos"
Crear el Store (CartStore):

El estado debe guardar un arreglo items (ej: { id, name, price }).

Métodos: addItem(product), removeItem(id), clearCart().

Crear un Componente Presentacional (`<product-card-view>`):

Atributos observables: name, price, product-id.

Muestra el nombre y precio del producto con un botón "Añadir al Carrito".

Emite un evento add-to-cart con los datos del producto al hacer clic.

Crear un Componente Contenedor (`<shopping-cart-container>`):

Se suscribe al CartStore.

Renderiza la lista de productos agregados al carrito usando un template o mapeo.

Muestra el precio total calculado sumando todos los elementos.

Crear un Badge (`<cart-badge>`):

Se suscribe al CartStore.

Utiliza el patrón Render Trigger (requestRender()) para actualizar únicamente el número total de artículos en el carrito sin re-renderizados innecesarios.

Esta práctica te permitirá comprobar cómo los componentes se comunican de forma limpia, reactiva y desacoplada utilizando estándares nativos de la web.
