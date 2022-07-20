import io from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io("http://localhost:3001");

let gameCode = "";

socket.on("gameCode", (roomName) => {
  console.log("Room name is", roomName);
  gameCode = roomName;
});

socket.on("connectToRoom", (roomName) => {
  console.log("You are in room name", roomName);
});

function newGame() {
  socket.emit("newGame");
}
function joinGame() {
  socket.emit("joinGame", document.getElementById("gameCodeInput").value);
}

const Client = () => {
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div id="initialScreen" className="h-100">
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Snak3</h1>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => {
                newGame();
              }}
            >
              Create New Game
            </button>
            <div>OR</div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Game Code"
                id="gameCodeInput"
              />
            </div>
            <button
              style={{ marginTop: "10px" }}
              type="submit"
              className="btn btn-success"
              id="joinGameButton"
              onClick={() => {
                joinGame();
              }}
            >
              Join Game
            </button>
          </div>
        </div>

        <div id="gameScreen" className="h-100">
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>
              Your game code is: <span>{gameCode}</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Client;
