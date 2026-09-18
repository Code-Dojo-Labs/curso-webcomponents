const $STYLE = new CSSStyleSheet();

$STYLE.replaceSync(`
    :host * {
        padding: 0;
        margin: 0;
    }

    .shopping {
        display: flex;
        align-items: center;
        font-size: 18px;
        gap: 20px;
    }
    .shopping i {
        display: block;
        width: 24px;
        height: 24px;
        background-image: url('../../../../src/assets/shopping.png');
        background-size: cover;
        background-position: center;
    }

    .shopping span {
        height: 24px;
        display: flex;
        align-items: center;
        width: fit-content;
    }
    .shopping #cart-total::before {
        content: "";
        display: inline-block;
        width: 24px;
        height: 24px;
        background-image: url('../../../../src/assets/precio.png');
        background-color: transparent;
        background-size: 24px 24px;
    }
`);

export default $STYLE;
