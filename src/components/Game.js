import Snake from './Snake';
import Food from './Food';

const Game = ({snakeDots,food}) => {
    return(
        <div
      style={{
        position: "relative",
        margin: "50px auto",
        width: "600px",
        height: "600px",
        border: "2px solid #000",
      }}
    >
        <Snake snakeDots={snakeDots}></Snake>
        <Food food={food}></Food>
    </div>
    )
}
export default Game;