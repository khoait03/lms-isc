import { useState } from 'react';
import Img from '../../../assets/images/datePickerImg/u_calendar-alt.png';
import Detail from './detail';
import { FaPlus, FaEye, FaSearch, FaChevronDown, FaAngleUp, FaAngleDown } from 'react-icons/fa';

export interface Exam {
  date: string;
  department: number;
  class: string;
  subject: string;
  teacher: string;
  examcontent: string;
  time: string;
  status: 'Chờ phê duyệt' | 'Chưa bắt đầu' | 'Đang diễn ra' | 'Đã tiến hành' | 'Đã hoàn thành';
  check: 'Chờ phê duyệt' | 'Đã hủy' | 'Đã duyệt';
  index?: number;
}

const exams: Exam[] = [
  {
    date: "Thứ 5, 21/08/2020<br>12:00 PM",
    department: 6,
    class: "6A1",
    subject: "Toán",
    teacher: "GV.Nguyễn Văn A",
    examcontent: "Kiểm tra 1 tiết",
    time: "45 phút",
    status: "Chờ phê duyệt",
    check: "Chờ phê duyệt",
  },
  {
    date: "Thứ 6, 22/08/2020<br>2:00 PM",
    department: 7,
    class: "7B2",
    subject: "Văn",
    teacher: "GV.Trần Thị B",
    examcontent: "Kiểm tra 1 tiết",
    time: "60 phút",
    status: "Chờ phê duyệt",
    check: "Chờ phê duyệt",
  },
  {
    date: "Thứ 2, 25/08/2020<br>9:00 AM",
    department: 8,
    class: "8C1",
    subject: "Hóa học",
    teacher: "GV.Lê Thị C",
    examcontent: "Kiểm tra giữa kỳ",
    time: "90 phút",
    status: "Chờ phê duyệt",
    check: "Chờ phê duyệt",
  },
  {
    date: "Thứ 3, 26/08/2020<br>10:30 AM",
    department: 9,
    class: "9D3",
    subject: "Sinh học",
    teacher: "GV.Pham Minh D",
    examcontent: "Kiểm tra cuối kỳ",
    time: "120 phút",
    status: "Đã hoàn thành",
    check: "Đã duyệt",
  },
  {
    date: "Thứ 7, 30/08/2020<br>3:00 PM",
    department: 10,
    class: "10A1",
    subject: "Lý",
    teacher: "GV.Hoàng Văn E",
    examcontent: "Kiểm tra định kỳ",
    time: "60 phút",
    status: "Đã hoàn thành",
    check: "Đã duyệt",
  },
  {
    date: "Thứ 6, 22/08/2020<br>2:00 PM",
    department: 7,
    class: "7B2",
    subject: "Văn",
    teacher: "GV.Trần Thị B",
    examcontent: "Kiểm tra 1 tiết",
    time: "60 phút",
    status: "Đã hoàn thành",
    check: "Đã duyệt",
  },
  {
    date: "Thứ 2, 25/08/2020<br>9:00 AM",
    department: 8,
    class: "8C1",
    subject: "Hóa học",
    teacher: "GV.Lê Thị C",
    examcontent: "Kiểm tra giữa kỳ",
    time: "90 phút",
    status: "Đã hoàn thành",
    check: "Đã duyệt",
  },
  {
    date: "Thứ 3, 26/08/2020<br>10:30 AM",
    department: 9,
    class: "9D3",
    subject: "Sinh học",
    teacher: "GV.Pham Minh D",
    examcontent: "Kiểm tra cuối kỳ",
    time: "120 phút",
    status: "Đã tiến hành",
    check: "Đã duyệt",
  },
  {
    date: "Thứ 7, 30/08/2020<br>3:00 PM",
    department: 10,
    class: "10A1",
    subject: "Lý",
    teacher: "GV.Hoàng Văn E",
    examcontent: "Kiểm tra định kỳ",
    time: "60 phút",
    status: "Chờ phê duyệt",
    check: "Chờ phê duyệt",
  },
  {
    date: "Thứ 6, 22/08/2020<br>2:00 PM",
    department: 7,
    class: "7B2",
    subject: "Văn",
    teacher: "GV.Trần Thị B",
    examcontent: "Kiểm tra 1 tiết",
    time: "60 phút",
    status: "Đã hoàn thành",
    check: "Đã duyệt",
  },
  {
    date: "Thứ 2, 25/08/2020<br>9:00 AM",
    department: 8,
    class: "8C1",
    subject: "Hóa học",
    teacher: "GV.Lê Thị C",
    examcontent: "Kiểm tra giữa kỳ",
    time: "90 phút",
    status: "Đang diễn ra",
    check: "Đã hủy",
  },
  {
    date: "Thứ 3, 26/08/2020<br>10:30 AM",
    department: 9,
    class: "9D3",
    subject: "Sinh học",
    teacher: "GV.Pham Minh D",
    examcontent: "Kiểm tra cuối kỳ",
    time: "120 phút",
    status: "Chưa bắt đầu",
    check: "Đã hủy",
  },
  {
    date: "Thứ 7, 30/08/2020<br>3:00 PM",
    department: 10,
    class: "10A1",
    subject: "Lý",
    teacher: "GV.Hoàng Văn E",
    examcontent: "Kiểm tra định kỳ",
    time: "60 phút",
    status: "Đã hoàn thành",
    check: "Đã duyệt",
  },
];

