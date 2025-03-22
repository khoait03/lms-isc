import React, { useState } from 'react';

const TopicList = () => {
  const topics = [
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },

    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
    { title: 'Lorem ipsum dolor sit amet', description: 'Nullam malesuada posuere justo, in dictum ipsum', date: '01/01/2190' },
  ];

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(topics.length / itemsPerPage);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newItemsPerPage = Math.max(5, Math.min(20, Number(e.target.value))); // Giới hạn từ 5 đến 20
    setItemsPerPage(newItemsPerPage);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const displayedTopics = topics.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="px-6 pb-6 w-full mx-auto">
      {/* Nút nằm bên phải, cách bảng */}
      <div className="flex justify-end mt-[-65px] mr-[-15px]">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md">Phân công giảng dạy</button>
      </div>

      {/* Tiêu đề + Nút */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-bold">Danh sách chủ đề</h2>
        <div className="flex gap-5">
          <button className="text-orange-500 hover:text-orange-600">
            <img src="/icon/fi_edit.png" alt="Edit" className="w-5 h-5" />
          </button>
          <button className="text-red-500 hover:text-red-600">
            <img src="/icon/fi_trash-orange.png" alt="Delete" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Thông tin giáo viên */}
      <div className="mt-2 mb-3 text-gray-700 flex items-center gap-8">
        <p>
          <strong>Giảng viên:</strong> Lương Hoàng D
        </p>
        <p>
          <strong>Lớp học:</strong> 6D
        </p>
        <p>
          <strong>Môn học:</strong> Tin học kèm toán
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="p-2 text-left">Chủ đề</th>
              <th className="p-2 text-left">Miêu tả</th>
              <th className="p-2 text-left">Ngày kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {displayedTopics.map((topic, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td className="p-3">{topic.title}</td>
                <td className="p-3">{topic.description}</td>
                <td className="p-3">{topic.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Phân trang */}
      <div className="flex items-center justify-between pt-6">
        {/* Chỉnh số hàng hiển thị */}
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
          <span className="italic">hàng trên mỗi trang</span>
        </div>
        {/* Nút phân trang */}
        <div className="flex items-center gap-2 text-sm">
          {/* Nút "Trang trước" */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"
          >
            &#10094;
          </button>

          {/* Hiển thị số trang */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-2 h-6 w-6 mx-[2px] rounded-full ${
                currentPage === page ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Nút "Trang sau" */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicList;
