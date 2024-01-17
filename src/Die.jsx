/* eslint-disable no-unused-vars */
import React from 'react'

 function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "transparent" : "white",
        border: props.isHeld ? "2px solid #fff" : "",
 
        boxShadow: props.isHeld ? "inset 5px 5px 10px -3px rgba(0, 0, 0, 0.7)" : "7px 4px 3px rgba(0, 0, 0, 0.15)",
    };


   // dice 1
   const diceOne = (
     <div className="first-face">
        <span className="dot"></span>
     </div>
   );

   // dice 2
   const diceTwo = (
    <div className="second-face">
       <span className="dot"></span>
       <span className="dot"></span>
    </div>
  );
   // dice 3
  const diceThree = (
    <div className="third-face">
       <span className="dot"></span>
       <span className="dot"></span>
       <span className="dot"></span>
    </div>
  );
   // dice 4
  const diceFour = (
    <div className="fourth-face">
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    </div>
  );
   // dice 5
  const diceFive = (
    <div className="fifth-face">
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
        <div className="column">
            <span className="dot"></span>
        </div>
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    </div>
  );

   // dice 6
 const diceSix = (
    <div className="sixth-face">
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
        <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    </div>
 );


 let diceFace;
 
 // switch conditional statement
 switch (props.value) {
    case 1:
        diceFace = diceOne;
        break;
    case 2:
        diceFace = diceTwo;
        break;
    case 3:
        diceFace = diceThree;
        break;
    case 4:
        diceFace = diceFour;
        break;
    case 5:
        diceFace = diceFive;
        break;
    case 6:
        diceFace = diceSix;
 }


    return (
        <div
        className="die-face" 
        style={styles}
        onClick={props.holdDice}
        >
            {diceFace}
        </div>
    )
}

export default Die;


