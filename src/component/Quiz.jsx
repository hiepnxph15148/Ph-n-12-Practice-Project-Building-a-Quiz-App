import React, { useCallback, useState } from 'react';
import QUESTIONS from '../questions';
import Question from './Question';
import Summary from './Summary';

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    // Xử lý khi người dùng chọn câu trả lời hoặc khi hết giờ
    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer) {
            setUserAnswers((prevUserAnswers) => {
                return [...prevUserAnswers, selectedAnswer];
            });
        }, []);

    // Xử lý khi hết giờ: bỏ qua câu hỏi hiện tại
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
       return <Summary userAnswers={userAnswers}/>;
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex} // Cập nhật key mỗi khi chuyển câu hỏi
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onTimeOut={handleSkipAnswer} // Gọi hàm skip khi hết giờ
            />
        </div>
    );
};

export default Quiz;
