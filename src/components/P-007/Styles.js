import { css } from "lit";

export const Styles = css`
    :host * {
        padding: 0;
        margin: 0;
    }
    :host {
        --state-offline: #43453b;
        --state-online: #709d15;
    }
    :host .badge {
        border-radius: 10px;
        padding: 10px;
        color: white;
        font-size: 12px;
    }
    :host .offline {
        background: var(--state-offline);
    }
    :host .online {
        background: var(--state-online);
    }
`;
