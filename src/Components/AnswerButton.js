
function AnswerButton({colour, verifyAnswer, id}) {
    return ( 
        <button className="answer-button" onClick={()=>verifyAnswer(id)}>{id+1}</button>
     );
}

export default AnswerButton;