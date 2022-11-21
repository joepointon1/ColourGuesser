import { useState, useEffect, useRef } from "react";
import ColourBlock from "./Components/ColourBlock";
import AnswerButton from "./Components/AnswerButton";

export default function App() {
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [noAnswers, setNoAnswers] = useState(3);
  const [qNumber, setQNumber] = useState(0);
  const [score, setScore] = useState(0);
  const qNumberChangedRef = useRef(false);

  useEffect(() => {
    if (qNumber !== 0) {
      const { answers, correctAnswer } = generateAnswers(noAnswers);
      setAnswers(answers);
      setCorrectAnswer(correctAnswer);
    }
  }, [qNumber]);

  useEffect(() => {
    if (!qNumberChangedRef.current) {
      setQNumber((prev) => prev + 1);
      qNumberChangedRef.current = true;
    }
  }, []);

  function generateAnswers() {
    let answers = [];
    for (let i = 0; i < noAnswers; i++) {
      answers.push(generateColour());
    }
    const correctAnswer = Math.floor(Math.random() * 3);
    return { answers, correctAnswer };
  }

  function generateColour() {
    //generate number between 0 and 15
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
        //   <div key={i} style={{ backgroundColor: answers[i], width: "100%" }}>
        //   {answers[i]}
        // </div>
      );
    }
    return elements;
  }

  return (
    <div className="App">
      <header>
        <h1>Hex colour Guesser</h1>
      </header>
      <h2>Colour: {answers[correctAnswer]}</h2>
      <div className="colour-blocks">{renderColourBlocks()}</div>
      <div className="answer-buttons">{renderButtons()}</div>
      <h2>Score: {`${score}/${qNumber - 1}`}</h2>
      <h2>Percentage: {`${Math.round((score / (qNumber - 1)) * 100)}%`}</h2>
    </div>
  );
}
