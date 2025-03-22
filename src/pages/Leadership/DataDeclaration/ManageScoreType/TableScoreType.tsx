import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaSearch, FaTrashAlt, FaSort } from 'react-icons/fa';
import Input from '../../../../components/Input';

const TableScoreType: React.FC = () => {
  const [keyword, setKeyword] = useState('');

  const [pageNumber, setPageNumber] = useState(8);

  const [currentPage, setCurrentPage] = useState(1);

  const [scoreTypes, setScoreTypes] = useState([
    { id: 'A1', name: 'Kiểm tra miệng', coefficient: 1, semester1: 2, semester2: 2 },
    { id: 'A2', name: 'Kiểm tra 15p', coefficient: 1, semester1: 3, semester2: 3 },
    { id: 'A3', name: 'Kiểm tra 45p', coefficient: 2, semester1: 2, semester2: 2 },
    { id: 'A4', name: 'Kiểm tra học kỳ', coefficient: 3, semester1: 1, semester2: 1 },
  ]);

  const navigate = useNavigate();

  const filteredData = scoreTypes.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / pageNumber);
  const paginatedData = filteredData.slice((currentPage - 1) * pageNumber, currentPage * pageNumber);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      setScoreTypes(scoreTypes.filter((type) => type.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Loại điểm</h2>
        <Input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder="Tìm kiếm"
          background="light grey"
          icon={<FaSearch />}
          borderRadius="24px"
        />
      </div>
      <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
            <th className="px-6 text-lg align-middle text-left w-[170px]" rowSpan={2}>
              <div className="inline-flex items-center gap-2 text-sm">
                Loại điểm <FaSort className="cursor-pointer" />
              </div>
            </th>
            <th className="px-4 text-lg align-middle text-center" rowSpan={2}>
              <div className="inline-flex items-center gap-2 text-sm">
                Hệ số <FaSort className="cursor-pointer" />
              </div>
            </th>
            <th className="px-4 py-2 text-center text-lg border text-sm" colSpan={2}>
              Số cột điểm tối thiểu
            </th>
            <th className="px-4 text-center text-lg align-middle"></th>
          </tr>
          <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
            <th className="px-4 py-2 text-center text-lg border text-sm">Học kì 1</th>
            <th className="px-4 py-2 text-center text-lg border text-sm">Học kì 2</th>
            <th className="px-4 text-center text-lg align-middle"></th>
          </tr>
        </thead>
        <tbody className="font-normal">
          {paginatedData.length > 0 ? (
            paginatedData.map((type, index) => (
              <tr key={type.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="px-6 w-[170px]">{type.name}</td>
                <td className="px-4 py-3 text-center">{type.coefficient}</td>
                <td className="px-4 py-3 text-center w-[120px]">{type.semester1}</td>
                <td className="px-4 py-3 text-center w-[120px]">{type.semester2}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => navigate(`edit/${type.id}`)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit style={styles.action__icon} />
                  </button>
                  <button onClick={() => setDeleteId(type.id)} className="text-red-500 hover:text-red-700 ml-3">
                    <FaTrashAlt style={styles.action__icon} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={5} className="p-3">
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

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
            <h3 className="text-2xl font-bold text-center">Xóa Loại Điểm</h3>
            <p className="text-base mt-5 mb-10 font-normal">Xác nhận muốn xoá loại điểm này? Sau khi xoá sẽ không thể hoàn tác.</p>
            <div className="flex justify-between w-full px-4 font-bold">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg w-40 h-14 text-lg" style={{ backgroundColor: '#F2F2F2' }}>
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
const styles = {
  action__icon: {
    color: '#ff7506',
    fontSize: '20px',
  },
};

export default TableScoreType;
