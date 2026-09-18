const $STYLE = new CSSStyleSheet();

$STYLE.replaceSync(`
    :host * {
        padding: 0;
        margin: 0;
    }
    :host #view-cart {
        cursor: pointer;
        border: 0;
        width: 24px;
        height: 24px;
        display: inline-block;
        background-image: url('../../../../src/assets/ver.png');
        background-color: transparent;
        background-size: cover;
    }

    :host dialog {
        position: fixed;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        padding: 16px;
        background: rgba(0, 0, 0, .5);
        backdrop-filter: blur(5px);
        top: 0;
    }
    #modal-content {
        width: 1024px;
        height: auto;
        max-height: 80vh;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        overflow: auto;
        margin: 0 auto;
    }
`);

export default $STYLE;
