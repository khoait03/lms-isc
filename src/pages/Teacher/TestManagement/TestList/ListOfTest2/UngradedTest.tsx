import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaEdit, FaInfoCircle, FaSearch } from "react-icons/fa";
import Input from "../../../../../components/Input";
import Dropdown from "../../../../../components/Dropdown";
import DatePicker from "../../../../../components/DatePicker";
import Button from "../../../../../components/Button";
import { useNavigate } from "react-router-dom";
const UngradedTest = () => {
    const [keyword, setKeyword] = useState('');
    const [pageNumber, setPageNumber] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [date, setDate] = useState<string>(new Date(Date.now()).toISOString().split('T')[0]);

    const [data, setData] = useState([
        { id: 1, class: "10A1", content: "Kiểm tra 1 tiết", subject: "Toán Hình học", date: "Thứ 5, 21/08/2020 09:00 AM", duration: "45 phút", status: "Chưa bắt đầu" },
        { id: 2, class: "10A1", content: "Kiểm tra 1 tiết", subject: "Toán Hình học", date: "Thứ 5, 21/08/2020 09:00 AM", duration: "45 phút", status: "Chưa bắt đầu" },
        { id: 3, class: "10A1", content: "Kiểm tra 1 tiết", subject: "Toán Đại Số", date: "Thứ 5, 21/08/2020 09:00 AM", duration: "45 phút", status: "Chưa bắt đầu" },
        { id: 4, class: "10A1", content: "Kiểm tra đầu giờ", subject: "Toán Đại Số", date: "Thứ 4, 20/08/2020 10:00 AM", duration: "15 phút", status: "Đang tiến hành" },
        { id: 5, class: "10A1", content: "Kiểm tra 1 tiết", subject: "Toán Hình học", date: "Thứ 3, 19/08/2020 09:00 AM", duration: "45 phút", status: "Đang tiến hành" },
        { id: 6, class: "10A1", content: "Kiểm tra 1 tiết", subject: "Toán Hình học", date: "Thứ 3, 19/08/2020 09:00 AM", duration: "45 phút", status: "Đang tiến hành" },
        { id: 7, class: "10A2", content: "Kiểm tra giữa kì", subject: "Toán Đại Số", date: "Thứ 2, 18/08/2020 09:00 AM", duration: "90 phút", status: "Đã kết thúc" },
        { id: 8, class: "10A2", content: "Kiểm tra 1 tiết", subject: "Toán Hình học", date: "Thứ 7, 16/08/2020 12:00 PM", duration: "45 phút", status: "Đã kết thúc" },
        { id: 9, class: "10A2", content: "Kiểm tra đầu giờ", subject: "Toán Đại Số", date: "Thứ 6, 14/08/2020 09:30 AM", duration: "15 phút", status: "Đã kết thúc" },
    ]);

    const filteredData = data.filter((item) => item.content.toLowerCase().includes(keyword.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / pageNumber);
    const paginatedData = filteredData.slice((currentPage - 1) * pageNumber, currentPage * pageNumber);
    const navigate = useNavigate();

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-end mb-4">
                <div className="flex items-end gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1">Chọn bộ môn</label>
                        <Dropdown options={[
                            { id: 1, value: 'Ngữ Văn' },
                            { id: 2, value: 'Toán' },
                            { id: 3, value: 'Vật Lý' },
                        ]} width="short" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Chọn khối</label>
                        <Dropdown options={[
                            { id: 1, value: 'Khối 10' },
                            { id: 2, value: 'Khối 11' },
                            { id: 3, value: 'Khối 12' },
                        ]} width="short" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Chọn ngày</label>
                        <DatePicker value={date} onChange={(e) => setDate(e ? new Date(e).toISOString().split('T')[0] : '')} />
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2">Lọc kết quả</button>
                </div>
                <div>
                    <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        background="light grey"
                        icon={<FaSearch />}
                        borderRadius="24px"
                        placeholder="Tìm kiếm theo tên topic"
                    />
                </div>
            </div>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="p-3 text-sm">
                            <div className="inline-flex items-center">
                                <span className="me-2">Lớp</span>
                                <div className="flex flex-col items-center">
                                    <FaAngleUp className="cursor-pointer text-xs" />
                                    <FaAngleDown className="cursor-pointer text-xs" />
                                </div>
                            </div>
                        </th>
                        <th className="p-3 text-sm">Nội dung kiểm tra</th>
                        <th className="p-3 text-sm">
                            <div className="inline-flex items-center">
                                <span className="me-2">Môn học</span>
                                <div className="flex flex-col items-center">
                                    <FaAngleUp className="cursor-pointer text-xs" />
                                    <FaAngleDown className="cursor-pointer text-xs" />
                                </div>
                            </div></th>
                        <th className="p-3 text-sm">Ngày làm bài</th>
                        <th className="p-3 text-sm">Thời lượng</th>
                        <th className="p-3 text-sm">Tình trạng</th>
                        <th className="p-3 text-sm">Bài làm</th>
                        <th className="p-3 text-sm"></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData ? (paginatedData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                            <td className="p-3 text-sm text-center">{item.class}</td>
                            <td className="p-3 text-sm">{item.content}</td>
                            <td className="p-3 text-sm">{item.subject}</td>
                            <td className="p-3 text-sm">{item.date}</td>
                            <td className="p-3 text-sm text-center">{item.duration}</td>
                            <td className={`p-3 text-sm text-center ${item.status === "Đã kết thúc" ? "text-green-500" : item.status === "Đang tiến hành" ? "text-blue-500" : "text-red-500"}`}>{item.status}</td>
                            <td className="px-4 py-4 text-center">
                                {item.status === "Chưa bắt đầu" ? (
                                    <Button
                                        label={"Bắt đầu"}
                                        textColor="white"
                                        backgroundColor="#FF7506"
                                        size="mini"
                                        variant="none"
                                        onClick={() => console.log("click")}

                                    />
                                ) : item.status === "Đang tiến hành" ? (
                                    <Button
                                        label={"Chấm điểm"}
                                        textColor="white"
                                        backgroundColor="#C9C4C0"
                                        size="mini"
                                        variant="none"
                                        onClick={() => console.log("click")}

                                    />
                                ) : (
                                    <Button
                                        label={"Chấm điểm"}
                                        textColor="white"
                                        backgroundColor="#FFB923"
                                        size="mini"
                                        variant="none"
                                        onClick={() => navigate("/teacher/test-management/scoring")}
                                    />
                                )}
                            </td>
                            <td className="px-6 py-3 text-center w-[170px] flex justify-center gap-3">
                                <button className="text-blue-500 hover:text-blue-700">
                                    <FaEdit style={styles.action__icon} />
                                </button>
                                <button className="text-red-500 hover:text-red-700 ml-1">
                                    <FaInfoCircle style={styles.action__icon} />
                                </button>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr className="text-center">
                            <td colSpan={8} className="p-3">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {paginatedData.length > 0 ? (
                <div className="flex justify-between items-center mt-5">
                    <div>
                        Hiển thị
                        <input
                            type="number"
                            value={pageNumber}
                            onChange={(e) => setPageNumber(Math.min(Number(e.target.value) || 1, 8))}
                            className="p-2 rounded-md mx-2 border border-orange-300"
                            style={{ width: '60px' }}
                        />
                        hàng trong mỗi trang
                    </div>
                    <div className="flex items-center space-x-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                            &#10094;
                        </button>
                        {[...Array(totalPages)].map((_, i) =>
                            i < 2 || i > totalPages - 3 || Math.abs(i + 1 - currentPage) < 2 ? (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'} rounded-full`}
                                >
                                    {i + 1}
                                </button>
                            ) : (i === 2 && currentPage > 3) || (i === totalPages - 3 && currentPage < totalPages - 2) ? (
                                <span key={i} className="px-3">
                                    ...
                                </span>
                            ) : null,
                        )}
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                            &#10095;
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

const styles = {
    action__icon: {
        color: '#ff7506',
        fontSize: '20px',
    },
};

export default UngradedTest;
