import React, { useState } from 'react';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';
import QUESTIONS from '../questions';

const Question = ({
    index,
    onSelectAnswer,
    onTimeOut, // Đảm bảo nhận đúng hàm onTimeOut từ Quiz
}) => {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null,
    });

    let timer = 10000; // Set thời gian mặc định là 10 giây
    if (answer.selectedAnswer) {
        timer = 1000; // Nếu đã chọn câu trả lời, chờ 1 giây
    }
    if (answer.isCorrect !== null) {
        timer = 2000; // Nếu đã có kết quả đúng/sai, chờ 2 giây
    }

    function handleSelectAnswer(selectedAnswer) {
        setAnswer({
            selectedAnswer,
            isCorrect: null,
        });
        setTimeout(() => {
            setAnswer({
                selectedAnswer,
                isCorrect: QUESTIONS[index].answers[0] === selectedAnswer,
            });
            setTimeout(() => {
                onSelectAnswer(selectedAnswer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id='question'>
            <QuestionTimer
                key={timer} // Đảm bảo cập nhật timer mỗi khi thời gian thay đổi
                mode={answerState}
                timeOut={timer}
                onTimeOut={answer.selectedAnswer === '' ? onTimeOut : null} // Bỏ qua nếu chưa trả lời
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
};

export default Question;
