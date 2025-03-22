import React from 'react'
import ExamInfo from './ExamInfo'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import AccordionResult from './AccordionResult';

export default function MultipleChoicePage() {
    const data = [
        { name: "Đáp án đúng", value: 80, color: "#2F80ED" },
        { name: "Đáp án sai", value: 20, color: "#F37335" },
    ];
    const questions = [
        {
            question:
                "Cơ quan nào của Liên hợp quốc có sự tham gia đầy đủ của tất cả các thành viên?",
            answers: [
                { text: "A. Ban thư ký.", isSelected: false, isCorrect: false },
                { text: "B. Hội đồng bảo an.", isSelected: false, isCorrect: false },
                { text: "C. Hội đồng quản thác quốc tế.", isSelected: false, isCorrect: false },
                { text: "D. Đại hội đồng.", isSelected: true, isCorrect: true },
            ],
        },
        {
            question:
                "Nguyên tắc nhất trí giữa 5 nước lớn trong tổ chức Liên hợp quốc được đề ra vào thời điểm nào?",
            answers: [
                { text: "A. Tại Hội nghị Tê-hê-ran (1943).", isSelected: false, isCorrect: false },
                { text: "B. Tại Hội nghị San Phran-xi-xco (Tháng 4 - 6/1945).", isSelected: true, isCorrect: true },
                { text: "C. Tại Hội nghị I-an-ta (tháng 2/1945).", isSelected: false, isCorrect: false },
                { text: "D. Tại Hội nghị Pốt-xđam (tháng 7/1945).", isSelected: false, isCorrect: false },
            ],
        },
    ];
    return (
        <div>
            <ExamInfo />
            <div className='mt-4'>
                <div className="relative bg-white rounded-2xl w-full h-[250px] p-6 border-2 border-transparent">
                    {/* Border Gradient */}
                    <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-[#FF5400] to-[#F17F21]">
                        <div className="w-full h-full bg-white rounded-2xl"></div>
                    </div>

                    {/* Nội dung */}
                    <div className="relative flex flex-col items-center">
                        {/* Tiêu đề */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tổng điểm kiểm tra</h2>

                        {/* Khu vực thông tin */}
                        <div className="w-full flex items-center justify-around">
                            {/* Pie Chart */}
                            <div className="w-[120px] h-[120px] flex items-center justify-center">
                                <PieChart width={120} height={120}>
                                    <Pie data={data} dataKey="value" innerRadius={30} outerRadius={50}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </div>

                            {/* 4 cột chia đều */}
                            <div className="grid grid-cols-4 w-full gap-2 text-center">
                                <div>
                                    <p className="text-orange-500 font-bold text-3xl">8.0/10</p>
                                    <p className="text-gray-600 text-2xl font-bold">Tổng điểm</p>
                                </div>
                                <div className="border-l border-gray-300">
                                    <p className="text-orange-500 font-extrabold text-[36px]">Tổng 20</p>
                                    <p className="text-gray-600 text-xl">Câu trắc nghiệm</p>
                                </div>
                                <div className="border-l border-gray-300">
                                    <p className="text-blue-500 font-extrabold text-[36px]">16</p>
                                    <p className="text-gray-600 text-xl">Đáp án đúng</p>
                                </div>
                                <div className="border-l border-gray-300">
                                    <p className="text-red-500 font-extrabold text-[36px]">04</p>
                                    <p className="text-gray-600 text-xl">Đáp án sai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div>
                <AccordionResult questions={questions} />
            </div>
        </div>
    )
}
