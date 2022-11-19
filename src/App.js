import { useState, useEffect, useRef } from "react";
import ColourBlock from "./Components/ColourBlock";
import AnswerButton from "./Components/AnswerButton";

export default function App() {
  const [currentColour, setCurrentColour] = useState();
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [noAnswers, setNoAnswers] = useState(3);
  const [qNumber, setQNumber] = useState(0);
  const qNumberChangedRef = useRef(false);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  useEffect(() => {
    if(qNumber !== 0){
      setAnswers(generateAnswers(noAnswers));
    }
  }, [qNumber]);

  useEffect(() => {
    if(!qNumberChangedRef.current){
      setQNumber((prev) => prev + 1);
      qNumberChangedRef.current = true;
    }
  }, []);

  return (
    <div className="App">
      <ColourBlock colour={currentColour}></ColourBlock>
      {renderButtons(noAnswers)}
    </div>
  );
}

function generateAnswers(noAnswers) {
  let colours = [];
  for (let i = 0; i < noAnswers; i++) {
    colours.push(generateColour());
  }
  return colours;
}

function generateColour() {
  //generate number between 0 and 15
  let colour = [];
  for (let i = 0; i < 6; i++) {
    colour.push(Math.floor(Math.random() * 16).toString(16));
  }
  return colour.join("");
}

function verifyAnswer(answer) {}

function renderButtons(noAnswers) {
  let elements = [];
  for (let i = 0; i < noAnswers; i++) {
    elements.push(
      <AnswerButton id={i} verifyAnswer={verifyAnswer}></AnswerButton>
    );
  }
  return elements;
}
