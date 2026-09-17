const STYLES = new CSSStyleSheet();

STYLES.replaceSync(`
    :host * {
        margin: 0;
        padding: 0;
    }

    :host {
        --dark-default: #4d4d4d;
        --light-default: #999999;

        --dark-ok: #004d00;
        --ligth-ok: #ccffcc;

        --dark-info: #0f1f3d;
        --ligth-info: #d6e0f5;

        --dark-error: #4d0019;
        --ligth-error: #ffccdd;

        --dark-warn: #4d3d00;
        --ligth-warn: #fff5cc;
    }

    .toast {
        width: 320px;
        background-color: var(--dark-default);
        color: var(--light-default);
        display: flex;
        flex-direction: column;
    }

    .toast-header {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--dark-default);
    }

    .toast-header button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 12px;
    }

    .toast-body {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background-color: var(--light-default);
        color: var(--dark-default);
    }

    .toast-body i {
        width: 32px;
        height: 32px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-color: var(--dark-default);
    }

    .toast-footer {
        background-color: var(--light-default);
        height: 4px;
        width: 0;
        animation: progreso 0 linear forwards;
    }

    /* Success Toast Styles */
    .success {
        background-color: var(--ligth-ok);
    }

    .success .toast-header {
        background-color: var(--dark-ok);
        color: var(--ligth-ok);
    }

    .success .toast-body {
        background-color: var(--ligth-ok);
        color: var(--dark-ok);
    }

    .success .toast-body i {
        background-image: url('../../src/assets/ok.png');
        background-color: var(--ligth-ok);
    }

    .success .toast-footer {
        background-color: var(--dark-ok);
        color: var(--ligth-ok);
    }

    /* Info Toast Styles */
    .info {
        background-color: var(--ligth-info);
    }

    .info .toast-header {
        background-color: var(--dark-info);
        color: var(--ligth-info);
    }

    .info .toast-body {
        background-color: var(--ligth-info);
        color: var(--dark-info);
    }

    .info .toast-body i {
        background-image: url('../../src/assets/info.png');
        background-color: var(--ligth-info);
    }

    .info .toast-footer {
        background-color: var(--dark-info);
        color: var(--ligth-info);
    }

    /* Error Toast Styles */
    .error {
        background-color: var(--ligth-error);
    }

    .error .toast-header {
        background-color: var(--dark-error);
        color: var(--ligth-error);
    }

    .error .toast-body {
        background-color: var(--ligth-error);
        color: var(--dark-error);
    }

    .error .toast-body i {
        background-image: url('../../src/assets/error.png');
        background-color: var(--ligth-error);
    }

    .error .toast-footer {
        background-color: var(--dark-error);
        color: var(--ligth-error);
    }

    /* Warn Toast Styles */
    .warn {
        background-color: var(--ligth-warn);
    }

    .warn .toast-header {
        background-color: var(--dark-warn);
        color: var(--ligth-warn);
    }

    .warn .toast-body {
        background-color: var(--ligth-warn);
        color: var(--dark-warn);
    }

    .warn .toast-body i {
        background-image: url('../../src/assets/warn.png');
        background-color: var(--ligth-warn);
    }

    .warn .toast-footer {
        background-color: var(--dark-warn);
        color: var(--ligth-warn);
    }

    /* Progress Animation */
    @keyframes progreso {
        from {
            width: 0;
        }

        to {
            width: 320px;
        }
    }
`);

export default STYLES;
