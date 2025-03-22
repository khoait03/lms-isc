import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import DeletePopup from '../../../../../components/Popup/Delete'; // Import Popup

const instructors = [
  { id: '1', name: 'Tô An' },
  { id: '2', name: 'Hoàng Mỹ Trưng' },
  { id: '3', name: 'Nguyễn Kỳ Nguyên' },
  { id: '4', name: 'Mộc Tâm Tâm' },
  { id: '5', name: 'Trần Thoa Hân' },
  { id: '6', name: 'Nguyễn Ngọc Điệp' },
];

const initialClasses = [
  { id: '101', name: '10A1', startDate: '2024-01-15', endDate: '2024-06-30', instructorId: '1' },
  { id: '1021', name: '11B2', startDate: '2024-02-10', endDate: '2024-07-15', instructorId: '1' },
  { id: '1012', name: '10A1', startDate: '2024-01-15', endDate: '2024-06-30', instructorId: '1' },
  { id: '1023', name: '11B2', startDate: '2024-02-10', endDate: '2024-07-15', instructorId: '1' },
  { id: '1014', name: '10A1', startDate: '2024-01-15', endDate: '2024-06-30', instructorId: '1' },
  { id: '1025', name: '11B2', startDate: '2024-02-10', endDate: '2024-07-15', instructorId: '1' },
  { id: '1016', name: '10A1', startDate: '2024-01-15', endDate: '2024-06-30', instructorId: '1' },
  { id: '1027', name: '11B2', startDate: '2024-02-10', endDate: '2024-07-15', instructorId: '1' },
  { id: '1018', name: '10A1', startDate: '2024-01-15', endDate: '2024-06-30', instructorId: '1' },
  { id: '1029', name: '11B2', startDate: '2024-02-10', endDate: '2024-07-15', instructorId: '1' },
  { id: '103', name: '12C3', startDate: '2024-03-05', endDate: '2024-08-20', instructorId: '2' },
  { id: '104', name: '10A2', startDate: '2024-04-12', endDate: '2024-09-10', instructorId: '3' },
];

