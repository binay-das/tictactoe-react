import { useEffect, useState } from "react";
import "./TicTacToe.css";

function Square({ value, onClick }) {
    return (
        <button className="square" onClick={onClick}>{value}</button>
    );
}
export default function TicTacToe() {
    let [squares, setSquares] = useState(Array(9).fill(""));

    // fill(value)
    // fill(value, start)
    // fill(value, start, end)

    let [isXTurn, setIsXTurn] = useState(true);
    let [status, setStatus] = useState("");

    let handleClick = (getCurrSquare) => {
        console.log(squares);
        let copySquares = [...squares];
        if (getWinner(getCurrSquare) || copySquares[getCurrSquare]) {
            return;
        }
        copySquares[getCurrSquare] = isXTurn ? "X" : "0";
        setIsXTurn(!isXTurn);
        setSquares(copySquares);
        console.log(squares);
    }

    let getWinner = (squares) => {
        let winningPattern = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [2, 5, 8], [1, 4, 7]
        ];

        for (let i = 0; i < winningPattern.length; i++){
            let [x, y, z] = winningPattern[i];

            if (squares[x] && squares[x] === squares[y] && squares[y] === squares[z]) {
                return squares[x];
            }

        }

        return null;
    }

    // useEffect(() => {
    //     setStatus("Player X will start");
    // });

    useEffect(() => {
        if (!getWinner(squares) && squares.every(item => item!== "")){
            setSquares("This is a draw, please restart the game");
        }
        else if(getWinner(squares)){
            setStatus(`Winner is ${getWinner(squares)}`);
        }
        else {
            setStatus(`Next player is ${isXTurn ? "X" : "O"}`);
        }
    }, [squares, isXTurn])

    let handleReset = () =>{
        setSquares(Array(9).fill(""));
        setIsXTurn(true);
        // setSquares("");
    }

    return (
        <div className="container">
            <div className="row">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="row">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>

            <h1>{status}</h1>
            <button onClick={handleReset} className="reset">Reset</button>
        </div>

    );
}