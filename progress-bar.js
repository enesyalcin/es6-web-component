class ProgressBar extends HTMLElement{
    constructor(){
        super();

        this._complete = 0;
        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = `
            <style>
                .progress-bar {
                    width: 50%;
                    height: 30px;
                    background-color: #EDF2F4;
                    border-radius: 5px;
                    color: white;
                }

                .progress-bar-inner {
                    height: 100%;
                    line-height: 30px;
                    background: #2B2D43;
                    text-align: center;
                    border-radius: 5px;
                    transition: width 0.25s;
                }
            </style>
            <slot></slot>
            <div class="progress-bar">
                <div class="progress-bar-inner">${this._complete}</div>
            </div>
        `;
    }

    get complete() {
        return this._complete;
    }

    set complete(val) {
        this.setAttribute('complete', val);
    }    

    static get observedAttributes() {
        return [ 'complete' ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        var innerBar = this.shadowRoot.querySelector('.progress-bar-inner');

        switch(name){
            case 'complete':
                this._complete = parseInt(newVal, 10) || 0;

                innerBar.style.width = this.complete + '%';
                innerBar.innerHTML = this.complete + '%';
        }
    }
}

window.customElements.define('progress-bar', ProgressBar);
