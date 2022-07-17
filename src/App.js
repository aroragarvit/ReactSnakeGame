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

  document.onkeydown = setKey; // event listener to check key press
  function setKey(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        setDirection("left");
        break;
      case 38:
        setDirection("up");
        break;
      case 39:
        setDirection("right");
        break;
      case 40:
        setDirection("down");
        break;
    }
  }
  const moveSnake = () => {
    const dots = snakeDots;
    const head = dots[dots.length - 1];
    switch (direction) {
      case "left":
        dots.push([head[0] - 2, head[1]]); // according to our code right and down addition is there
        break;
      case "right":
        dots.push([head[0] + 2, head[1]]);
        break;
      case "up":
        dots.push([head[0], head[1] - 2]);
        break;
      case "down":
        dots.push([head[0], head[1] + 2]);
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  };
  useEffect(() => {
    setInterval(moveSnake, 200);
  }, [direction]);
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
      <Snake snakeDots={snakeDots} />
      <Food food={food} />
    </div>
  );
};

export default App;