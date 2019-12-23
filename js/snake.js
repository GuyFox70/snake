(function () {
    class Game {
        constructor() {
           this._snake = new Snake(3, '.field');
           this._start = new Start('.field');

           this._minus = -10;
           this._plus = 10;

           this.pointsTop = [];
           this.pointsLeft = [];

           this.run();
        }

        run() {
            this._start.getButton().addEventListener('click', () => {
                this._start.getWrap().classList.add('hide');

                let pointLeft = parseInt(this._snake.getLastElementArray().style.left);
                        this.addPoint(this.pointsLeft, pointLeft);

                let pointTop = parseInt(this._snake.getLastElementArray().style.top);
                    this.addPoint(this.pointsTop, pointTop);

                this.id = setInterval(() => {

                    this._forward = new Forward(this._snake.getSquares(), this._plus);

                }, 250);
            });

            document.documentElement.addEventListener('keydown', (event) => {
                let code = event.keyCode;

                if (code == 37) {

                    clearInterval(this.id);

                    let pointTop = parseInt(this._snake.getLastElementArray().style.top);
                    // let flag = this.compareTwoPoint(pointTop);

                    this.id = setInterval(() => {

                        new Left(this._snake.getSquares(), pointTop, this._minus, this._plus);

                    }, 250);

                } else if (code == 38) {

                    clearInterval(this.id);

                    let pointLeft = parseInt(this._snake.getLastElementArray().style.left);
                        this.addPoint(this.pointsLeft, pointLeft);

                    let flag = this.findOutLeftOrRightForUp(this.pointsLeft);

                    this.id = setInterval(() => {
                        new Up(this._snake.getSquares(), pointLeft, this._minus, this._plus, flag);
                    }, 250);

                } else if (code == 39) {

                    clearInterval(this.id);

                    let pointTop = parseInt(this._snake.getLastElementArray().style.top);
                        this.addPoint(this.pointsTop, pointTop);
                    
                    let flag = this.findOutUpOrDownForRight(this.pointsTop);

                    this.id = setInterval(() => {

                        new Right(this._snake.getSquares(), pointTop, this._minus, this._plus, flag);
                    }, 250);


                } else if (code == 40) {

                    clearInterval(this.id);

                    let pointLeft = parseInt(this._snake.getLastElementArray().style.left);
                        this.addPoint(this.pointsLeft, pointLeft);
                    let flag = this.findOutLeftOrRightForDown(this.pointsLeft);

                    this.id = setInterval(() => {
                        new Down(this._snake.getSquares(), pointLeft, this._minus, this._plus, flag);
                    }, 250);

                }
            });
        }

        addPoint(arr, point) {
            arr.push(point);
        }

        findOutUpOrDownForRight(arr) {

            if (arr.length > 2) {
                arr.shift();
            }
            console.log(arr);
            if (arr[0] < arr[1]) {
                return true;
            } else {
                return false;
            }
        }

        findOutLeftOrRightForDown(arr) {

            if (arr.length > 2) {
                arr.shift();
            }
            
            if (arr[0] < arr[1] && arr.length > 1) {
                return true;
            } else if (arr[0] > arr[1] && arr.length > 1){
                return false;
            }
        }

        findOutLeftOrRightForUp(arr) {

            if (arr.length > 2) {
                arr.shift();
            }

            if (arr[0] < arr[1] && arr.length > 1) {
                return false;
            } else if (arr[0] > arr[1] && arr.length > 1){
                return true;
            }
        }
    }

    class Forward {
        constructor(elems, step) {
            this.elems = elems;
            this.step = step;

            for (let i = this.elems.length - 1; i >= 0; i--) {

                this.elems[i].style.left = parseInt(this.elems[i].style.left) + this.step + 'px';

            }
        }
    }

    class Up {
        constructor(elems, pointLeft, minus, plus, flag) {
            this.elems = elems;
            this.pointLeft = pointLeft;

            this.minus = minus;
            this.plus = plus;

            flag ? this.step = this.minus : this.step = this.plus;

            for (let i = this.elems.length - 1; i >= 0; i--) {

                if (parseInt(this.elems[i].style.left) != this.pointLeft) {
                    this.elems[i].style.left = parseInt(this.elems[i].style.left) + this.step + 'px';
                } else {
                    this.elems[i].style.top = parseInt(this.elems[i].style.top) + this.minus + 'px';
                }
            }
        }
    }

    class Down {
        constructor(elems, pointLeft, minus, plus, flag) {
            this.elems = elems;
            this.pointLeft = pointLeft;

            this.plus = plus;
            this.minus = minus;

            flag ? this.step = this.plus : this.step = this.minus;

            for (let i = this.elems.length - 1; i >= 0; i--) {

                if (parseInt(this.elems[i].style.left) != this.pointLeft) {
                    this.elems[i].style.left = parseInt(this.elems[i].style.left) + this.step + 'px';
                } else {
                    this.elems[i].style.top = parseInt(this.elems[i].style.top) + this.plus + 'px';
                }
            }
        }
    }

    class Right {
        constructor(elems, pointTop, minus, plus, flag) {
            this.elems = elems;
            this.pointTop = pointTop;

            this.plus = plus;
            this.minus = minus;

            flag ? this.step = this.plus : this.step = this.minus;

            for (let i = this.elems.length - 1; i >= 0; i--) {

                if (parseInt(this.elems[i].style.top) != this.pointTop) {
                    this.elems[i].style.top = parseInt(this.elems[i].style.top) + this.step + 'px';
                } else {
                    this.elems[i].style.left = parseInt(this.elems[i].style.left) + this.plus + 'px';
                }
            }
        }

    }

    class Left {
        constructor(elems, pointTop, minus, plus) {
            this.elems = elems;
            this.pointTop = pointTop;
            this.minus = minus;
            this.plus = plus;

            for (let i = this.elems.length - 1; i >= 0; i--) {

                if (parseInt(this.elems[i].style.top) != this.pointTop) {
                    this.elems[i].style.top = parseInt(this.elems[i].style.top) + this.plus + 'px';
                } else {
                    this.elems[i].style.left = parseInt(this.elems[i].style.left) + this.minus + 'px';
                }
            }
        }
    }

    class Snake {
        constructor(quantity, parent) {
            this.parent = document.querySelector(parent);
            this.quantity = quantity;
            this.squares = [];

            for (let i = 0, top = 20, left = 20; i < quantity; i++, left += 10) {
                let div = document.createElement('div');
                    div.classList.add('square');
                    div.style.top = top + 'px';
                    div.style.left = left + 'px';
                this.parent.appendChild(div);
                this.squares.push(div);
            }
        }

        getSquares() {
            return this.squares;
        }

        getLastElementArray() {
            return this.squares[this.squares.length - 1];
        }

        addSquare() {
            let div = document.createElement('div');
                div.classList.add('square');
            this.parent.appendChild(div);
            this.squares.push(div);
        }

    }

    class Start {
        constructor(parent) {
            this.parent = document.querySelector(parent);

            this._wrap = document.createElement('div');
                this._wrap.classList.add('start__wrap');
           this.parent.appendChild(this._wrap);

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