(function () {
    class Game {
        constructor(field) {
            this._field = document.querySelector(field);
            this._snake = new Snake(7, '.field');
            this._start = new Start('.field');

            this._step = 10;
            this._id;
            this._delay = 250;

            this._elems = this._snake.getSquares();
            this._coordinate = this._snake.getCoordinate(this._elems);

            // console.log(this.getWidthCss(this._field));

            this.run();
        }

        run() {
            this._start.getButton().addEventListener('click', () => {
                this._start.getWrap().classList.add('hide');

                this._id = setInterval(() => {
                    let left = parseInt(this._elems[this._elems.length - 1].style.left) + this._step + 'px';
                    let top = parseInt(this._elems[this._elems.length - 1].style.top) + 'px';

                    this.checkOnCollisionWithBorder(this.getWidthCss(this._field), left, this._step, this._id);

                    new Move(this._elems, this._coordinate, top, left);

                }, this._delay);

                document.documentElement.addEventListener('keydown', (event) => {
                    let code = event.keyCode;
                    
                    if (code == 37) {
                        clearInterval(this._id);
    
                        this._id = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) - this._step + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) + 'px';

                            // this.checkOnCollisionWithBorder('0px', left, -this._step, this._id);
    
                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
    
                    } else if (code == 38) {
                        clearInterval(this._id);
    
                        this._id = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) - this._step + 'px';
    
                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
    
                    } else if (code == 39) {
                        clearInterval(this._id);
    
                        this._id = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) + this._step + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) + 'px';

                            this.checkOnCollisionWithBorder(this.getWidthCss(this._field), left, this._step, this._id);
    
                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
                        
                    } else if (code == 40) {
                        clearInterval(this._id);
    
                        this._id = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) + this._step + 'px';

                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
                        
                    }
                });
            });
        }

        getWidthCss(elem) {
            return getComputedStyle(elem).width;
        }

        getHeightCss(elem) {
            return getComputedStyle(elem).height;
        }

        checkOnCollisionWithBorder(border, coordinate, step, id) {
            if (parseInt(coordinate) > parseInt(border) - step) {
                console.log(coordinate + ' ' + border);
                clearInterval(id);
            }
        }
    }

    class Snake {
        constructor(quantity, parent) {
            this._parentSnake = document.querySelector(parent);
            this._quantity = quantity;
            this._squares = [];

            for (let i = 0, top = 20, left = 20; i < quantity; i++, left += 10) {

                let div = document.createElement('div');
                    div.classList.add('square');
                    div.style.top = top + 'px';
                    div.style.left = left + 'px';

                this._parentSnake.appendChild(div);
                this._squares.push(div);
            }
        }

        getSquares() {
            return this._squares;
        }

        getCoordinate(arr) {
            let result = [];

            for (let i = 0; i < arr.length; i++) {

                result.push([arr[i].style.top, arr[i].style.left]);

            }

            return result;
        }

        addSquare() {
            let div = document.createElement('div');
                div.classList.add('square');
            this._parentSnake.appendChild(div);
            this._squares.push(div);
        }

    }

    class Start {
        constructor(parent) {
            this._parentStart = document.querySelector(parent);

            this._wrapStart = document.createElement('div');
                this._wrapStart.classList.add('start__wrap');
           this._parentStart.appendChild(this._wrapStart);

            this._button = document.createElement('button');
                this._button.innerHTML = 'Start';
                this._button.classList.add('start__button');
            this._wrapStart.appendChild(this._button);
        }

        getWrap() {
            return this._wrapStart;
        }

        getButton() {
            return this._button;
        }
    }

    class Move {
        constructor(elems, coordinate, top, left) {
            this._elems = elems;
            this._coordinate = coordinate;

            this._top = top;
            this._left = left;

            this._coordinate.push([this._top, this._left]);
            this._coordinate.shift();
    
            for (let i = 0; i < this._elems.length; i++) {
    
                this._elems[i].style.top = this._coordinate[i][0];
                this._elems[i].style.left = this._coordinate[i][1];
    
            }
        }
    }

    let game = new Game('.field');
})();