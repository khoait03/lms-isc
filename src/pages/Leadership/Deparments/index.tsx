import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import List from '../../../assets/images/fi_list.png';
import Edit from '../../../assets/images/fi_edit.png';
import Trash from '../../../assets/images/fi_trash-2.png';
import Search from '../../../assets/images/fi_search.png';

export default function DeparmentsTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const subjects = [
    { id: 'S01', name: 'Văn hóa xã hội', head: 'Nguyễn Văn A' },
    { id: 'S02', name: 'Khoa học tự nhiên', head: 'Trần Thị B' },
    { id: 'S03', name: 'Anh Văn', head: 'Phạm Ngọc C' },
    { id: 'S04', name: 'Toán học', head: 'Lê Văn D' },
    { id: 'S05', name: 'Vật lý', head: 'Ngô Minh E' },
    { id: 'S06', name: 'Hóa học', head: 'Đinh Thị F' },
    { id: 'S07', name: 'Sinh học', head: 'Nguyễn Thành G' },
    { id: 'S08', name: 'Tin học', head: 'Phan Văn H' },
    { id: 'S09', name: 'Thể dục', head: 'Hoàng Thị I' },
    { id: 'S10', name: 'Âm nhạc', head: 'Trần Thanh J' },
  ];

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const displayedSubjects = filteredSubjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleEditClick = (id: any) => {
    navigate(`/leadership/data-declaration/departments/departments-edit/${id}`);
  };

  return (
    <div className="p-4 mx-auto relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Tổ - Bộ môn</h1>
        <div className="relative">
          <input
            type="search"
            placeholder="Tìm kiếm"
            className="italic pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-[300px] focus:outline-none focus:border-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={Search} alt="" className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        {/* Table Header */}
        <div className="grid grid-cols-2 bg-orange-500 text-white rounded-t-lg text-[18px]">
          <button className="p-4 text-left font-medium flex items-center gap-2">
            Tên tổ - bộ môn
            <div className="flex flex-col">
              <ChevronUp className="w-4 h-4" />
              <ChevronDown className="w-4 h-4 -mt-1" />
            </div>
          </button>
          <button className="p-4 text-left font-medium flex items-center gap-2">
            Trưởng bộ môn
            <div className="flex flex-col">
              <ChevronUp className="w-4 h-4" />
              <ChevronDown className="w-4 h-4 -mt-1" />
            </div>
          </button>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {displayedSubjects.length > 0 ? (
            displayedSubjects.map((subject, index) => (
              <div key={subject.id} className={`grid grid-cols-2 hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                <div className="p-4 text-[16px]">{subject.name}</div>
                <div className="p-4 flex items-center justify-between">
                  <span>{subject.head}</span>
                  <div className="flex gap-2">
                    <button className="p-1 text-orange-500 hover:bg-orange-50 rounded">
                      <img src={List} alt="" className="w-8 h-8" />
                    </button>
                    <button className="p-1 text-orange-500 hover:bg-orange-50 rounded" onClick={() => handleEditClick(subject.id)}>
                      <img src={Edit} alt="" className="w-8 h-8" />
                    </button>
                    <button className="p-1 text-orange-500 hover:bg-orange-50 rounded" onClick={() => setDeleteId(subject.id)}>
                      <img src={Trash} alt="" className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">Không có dữ liệu</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {displayedSubjects.length > 0 && (
        <div className="flex justify-between items-center mt-5">
          <div>
            <em>Hiển thị</em>
            <input
              type="number"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Math.min(Number(e.target.value) || 1, 8))}
              className="p-2 rounded-md mx-2 border"
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
              ) : null
            )}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              &#10095;
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
            <h3 className="text-2xl font-bold text-center">Xóa bộ môn</h3>
            <p className="text-base mt-5 mb-10">Xác nhận muốn xoá Tổ - Bộ môn này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác.</p>
            <div className="flex justify-between px-4">
              <button onClick={() => setDeleteId(null)} className="bg-gray-200 px-12 py-2 rounded-lg">Hủy</button>
              <button onClick={() => { }} className="bg-orange-500 text-white px-10 py-2 rounded-lg">Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
