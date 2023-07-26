import React, { useState, useRef } from 'react';
import './App.css';
import {add, subtract, multiply, divide, numericDependencies, create} from 'mathjs';

function App() {

  const [buttonsDisplayCharactersArray, setButtonsDisplayCharatersArray] = useState([
    '7', '8', '9', 'C',
    '4', '5', '6', '*',
    '1', '2', '3', '/', 
    '+', '0', '-', '=',
  ]);

  // let totalNumberAsStringDisplayRef = useRef();



  let totalNumberAsString = '';
  let [totalNumberAsStringDisplay, setTotalNumberAsString] = useState('');



  // let finalCalculatedNumberDisplay = useRef();
  let finalCalculatedNumber = 0;
  // let [finalCalculatedNumberDisplay, setFinalCalculatedNumber] = useState(0);
  let numbersToCalculateStringArray = [];
  let calculationOperatorsStringArray = [];
  let operatorArrayIndex = 0;
  let numberArrayIndex = 0; //Need to store current place in numbers array instead of using i

  //Resets calculator to initial state
  const resetCalculator = () => {
    totalNumberAsString = '';
    numbersToCalculateStringArray = [];
    calculationOperatorsStringArray = [];
    finalCalculatedNumber = 0;
    operatorArrayIndex = 0;
    numberArrayIndex = 0;
  };

  //Does maths
  const doMath = () => {
    // console.log(numbersToCalculateStringArray[0]);
    
    for (numberArrayIndex; numberArrayIndex < numbersToCalculateStringArray.length; numberArrayIndex++) {

      //Performs initial calculation if no calculation has been done yet by checking if calculated number is 0
      if (finalCalculatedNumber === 0) {
        

        if (calculationOperatorsStringArray[operatorArrayIndex] === '+') {
          finalCalculatedNumber += Number(numbersToCalculateStringArray[numberArrayIndex]) + Number(numbersToCalculateStringArray[numberArrayIndex + 1]);

        } else if (calculationOperatorsStringArray[operatorArrayIndex] === '-') {
          finalCalculatedNumber += Number(numbersToCalculateStringArray[numberArrayIndex]) - Number(numbersToCalculateStringArray[numberArrayIndex + 1]);

        }  else if (calculationOperatorsStringArray[operatorArrayIndex] === '*') {
          finalCalculatedNumber += Number(numbersToCalculateStringArray[numberArrayIndex]) * Number(numbersToCalculateStringArray[numberArrayIndex + 1]);
          
        }  else if (calculationOperatorsStringArray[operatorArrayIndex] === '/') {
          finalCalculatedNumber += Number(numbersToCalculateStringArray[numberArrayIndex]) / Number(numbersToCalculateStringArray[numberArrayIndex + 1]);
          
        } else {
          console.log("Error in doMath function (intitial calculation), operator not recognized");
          console.log(`This operator is not recognized: ${calculationOperatorsStringArray[operatorArrayIndex]}`);
        }

        numberArrayIndex++; //Increment numberArrayIndex in the initial calculation so its at the right index for the follow up calculations
        operatorArrayIndex++;

      } else if (finalCalculatedNumber !== 0) {
        console.log("FOLLOW UP CALCULATION IS RUNNING");
        //These calculations only run if the initial calculation has been done
        if (calculationOperatorsStringArray[operatorArrayIndex] === '+') {
          finalCalculatedNumber += Number(numbersToCalculateStringArray[numberArrayIndex]);

        } else if (calculationOperatorsStringArray[operatorArrayIndex] === '-') {
          finalCalculatedNumber -= Number(numbersToCalculateStringArray[numberArrayIndex]);

        }  else if (calculationOperatorsStringArray[operatorArrayIndex] === '*') {
          finalCalculatedNumber *= Number(numbersToCalculateStringArray[numberArrayIndex]);
          
        }  else if (calculationOperatorsStringArray[operatorArrayIndex] === '/') {
          finalCalculatedNumber /= Number(numbersToCalculateStringArray[numberArrayIndex]);
          
        } else {
          console.log("Error in doMath function(followup calculation), operator not recognized");
          console.log(`This operator is not recognized: ${calculationOperatorsStringArray[operatorArrayIndex]}`);
          console.log(`Operator array index: ${operatorArrayIndex}`);
        }

        operatorArrayIndex++;
        console.log(`Operator array index AFTER INCREASE: ${operatorArrayIndex}`);
      }
    }

    // console.log(Number(numbersToCalculateStringArray[0]));
    console.log(`finalCalculatedNumber = ${finalCalculatedNumber}`);


    //The output of the calculation being 0 acts as a calculator reset
    if (finalCalculatedNumber === 0) {
      resetCalculator(); //Reset calculator if number is 0 after all calculations
      numbersToCalculateStringArray[0] = '0'; //Sets first number to calculate to 0 so it can used immediately
    }

    // setFinalCalculatedNumber(finalCalculatedNumber);
    return finalCalculatedNumber;
  };

  //Button click handler
  const handleClick = (button) => {
    if (button === 'C') {
      //Clear Display
      resetCalculator();

    } else if (button === '+' || button === '-' || button === '*' || button === '/') {
      //Store operator for use in calculation
      calculationOperatorsStringArray.push(button); //Adds clicked operator to operator storage array
      // calculationOperatorsStringArray += button;
      
      //Checks if number is empty, so as not to push an empty string to the number array
      if (totalNumberAsString !== '') {
        numbersToCalculateStringArray.push(totalNumberAsString); //Add new number to number storage array
      }
      totalNumberAsString = ''; //Resets current number string to empty

    } else if (button === '=') {
      //Do Equation
      numbersToCalculateStringArray.push(totalNumberAsString); //Add final number to number storage array
      totalNumberAsString = ''; //Resets current number string to empty
      doMath();

    } else {
      //If button clicked is not an operator then it must be a number
      //Attach number to total number string
      
      totalNumberAsString += button;
      setTotalNumberAsString(totalNumberAsStringDisplay + button);
      // let newString = totalNumberAsString += button
      // setTotalNumberAsString(newString);
    }

    console.log(`Operator array: ${calculationOperatorsStringArray}`);
    console.log(`Total number: ${totalNumberAsString}`);
    console.log(`Numbers string array: ${numbersToCalculateStringArray}`);

    // updateDisplay();

    
  }

  const updateDisplay = () => {
    // setTotalNumberAsString(totalNumberAsString);
    // setFinalCalculatedNumber(finalCalculatedNumber);
    setTotalNumberAsString(totalNumberAsString);
    console.log(`UPDATE DISPLAY TOTAL NUMBER: ${totalNumberAsString}`);
  }

  return (
    <div className="App">
      <div>
        <div id="currentNumberDisplay">
          <p>Current Number:{totalNumberAsStringDisplay}</p>
        </div>
        <div id="operatorDisplay">

        </div>

        <div>
        <p>Total Number: {}</p>
        </div>
      </div>
      <div id="buttonContainer">
        {buttonsDisplayCharactersArray.map((button, index) => {
        return <button onClick={() => {handleClick(button)}} className='button' key={index}>{button}</button>
      })}
      </div>

    </div>
  );
}

export default App;