const TeachingAssignmentDetail: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Giá trị mặc định
  const navigate = useNavigate();
  const { id } = useParams();
  const instructor = instructors.find((inst) => inst.id === id);
  const [assignedClasses, setAssignedClasses] = useState(() => initialClasses.filter((cls) => cls.instructorId === id));

  useEffect(() => {
    setAssignedClasses(initialClasses.filter((cls) => cls.instructorId === id));
    setItemsPerPage(8); // Reset itemsPerPage
    setCurrentPage(1);
  }, [id]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBulkDeletePopupOpen, setIsBulkDeletePopupOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const pageCount = Math.ceil(assignedClasses.length / itemsPerPage) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(5, Math.min(20, Number(e.target.value))); // Giới hạn từ 5 - 20
    setItemsPerPage(value);
  };

  const totalPages = Math.ceil(assignedClasses.length / itemsPerPage);

  if (!instructor) {
    return <p className="text-red-500">Giảng viên không tồn tại.</p>;
  }

  // Xử lý chọn checkbox
  const handleCheckboxChange = (classId: string) => {
    setSelectedClasses((prev) => (prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]));
  };

  // Xử lý xóa một lớp (Popup riêng)
  const handleDelete = (classId: string) => {
    setSelectedClassId(classId);
    setIsPopupOpen(true);
  };

  const confirmDelete = () => {
    if (selectedClassId) {
      setAssignedClasses((prev) => prev.filter((cls) => cls.id !== selectedClassId));
    }
    setIsPopupOpen(false);
    setSelectedClassId(null);
  };

  // Xử lý mở popup xóa nhiều lớp
  const handleDeleteSelected = () => {
    if (selectedClasses.length > 0) {
      setIsBulkDeletePopupOpen(true);
    }
  };

  // Xác nhận xóa nhiều lớp
  const confirmBulkDelete = () => {
    setAssignedClasses((prev) => prev.filter((cls) => !selectedClasses.includes(cls.id)));
    setSelectedClasses([]); // Reset danh sách đã chọn
    setIsBulkDeletePopupOpen(false);
  };

  const handleNavigate = () => {
    navigate('/leadership/teacher/teaching-assignment/1/topic'); // Đường dẫn bạn muốn điều hướng đến
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClasses = assignedClasses.slice(startIndex, endIndex);

  return (
    <div className="relative px-4 pb-4 ">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold font-mulish mb-1">Danh sách phân công giảng dạy</h2>
        <div className="flex items-center gap-2 mt-[-120px]  ">
          <button onClick={handleDeleteSelected} disabled={selectedClasses.length === 0}>
            <img src="/icon/fi_trash-orange.png" alt="Delete" className="w-8 h-8 " />
          </button>
          <span className="h-10 bg-gray-300 w-[1px] mx-1"></span>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2">
            <FaPlus size={14} />
            Thêm mới
          </button>
        </div>
      </div>

      {/* Bảng */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-1"></th>
              <th className="px-4 py-1">Mã lớp</th>
              <th className="px-4 py-1">Tên lớp</th>
              <th className="px-4 py-1">Ngày bắt đầu</th>
              <th className="px-4 py-1">Ngày kết thúc</th>
              <th className="px-4 py-1 text-center">Danh sách chủ đề</th>
              <th className="px-4 py-1 text-center"></th>
            </tr>
          </thead>

          <tbody>
            {paginatedClasses.length > 0 ? (
              paginatedClasses.map((cls) => (
                <tr key={cls.id} className="odd:bg-white even:bg-gray-100">
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      {/* Checkbox ẩn */}
                      <input
                        type="checkbox"
                        className="hidden"
                        onChange={() => handleCheckboxChange(cls.id)}
                        checked={selectedClasses.includes(cls.id)}
                      />
                      {/* Ô checkbox */}
                      <div
                        className={`w-6 h-6 border-2 rounded-md transition-all duration-200  ${
                          selectedClasses.includes(cls.id) ? 'bg-blue-500 border-blue-500 ' : 'border-blue-500 bg-white'
                        }`}
                      >
                        {selectedClasses.includes(cls.id) && (
                          <svg className="w-[18px] h-[18px] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 18" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M20.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 14.586l9.293-9.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </label>
                  </td>
                  <td className="px-4 py-3">{cls.id}</td>
                  <td className="px-4 py-3">{cls.name}</td>
                  <td className="px-4 py-3">{cls.startDate}</td>
                  <td className="px-4 py-3">{cls.endDate}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={handleNavigate} className="text-orange-500 hover:text-orange-600">
                      <img src="/icon/u_list.Danhsachchude.png" alt="Delete" className="w-7 h-7 " />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-4">
                    <button className="text-orange-500 hover:text-orange-600">
                      <img src="/icon/fi_edit.png" alt="Delete" className="w-6 h-6 " />
                    </button>
                    <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(cls.id)}>
                      <img src="/icon/fi_trash-orange.png" alt="Delete" className="w-6 h-6 " />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center text-gray-500">
                  Không có lớp nào được phân công.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex items-center justify-between pt-8">
        <div className="text-sm text-gray-600 flex items-center space-x-2">
          <span className="italic">Hiển thị</span>
          <input
            type="number"
            min={5}
            max={20}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-12 h-6 border border-orange-500 rounded-md text-center focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <span className="italic">hàng trong mỗi trang</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"
          >
            &#10094;
          </button>

          {[...Array(pageCount)].map((_, i) => {
            if (i === 0 || i === pageCount - 1 || Math.abs(i + 1 - currentPage) < 2) {
              return (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-2 h-6 w-6 mx-[2px] rounded-full ${
                    currentPage === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              );
            } else if ((i === 1 && currentPage > 3) || (i === pageCount - 2 && currentPage < pageCount - 2)) {
              return (
                <span key={i} className="px-3 mx-1">
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Popup xác nhận xóa một lớp */}
      <DeletePopup
        isOpen={isPopupOpen}
        onCancel={() => setIsPopupOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa phân công"
        text="Xác nhận muốn xoá phân công này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
      />

      {/* Popup xác nhận xóa nhiều lớp */}
      <DeletePopup
        isOpen={isBulkDeletePopupOpen}
        onCancel={() => setIsBulkDeletePopupOpen(false)}
        onConfirm={confirmBulkDelete}
        title="Xóa phân công"
        text="Xác nhận muốn xoá phân công này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
      />
    </div>
  );
};

export default TeachingAssignmentDetail;
