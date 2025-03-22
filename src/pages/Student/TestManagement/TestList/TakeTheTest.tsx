import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import Button from '../../../../components/Button';

const questions = [
    {
        question: 'Câu hỏi ví dụ 1?',
        options: ['A. Ban thư kí.', 'B. Hội đồng bảo an.', 'C. Hội đồng quản thác quốc tế.', 'D. Đại hội đồng.']
    },
    {
        question: 'Câu hỏi ví dụ 2?',
        options: ['A. Lựa chọn A.', 'B. Lựa chọn B.', 'C. Lựa chọn C.', 'D. Lựa chọn D.']
    },
    {
        question: 'Câu hỏi ví dụ 1?',
        options: ['A. Ban thư kí.', 'B. Hội đồng bảo an.', 'C. Hội đồng quản thác quốc tế.', 'D. Đại hội đồng.']
    },
    {
        question: 'Câu hỏi ví dụ 2?',
        options: ['A. Lựa chọn A.', 'B. Lựa chọn B.', 'C. Lựa chọn C.', 'D. Lựa chọn D.']
    },
    {
        question: 'Câu hỏi ví dụ 1?',
        options: ['A. Ban thư kí.', 'B. Hội đồng bảo an.', 'C. Hội đồng quản thác quốc tế.', 'D. Đại hội đồng.']
    },
    {
        question: 'Câu hỏi ví dụ 2?',
        options: ['A. Lựa chọn A.', 'B. Lựa chọn B.', 'C. Lựa chọn C.', 'D. Lựa chọn D.']
    },
    {
        question: 'Câu hỏi ví dụ 1?',
        options: ['A. Ban thư kí.', 'B. Hội đồng bảo an.', 'C. Hội đồng quản thác quốc tế.', 'D. Đại hội đồng.']
    },
    {
        question: 'Câu hỏi ví dụ 2?',
        options: ['A. Lựa chọn A.', 'B. Lựa chọn B.', 'C. Lựa chọn C.', 'D. Lựa chọn D.']
    },
    {
        question: 'Câu hỏi ví dụ 1?',
        options: ['A. Ban thư kí.', 'B. Hội đồng bảo an.', 'C. Hội đồng quản thác quốc tế.', 'D. Đại hội đồng.']
    },
    {
        question: 'Câu hỏi ví dụ 2?',
        options: ['A. Lựa chọn A.', 'B. Lựa chọn B.', 'C. Lựa chọn C.', 'D. Lựa chọn D.']
    },
    {
        question: 'Câu hỏi ví dụ 1?',
        options: ['A. Ban thư kí.', 'B. Hội đồng bảo an.', 'C. Hội đồng quản thác quốc tế.', 'D. Đại hội đồng.']
    },
    {
        question: 'Câu hỏi ví dụ 2?',
        options: ['A. Lựa chọn A.', 'B. Lựa chọn B.', 'C. Lựa chọn C.', 'D. Lựa chọn D.']
    },
    {
        question: 'Câu hỏi ví dụ 1?',
        options: ['A. Ban thư kí.', 'B. Hội đồng bảo an.', 'C. Hội đồng quản thác quốc tế.', 'D. Đại hội đồng.']
    },
    {
        question: 'Câu hỏi ví dụ 2?',
        options: ['A. Lựa chọn A.', 'B. Lựa chọn B.', 'C. Lựa chọn C.', 'D. Lựa chọn D.']
    },
    {
        question: 'Câu hỏi ví dụ 1?',
        options: ['A. Ban thư kí.', 'B. Hội đồng bảo an.', 'C. Hội đồng quản thác quốc tế.', 'D. Đại hội đồng.']
    },
    {
        question: 'Câu hỏi ví dụ 2?',
        options: ['A. Lựa chọn A.', 'B. Lựa chọn B.', 'C. Lựa chọn C.', 'D. Lựa chọn D.']
    },
    // Thêm các câu hỏi khác tương tự
];

