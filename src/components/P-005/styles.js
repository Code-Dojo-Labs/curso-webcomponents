const STYLES = new CSSStyleSheet();

STYLES.replaceSync(`
    :host * {
        margin: 0;
        padding: 0;
    }
    :host section {
        border-radius: 10px;
        border: 1px solid rgb(253,151,31, 0.1);
        box-shadow: 4px 4px 5px rgba(253,151,31, 0.1);
        padding: 20px;
        width: auto;
        position: relative;
    }
    :host section button {
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        right:10px;
        top:10px;
    }
    .login {
        background-color: rgb(169,220,118);
    }
    .logout {
        background-color: rgb(255,97,136);
    }
    .login::after {
        content: "✅";
    }

    .logout::after {
        content: "❎";
    }

    :host section figure {
        display: flex;
        gap: 20px;
        width: 100%;
    }
    :host section figure figcaption {
        display: flex;
        gap:5px;
        flex-direction: column;
        justify-content: center;
    }
    ::slotted(img) {
        background-color: rgb(166,226,46);
        object-fit: cover;
        width: 100px;
        border-radius: 50%;
    }
    ::slotted(span) {
        color: white;
        font-weight: bold;
        font-size: 16px;
    }
`);

export default STYLES;
