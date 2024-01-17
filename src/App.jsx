// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import Die from "./Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import i18n from "i18next";
import { useTranslation } from "react-i18next"; // useTranslation Hook to access the translation functions
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";
import translationGR from "./locales/gr/translation.json";
import LanguageSwitcher from './LanguageSwitcher.jsx'
import AOS from "aos";
import "aos/dist/aos.css"; // the css file from dist folder to be able to perform the sliding animation
import Footer from './Footer.jsx';


const resources = {
    en: {
        translation: translationEN,
    },
    es: {
        translation: translationES
    },
    gr: {
        translation: translationGR
    },
  };

  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbacking: "en",
    interpolation: {
        escapeValue: false,
    },
  });


function App() {
    const [start, setStart] = useState(false);
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false);
    // save the number of rolls in a state
    const [rollCount, setRollCount] = useState(0);
    // time counter state
    const [timer, setTimer] = useState(0);
    // set the interval for the timer counter
    const [intervalId, setIntervalId] = useState(null);
    // save result to local storage
    const [result, setResult] = useState(() => JSON.parse(localStorage.getItem("result")) || []); // if there is Data stored get it unless return empty array
    const { t } = useTranslation();
    // switch between dark and light mode 
    const [darkMode, setDarkMode] = useState(false);

    
    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode);
    }
 


   // to execute the sliding animtion
   useEffect(() => {
    AOS.init({
        disable: "phone",
        duration: 700,
        easing: "ease-in-cubic",
    });
   }, []);


    
    // to check if all dice are held (clicked) and have the same value
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            clearInterval(intervalId)
        }
        
        if(timer > 600) {
            setTimer(0)
            setTenzies(false)
            setRollCount(0)
            setStart(false)
            clearInterval(intervalId)
        }

        // check if the local storage is supported by the browser
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem("result", JSON.stringify(result))
        }
        
    }, [dice, intervalId, result, timer])
    

    // timer counter with setinterval 
     function startGame() {
       setStart(true)
       const id = setInterval(() => {
               setTimer(oldTimer => oldTimer + 1)
       }, 1000)
       setIntervalId(id);
     }



    // handleClick function to generate new Dice everytime the button is being clicked
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    

    // function to loop through the 10 numbers and push a number in every loop to the newDice array
    function allNewDice() {
        // numbers Array
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // new dice empty array
        const newDice = []
        for (let i = 0; i < nums.length; i++) { 
            newDice.push(generateNewDie())
        }
        return newDice
    }
    

    // Roll button
    function rollDice() {
      // if the game is not over generate the rest of dice 
      if(!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }));

        // roll count whenever the roll button is being clicked
        setRollCount(oldCount => oldCount + 1);

      // if the game is already won in other words if the tenzies is true set it to false to start a new game
      } else {
        setTenzies(false)
        setDice(allNewDice()) // re-generate all the dice over 
        setRollCount(0) // re-set the roll count to the initial value
        clearInterval(intervalId);
        setTimer(0) // re-set the timer to 0
        setStart(false)
      }
    }


    // map over the dice and check if they have the same id and the isHeld property isn't true
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }


    // save data to localStorage
    function saveResult() {
        const newResult = {
            id: nanoid(),
            rollCount: rollCount,
            timer: timer, 
        }

        // if the result array length is over 4 items then delete the rest
        if(result.length > 4) {
            result.pop();
        }

        setResult(prevResult => [newResult, ...prevResult])
    }

    // delete saved data from localStorage
  function deleteResult() {
    localStorage.clear();
    setResult([{rollCount: "", timer: ""}]);
  }

    // maping over the result state to be displaying the saved rollCount and timer on the page
   const saveToDisplay = result.map(res => 
    // if the rollCount is not empty which means that the game has been played display the saved Data from local storage
    res.rollCount !== "" && (
       <li key={nanoid()}>
        <b>Rollen: </b>
        {res.rollCount}
        <br></br>
        <b>Zeit: </b>
        {res.timer}<span className='sec'>s.</span>
       </li>
    )
   );
     
    
    // map over the dice state to pass props the Die component to be reused
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} // die id
            value={die.value} // die value
            isHeld={die.isHeld} // die held
            holdDice={() => holdDice(die.id)} // the handleClick function
        />
    ));


    
    return (
        <main className={darkMode ? "dark" : ""}>
            <div data-aos="fade-down" className="toggler">
                <p className='toggler-light'>{t("light")}</p>
                <div className="theme-toggle" onClick={toggleDarkMode}>
                       <div className='theme-btn'></div>
                </div>
                <p className='toggler-dark'>{t("dark")}</p>
            </div>
            <LanguageSwitcher />
            {tenzies && <Confetti />}
            <header data-aos="fade-down"  className='header-section'>
                    <h1 className="title" data-text="Würfelspiel">{t("dice_game")}</h1>
                    {!tenzies ? (<p className="instructions">
                     {t("click_start_to_roll_dice")}
                    </p> ) : (<p className='instructions'>{t("yay!_you_have_won")}</p>)}
            </header>
            
            <section data-aos="fade-down" className='main-section'>
                     <div className="counter">
                            <span className="roll-times">{t("roll")} : <span>{rollCount}</span></span>
                            <span className="timer">{t("time")} : <span>{timer}<span className='sec'>s.</span></span></span>
                    </div>
                    <div className="dice-container">
                        {diceElements}
                    </div>
                    {start ? (<button className="roll-dice" onClick={rollDice}>
                        {tenzies ? "Neu Game" : "Roll"}
                    </button>) :
                    (<button onClick={startGame} className='roll-dice'>{t("start")}</button>)}
                    <br></br>
                    <br></br>
                    {tenzies && ( 
                    <>
                    <p className='saved'>{t("you_can_click_save_to_save_your_score_to_your_storage")}</p>
                    <br></br>
                    <button className='roll-dice' onClick={saveResult}>{t("save")}</button>
                    <br></br>
                    </>
                    )}
                    {<ol className='storage-data'>{saveToDisplay}</ol>}
                    <br></br>
                    {saveToDisplay[0] !== false && saveToDisplay[0] !== undefined ?
                    (<button className='roll-dice' onClick={deleteResult}>{t("clear")}</button>) : 
                    (<p className='saved'>{t("nothing_has_been_saved_yet")}</p>)}
            </section>
            <Footer />
        </main>
    )
}

export default App;