import { html } from "lit";

const Template = (params) => {
    const { state = false } = params;
    return html`
        <div class="badge ${state ? "online" : "offline"}">
            <span>${state ? "Online" : "Offline"}</span>
        </div>
    `;
};

export default Template;
