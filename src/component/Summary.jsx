import quizIsCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';

const Summary = ({ userAnswers }) => {
    
    const skippedAnswers = userAnswers.filter(answers => answers === null)
    const correctAnswers = userAnswers.filter(answer => answer === QUESTIONS[0].answers[0])
    // tính thông số câu trả l��i đúng
    const correctAnswersShare = Math.round(
        (correctAnswers.length / userAnswers.length) * 100
    )
    // tính thông số câu trả lời bị bỏ qua
    const skippedAnswersShare = Math.round(
        (skippedAnswers.length / userAnswers.length) * 100
    )
    // tính câu trả lời sai
    const wrongAnswersShare = 100 - correctAnswersShare - skippedAnswers;
    return (
        <div id="summary">
            <img src={quizIsCompleteImg} alt="Trophy icon" />
            <h2>Quiz completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className='number'>{skippedAnswersShare}%</span>
                    <span className='text'>Skipped</span>
                </p>
                <p>
                    <span className='number'>{correctAnswersShare}%</span>
                    <span className='text'>Answered correctly</span>
                </p>
                <p>
                    <span className='number'>{wrongAnswersShare}%</span>
                    <span className='text'>Answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer,index) => {
                    let cssClass = 'user-answer';
                    if(answer === null){
                        cssClass +=' skipped';
                    }else if(answer === QUESTIONS[index].answers[0]){
                        cssClass +=' correct';
                    }else{
                        cssClass +=' wrong';
                    }
                return(
                <li key={index}>
                    <h3>{index + 1}</h3>
                    <p><span className="question">{QUESTIONS[index].text}</span></p>
                    <p><span className={cssClass}>{answer ?? 'Skipped'}</span></p>
                </li>
                )
                })}


            </ol>
        </div>
    );
}

export default Summary