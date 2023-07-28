import React, { useState, useRef } from 'react';
import './App.css';
import {add, subtract, multiply, divide, numericDependencies, create, evaluate} from 'mathjs';

function App() {


  const buttonsDisplayCharactersArray = [
    '7', '8', '9', 'C',
    '4', '5', '6', '*',
    '1', '2', '3', '/', 
    '+', '0', '-', '=',
  ];

  //Arrays used to check the type of button that was pressed
  const isAnOperators = ['*', '/', '+', '-'];
  const isANumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const isAFunctionality = ['C', '='];

  //Displays whole typed string
  const [currentCalculation, setCurrentCalculation] = useState('');

  //Displays final calculated number
  const [calculatedNumber, setCalculatedNumber] = useState(0);

  //Displays erorr messages
  const [erorrMessage, setErrorMessage] = useState("");
  
  //User is continuing calculation after initial calculation bool
  const [calcIsContinued, setCalcIsContinued] = useState(false);

  //Reset calculator to initial state
  const resetCalculator = () => {
    setCurrentCalculation('');
    setCalculatedNumber('');
    setErrorMessage('');
    setCalcIsContinued(false);
  }



  const clickHandler = (button) => {
    
    if (!isAFunctionality.includes(button)) { //Checks if button is not an equals or C
      
      if (button === '+' || button === '-' || button === '*' || button === '/') { //Checks if button is an operator
        if (currentCalculation.length === 0) {
          setErrorMessage("Error: First character cannot be an operator");
          return;
        }
        //Checks if last char in current calculation is an operator
        if (currentCalculation[currentCalculation.length - 1] === '+' || currentCalculation[currentCalculation.length - 1] === '-' || currentCalculation[currentCalculation.length - 1] === '*' || currentCalculation[currentCalculation.length - 1] === '/') {
          //Log error message, can't have multiple operators next to each other
          setErrorMessage(`Error: Cannot have multiple operators in succession`);

        } else { //Add operator to sum string
          setCurrentCalculation(currentCalculation + button);

        }

      } else { //Button must be a number at this point

        if (calculatedNumber) { //Checks if a number has been calculated already using '='
          //Checks if the last character in the sum string is an operator, if so then add number to sum string
          if (currentCalculation[currentCalculation.length - 1] === '+' || currentCalculation[currentCalculation.length - 1] === '-' || currentCalculation[currentCalculation.length - 1] === '*' || currentCalculation[currentCalculation.length - 1] === '/' || calcIsContinued === true) {
            setCurrentCalculation(currentCalculation + button); //Add number to sum string
            // setCalculatedNumber('');
            setCalculatedNumber(evaluate(currentCalculation + button));
            setCalcIsContinued(true); //User is continuing the calculation so set to true
            

          } else { //If a calculation has already been done and a number is then entered, reset the calculator to initial state
            resetCalculator();
          } 

          } else { //If a number has not already been calculated using '=', adds button to sum string
            setCurrentCalculation(currentCalculation + button);
            setCalculatedNumber(evaluate(currentCalculation + button));
            setCalcIsContinued(true);

            // setCalculatedNumber(evaluate(currentCalculation + button));
            
            //When this runs, currentCalculation doesn't contain the button that was just added
            // setCalculatedNumber(evaluate(currentCalculation));
          }
        
        //Reset error message
        setErrorMessage('');
      }

    } else if (button === 'C') { //Checks if button is C, if so, resets calculator to initial state
      resetCalculator();

    } else if (button === '=') { //Checks if button is =

      //Checks if last character in string sum is an operator, if so then the sum must not be complete and so logs an erorr message
      if (currentCalculation[currentCalculation.length - 1] === '+' || currentCalculation[currentCalculation.length - 1] === '-' || currentCalculation[currentCalculation.length - 1] === '*' || currentCalculation[currentCalculation.length - 1] === '/') {
        setErrorMessage("Error: This is not a calculable sum");
      } else //Performs the maths sum and resets error message
      {
              setCalculatedNumber(evaluate(currentCalculation));
              setErrorMessage('');
              setCalcIsContinued(false);
      }

    } else { //If none of the other if statements run then an error must have occurred
      setErrorMessage("An erorr occurred in click handler");
    }
  };

  return (
    <div className="App">
      <div id="calculatorWrapper">
        <div id="calculatorDisplay">
          <p className='displayBox'>{erorrMessage}</p>
          <p className='displayBox'>{currentCalculation} =</p>
          <p className='displayBox calculatedNumber'>{calculatedNumber}</p>
        </div>

        <div id="buttonContainer">
          {buttonsDisplayCharactersArray.map((button, index) => {
            return <button onClick={() => {clickHandler(button)}} className='button' key={index}>{button}</button>
          })}
        </div>
      </div>

      
    </div>
  );
}

export default App;
