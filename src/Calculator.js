import React, { useState, useEffect, useCallback } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [activeOperation, setActiveOperation] = useState("");

  const handleInput = useCallback(
    (e) => {
      // Handle both typed and pressed events
      const input = e.key ? e.key : e.target.value;

      if (input === "+" || input === "-" || input === "*" || input === "/") {
        if (firstNumber === "") {
          // If no first number yet, do nothing
          return;
        }
        let operation = input;

        // Convert keyboard input for operations to match code logic
        if (operation === "*") {
          operation = "x";
        } else if (operation === "/") {
          operation = "÷";
        }

        setActiveOperation(operation);
      } else if (input === "=" || input === "Enter") {
        // Calculate the result and set firstNumber to it in order to allow for chaining of operations
        if (activeOperation === "+") {
          setFirstNumber(
            (parseFloat(firstNumber) + parseFloat(secondNumber)).toString()
          );
        } else if (activeOperation === "-") {
          setFirstNumber(
            (parseFloat(firstNumber) - parseFloat(secondNumber)).toString()
          );
        } else if (activeOperation === "x") {
          setFirstNumber(
            (parseFloat(firstNumber) * parseFloat(secondNumber)).toString()
          );
        } else if (activeOperation === "÷") {
          setFirstNumber(
            (parseFloat(firstNumber) / parseFloat(secondNumber)).toString()
          );
        } else {
          // No valid active operation, do nothing
          return;
        }

        setActiveOperation("");
        setSecondNumber("");
      } else if (input === "del" || input === "Backspace") {
        // Work backwards to figure out if we're deleting from second number, active operation, or first number
        if (secondNumber !== "") {
          setSecondNumber(secondNumber.slice(0, -1));
        } else if (activeOperation !== "") {
          setActiveOperation("");
        } else {
          setFirstNumber(firstNumber.slice(0, -1));
        }
      } else if (input === "+/-") {
        // Work backwards to figure out if we're toggling for first or second number
        if (secondNumber !== "") {
          // parseInt(secondNumber)
          setSecondNumber(-secondNumber);
        } else if (firstNumber !== "") {
          // Only toggle pos/neg for first number if there's no active operation (ie. on the left side of the equation)
          if (activeOperation === "") {
            setFirstNumber(-firstNumber);
          }
        }
      } else if (input === "Delete") {
        // Input from keyboard delete key
        clearInput();
      } else {
        // Must be a digit or decimal
        if (activeOperation === "") {
          // If input is a decimal and number already contains decimal, do nothing
          if (input === ".") {
            if (firstNumber.includes(input)) {
              return;
            }
          }
          setFirstNumber(firstNumber.concat(input));
        } else {
          if (input === ".") {
            if (secondNumber.includes(input)) {
              return;
            }
          }
          // If there is an operation active, then this input is for the second number
          setSecondNumber(secondNumber.concat(input));
        }
      }
    },
    [firstNumber, secondNumber, activeOperation]
  );

  const handleTypedInput = useCallback(
    (e) => {
      const allowedInputsRegex = /^[0-9.+\-*/=]*(Enter|Backspace|Delete)*$/;
      if (allowedInputsRegex.test(e.key)) {
        handleInput(e);
      } else {
        // Invalid input, don't do anything
        return;
      }
    },
    [handleInput]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleTypedInput);
    return () => {
      window.removeEventListener("keydown", handleTypedInput);
    };
  }, [handleTypedInput]);

  return (
    <div className="calculator">
      <div className="screen">
        <span>{firstNumber + activeOperation + secondNumber}</span>
      </div>
      <div className="buttons">
        <button onClick={handleInput} value="0" className="number zero">
          0
        </button>
        <button onClick={handleInput} value="1" className="number one">
          1
        </button>
        <button onClick={handleInput} value="2" className="number two">
          2
        </button>
        <button onClick={handleInput} value="3" className="number three">
          3
        </button>
        <button onClick={handleInput} value="4" className="number four">
          4
        </button>
        <button onClick={handleInput} value="5" className="number five">
          5
        </button>
        <button onClick={handleInput} value="6" className="number six">
          6
        </button>
        <button onClick={handleInput} value="7" className="number seven">
          7
        </button>
        <button onClick={handleInput} value="8" className="number eight">
          8
        </button>
        <button onClick={handleInput} value="9" className="number nine">
          9
        </button>
        <button onClick={handleInput} value="+" className="add">
          +
        </button>
        <button onClick={handleInput} value="-" className="subtract">
          -
        </button>
        <button onClick={handleInput} value="*" className="multiply">
          x
        </button>
        <button onClick={handleInput} value="/" className="divide">
          ÷
        </button>
        <button onClick={handleInput} value="=" className="equals">
          =
        </button>
        <button onClick={handleInput} value="." className="decimal">
          .
        </button>
        <button onClick={handleInput} value="del" className="delete">
          DEL
        </button>
        <button onClick={handleInput} value="+/-" className="plusMinus">
          +/-
        </button>
        <button onClick={clearInput} className="clear">
          C
        </button>
      </div>
    </div>
  );

  function clearInput() {
    setFirstNumber("");
    setSecondNumber("");
    setActiveOperation("");
  }
}
