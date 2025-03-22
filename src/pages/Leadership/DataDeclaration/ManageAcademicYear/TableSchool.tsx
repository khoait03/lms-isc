import { useState } from 'react';
import Input from '../../../../components/Input';
import { FaAngleDown, FaAngleUp, FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const TableSchool = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [schoolYear, setSchoolYear] = useState([
    { id: 'SY01', schoolYear: '2024', timeStart: '22/2/2024', timeEnd: '25/2/2024' },
    { id: 'SY02', schoolYear: '2025', timeStart: '22/2/2025', timeEnd: '25/2/2025' },
    { id: 'SY03', schoolYear: '2025', timeStart: '15/2/2025', timeEnd: '15/2/2025' },
    { id: 'SY04', schoolYear: '2025', timeStart: '22/2/2025', timeEnd: '25/2/2025' },
    { id: 'SY05', schoolYear: '2026', timeStart: '22/2/2026', timeEnd: '25/2/2026' },
    { id: 'SY06', schoolYear: '2027', timeStart: '22/2/2027', timeEnd: '25/2/2027' },
    { id: 'SY07', schoolYear: '2028', timeStart: '22/2/2028', timeEnd: '25/2/2028' },
    { id: 'SY08', schoolYear: '2029', timeStart: '22/2/2029', timeEnd: '25/2/2029' },
    { id: 'SY09', schoolYear: '2030', timeStart: '22/2/2030', timeEnd: '25/2/2030' },
  ]);

  const filteredData = schoolYear.filter((item) => item.schoolYear.toLowerCase().includes(keyword.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / pageNumber);
  const paginatedData = filteredData.slice((currentPage - 1) * pageNumber, currentPage * pageNumber);

  const handleDelete = () => {
    if (deleteId) {
      setSchoolYear(schoolYear.filter((d) => d.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Niên khóa</h2>
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm"
          background="light grey"
          icon={<FaSearch />}
          borderRadius="24px"
        />
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="p-1 text-center">
                <div className="inline-flex items-center">
                  <span className="me-2">STT</span>
                  <div className="flex flex-col items-center">
                    <FaAngleUp className="cursor-pointer text-xs" />
                    <FaAngleDown className="cursor-pointer text-xs" />
                  </div>
                </div>
              </th>
              <th className="p-1 text-left">
                <div className="inline-flex items-center">
                  <span className="me-2">Niên khóa</span>
                  <div className="flex flex-col items-center">
                    <FaAngleUp className="cursor-pointer text-xs" />
                    <FaAngleDown className="cursor-pointer text-xs" />
                  </div>
                </div>
              </th>
              <th className="p-1 text-left">Thời gian bắt đầu</th>
              <th className="p-1 text-left">Thời gian kết thúc</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id} className="border-b odd:bg-white even:bg-gray-200">
                  <td className="p-3 text-sm text-center">{(currentPage - 1) * pageNumber + index + 1}</td>
                  <td className="p-3 text-sm text-left">{item.schoolYear}</td>
                  <td className="p-3 text-sm text-left">{item.timeStart}</td>
                  <td className="p-3 text-sm text-left">{item.timeEnd}</td>
                  <td className="p-3 text-sm text-left">
                    <button onClick={() => navigate(`${item.id}`)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit style={styles.action__icon} />
                    </button>
                    <button onClick={() => setDeleteId(item.id)} className="text-red-500 hover:text-red-700 ml-3">
                      <FaTrashAlt style={styles.action__icon} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={4} className="p-3">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
            <h3 className="text-2xl font-bold text-center">Xóa niên khóa</h3>
            <p className="text-base mt-5 mb-10 font-normal font-source-sans">
              Xác nhận muốn xoá niên khóa này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác.
            </p>
            <div className="flex justify-between w-full px-4 font-bold">
              <button
                onClick={() => setDeleteId(null)}
                className=" px-4 py-2 rounded-lg w-40 h-14 text-lg font-mulis"
                style={{ backgroundColor: '#F2F2F2' }}
              >
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

  text__i: {
    fontSize: '15px',
  },

  active_sort: {
    color: '#000000',
  },
};

export default TableSchool;
