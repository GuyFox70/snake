(function () {
    class Game {
        constructor() {
           this._draw = new Draw(10, 100, 3);
           this._start = new Start;

           this._canvas = document.querySelector('.canvas');
           this.id;
           this._x = this._draw.getX();
           this._y = this._draw.getY();

           this.run();
        }

        run() {
            this._start.getButton().addEventListener('click', () => {
                this._start.getWrap().classList.add('hide');

                this.id = setInterval(() => {
                    this._draw = new Draw(this._x += 10, this._y, 3);
                }, 250);
            });

            document.documentElement.addEventListener('keydown', (event) => {
                let code = event.keyCode;

                if (code == 37) {

                    clearInterval(this.id);

                    this.id = setInterval(() => {
                        this._draw = new Draw(this._x -= 10, this._y, 3);
                    }, 250);

                } else if (code == 38) {

                    clearInterval(this.id);

                    this.id = setInterval(() => {
                        this._draw = new Draw(this._x, this._y -=10, 3);
                    }, 250);

                } else if (code == 39) {

                    clearInterval(this.id);

                    this.id = setInterval(() => {
                        this._draw = new Draw(this._x += 10, this._y, 3);
                    }, 250);

                } else if (code == 40) {

                    clearInterval(this.id);

                    this.id = setInterval(() => {
                        this._draw = new Draw(this._x, this._y +=10, 3);
                    }, 250);

                }
            });
        }
    }

    class Draw {
        constructor(x, y, quantity) {
            this._x = x;
            this._y = y;
            this._quantity = quantity;

            this._canvas = document.querySelector('.canvas');

            this._canvas.width = parseInt(getComputedStyle(document.body).width);
            this._canvas.height = parseInt(getComputedStyle(document.body).height);

            let ctx = this._canvas.getContext('2d');

            for (let i = 0, x = this._x, y = this._y; i < this._quantity; x += 12, i++) {
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, this.getRadians(360));
                ctx.fill();
            }
        }

        getRadians(degrees) {
            return (Math.PI/180)*degrees;
        }

        getX() {
            return this._x;
        }

        getY() {
            return this._y;
        }

        setQuantity(num) {
            this._quantity = num;
        }

        setX(x) {
            console.log(x);
            this._x = x;
        }

        setY(y) {
            this._y = y;
        }
    }

    class Start {
        constructor() {
            this._wrap = document.createElement('div');
                this._wrap.classList.add('start__wrap');
            document.body.appendChild(this._wrap);

            this._button = document.createElement('button');
                this._button.innerHTML = 'Start';
                this._button.classList.add('start__button');
            this._wrap.appendChild(this._button);
        }

        getWrap() {
            return this._wrap;
        }

        getButton() {
            return this._button;
        }
    }

    let game = new Game;
})();