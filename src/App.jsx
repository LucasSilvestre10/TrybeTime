import React, { Component } from "react";
import "./Style.css";

export class App extends Component {
  state = {
    timeCounter: 0,
    setTime: 0,
    inputTime: "",
    setMinutes: 0,
    setSeconds: 0,
    isCount: false,
  };

  setNewState = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  clockHeart = () => {
    const { timeCounter } = this.state;
    if (timeCounter >= 0) {
      const minutes = Math.floor(timeCounter / 60);
      const seconds = timeCounter % 60;
      this.setState({
        setMinutes: minutes,
        setSeconds: seconds,
      });
    }
  };

  setCounterTime = () => {
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => ({ timeCounter: prevState.timeCounter - 1 }),
        this.clockHeart
      );
    }, 1000);
  };

  startTimer = () => {
    const { inputTime } = this.state;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (inputTime) {
      // verificar uma logica possivel para aceitar numeros com ponto flutuante.
      //const testeTime = parseFloat(inputTime, 10);
      const time = 60 * parseInt(inputTime, 10);
      this.setState(
        { timeCounter: time, setTime: time, isCount: true },
        this.setCounterTime
      );
    } else {
      alert("INSIRA UM TEMPO VALIDO!");
    }
  };

  stopTimer = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  };

  resetTimer = () => {
    clearInterval(this.intervalId);
    const { setTime } = this.state;
    this.setState({ timeCounter: setTime }, this.setCounterTime);
  };

  componentDidUpdate() {
    const { timeCounter, isCount } = this.state;
    if (isCount) {
      if (timeCounter < 0) {
        clearInterval(this.intervalId);
        this.setState({ isCount: false, setMinutes: 0, setSeconds: 0 });
        alert("O TEMPO ACABOU!");
      }
    }
  }

  render() {
    const { inputTime, setMinutes, setSeconds } = this.state;
    return (
      <body>
        <div>
          <h1>CRONÔMETRO</h1>
          <div>
            <p>
              <h2>
                {setMinutes.toString().padStart(2, "0")}:
                {setSeconds.toString().padStart(2, "0")}
              </h2>
            </p>
            <input
              htmlFor="input-time"
              type="number"
              placeholder="informe quantos minutos"
              name="inputTime"
              value={inputTime}
              onChange={this.setNewState}
            />
            <div>
              <button onClick={this.startTimer}>INICIAR</button>
              <button onClick={this.stopTimer}>PARAR</button>
              <button onClick={this.resetTimer}>REINICIAR</button>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default App;
