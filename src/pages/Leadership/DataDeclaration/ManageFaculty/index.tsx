import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const ManageFaculty: React.FC = () => {
  const [facultys, setFacultys] = useState([
    { id: "K09", name: "Khối 9", leader: { id: 1, value: "Nguyễn Văn A" } },
    { id: "K10", name: "Khối 10", leader: { id: 2, value: "Trần Thị B" } },
    { id: "K11", name: "Khối 11", leader: { id: 3, value: "Lê Văn C" } },
    { id: "K12", name: "Khối 12", leader: { id: 1, value: "Nguyễn Văn A" } },
    { id: "K13", name: "Khối 13", leader: { id: 2, value: "Trần Thị B" } },
  ]);

  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      setFacultys(facultys.filter(d => d.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-mulis">Khoa - Khối</h2>
        <div className="relative max-w-lg" style={{ width: 438 }}>
          <input
            type="text" placeholder="Tìm kiếm"
            className="px-3 py-2 text-sm font-normal rounded-3xl w-full pl-10 focus:outline-none focus:ring-2
                        font-source-sans focus:ring-orange-500 bg-gray-200 italic"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
      </div>

      <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
            <th className="px-4 py-2 text-left text-lg">Mã khoa - khối</th>
            <th className="px-4 py-2 text-left text-lg">Tên khoa - khối</th>
            <th className="px-4 py-2 text-center text-lg">Hành động</th>
          </tr>
        </thead>
        <tbody className="font-normal">
          {facultys.map((faculty, index) => (
            <tr key={faculty.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="px-8 py-3 text-base font-source-sans">{faculty.id}</td>
              <td className="px-4 py-3 text-base font-source-sans">{faculty.name}</td>
              <td className="px-4 py-3 text-center">
                <button onClick={() => navigate(`list/${faculty.id}`)} className="text-orange-500 hover:text-orange-700 mx-2">
                  <img src="/icon/fi_list.png" alt="List" className="w-8 h-8" />
                </button>
                <button onClick={() => navigate(`edit/${faculty.id}`)} className="text-orange-500 hover:text-orange-700 mx-2">
                  <img src="/icon/fi_edit.png" alt="Edit" className="w-8 h-8" />
                </button>
                <button onClick={() => setDeleteId(faculty.id)} className="text-orange-500 hover:text-orange-700 mx-2">
                  <img src="/icon/fi_trash-2.png" alt="Trash" className="w-8 h-8" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
            <h3 className="text-2xl font-bold text-center">Xóa Khoa - Khối</h3>
            <p className="text-base mt-5 mb-10 font-normal font-source-sans">
              Xác nhận muốn xoá Khoa - khối này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác.
            </p>
            <div className="flex justify-between w-full px-4 font-bold">
              <button onClick={() => setDeleteId(null)} className=" px-4 py-2 rounded-lg w-40 h-14 text-lg font-mulis" style={{ backgroundColor: "#F2F2F2" }}>
                Hủy
              </button>
              <button onClick={handleDelete} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 h-14 text-lg">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFaculty;
