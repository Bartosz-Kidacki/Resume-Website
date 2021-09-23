/*
 * Copyright (c) 2021, Bartosz Kidacki. All rights reserved.
 */

import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit, AfterViewInit {
  @ViewChild('snakeGameCanvas', {static: false}) canvas: ElementRef;
  movingLeft: boolean = false;
  movingRight: boolean = false;
  movingDown: boolean = false;
  movingUp: boolean = false;
  appleExists: boolean = false;
  context: any;
  oldTimeStamp: number = 0;

  grid: number[][] = [];
  gridSize: number = 25;
  score: number = 0;
  highScore: number = 0;
  readonly GREEN_COLOR = 0;
  readonly RED_COLOR = 1;
  readonly BLUE_COLOR = 2;
  readonly ARROW_DOWN = "ArrowDown";
  readonly ARROW_UP = "ArrowUp";
  readonly ARROW_LEFT = "ArrowLeft";
  readonly ARROW_RIGHT = "ArrowRight";
  readonly ENTER = "Enter";
  snakeArray = [{row: Math.floor(this.gridSize / 2) + 1, col: Math.floor(this.gridSize / 2)}, {
    row: Math.floor(this.gridSize / 2),
    col: Math.floor(this.gridSize / 2)
  }, {row: Math.floor(this.gridSize / 2) - 1, col: Math.floor(this.gridSize / 2)}];

  constructor() {
  }

  ngOnInit(): void {
    for (let row = 0; row < this.gridSize; row++) {
      let rowArray = [];
      for (let col = 0; col < this.gridSize; col++) {
        rowArray.push(this.GREEN_COLOR);
      }
      this.grid.push(rowArray);
    }
    for (let i = 0; i < this.snakeArray.length; i++) {
      this.grid[this.snakeArray[i].row][this.snakeArray[i].col] = this.RED_COLOR;
    }

    this.spawnApple();
  }

  ngAfterViewInit(): void {


    this.context = this.canvas.nativeElement.getContext('2d');
    window.requestAnimationFrame(() => this.gameLoop());
  }

  tailTrim() { // to simulate movement after we move we add the position to beginning of array and in this function remove last object in the array
    this.grid[this.snakeArray[this.snakeArray.length - 1].row][this.snakeArray[this.snakeArray.length - 1].col] = this.GREEN_COLOR;
    this.snakeArray.pop();

  }

  snakeAteApple(): number {
    if (this.grid[this.snakeArray[0].row][this.snakeArray[0].col] == this.BLUE_COLOR) {
      this.score++;
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
      return 1;
    } else return 0;
  }

  snakeHitItself(row: number, column: number): number {
    if (this.grid[row][column] == this.RED_COLOR) {
      return 1; // snake hit itself
    } else return 0;
  }

  moveDown() {
    if (this.snakeArray[0].row < this.gridSize - 1) {
      if (this.snakeHitItself(this.snakeArray[0].row + 1, this.snakeArray[0].col)) {
        this.endGame();
      } else {
        this.snakeArray.unshift({row: this.snakeArray[0].row + 1, col: this.snakeArray[0].col});

        if (this.snakeAteApple()) {
          this.appleExists = false;
        } else {
          this.tailTrim();
        }
      }
    } else {
      this.endGame()
    }
  }

  moveLeft() {
    if (this.snakeArray[0].col > 0) {
      if (this.snakeHitItself(this.snakeArray[0].row, this.snakeArray[0].col - 1)) {
        this.endGame();
      } else {
        this.snakeArray.unshift({row: this.snakeArray[0].row, col: this.snakeArray[0].col - 1});
        if (this.snakeAteApple()) {
          this.appleExists = false;
        } else {
          this.tailTrim();
        }
      }
    } else {
      this.endGame()
    }
  }

  moveRight() {
    if (this.snakeArray[0].col < this.gridSize - 1) {
      if (this.snakeHitItself(this.snakeArray[0].row, this.snakeArray[0].col + 1)) {
        this.endGame();
      } else {
        this.snakeArray.unshift({row: this.snakeArray[0].row, col: this.snakeArray[0].col + 1});
        if (this.snakeAteApple()) {
          this.appleExists = false;
        } else {
          this.tailTrim();
        }
      }
    } else {
      this.endGame()
    }

  }

  moveUp() {
    if (this.snakeArray[0].row > 0) {
      if (this.snakeHitItself(this.snakeArray[0].row - 1, this.snakeArray[0].col)) {
        this.endGame();
      } else {
        this.snakeArray.unshift({row: this.snakeArray[0].row - 1, col: this.snakeArray[0].col});
        if (this.snakeAteApple()) {
          this.appleExists = false;
        } else {
          this.tailTrim();
        }
      }
    } else {
      this.endGame()
    }

  }

  directionChange(direction: string) {
    this.movingLeft = false;
    this.movingRight = false;
    this.movingDown = false;
    this.movingUp = false;
    if (direction === this.ARROW_DOWN) {
      this.movingDown = true;
    } else if (direction === this.ARROW_UP) {
      this.movingUp = true;
    } else if (direction === this.ARROW_LEFT) {
      this.movingLeft = true;
    } else if (direction === this.ARROW_RIGHT) {
      this.movingRight = true;
    }
  }

  endGame() {// if u lose reset the game to the beginning
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        this.grid[row][col] = this.GREEN_COLOR;
      }
    }

    for (let i = 0; i < this.snakeArray.length; i++) {
      this.snakeArray.pop();
    }

    this.snakeArray = [{row: Math.floor(this.gridSize / 2) + 1, col: Math.floor(this.gridSize / 2)}, {
      row: Math.floor(this.gridSize / 2),
      col: Math.floor(this.gridSize / 2)
    }, {row: Math.floor(this.gridSize / 2) - 1, col: Math.floor(this.gridSize / 2)}];
    this.directionChange("");
    this.appleExists = false;
    this.score = 0;

  }

  spawnApple() {
    let randomRow = Math.floor(Math.random() * this.gridSize);
    let randomCol = Math.floor(Math.random() * this.gridSize);

    if (this.grid[randomRow][randomCol] == this.GREEN_COLOR) {
      this.grid[randomRow][randomCol] = this.BLUE_COLOR;
      this.appleExists = true;
    } else {
      this.spawnApple();
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.key == this.ARROW_DOWN && this.snakeArray[0].row + 1 != this.snakeArray[1].row) {
      this.directionChange(this.ARROW_DOWN);
    }
    if (event.key == this.ARROW_LEFT && this.snakeArray[0].col - 1 != this.snakeArray[1].col) {
      this.directionChange(this.ARROW_LEFT);
    }
    if (event.key == this.ARROW_RIGHT && this.snakeArray[0].col + 1 != this.snakeArray[1].col) {

      this.directionChange(this.ARROW_RIGHT);
    }
    if (event.key == this.ARROW_UP && this.snakeArray[0].row - 1 != this.snakeArray[1].row) {

      this.directionChange(this.ARROW_UP);
    }
    if (event.key == this.ENTER) {

      this.endGame();
    }
  }

  defaultTouch = {x: 0, y: 0, time: 0};

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  handleTouch(event: TouchEvent) {
    let touch = event.touches[0] || event.changedTouches[0];

    // check the events
    if (event.type === 'touchstart') {
      this.defaultTouch.x = touch.pageX;
      this.defaultTouch.y = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      let deltaX = touch.pageX - this.defaultTouch.x;
      let deltaY = touch.pageY - this.defaultTouch.y;
      let deltaTime = event.timeStamp - this.defaultTouch.time;

      if (deltaTime < 500) {
        // touch movement lasted less than 500 ms
        if (Math.abs(deltaX) > 40) {
          // delta x is at least 40 pixels
          if (deltaX > 0 && this.snakeArray[0].col + 1 != this.snakeArray[1].col) {
            //swipe right
            this.directionChange(this.ARROW_RIGHT);
          } else {
            //swipe left
            if (this.snakeArray[0].col - 1 != this.snakeArray[1].col) this.directionChange(this.ARROW_LEFT);
          }
        }

        if (Math.abs(deltaY) > 40) {
          // delta y is at least 40 pixels
          if (deltaY > 0 && this.snakeArray[0].row + 1 != this.snakeArray[1].row) {
            this.directionChange(this.ARROW_DOWN);
            // swipe down
          } else {
            //swipe up
            if (this.snakeArray[0].row - 1 != this.snakeArray[1].row) this.directionChange(this.ARROW_UP);
          }
        }
      }
    }
  }


  update() {
    if (!this.appleExists) {
      this.spawnApple();
    }

    if (this.movingDown) {
      this.moveDown();
    }

    if (this.movingLeft) {
      this.moveLeft();
    }

    if (this.movingRight) {
      this.moveRight();
    }

    if (this.movingUp) {
      this.moveUp();
    }
  }

  draw() {
    const cellWidth: number = this.canvas.nativeElement.width / this.gridSize;
    const cellHeight: number = this.canvas.nativeElement.height / this.gridSize;

    for (let row = 0; row < this.gridSize; row++) {

      for (let col = 0; col < this.gridSize; col++) {
        const x: number = cellWidth * col;
        const y: number = cellHeight * row;
        if (this.grid[row][col] == this.GREEN_COLOR) {
          if ((col + row) % 2 == 0) {
            this.context.fillStyle = '#64DD17';
          } else {
            this.context.fillStyle = '#8bdd17';
          }

        } else if (this.grid[row][col] == this.RED_COLOR) {
          this.context.fillStyle = '#C62828';
        } else if (this.grid[row][col] == this.BLUE_COLOR) {
          this.context.fillStyle = '#0D47A1';
        }
        this.context.fillRect(x, y, cellWidth, cellHeight);
      }
    }
    for (let i = 0; i < this.snakeArray.length; i++) {
      this.grid[this.snakeArray[i].row][this.snakeArray[i].col] = this.RED_COLOR;
    }
  }

  gameLoop() {

    let timeStamp = Date.now();

    if (timeStamp - this.oldTimeStamp > 120) {
      this.oldTimeStamp = timeStamp;
      this.update();
    }

    this.draw();
    window.requestAnimationFrame(() => this.gameLoop());


  }

}
