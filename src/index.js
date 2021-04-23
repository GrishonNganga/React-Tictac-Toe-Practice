import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return (
    <button className="square" 
    onClick={props.onClick}>
      {props.value}
    </button>
  )
}
// class Square extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             value: null
//         }
//     }
//   render() {
//     return (
//       <button className="square" 
//         onClick={()=>{this.props.onClick()}}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  renderSquare(i) {
    return (
        <Square value={this.props.board[i]} 
            onClick={()=>{this.props.onClick(i);}}
        />
        );
  }

  render() {
    
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

}
const calculateWinner = (squares)=>{
  const streak = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < streak.length; i++){
    const [a, b, c] = streak[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
          states: Array(9).fill(null)
        }],
      xIsnext: true,
      stepNumber: 0
    }
   }
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.states);
    const moves = history.map((step, move) =>{
      const desc = move ?
        "Go to move #" + move:
        "Got to start"
        return (
          <li key={move}>
              <button
            onClick={()=>{this.jumpTo(move)}}
            >
              {desc}
            </button>
          </li>
          
        )
    })
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          board={current.states}
          onClick={(i)=>{this.handleClick(i)}}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const board = current.states.slice();
    if (calculateWinner(board) || board[i]) {
      return;
    }
    board[i] = this.state.xIsnext ? "X" : "O";
    this.setState({
      history: history.concat([{
        states: board
      }]),
      xIsnext: !this.state.xIsnext,
      stepNumber: history.length
    });
  }

  jumpTo(step){
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2 === 0)
  })
}
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
