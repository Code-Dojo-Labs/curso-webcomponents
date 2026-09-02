class Acordion extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["items"];
    }

    connectedCallback() {
        this.render();
        if (this.hasAttribute("items")) {
            const ITEMS = JSON.parse(this.getAttribute("items") || "[]");
            ITEMS.forEach((_, index) => {
                this.shadowRoot.querySelector(`#tab-${index}`).addEventListener("click", (event) => {
                    event.target.nextElementSibling.classList.toggle("content-active");
                    event.target.classList.toggle("tab-active");
                });
            });
        }
    }

    render() {
        const ITEMS = JSON.parse(this.getAttribute("items") || "[]");
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: fit-content;
                    margin: 10px auto;
                }
                :host section {
                    border-radius: 10px;
                    padding: 15px;
                    width: 300px;
                    background: #ffe6ff;
                    border: 1px solid #660066;
                }
                :host .tab {
                    background:#330033;
                    cursor: pointer;
                    border: 1px solid #ffe6ff;
                    padding: 10px;
                    font-size: 18px;
                    color: white;
                    display: flex;
                    justify-content: space-between;
                }
                :host .tab:hover {
                    background:#330033;
                }
                :host .tab::after {
                    content: "+";
                    font-weight: bold;
                }

                :host .tab-active::after {
                    content: "-";
                    font-weight: bold;
                }

                :host .content {

                    background-color:#990099;
                    color:white;
                    font-size:12px;
                    padding: 10px;
                    overflow: auto;
                    max-height: 50px;
                    display: none;
                    animation: slide-down .5s ease-out forwards;
                }
                :host .content-active {
                    display: block;
                    animation: slide-down .5s ease-in forwards;
                }
                @keyframes slide-down {
                    from {
                        display:block;
                        height: 0;
                    }

                    to {
                        height:50px;
                    }
                }
                @keyframes slide-up {
                    from {
                        height: 50;
                    }

                    to {
                        height:0px;
                        display: none;
                    }
                }
            </style>
            <section>
                ${ITEMS.map(
                    (item, index) => `
                        <div class="tab" id="tab-${index}">${item.title}</div>
                        <div class="content" id="item-${index}">${item.content}</div>`,
                ).join("")}
            </section>
        `;
    }
}

window.customElements.define("dev-acordion", Acordion);
