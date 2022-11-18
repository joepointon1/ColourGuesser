import {useState} from "react"
import ColourBlock from "./Components/ColourBlock";
import AnswerButton from "./Components/AnswerButton";

export default function App() {
  const [currentColour, setCurrentColour] = useState();
  const [answers, setAnswers] = useState([]);
  const [noAnswers, setNoAnswers] = useState(3);

  return (
    <div className="App">
      <ColourBlock colour={currentColour}></ColourBlock>
      {renderButtons(noAnswers)}
    </div>
  );
}

function generateColour(

) {}

function verifyAnswer(answer) {
  console.log(answer);
}

function renderButtons(noAnswers){
  let elements = [];
  for(let i=0; i< noAnswers;i++){
    elements.push(<AnswerButton id={i} verifyAnswer={verifyAnswer}></AnswerButton>)
  }
  return elements
}
