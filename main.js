'use strict'
{
    class Panel {
        constructor(game) {
            this.game = game;
            this.el = document.createElement('li');
            this.el.classList.add('pressed');
            this.el.addEventListener('click', () => {
                this.check();
                if(this.game.getCurrentNum() === this.game.getLevel() ** 2) {
                    clearTimeout(this.game.getTimeoutId());
                }
            });
        }
        getEl() {
            return this.el;
        }
        activate(num) {
            this.el.classList.remove('pressed');
            this.el.textContent = num;
        }
        check() {
            // parseInt=テキストを数字に変換（10は10進数を表す）
            if(this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
                this.el.classList.add('pressed');
                this.game.addCurrentNum();
            }

        }
    }

    class Board {
        constructor(game) {
            this.game = game;
            this.panels = [];
            for(let i = 0; i < this.game.getLevel() ** 2; i++) {
                this.panels.push(new Panel(this.game));
            }
            this.setUp();
        }
        setUp() {
            const board = document.querySelector('#board');
            this.panels.forEach(panel => {
                board.appendChild(panel.getEl());
            })
        }
        activate() {
            const nums = [];
            for (let i = 0; i < this.game.getLevel() ** 2; i++) {
                nums.push(i);
            }
            this.panels.forEach(panel => {
                const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
                panel.activate(num);
            })
        }
    }
    
    class Game {
        constructor(level) {
            this.level = level;
            this.board = new Board(this);
            this.currentNum = undefined;
            this.startTime = undefined;
            this.timeoutId = undefined;
            const btn = document.querySelector('#btn');
            btn.addEventListener('click', () => {
                this.start();
            });
            this.setUp();
        }
        runTimer() {
            const timer = document.querySelector('#timer');
            // toFixedで桁数を指定（2桁）
            timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
            this.timeoutId = setTimeout(() => {
                this.runTimer();
            }, 10)
        }
        setUp() {
            const container = document.querySelector('.container');
            const PANEL_WIDTH = 50;
            const BOARD_PADDING = 10;
            container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
        }
        start() {
            if(typeof timeoutId !== undefined) {
                clearTimeout(this.timeoutId);
            }
            this.currentNum = 0;
            this.board.activate();
            this.startTime = Date.now();
            this.runTimer();
        }
        addCurrentNum() {
            this.currentNum++;
        }
        getCurrentNum() {
            return this.currentNum;
        }
        getTimeoutId() {
            return this.timeoutId;
        }
        getLevel() {
            return this.level;
        }
    }
    new Game(2);

}