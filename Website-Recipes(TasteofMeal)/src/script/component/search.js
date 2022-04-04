class SearchBar extends HTMLElement {
    
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }
    
    connectedCallback(){
        this.render();
    }
   
    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }
  
    get value() {
        return this.shadowDOM.querySelector("#searchElement").value;
    }
  
    renderError(message) {
        this.shadowDOM.innerHTML = `
        <style>
        .placeholder {
            font-weight: lighter;
            color: rgba(0,0,0,0.5);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    </style>
        `;
        this.ShadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            .search-container {
                display: flex;
                padding: 3px;
                margin: 15px;
                border: 1px solid skyblue;
                border-radius: 25px;
                width: 50%;
                justify-content: left;
                background: #c0dde5;
            }
            input[type="search"] {
                border: none;
                background: transparent;
                margin: 0;
                padding: 7px 8px;
                font-size: 14px;
                color: inherit; 
                width: 100%;
                border: 1px;
                display: block;
            }
            button[type="submit"] {
                text-indent: -999px;
                overflow: hidden;
                width: 100%;
                padding: 0;
                margin: 0;
                border: 1px solid transparent;
                border-radius: inherit;
                background: #57b8bf url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
                cursor: pointer;
                opacity: 0.7;
                flex-basis: 15%;
            }
            button[type="submit"]:hover {
                opacity: 10;
            }
            button[type="submit"]:focus,
            input[type="search"]:focus {
            width: 100%;
            outline: none;
            }
        </style>
        <form onsubmit="event.preventDefault();" role="search">
            <div id="search-container" class="search-container">
                <input placeholder="Search..." class="search" id="searchElement" type="search">
                <button id="searchButtonElement" type="submit">Search</button>
            </div>
        </form>
        `;
  
        this.shadowDOM.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);
    }
}

customElements.define("search-bar", SearchBar);