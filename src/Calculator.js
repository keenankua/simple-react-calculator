import React, { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [inputVal, setInputVal] = useState("");
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [activeOperation, setActiveOperation] = useState("");

  return (
    <div class="calculator">
      <input
        dir="rtl"
        class="screen"
        value={firstNumber + activeOperation + secondNumber}
        onKeyDown={handleTypedInput}
      ></input>
      <div class="buttons">
        <button onClick={handleInput} value="0" class="number zero">
          0
        </button>
        <button onClick={handleInput} value="1" class="number one">
          1
        </button>
        <button onClick={handleInput} value="2" class="number two">
          2
        </button>
        <button onClick={handleInput} value="3" class="number three">
          3
        </button>
        <button onClick={handleInput} value="4" class="number four">
          4
        </button>
        <button onClick={handleInput} value="5" class="number five">
          5
        </button>
        <button onClick={handleInput} value="6" class="number six">
          6
        </button>
        <button onClick={handleInput} value="7" class="number seven">
          7
        </button>
        <button onClick={handleInput} value="8" class="number eight">
          8
        </button>
        <button onClick={handleInput} value="9" class="number nine">
          9
        </button>
        <button onClick={handleInput} value="+" class="add">
          +
        </button>
        <button onClick={handleInput} value="-" class="subtract">
          -
        </button>
        <button onClick={handleInput} value="*" class="multiply">
          x
        </button>
        <button onClick={handleInput} value="/" class="divide">
          ÷
        </button>
        <button onClick={handleInput} value="=" class="equals">
          =
        </button>
        <button class="decimal">.</button>
        <button class="delete">DEL</button>
        <button onClick={clearInput} class="clear">
          C
        </button>
      </div>
    </div>
  );

  function handleInput(e) {
    // Handle both typed and pressed events
    const input = e.key ? e.key : e.target.value;

    if (input === "+" || input === "-" || input === "*" || input === "/") {
      let operation = input;

      if (operation === "*") {
        operation = "x";
      } else if (operation === "/") {
        operation = "÷";
      }

      setActiveOperation(operation);
    } else if (input === "=") {
      // Calculate the result and set firstNumber to it in order to allow for chaining of operations
      if (activeOperation === "+") {
        setFirstNumber(
          parseInt(firstNumber) + parseInt(secondNumber).toString()
        );
      } else if (activeOperation === "-") {
        setFirstNumber(
          parseInt(firstNumber) - parseInt(secondNumber).toString()
        );
      } else if (activeOperation === "x") {
        setFirstNumber(
          parseInt(firstNumber) * parseInt(secondNumber).toString()
        );
      } else {
        setFirstNumber(
          parseInt(firstNumber) / parseInt(secondNumber).toString()
        );
      }
      setActiveOperation("");
      setSecondNumber("");
    } else {
      if (activeOperation === "") {
        setFirstNumber(firstNumber.concat(input));
      } else {
        // If there is an operation active, then this input is for the second number
        setSecondNumber(secondNumber.concat(input));
      }
    }
  }

  function handleTypedInput(e) {
    const allowedInputsRegex = /^[0-9\.\+\-\*\/\=]*$/;
    if (allowedInputsRegex.test(e.key)) {
      handleInput(e);
    } else {
      // Invalid input, don't do anything
      return;
    }
  }

  function clearInput() {
    setFirstNumber("");
    setSecondNumber("");
    setActiveOperation("");
  }
}
