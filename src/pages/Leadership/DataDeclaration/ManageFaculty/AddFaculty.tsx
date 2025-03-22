import React, { useState } from "react";
import Dropdown from "../../../../components/Dropdown";
import { Option } from "../../../../components/Dropdown/type";



const AddFaculty = ({ }) => {
    const [facultyId, setFacultyId] = useState("");
    const [facultyName, setFacultyName] = useState("");

    const leaders: Option[] = [
        { id: 1, value: "Nguyễn Văn A" },
        { id: 2, value: "Trần Thị B" },
        { id: 3, value: "Lê Văn C" },
    ];

    const isDisabled = !facultyId || !facultyName;

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
            <h3 className="font-bold text-center mb-6 text-2xl font-mulish">Thêm Khoa - Khối mới</h3>

            <div className="space-y-4 font-source-sans">
                <div className="flex items-center">
                    <label className="w-1/4 text-lg font-bold">Mã khoa - khối:</label>
                    <input
                        type="text"
                        className="w-2/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg italic"
                        value={facultyId}
                        onChange={(e) => setFacultyId(e.target.value)}
                    />
                </div>

                <div className="flex items-center">
                    <label className="w-1/4 text-lg font-bold">Khoa - khối:</label>
                    <input
                        type="text"
                        className="w-2/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                    />
                </div>

                <div className="flex items-center">
                    <label className="w-1/4 text-lg font-bold">Trưởng khoa - khối:</label>
                    <Dropdown
                        options={leaders}
                        disabled={false}
                        icon="right"
                        width="w-2/3"
                        state="normal"
                    />
                </div>
            </div>

            <div className="flex justify-center mt-6 font-mulish">
                <button
                    className="bg-gray-200 font-bold px-6 py-2 text-lg rounded-lg w-32 mr-4 hover:bg-gray-300"
                >
                    Quay lại
                </button>
                <button
                    className={`font-bold text-lg px-6 py-2 rounded-lg w-32 ${isDisabled ? "bg-gray-400 text-white cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                    disabled={isDisabled}
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default AddFaculty;
