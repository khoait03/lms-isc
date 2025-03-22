"use client"

import { useState } from "react"
import Trash from "../../../../assets/images/fi_trash-2.png"
import Edit from "../../../../assets/images/fi_edit.png"
import { ChevronDown, ChevronUp } from 'lucide-react';
/**
 * DetailClass component
 *
 * This component renders the detail information of a class
 *
 * @returns React component
 */
export default function DetailClass() {
    const [activeTab, setActiveTab] = useState("students")
    const [editingRow, setEditingRow] = useState<number | null>(null)

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            {/* General Information Card */}
            <div className="border border-orange-300 rounded-lg p-6 mb-8 bg-[#FFF9F4]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-orange-700">Thông tin chung</h2>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-md hover:bg-gray-100">
                            <img src={Edit || "/placeholder.svg"} alt="Edit" className="h-5 w-5 text-orange-500" />
                        </button>
                        <button className="p-2 rounded-md hover:bg-gray-100">
                            <img src={Trash || "/placeholder.svg"} alt="Trash" className="h-5 w-5 text-orange-500" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Niên khóa:</div>
                            <div>2020 - 2021</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Khoa - Khối:</div>
                            <div>Khối 6</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Mã lớp học:</div>
                            <div>2020-6A1</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Tên lớp học:</div>
                            <div>6A1</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Giáo viên chủ nhiệm:</div>
                            <div>Phạm Thị B</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Số lượng học viên:</div>
                            <div>45 học viên</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Loại lớp học:</div>
                            <div>Lớp học căn bản</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Số lượng môn học:</div>
                            <div>10 môn học</div>
                        </div>
                    </div>

                    <div>
                        <div className="font-medium mb-2">Mô tả:</div>
                        <div className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus quam vel aliquam lacinia.
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex bg-gray-100 rounded-full p-2 mb-6 w-fit">
                    <button
                        onClick={() => setActiveTab("students")}
                        className={`px-8 py-1 rounded-full text-lg font-medium ${activeTab === "students"
                                ? "bg-gray-800 text-white"
                                : "text-gray-500"
                            }`}
                    >
                        Danh sách học viên
                    </button>
                    <button
                        onClick={() => setActiveTab("subjects")}
                        className={`px-8 py-1 rounded-full text-lg font-medium ${activeTab === "subjects"
                                ? "bg-gray-800 text-white"
                                : "text-gray-500"
                            }`}
                    >
                        Danh sách môn học
                    </button>
                </div>

                <div className={activeTab === "students" ? "block" : "hidden"}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-orange-500">
                                    <th className="text-white font-medium text-left py-3 px-4">STT</th>
                                    <th className="text-white font-medium text-left py-3 px-4 ">
                                        <div className="flex items-center">
                                            <span>Mã học viên</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <div className="flex items-center">
                                            <span>Tên học viên</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">Niên khóa</th>
                                    <th className="text-white font-medium text-left py-3 px-4">Ngày nhập học</th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <div className="flex items-center">
                                            <span>Tình trạng</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((student, index) => (
                                    <tr key={student.id} className={index % 2 === 1 ? "bg-gray-100" : ""}>
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">{student.id}</td>
                                        <td className="py-3 px-4">{student.name}</td>
                                        <td className="py-3 px-4">{student.schoolYear}</td>
                                        <td className="py-3 px-4">{student.enrollmentDate}</td>
                                        <td className="py-3 px-4">
                                            <StatusBadge status={student.status} />
                                        </td>
                                        <td className="p-3 ">
                                            {editingRow === index ? (
                                                <button
                                                    className="bg-orange-400 text-white rounded-md px-4 py-1 hover:bg-orange-500"
                                                    onClick={() => setEditingRow(null)}
                                                >
                                                    Lưu
                                                </button>
                                            ) : (
                                                <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => setEditingRow(index)}>
                                                    <img src={Edit || "/placeholder.svg"} alt="Edit" className="h-5 w-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={activeTab === "subjects" ? "block" : "hidden"}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-orange-500">
                                    <th className="text-white font-medium text-left py-3 px-4">STT</th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <div className="flex items-center">
                                            <span>Mã môn học</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <div className="flex items-center">
                                            <span>Tên môn học</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">
                                        <div className="flex items-center">
                                            <span>Loại môn</span>
                                            <span className="ml-1 flex flex-col">
                                                <ChevronUp className="w-4 h-4" />
                                                <ChevronDown className="w-4 h-4 -mt-2" />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="text-white font-medium text-left py-3 px-4">Số tiết HK1</th>
                                    <th className="text-white font-medium text-left py-3 px-4">Số tiết HK2</th>
                                    <th className="text-white font-medium text-left py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjectData.map((subject, index) => (
                                    <tr key={subject.id} className={index % 2 === 1 ? "bg-gray-100" : ""}>
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">{subject.id}</td>
                                        <td className="py-3 px-4">{subject.name}</td>
                                        <td className="py-3 px-4">{subject.type}</td>
                                        <td className="py-3 px-4">{subject.periodsSem1}</td>
                                        <td className="py-3 px-4">{subject.periodsSem2}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
    let color = ""
    let text = ""

    switch (status) {
        case "studying":
            color = "text-green-600"
            text = "Đang theo học"
            break
        case "transferred-school":
            color = "text-gray-600"
            text = "Đã chuyển trường"
            break
        case "transferred-class":
            color = "text-orange-500"
            text = "Đã chuyển lớp"
            break
        case "dropped":
            color = "text-red-500"
            text = "Đã thôi học"
            break
        default:
            color = "text-gray-600"
            text = "Không xác định"
    }

    return (
        <div
            className={`flex items-center rounded-md p-2 border-2 ${status === "studying"
                    ? "border-green-600 "
                    : status === "transferred-school"
                        ? "border-gray-600  "
                        : status === "transferred-class"
                            ? "border-orange-500  "
                            : "border-red-500  "
                }`}
        >
            <div
                className={`w-2 h-2 rounded-full mr-2 ${status === "studying"
                        ? "bg-green-600 "
                        : status === "transferred-school"
                            ? "bg-gray-600  "
                            : status === "transferred-class"
                                ? "bg-orange-500  "
                                : "bg-red-500  "
                    }`}
            ></div>
            <span className={color}>{text}</span>
        </div>
    )
}

// Sample data
const studentData = [
    { id: "2020-6A", name: "Nguyễn Văn A", schoolYear: "2020-2021", enrollmentDate: "05/09/2020", status: "studying" },
    { id: "2020-6B", name: "Phạm Thị C", schoolYear: "2020-2021", enrollmentDate: "05/09/2020", status: "studying" },
    { id: "2020-6C", name: "Trần Hoàng A", schoolYear: "2020-2021", enrollmentDate: "05/09/2020", status: "studying" },
    { id: "2020-7A", name: "Charlie", schoolYear: "2020-2021", enrollmentDate: "05/09/2020", status: "studying" },
    { id: "2020-7C", name: "Trần Hoàng A", schoolYear: "2020-2021", enrollmentDate: "05/09/2020", status: "studying" },
    {
        id: "2020-8A",
        name: "Phạm Thị C",
        schoolYear: "2020-2021",
        enrollmentDate: "05/09/2020",
        status: "transferred-school",
    },
    {
        id: "2020-8B",
        name: "Trần Hoàng A",
        schoolYear: "2020-2021",
        enrollmentDate: "05/09/2020",
        status: "transferred-class",
    },
    {
        id: "2020-8A",
        name: "Phạm Thị C",
        schoolYear: "2020-2021",
        enrollmentDate: "05/09/2020",
        status: "transferred-class",
    },
    { id: "2020-8B", name: "Trần Hoàng A", schoolYear: "2020-2021", enrollmentDate: "05/09/2020", status: "dropped" },
]

// Sample subject data
const subjectData = [
    { id: "D43", name: "Toán Học", type: "Môn bắt buộc", periodsSem1: 4, periodsSem2: 4 },
    { id: "DE6", name: "Ngữ Văn", type: "Môn tự chọn", periodsSem1: 4, periodsSem2: 4 },
    { id: "GDT", name: "Sinh Học", type: "Môn bắt buộc", periodsSem1: 4, periodsSem2: 4 },
    { id: "D45TR4", name: "Anh Văn", type: "Môn bắt buộc", periodsSem1: 4, periodsSem2: 4 },
    { id: "YER", name: "Sinh Học", type: "Môn tự chọn", periodsSem1: 4, periodsSem2: 4 },
    { id: "FERG453", name: "Lịch Sử", type: "Môn bắt buộc", periodsSem1: 4, periodsSem2: 4 },
    { id: "43R5FTR", name: "Địa Lý", type: "Môn tự chọn", periodsSem1: 4, periodsSem2: 4 },
    { id: "RE4556", name: "Hóa Học", type: "Môn bắt buộc", periodsSem1: 4, periodsSem2: 4 },
    { id: "RE4556", name: "Vật Lý", type: "Môn tự chọn", periodsSem1: 4, periodsSem2: 4 },
]

