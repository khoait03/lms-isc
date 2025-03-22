import { Paperclip } from "lucide-react";
import { Link } from "react-router-dom";

const ExamInfo = () => {
    return (
        <div className="">
            <div className="text-lg flex items-center space-x-2 mb-8">
                <Link to="/leadership/teacher/teaching-assignment/" className="text-gray-400">
                    Bài kiểm tra
                </Link>

                <span className="text-orange-500">{'>'}</span>

                <Link to="/leadership/teacher/teaching-assignment/" className="text-gray-400">
                    Làm bài
                </Link>

                <span className="text-orange-500">{'>'}</span>

                <span className="font-bold text-4xl text-black font-mulish">10A1</span>
            </div>
            {/* Thông tin bài kiểm tra */}
            <div className="flex text-14px text-gray-800 justify-between items-start">
                {/* Cột trái */}
                <div className="flex">
                    <div className="grid grid-cols-1">
                        <p><strong className="w-20 h-1 inline-block">Môn học:</strong> Toán</p> <br />
                        <p><strong className="w-20 inline-block">Lớp:</strong> 10A1</p>
                    </div>

                    {/* Thanh phân cách */}
                    <div className="border-r border-gray-300 h-auto mx-10"></div>

                    {/* Cột giữa */}
                    <div className="grid grid-cols-1">
                        <p><strong className="w-28 inline-block">Ngày kiểm tra:</strong> Thứ 5 - Ngày 10 Tháng 8, 2020</p> <br />
                        <p><strong className="w-28 inline-block">Thời lượng:</strong> 45 phút</p>
                    </div>

                    {/* Thanh phân cách */}
                    <div className="border-r border-gray-300 h-auto mx-10"></div>

                    {/* Cột phải */}
                    <div className="grid grid-cols-1">
                        {/* Đề bài */}
                        <p><strong className="w-28 inline-block">Đề bài:</strong> Đề A</p>

                        {/* Tệp đính kèm */}
                        <div className="flex items-center">
                            <strong className="w-28 inline-block">Tệp đính kèm:</strong>
                            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
                                <span className="flex items-center text-gray-500 mr-2">
                                    <img src="/icon/u_paperclip.png" alt="Paperclip" className="w-4 h-4" />
                                    <span className="ml-1">|</span>
                                </span>
                                <span className="text-gray-800">DSTT_KT45P_12A1.doc</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ExamInfo;
