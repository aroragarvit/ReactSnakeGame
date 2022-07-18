import Snake from "./Snake";
import Food from "./Food";
import { useEffect, useState } from "react";

const App = () => {
  const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  };

  const [food, setFood] = useState(getRandomCoordinates());
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [direction, setDirection] = useState("right");

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        setDirection("left");
        break;
      case "ArrowUp":
        setDirection("up");
        console.log("up");
        break;
      case "ArrowRight":
        setDirection("right");
        console.log("right");
        break;
      case "ArrowDown":
        setDirection("down");
        console.log("down");
        break;
    }
  });

  const moveSnake = () => {
    let dots = snakeDots;
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
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  };
  setInterval(() => {
    moveSnake();
  }, 300);
  return (
    <div
      style={{
        position: "relative",
        margin: "50px auto",
        width: "600px",
        height: "600px",
        border: "2px solid #000",
      }}
    >
      <p> {direction}</p>
      <Snake snakeDots={snakeDots} />
      <Food food={food} />
    </div>
  );
};

export default App;
