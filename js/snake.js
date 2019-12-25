(function () {
    class Game {
        constructor() {
           this._snake = new Snake(3, '.field');
           this._start = new Start('.field');

           this._minus = -10;
           this._plus = 10;
           this._dir;

           this._pointsTop = [];
           this._pointsLeft = [];

           this.run();
        }

        run() {
            this._start.getButton().addEventListener('click', () => {
                this._start.getWrap().classList.add('hide');

                this.addPoint(this._pointsLeft, parseInt(this._snake.getLastElementArray().style.left));
            
                this.addPoint(this._pointsTop, parseInt(this._snake.getLastElementArray().style.top));

                this.id = setInterval(() => {

                    this._forward = new Forward(this._snake.getSquares(), this._plus);

                }, 250);

                document.documentElement.addEventListener('keydown', (event) => {
                    let code = event.keyCode;
    
                    if (code == 37) {
    
                        clearInterval(this.id);
    
                        let pointTop = parseInt(this._snake.getLastElementArray().style.top);

                        this.addPoint(this._pointsTop, pointTop);

                        this._dir = 'left';

                        let flag = this.moveForLeft(this._pointsTop);
    
                        this.id = setInterval(() => {
    
                            new Left(this._snake.getSquares(), pointTop, this._minus, this._plus, flag);
    
                        }, 250);
    
                    } else if (code == 38) {
    
                        clearInterval(this.id);
    
                        let pointLeft = parseInt(this._snake.getLastElementArray().style.left);

                        this.addPoint(this._pointsLeft, pointLeft);
    
                        let flag = this.moveForUp(this._pointsLeft);
    
                        this.id = setInterval(() => {
    
                            new Up(this._snake.getSquares(), pointLeft, this._minus, this._plus, flag);
    
                        }, 250);
    
                    } else if (code == 39) {
    
                        clearInterval(this.id);
    
                        let pointTop = parseInt(this._snake.getLastElementArray().style.top);

                        this.addPoint(this._pointsTop, pointTop);

                        this._dir = 'right';
                        
                        let flag = this.moveForRight(this._pointsTop, this._dir);
    
                        this.id = setInterval(() => {
    
                            new Right(this._snake.getSquares(), pointTop, this._minus, this._plus, flag);
    
                        }, 250);
    
    
                    } else if (code == 40) {
    
                        clearInterval(this.id);
    
                        let pointLeft = parseInt(this._snake.getLastElementArray().style.left);

                        this.addPoint(this._pointsLeft, pointLeft);

                        let flag = this.moveForDown(this._pointsLeft);
    
                        this.id = setInterval(() => {
    
                            new Down(this._snake.getSquares(), pointLeft, this._minus, this._plus, flag);
    
                        }, 250);
    
                    }
                });
            });

        }

        addPoint(arr, point) {
            arr.push(point);

            if (arr.length > 2) {
                arr.shift();
            }
        }

        moveForRight(arr, dir) {

            if (arr[0] < arr[1] && dir == 'right') {
                return true;
            } else if (arr[0] > arr[1] && dir == 'right') {
                return false;
            } else if (arr[0] < arr[1] && dir == 'left') {
                return false;
            }
        }

        moveForLeft(arr) {

            if (arr[0] < arr[1]) {
                return true;
            } else {
                return false;
            }
        }

        moveForDown(arr) {
            
            if (arr[0] < arr[1] && arr.length > 1) {
                return true;
            } else if (arr[0] > arr[1] && arr.length > 1){
                return false;
            }
        }

        moveForUp(arr) {

            if (arr[0] < arr[1] && arr.length > 1) {
                return false;
            } else if (arr[0] > arr[1] && arr.length > 1){
                return true;
            }
        }
    }

    class Forward {
        constructor(elems, plus) {
            this._elems = elems;
            this._plusForward = plus;

            for (let i = this._elems.length - 1; i >= 0; i--) {

                this._elems[i].style.left = parseInt(this._elems[i].style.left) + this._plusForward + 'px';

            }
        }
    }

    class Up {
        constructor(elems, pointLeft, minus, plus, flag) {
            this._elems = elems;
            this._pointLeft = pointLeft;

            this._minusUp = minus;
            this._plusUp = plus;

            flag ? this._stepUp = this._minusUp : this._stepUp = this._plusUp;

            for (let i = this._elems.length - 1; i >= 0; i--) {

                if (parseInt(this._elems[i].style.left) != this._pointLeft) {
                    this._elems[i].style.left = parseInt(this._elems[i].style.left) + this._stepUp + 'px';
                } else {
                    this._elems[i].style.top = parseInt(this._elems[i].style.top) + this._minusUp + 'px';
                }
            }
        }
    }

    class Down {
        constructor(elems, pointLeft, minus, plus, flag) {
            this._elems = elems;
            this._pointLeft = pointLeft;

            this._plusDown = plus;
            this._minusDown = minus;

            flag ? this._stepDown = this._plusDown : this._stepDown = this._minusDown;

            for (let i = this._elems.length - 1; i >= 0; i--) {

                if (parseInt(this._elems[i].style.left) != this._pointLeft) {
                    this._elems[i].style.left = parseInt(this._elems[i].style.left) + this._stepDown + 'px';
                } else {
                    this._elems[i].style.top = parseInt(this._elems[i].style.top) + this._plusDown + 'px';
                }
            }
        }
    }

    class Right {
        constructor(elems, pointTop, minus, plus, flag) {
            this._elems = elems;
            this._pointTop = pointTop;

            this._plusRight = plus;
            this._minusRight = minus;

            flag ? this._stepRight = this._plusRight : this._stepRight = this._minusRight;

            for (let i = this._elems.length - 1; i >= 0; i--) {

                if (parseInt(this._elems[i].style.top) != this._pointTop) {
                    this._elems[i].style.top = parseInt(this._elems[i].style.top) + this._stepRight + 'px';
                } else {
                    this._elems[i].style.left = parseInt(this._elems[i].style.left) + this._plusRight + 'px';
                }
            }
        }

    }

    class Left {
        constructor(elems, pointTop, minus, plus, flag) {
            this._elems = elems;
            this._pointTop = pointTop;

            this._minusLeft = minus;
            this._plusLeft = plus;

            flag ? this._stepLeft = this._plusLeft : this._stepLeft = this._minusLeft;

            for (let i = this._elems.length - 1; i >= 0; i--) {

                if (parseInt(this._elems[i].style.top) != this._pointTop) {
                    this._elems[i].style.top = parseInt(this._elems[i].style.top) + this._stepLeft + 'px';
                } else {
                    this._elems[i].style.left = parseInt(this._elems[i].style.left) + this._minusLeft + 'px';
                }
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

        getLastElementArray() {
            return this._squares[this._squares.length - 1];
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

    let game = new Game;
})();