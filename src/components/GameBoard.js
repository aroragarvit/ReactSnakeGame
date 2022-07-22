import { useState, useEffect } from "react";
import { getRandomCoordinates } from "../utils/GameUtils";
import Game from "./Game";

const GameBoard = () => {
  const [foodP1, setFoodP1] = useState(getRandomCoordinates());
  const [foodP2, setFoodP2] = useState(getRandomCoordinates());
  const [snakeDotsP1, setSnakeDotsP1] = useState([
    [0, 0],
    [2, 0],
    [4, 0],
  ]);
  const [snakeDotsP2, setSnakeDotsP2] = useState([
    [0, 0],
    [2, 0],
  ]);

  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [score, setScore] = useState(0);

  document.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        setDirection("left");
        break;
      case "ArrowUp":
        setDirection("up");
        break;
      case "ArrowRight":
        setDirection("right");
        break;
      case "ArrowDown":
        setDirection("down");
        break;
      default:
    }
  });

  let moveSnake = () => {
    let dots = [...snakeDotsP1];

    let head = dots[dots.length - 1];

    switch (direction) {
      case "left":
        head = [head[0] - 2, head[1]]; // according to our code right and down addition is there
        break;
      case "right":
        head = [head[0] + 2, head[1]];
        break;
      case "up":
        head = [head[0], head[1] - 2];
        break;
      case "down":
        head = [head[0], head[1] + 2];
        break;
    }
    dots.push(head);
    dots.shift(); // remove tail
    setSnakeDotsP1(dots);
  };

  useEffect(() => {
    setTimeout(() => moveSnake(), speed); // every time snakeDotsP1 is changed moveSnake() is called time interval is 300ms
    checkBorder();
    checkBodyEat();
    checkIfEat();
    console.log(gameOver);
  }, [snakeDotsP1]); // every time there is some change in position

  function checkBorder() {
    let head = snakeDotsP1[snakeDotsP1.length - 1];
    if (head[0] > 98 || head[0] < 0 || head[1] > 98 || head[1] < 0) {
      // because 2 percent means 50 blocks of snake 0 , 2 , 4 etc
      setGameOver(true);
    }
  }

  function checkBodyEat() {
    let snake = [...snakeDotsP1];
    let head = snake[snake.length - 1];
    snake.pop(); // we are removing head dot so that we can check if it is eating itself
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        setGameOver(true);
      }
    });
  }

  function checkIfEat() {
    let head = snakeDotsP1[snakeDotsP1.length - 1];
    let food = foodP1;
    if (head[0] === food[0] && head[1] === food[1]) {
      setFoodP1(getRandomCoordinates());
      // enlargeSnake();
      setScore(score + 1);
      increaseSpeed();
      console.log(snakeDotsP1.length);
    }
  }

  function enlargeSnake() {
    let newSnake = [...snakeDotsP1];
    if (direction === "right") {
      newSnake.push([
        newSnake[newSnake.length - 1][0] + 2,
        newSnake[newSnake.length - 1][1],
      ]);
    }
    if (direction === "left") {
      newSnake.push([
        newSnake[newSnake.length - 1][0] - 2,
        newSnake[newSnake.length - 1][1],
      ]);
      if (direction === "down") {
        newSnake.push([
          newSnake[newSnake.length - 1][0],
          newSnake[newSnake.length - 1][1] + 2,
        ]);
      }
      if (direction === "up") {
        newSnake.push([
          newSnake[newSnake.length - 1][0],
          newSnake[newSnake.length - 1][1] - 2,
        ]);
      }
    }
    setSnakeDotsP1(newSnake);
  }

  function increaseSpeed() {
    if (speed > 10) {
      setSpeed(speed - 3);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Game food={foodP1} snakeDots={snakeDotsP1}></Game>
      <Game food={foodP2} snakeDots={snakeDotsP2}></Game>
    </div>
  );
};
export default GameBoard;
