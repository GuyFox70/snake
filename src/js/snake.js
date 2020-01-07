(function () {
    class Game {
        constructor(field) {
            this._step = 10;
            this._delay = 250;
            this._top = 20;
            this._left = 20;
            this._size = ['7px', '7px'];
            this._currentCode;
            this._counter = 0;
            this._acceleration = 20;

            this._field = document.querySelector(field);
            this._snake = new Snake(4, this._field, this._step, this._top, this._left, this._size);
            this._start = new Start('.field');
            this._lose = new Lose(this._field);
            this._blink = new Blink(this._field);

            this._idInterval;
            this._idTimeOut;

            this._elems = this._snake.getSquares();
            this._coordinate = this._snake.getCoordinate(this._elems);

            this.run();
        }

        run() {
            this._start.getButton().addEventListener('click', () => {
                this._start.getWrap().classList.add('hide');

                this._currentCode = 37;

                this._idTimeOut = setTimeout(() => {
                    this._blink.showDIV(this.getNum(this.getWidthCss(this._field)),this.getNum(this.getHeightCss(this._field)), this._step);
                    
                    clearTimeout(this._idTimeOut);
                }, 2000);

                this._idInterval = setInterval(() => {
                    let left = parseInt(this._elems[this._elems.length - 1].style.left) + this._step + 'px';
                    let top = parseInt(this._elems[this._elems.length - 1].style.top) + 'px';

                    this.checkCrossSnake(top, left);

                    this.catch(this._blink.getTopLeft(), [top, left]);

                    this.checkOnCollisionWithBorderLeftAndDown(this.getWidthCss(this._field), left, this._id);

                    new Move(this._elems, this._coordinate, top, left);

                }, this._delay);

                document.documentElement.addEventListener('keydown', (event) => {
                    let code = event.keyCode;
                    
                    if (code == 37 && this._currentCode != 37 && this._currentCode != 39) {

                        clearInterval(this._idInterval);

                        this._currentCode = code;
                        
                        this._idInterval = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) - this._step + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) + 'px';

                            this.catch(this._blink.getTopLeft(), [top, left]);

                            this.checkOnCollisionWithBorderRightAndUp('0px', left, this._id);

                            this.checkCrossSnake(top, left);
    
                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
    
                    } else if (code == 38 && this._currentCode != 38 && this._currentCode != 40) {

                        clearInterval(this._idInterval);

                        this._currentCode = code;
    
                        this._idInterval = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) - this._step + 'px';

                            this.catch(this._blink.getTopLeft(), [top, left]);
                            
                            this.checkOnCollisionWithBorderRightAndUp('0px', top, this._id);

                            this.checkCrossSnake(top, left);
    
                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
    
                    } else if (code == 39 && this._currentCode != 39 && this._currentCode != 37) {

                        clearInterval(this._idInterval);

                        this._currentCode = code;
    
                        this._idInterval = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) + this._step + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) + 'px';

                            this.catch(this._blink.getTopLeft(), [top, left]);

                            this.checkOnCollisionWithBorderLeftAndDown(this.getWidthCss(this._field), left, this._id);

                            this.checkCrossSnake(top, left);
    
                            new Move(this._elems, this._coordinate, top, left);
    
                        }, this._delay);
                        
                    } else if (code == 40 && this._currentCode != 40 && this._currentCode != 38) {

                        clearInterval(this._idInterval);

                        this._currentCode = code;
    
                        this._idInterval = setInterval(() => {
                            let left = parseInt(this._elems[this._elems.length - 1].style.left) + 'px';
                            let top = parseInt(this._elems[this._elems.length - 1].style.top) + this._step + 'px';

                            this.catch(this._blink.getTopLeft(), [top, left]);

                            this.checkOnCollisionWithBorderLeftAndDown(this.getHeightCss(this._field), top, this._id);

                            this.checkCrossSnake(top, left);

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
                clearInterval(this._idInterval);
                this._blink.hideElement();
                this._lose.showMessage();
            }
        }

        checkOnCollisionWithBorderRightAndUp(border, coordinate, id) {
            if (parseInt(coordinate) < parseInt(border)) {
                clearInterval(this._idInterval);
                this._blink.hideElement();
                this._lose.showMessage();
            }
        }

        catch(arr1, arr2) {
            if (arr1[0] == arr2[0] && arr1[1] == arr2[1]) {

                this._snake.addSquare(this._field, this._coordinate);
                this._coordinate = this._snake.getCoordinate(this._elems);
                this._blink.hideElement();
               
                this._idTimeOut = setTimeout(() => {
                    this._blink.showDIV(this.getNum(this.getWidthCss(this._field)),this.getNum(this.getHeightCss(this._field)), this._step);
                    
                    clearTimeout(this._idTimeOut);
                }, 2000);

                this._counter++;
                this.reduceDelay();
            }
        } 

        getNum(str) {
            return parseInt(str);
        }

        checkCrossSnake(top, left) {
            for (let elem of this._coordinate) {
                if (top == elem[0] && left == elem[1]) {
                    clearInterval(this._idInterval);
                    this._blink.hideElement();
                    this._lose.showMessage();
                }
            }
        }

        reduceDelay() {
            if (this._counter % 10 == 0) this._delay -= this._acceleration;
            console.log(this._delay);
        }
    }

    class Snake {
        constructor(quantity, parent, step, top, left, size) {
            this._quantity = quantity;
            this._squares = [];

            for (let i = 0, t = top, l = left; i < quantity; i++, l += step) {

                let div = document.createElement('div');
                    div.classList.add('square');

                    div.style.width = size[0];
                    div.style.height = size[1];

                    div.style.top = t + 'px';
                    div.style.left = l + 'px';

                parent.appendChild(div);
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

        addSquare(parent, arr) {
            let div = document.createElement('div');
                div.classList.add('square');
                div.style.top = arr[arr.length - 1][0];
                div.style.left = arr[arr.length - 1][1];
            parent.appendChild(div);
            this._squares.push(div);

            this._counter++;
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
        constructor(parent) {
            this._parent = parent;

            this._div = document.createElement('div');
            this._div.classList.add('blink');
            this._parent.appendChild(this._div);
        }

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        getTopLeft() {
            return [this._div.style.top, this._div.style.left];
        }

        getRandomPoints(min, max) {
            let arr = this.getRandomInt(min, max).toFixed().split('');
			let newarr = arr.splice(-1, 1, '0');
            
            return arr.join('') + 'px';
        }

		getRandomInt(min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        hideElement() {
            this._div.classList.remove('visible');
        }

        showDIV(width, height, step) {
            this._div.style.top = this.getRandomPoints(10, height - step);
            this._div.style.left = this.getRandomPoints(10, width - step);
            this._div.classList.add('visible');
        }
    }

    new Game('.field');
})();