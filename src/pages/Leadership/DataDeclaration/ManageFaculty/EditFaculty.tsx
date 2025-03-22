import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dropdown from "../../../../components/Dropdown";
import { Option } from "../../../../components/Dropdown/type";

const EditFaculty: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const facultys = [
        { id: "K09", name: "Khối 9", leader: { id: 1, value: "Nguyễn Văn A" } },
        { id: "K10", name: "Khối 10", leader: { id: 2, value: "Trần Thị B" } },
        { id: "K11", name: "Khối 11", leader: { id: 3, value: "Lê Văn C" } },
        { id: "K12", name: "Khối 12", leader: { id: 1, value: "Nguyễn Văn A" } },
        { id: "K13", name: "Khối 13", leader: { id: 2, value: "Trần Thị B" } },
    ];

    const faculty = facultys.find(d => d.id === id);
    const [facultyId] = useState(faculty?.id || "");
    const [facultyName, setFacultyName] = useState(faculty?.name || "");
    const [selectedLeader] = useState<Option | null>(faculty?.leader || null);

    const leaders: Option[] = [
        { id: 1, value: "Nguyễn Văn A" },
        { id: 2, value: "Trần Thị B" },
        { id: 3, value: "Lê Văn C" }
    ];

    const handleSave = () => {
        console.log("Lưu thay đổi:", { facultyId, facultyName, selectedLeader });
        navigate("/leadership/data-declaration/faculty");
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-[884px] mx-auto">
            <h3 className="font-bold text-center text-2xl">Chỉnh sửa Khoa - Khối</h3>
            <div className="mt-6 space-y-3">
                <div>
                    <label className="block font-semibold">Mã Khoa - Khối</label>
                    <input value={facultyId} readOnly className="border p-2 w-full bg-gray-100 text-gray-600 cursor-not-allowed" />
                </div>

                <div>
                    <label className="block font-semibold">Tên Khoa - Khối</label>
                    <input value={facultyName} onChange={e => setFacultyName(e.target.value)} className="border p-2 w-full" />
                </div>

                <div>
                    <label className="block font-semibold">Trưởng Khoa - Khối</label>
                    <Dropdown options={leaders} disabled={false} icon="right" width="w-3/6" state="normal" />
                </div>

                <button
                    onClick={handleSave}
                    className="bg-orange-500 text-white px-4 py-2 rounded w-full mt-4">
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default EditFaculty;
