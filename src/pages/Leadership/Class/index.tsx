import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination/index';
import List from '../../../assets/images/fi_list.png';
import Edit from '../../../assets/images/fi_edit.png';
import Trash from '../../../assets/images/fi_trash-2.png';
import SearchIcon from '../../../assets/images/fi_search.png';

export default function ClassTable() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<{ id: string; name: string; teacher: string } | null>(null);

  const classes = [
    { id: '2020-6A', name: '6A', teacher: 'Nguyễn Văn A' },
    { id: '2020-6B', name: '6B', teacher: 'Phạm Thị C' },
    { id: '2020-6C', name: '6C', teacher: 'Trần Hoàng A' },
  ];

  const handleEditClick = () => {
    navigate('/leadership/data-declaration/classes/classes-edit/1');
  };

  const handleDeleteClick = (cls: any) => {
    setSelectedClass(cls);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting class:', selectedClass);
    setShowModal(false);
  };

  return (
    <div className="mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Lớp học</h1>
        <div className="relative">
          <input
            type="search"
            placeholder="Tìm kiếm"
            className="italic pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-[300px] focus:outline-none focus:border-orange-500"
          />
          <img src={SearchIcon} alt="Search" className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-[40px_2fr_2fr_2fr_120px] bg-orange-500 text-white rounded-t-lg text-[18px]">
          <input type="checkbox" className="m-auto" />
          <button className="p-4 text-left font-medium flex items-center gap-2">
            Mã lớp <ChevronUp className="w-4 h-4" />
            <ChevronDown className="w-4 h-4 -mt-1" />
          </button>
          <button className="p-4 text-left font-medium flex items-center gap-2">Tên lớp</button>
          <button className="p-4 text-left font-medium flex items-center gap-2">Giáo viên chủ nhiệm</button>
          <div className="p-4 text-center font-medium"></div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {classes.map((cls, index) => (
            <div
              key={index}
              className={`grid grid-cols-[40px_2fr_2fr_2fr_120px] items-center hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}
            >
              <input type="checkbox" className="m-auto" />

              <div className="p-4 text-[16px]">{cls.id}</div>
              <Link to={`/leadership/classes/detail`}>   <div className="p-4 text-[16px]">{cls.name}</div>  </Link>
              <div className="p-4 text-[16px]">{cls.teacher}</div>

              <div className="flex gap-2">
                <button className="p-1 text-orange-500 hover:bg-orange-50 rounded">
                  <img src={List} alt="" className="w-8 h-8" />
                </button>
                <button className="p-1 text-orange-500 hover:bg-orange-50 rounded" onClick={handleEditClick}>
                  <img src={Edit} alt="" className="w-8 h-8" />
                </button>
                <button className="p-1 text-orange-500 hover:bg-orange-50 rounded" onClick={() => handleDeleteClick(cls)}>
                  <img src={Trash} alt="" className="w-8 h-8" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination limit={8} activation={3} max={100} />

      {/* Modal Confirm Delete */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Xóa</h2>
            <p className="mt-2">
              Xác nhận muốn xóa lớp <strong>{selectedClass?.name}</strong>? Sau khi xóa sẽ không thể hoàn tác.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>
                Hủy
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded" onClick={handleConfirmDelete}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
