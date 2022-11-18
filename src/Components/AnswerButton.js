
function AnswerButton({id, verifyAnswer}) {
    return ( 
        <button onClick={()=>verifyAnswer(id)}>Cick me</button>
     );
}

export default AnswerButton;