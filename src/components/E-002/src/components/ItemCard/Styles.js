const $STYLE = new CSSStyleSheet();

$STYLE.replaceSync(`
    :host * {
        --default-dark-color:  #595959;
        --default-light-color: #cccccc;
        --default-txt-color: #999999;
        padding: 0;
        margin: 0;
    }

    .card-item {
        border-radius: 20px;
        background-color: var(--default-light-color);
        height: 380px;
        width: 100%;
        color: var(--default-txt-color);
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-weight: bold;
    }

    .card-item_head {
        border-radius: 20px 20px 0 0;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background-color: var(--default-dark-color);
    }

    .card-item_head > button {
        cursor: pointer;
        border: 0;
        width: 24px;
        height: 24px;
        display: inline-block;
        background-image: url('../../../../src/assets/agregar.png');
        background-color: transparent;
        background-size: cover;
    }

    .card-item_head > .remove {
        background-image: url('../../../../src/assets/cancelar.png');
    }

    .card-item_poster {
        display: flex;
        gap: 10px;
        flex-direction: column;
    }

    .card-item_poster > img {
        aspect-ratio: 1/1;
        width: 180px;
        align-self: center;
        padding: 15px;
        box-sizing: content-box;
    }

    .card-item_footer {
        background-color: var(--default-dark-color);
        border-radius: 0 0 20px 20px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap:5px;
    }

    .card-item_footer > span {
        text-align: right;
    }

    .card-item_footer > span::before {
        content: "";
        display: inline-block;
        width: 14px;
        height: 14px;
        background-image: url('../../../../src/assets/precio.png');
        background-color: transparent;
        background-size: 14px 14px;
    }
`);

export default $STYLE;