const Exam = () => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Exam; direction: 'asc' | 'desc' } | null>(null);
  const sortableKeys = ["department", "class", "subject"];

  const handleSort = (key: keyof Exam) => {
    if (!sortableKeys.includes(key)) return;
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const filteredData = exams.filter((exam) =>
    Object.values(exam).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig || !sortableKeys.includes(sortConfig.key)) return 0;
    const { key, direction } = sortConfig;
    const valueA = a[key] ?? "";
    const valueB = b[key] ?? "";
    return direction === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(Math.min(Number(e.target.value) || 5, 20));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-3">
      {/* header */}
      <h1 className="text-2xl md:text-3xl font-bold font-mulish mb-4">Quản lý bài kiểm tra</h1>

      {/* Filter,thêm mới */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select className="w-full sm:w-32 p-1 border border-black rounded text-sm">
            <option>Tình trạng</option>
            <option>Chờ phê duyệt</option>
            <option>Chưa bắt đầu</option>
            <option>Đã tiến hành</option>
            <option>Đã hoàn thành</option>
          </select>
          <select className="w-full sm:w-32 p-1 border border-black rounded text-sm">
            <option>Chọn lớp</option>
            <option>6A1</option>
            <option>8C</option>
            <option>8C1</option>
            <option>8C2</option>
          </select>
          <select className="w-full sm:w-32 p-1 border border-black rounded text-sm">
            <option>Chọn Khối</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm">Từ ngày</span>
              <div className="flex items-center w-32 border border-black rounded">
                <input type="text" value="23/10/2020" readOnly className="w-full p-1 bg-transparent text-sm" />
                <img src={Img} alt="calendar" className="w-4 h-4 mx-1" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">Đến ngày</span>
              <div className="flex items-center w-32 border border-black rounded">
                <input type="text" value="23/10/2025" readOnly className="w-full p-1 bg-transparent text-sm" />
                <img src={Img} alt="calendar" className="w-4 h-4 mx-1" />
              </div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm">
          <FaPlus size={12} />
          <span>Thêm mới</span>
        </button>
      </div>

      {/* chi tiết */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
          <h2 className="text-lg font-semibold font-mulish">Xem chi tiết bài kiểm tra</h2>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full pl-8 pr-2 py-1 rounded-full bg-gray-100 text-sm italic focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="text-white" style={{ background: 'linear-gradient(to right, #f1721f, #ff5400)' }}>
              <tr>
                <th className="px-3 py-2 text-left font-mulish font-semibold whitespace-nowrap">Ngày làm bài</th>
                {[
                  { key: 'department', label: 'Khối' },
                  { key: 'class', label: 'Lớp' },
                  { key: 'subject', label: 'Môn học' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-2 py-2 text-center font-mulish font-semibold cursor-pointer hover:bg-orange-400 whitespace-nowrap"
                    onClick={() => handleSort(key as keyof Exam)}
                  >
                    <span className="flex items-center justify-center">
                      {label}
                      {sortableKeys.includes(key) && (
                        <div className="ml-1 flex flex-col">
                          <FaAngleUp className={`text-xs ${sortConfig?.key === key && sortConfig?.direction === "asc" ? "text-black" : "text-gray-300"}`} />
                          <FaAngleDown className={`text-xs -mt-1 ${sortConfig?.key === key && sortConfig?.direction === "desc" ? "text-black" : "text-gray-300"}`} />
                        </div>
                      )}
                    </span>
                  </th>
                ))}
                <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Giảng viên</th>
                <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Nội dung</th>
                <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Thời lượng</th>
                <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Tình trạng</th>
                <th className="px-2 py-2 text-left font-mulish font-semibold whitespace-nowrap">Phê duyệt</th>
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((exam, index) => (
                <tr key={index} className="odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition-colors">
                  <td className="px-3 py-2 text-left font-source-sans whitespace-nowrap">
                    <div dangerouslySetInnerHTML={{ __html: exam.date }} />
                  </td>
                  <td className="px-2 py-2 text-center font-source-sans">{exam.department}</td>
                  <td className="px-2 py-2 text-center font-source-sans">{exam.class}</td>
                  <td className="px-2 py-2 text-left font-source-sans">{exam.subject}</td>
                  <td className="px-2 py-2 text-left font-source-sans">{exam.teacher}</td>
                  <td className="px-2 py-2 text-left font-source-sans">{exam.examcontent}</td>
                  <td className="px-2 py-2 text-left font-source-sans">{exam.time}</td>
                  <td className="px-2 py-2 text-left font-source-sans text-gray-500 italic">{exam.status}</td>
                  <td className="px-2 py-2 text-left font-source-sans">
                    {exam.check === "Chờ phê duyệt" ? (
                      <div className="flex gap-2">
                        <button
                          className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600"
                          onClick={() => {
                            setSelectedExam({ ...exam, index });
                            setIsModalOpen(true);
                          }}
                        >
                          Xác nhận
                        </button>
                        <button className="border-2 border-orange-500 text-orange-500 px-2 py-1 rounded text-xs hover:bg-orange-500 hover:text-white">
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <span className={`italic ${exam.check === "Đã duyệt" ? 'text-blue-500' : 'text-gray-500'}`}>
                        {exam.check}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 text-center">
                    <button className="text-orange-500 hover:text-orange-600">
                      <FaEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* phân trang */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="italic">Hiển thị</span>
            <input
              type="number"
              min={5}
              max={20}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-12 p-1 border border-orange-500 rounded text-center"
            />
            <span className="italic">hàng</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              ❮
            </button>
            {[...Array(pageCount)].map((_, i) =>
              i < 2 || i > pageCount - 3 || Math.abs(i + 1 - currentPage) < 2 ? (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-6 h-6 rounded-full ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ) : (i === 2 && currentPage > 3) || (i === pageCount - 3 && currentPage < pageCount - 2) ? (
                <span key={i}>...</span>
              ) : null
            )}
            <button
              disabled={currentPage === pageCount}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && selectedExam && (
        <Detail
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          exam={selectedExam}
        />
      )}
    </div>
  );
};

export default Exam;