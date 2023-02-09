import { useState, useEffect, useRef } from "react";
import ColourBlock from "./Components/ColourBlock";
import AnswerButton from "./Components/AnswerButton";

export default function App() {
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [noAnswers, setNoAnswers] = useState(3);
  const [qNumber, setQNumber] = useState(1);
  const [score, setScore] = useState(0);
  const qNumberChangedRef = useRef(false);

  function run() {
    const { answers, correctAnswer } = generateAnswers(noAnswers);
    setAnswers(answers);
    setCorrectAnswer(correctAnswer);
  }

  useEffect(() => {
    console.log("colour: ", generateColour());
  }, []);

  function generateAnswers() {
    console.log("no answers ", noAnswers);
    let answers = [];
    for (let i = 0; i < noAnswers; i++) {
      answers.push(generateColour());
    }
    console.log(answers);
    const correctAnswer = Math.floor(Math.random() * noAnswers);
    return { answers, correctAnswer };
  }

  function generateColour() {
    let colour = ["#"];
    for (let i = 0; i < 6; i++) {
      colour.push(Math.floor(Math.random() * 16).toString(16));
    }
    return colour.join("");
  }

  function verifyAnswer(answer) {
    if (answer === correctAnswer) {
      setScore((prev) => prev + 1);
      console.log("correct");
    } else {
      console.log("inccorect");
    }
    setQNumber((prev) => prev + 1);
    run();
  }

  function renderButtons() {
    let elements = [];
    for (let i = 0; i < noAnswers; i++) {
      elements.push(
        <AnswerButton
          key={i}
          colour={answers[i]}
          verifyAnswer={verifyAnswer}
          id={i}
        ></AnswerButton>
      );
    }
    return elements;
  }

  function renderColourBlocks() {
    let elements = [];
    for (let i = 0; i < noAnswers; i++) {
      elements.push(
        <ColourBlock key={i} id={i} colour={answers[i]}></ColourBlock>
      );
    }
    return elements;
  }

  function changeNoAnswers(num) {
    setNoAnswers((prev) => {
      if (prev + num < 2 || prev + num > 10) {
        return prev;
      } else {
        return prev + num;
      }
    });
  }

  useEffect(() => {
    reset();
  }, [noAnswers]);

  function reset() {
    setQNumber(1);
    setScore(0);
    run();
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Hex colour Guesser</h1>
      </div>
      <div className="container">
        <h2>Colour: {answers[correctAnswer]}</h2>
        <div className="colourBlocksContainer">{renderColourBlocks()}</div>
        <div className="answerButtonsContainer">{renderButtons()}</div>
      </div>
      <div className="score">
        <span>Score: {`${score}/${qNumber - 1}`}</span>
        <span>Percentage: {`${Math.round((score / (qNumber - 1)) * 100)}%`}</span>
      </div>
      <div className="bottomButtons">
        <button onClick={() => changeNoAnswers(-1)}>Too hard?</button>
        <button onClick={() => changeNoAnswers(1)}>Too easy?</button>
        <button onClick={reset}>Reset Score</button>
      </div>
    </div>
  );
}
