const $TEMPLATE = document.createElement("template");

$TEMPLATE.innerHTML = `
    <div class="card-item">
        <div class="card-item_head">
            <span id="name">Product Name</span>
            <button id="add"></button>
        </div>
        <figure class="card-item_poster">
            <img src="../../assets/default.png" id="poster" alt="">
            <figcaption class="card-item_footer">
                <p id="description">Description of the product</p>
                <span id="price">0.00</span>
            </figcaption>
        </figure>
    </div>
`;

export default $TEMPLATE;
