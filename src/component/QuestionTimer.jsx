import React, { useEffect, useState } from 'react';

const QuestionTimer = ({ timeOut, onTimeOut, mode }) => {
    const [remainingTime, setRemainingTime] = useState(timeOut);

    // Mỗi khi timer hoặc câu hỏi thay đổi, thiết lập lại thời gian
    useEffect(() => {
        setRemainingTime(timeOut); // Reset lại timer khi nhận được câu hỏi mới

        const timer = setTimeout(onTimeOut, timeOut); // Gọi hàm onTimeOut sau khi hết thời gian
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

        // Cleanup khi component bị unmount hoặc thay đổi timer
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [timeOut, onTimeOut]);

    return (
        <progress
            id='question-time'
            max={timeOut}
            value={remainingTime}
            className={mode}
        />
    );
};

export default QuestionTimer;
