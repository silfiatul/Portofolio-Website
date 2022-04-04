class MealItem extends HTMLElement {
    
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    set meal(meal) {
        this._meal = meal;
        this.render();
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
        </style>`;
        this.shadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    }
  
    render() {
        this.shadowDOM.innerHTML = `
        <style>
        .card {
            width: 15rem; 
            margin:5px;
            padding:10px 0;
            display: inline-block;
        }
        body {
            background: #f9f9f9;
            font-size: 16px;
            font-family: 'Raleway', sans-serif
        }
        .title {
            color: #1a1a1a;
            text-align: center;
            margin-bottom: 10px
        }
        
        .content {
            position: relative;
            width: 90%;
            max-width: 400px;
            margin: auto;
            overflow: hidden
        }
        
        .content .content-overlay {
            background: rgba(0, 0, 0, 0.7);
            position: absolute;
            height: 99%;
            width: 100%;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            opacity: 0;
            -webkit-transition: all 0.4s ease-in-out 0s;
            -moz-transition: all 0.4s ease-in-out 0s;
            transition: all 0.4s ease-in-out 0s
        }
        
        .content:hover .content-overlay {
            opacity: 1;
            border-radius: 5px;
        }

        .content-image {
            width: 100%
        }
        
        img {
            box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
            border-radius: 5px
        }
        
        .content-details {
            position: absolute;
            text-align: center;
            padding-left: 1em;
            padding-right: 1em;
            width: 100%;
            top: 50%;
            left: 50%;
            opacity: 0;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            -webkit-transition: all 0.3s ease-in-out 0s;
            -moz-transition: all 0.3s ease-in-out 0s;
            transition: all 0.3s ease-in-out 0s
        }
        
        .content:hover .content-details {
            top: 50%;
            left: 50%;
            opacity: 1
        }
        
        .content-details h4 {
            color: #fff;
            font-weight: 500;
            letter-spacing: 0.15em;
            margin-bottom: 0.5em;
            text-transform: uppercase
        }
        
        .content-details p {
            color: #fff;
            font-size: 0.8em
        }
        
        .fadeIn-bottom {
            top: 80%
        }
        </style>
        <div class="card">
        <div class="content"> <a href="#">
            <div class="content-overlay"></div> <img class="content-image" src="${this._meal.strMealThumb}">
                <div class="content-details fadeIn-bottom">
                    <h4 class="content-title">${this._meal.strMeal}</h4>
                    <p class="content-text">Ingredients: <br /> ${this._meal.strIngredient1},${this._meal.strIngredient2},${this._meal.strIngredient3},${this._meal.strIngredient4},${this._meal.strIngredient5}
                            ${this._meal.strIngredient6},${this._meal.strIngredient7},${this._meal.strIngredient8},${this._meal.strIngredient9},${this._meal.strIngredient10}</p>
                </div>
        </a> </div>
        </div>
        `;
    }
}

customElements.define("meal-item", MealItem);