const QuestionApp: React.FC = () => {
    const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');

    const handleNext = () => {
        if (selectedQuestion < questions.length - 1) {
            setSelectedQuestion(selectedQuestion + 1);
            setSelectedAnswer('');
        }
    };

    const handlePrevious = () => {
        if (selectedQuestion > 0) {
            setSelectedQuestion(selectedQuestion - 1);
            setSelectedAnswer('');
        }
    };

    const handleAnswerChange = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleSave = () => {
        // Logic lưu (gửi dữ liệu form, ...)
        console.log('Lưu');
    };

    return (
        <div className="flex flex-col">
            {/* Header Section */}
            <div className="p-4 border-gray-300">
                <div className="flex items-start space-x-8">
                    <div className="pr-8 border-r border-gray-400 text-left">
                        <div className="flex">
                            <p className="font-semibold w-24">Môn học:</p>
                            <div>
                                <p>Lịch Sử</p>
                                <p>12A1</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-8 border-r border-gray-400 text-left">
                        <div className="flex">
                            <p className="font-semibold w-32">Ngày kiểm tra:</p>
                            <p>Thứ 5 - Ngày 10 Tháng 8, 2020</p>
                        </div>
                        <div className="flex mt-2">
                            <p className="font-semibold w-32">Thời lượng:</p>
                            <p>45 phút</p>
                        </div>
                    </div>
                    <div className="px-8 text-left">
                        <div className="flex">
                            <p className="font-semibold w-32">Đề bài:</p>
                            <p>Đề A</p>
                        </div>
                        <div className="flex mt-2 items-center">
                            <label className="font-medium w-32">Tệp đính kèm:</label>
                            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md flex-1">
                                <div className="pr-4 border-r border-gray-400 flex items-center">
                                    <FaPaperclip style={styles.action__icon} />
                                </div>
                                <div className="pl-4">
                                    <span className="text-gray-500">DSTT_KT45P_12A1.doc</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center p-4">
                <label className="text-black text-2xl font-bold px-6 py-2">Phần Trả Lời Học Sinh</label>
                <Button
                    label="Nộp bài"
                    size="big"
                    variant="solid"
                    onClick={handleSave}
                    textColor="white"
                    backgroundColor={selectedQuestion === questions.length - 1 ? '#FF7506' : '#c9c4c0'}
                    hoverBackgroundColor="#45a049"
                />
            </div>
            {/* Sidebar and Question Section */}
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 p-4 bg-gray-200 overflow-y-auto max-h-[660px]">
                    <h5 className="font-bold mb-4">Phần câu hỏi:</h5>
                    {questions.map((q, index) => (
                        <div
                            key={index}
                            className={`p-2 cursor-pointer text-center ${selectedQuestion === index ? 'bg-orange-500 text-white' : ''}`}
                            onClick={() => setSelectedQuestion(index)}
                        >
                            Câu {index + 1}
                        </div>
                    ))}
                </div>
                {/* Question Content */}
                <div className="flex-1 p-8">
                    <h3 className="font-bold text-lg mb-6 ">Câu {selectedQuestion + 1}: {questions[selectedQuestion].question}</h3>
                    <div>
                        {questions[selectedQuestion].options.map((option) => (
                            <label key={option} className="block mb-4">
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={() => handleAnswerChange(option)}
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex justify-center mt-72 me-4 space-x-4">
                        <Button
                            label="Quay lại"
                            size="big"
                            variant="solid"
                            onClick={handlePrevious}
                            textColor="White"
                            backgroundColor="#c9c4c0"
                            hoverBackgroundColor="#45a049"
                        />
                        <Button
                            label="Tiếp theo"
                            size="big"
                            variant="solid"
                            onClick={handleNext}
                            textColor="white"
                            backgroundColor={selectedQuestion === questions.length - 1 ? '#c9c4c0' : '#FF7506'}
                            hoverBackgroundColor="#45a049"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    action__icon: {
        color: '#ff7506',
        fontSize: '20px',
    },
};

export default QuestionApp;