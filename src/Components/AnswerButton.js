
function AnswerButton({colour, verifyAnswer, id}) {
    return ( 
        <button onClick={()=>verifyAnswer(id)}>{colour}</button>
     );
}

export default AnswerButton;