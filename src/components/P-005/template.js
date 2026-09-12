const TEMPLATE = document.createElement("template");

TEMPLATE.innerHTML = `
    <section>
        <button id="logout" class="login"></button>
        <figure>
            <slot name="avatar"></slot>
            <figcaption>
                <slot name="name"></slot>
                <slot name="status"></slot>
            </figcaption>
        </figure>
    </section>
`;

export default TEMPLATE;
