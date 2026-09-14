const TEMPLATE = document.createElement("template");

TEMPLATE.innerHTML = `
    <div class="toast" id="toast">
        <div class="toast-header">
            <span id="toast-title">Type</span>
            <button id="btn-close">❌</button>
        </div>
        <div class="toast-body">
            <i></i>
            <slot name="message"></slot>
        </div>
        <div class="toast-footer" id="toast-footer"></div>
    </div>
`;

export default TEMPLATE;
