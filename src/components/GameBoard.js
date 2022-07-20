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
    dots.shift();
    setSnakeDotsP1(dots);
  };

  useEffect(() => {
    setTimeout(() => moveSnake(), 300);
  }, [snakeDotsP1]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Game food={foodP1} snakeDots={snakeDotsP1}></Game>
      <Game food={foodP2} snakeDots={snakeDotsP2}></Game>
    </div>
  );
};
export default GameBoard;
