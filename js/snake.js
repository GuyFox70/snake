(function () {
    class Game {
        constructor(field) {
            this._field = document.querySelector(field);
            this._snake = new Snake(7, '.field');
            this._start = new Start('.field');
            this._lose = new Lose(this._field);

            this._step = 10;
            this._id;
            this._delay = 250;

            this._blink = new Blink(this._field, this.getNum(this.getWidthCss(this._field)), this.getNum(this.getHeightCss(this._field)), this._step);

            this._elems = this._snake.getSquares();
            this._coordinate = this._snake.getCoordinate(this._elems);

            this.run();
            console.log(this._blink.getTopLeft());
        }

        run() {
            this._start.getButton().addEventListener('click', () => {
                this._start.getWrap().classList.add('hide');

                this._id = setInterval(() => {
                    let left = parseInt(this._elems[this._elems.length - 1].style.left) + this._step + 'px';
                    let top = parseInt(this._elems[this._elems.length - 1].style.top) + 'px';

                    this.catch(this._blink.getTopLeft(), left);

                    this.checkOnCollisionWithBorderLeftAndDown(this.getWidthCss(this._field), left, this._id);

                    new Move(this._elems, this._coordinate, top, left);

                }, this._delay);

                document.documentElement.addEventListener('keydown', (event) => {
                    let code = event.keyCode;
                    
                    if (code == 37) {
                        clearInterval(this._id);
    
                        this._id = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) - this._step + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) + 'px';

                            this.catch(this._blink.getTopLeft(), left);

                            this.checkOnCollisionWithBorderRightAndUp('0px', left, this._id);
    
                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
    
                    } else if (code == 38) {
                        clearInterval(this._id);
    
                        this._id = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) - this._step + 'px';

                            this.catch(this._blink.getTopLeft(), top);
                            
                            this.checkOnCollisionWithBorderRightAndUp('0px', top, this._id);
    
                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
    
                    } else if (code == 39) {
                        clearInterval(this._id);
    
                        this._id = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) + this._step + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) + 'px';

                            this.catch(this._blink.getTopLeft(), left);

                            this.checkOnCollisionWithBorderLeftAndDown(this.getWidthCss(this._field), left, this._id);
    
                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
                        
                    } else if (code == 40) {
                        clearInterval(this._id);
    
                        this._id = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) + this._step + 'px';

                            this.catch(this._blink.getTopLeft(), top);

                            this.checkOnCollisionWithBorderLeftAndDown(this.getHeightCss(this._field), top, this._id);

                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
                        
                    }
                });
            });

            this._lose.getButton().addEventListener('click', () => {
                this._field.innerHTML = '';

                new Game('.field');
            });
        }

        getWidthCss(elem) {
            return getComputedStyle(elem).width;
        }

        getHeightCss(elem) {
            return getComputedStyle(elem).height;
        }

        checkOnCollisionWithBorderLeftAndDown(border, coordinate, id) {
            if (parseInt(coordinate) > parseInt(border)) {
                clearInterval(id);
            }
        }

        checkOnCollisionWithBorderRightAndUp(border, coordinate, id) {
            if (parseInt(coordinate) < parseInt(border)) {
                clearInterval(id);
                this._lose.showMessage();
            }
        }

        catch(arr, coordinate) {
            for (let elem of arr) {
                if (elem == coordinate) {
                    console.log('yes');
                }
            }
        } 

        getNum(str) {
            return parseInt(str);
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

    class Lose {
        constructor(parent) {

            this._divWrap = document.createElement('div');
                this._divWrap.classList.add('lose__wrap');
            parent.appendChild(this._divWrap);

            this._divMessage = document.createElement('div');
                this._divMessage.classList.add('lose__message');
            this._divWrap.appendChild(this._divMessage);

            this._p = document.createElement('p');
                this._p.innerHTML = 'Your lost!!!'
                this._p.classList.add('lose__message__text');
            this._divMessage.appendChild(this._p);

            this._button = document.createElement('button');
                this._button.innerHTML = 'Again'
                this._button.classList.add('lose__message__button');
            this._divMessage.appendChild(this._button);
        }

        showMessage() {
            this._divWrap.classList.add('visible');
        }

        getButton() {
            return  this._button;
        }
    }
    class Blink {
        constructor(parent, width, height, step) {
            this._div = document.createElement('div');
            this._div.classList.add('blink');
                this._div.style.top = this.getRandomInt(10, height - step) + 'px';
                this._div.style.left = this.getRandomInt(10, width - step) + 'px';
            parent.appendChild(this._div);
        }

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        getTopLeft() {
            return [this._div.style.top, this._div.style.left];
        }
    }

    new Game('.field');
})();