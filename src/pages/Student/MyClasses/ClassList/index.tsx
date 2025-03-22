import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import { FaPlus, FaEye, FaAngleDown, FaAngleUp, FaSearch, FaExclamation } from 'react-icons/fa';
import DatePicker from 'react-datepicker';

interface ClassItem {
  id: number;
  subject: string;
  date: string;
  time: string;
  teacher: string;
  status: "upcoming" | "completed" | "incomplete";
  schoolYear: string;
}

const ClassList: React.FC = () => {
  const params = useParams<Record<string, string>>();
  const currentFilter = params.filter || "all";

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const [schoolYear, setSchoolYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("30/11/2025");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Tải dữ liệu từ file JSON
  useEffect(() => {
    fetch("/classes.json")
      .then((res) => res.json())
      .then((data: ClassItem[]) => {
        setClasses(data);
      })
      .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
  }, []);

  // Lọc theo trạng thái ngay khi chọn tab
  useEffect(() => {
    let filtered = [...classes];

    if (currentFilter !== "all") {
      filtered = filtered.filter((cls) => cls.status === currentFilter);
    }

    setFilteredClasses(filtered);
  }, [currentFilter, classes]);

  // Hàm lọc nâng cao khi nhấn nút
  const filterClasses = () => {
    let filtered = [...classes];

    // Lọc theo trạng thái trước
    if (currentFilter !== "all") {
      filtered = filtered.filter((cls) => cls.status === currentFilter);
    }

    // Áp dụng các bộ lọc bổ sung khi nhấn nút
    if (schoolYear) {
      filtered = filtered.filter((cls) => cls.schoolYear === schoolYear);
    }
    
    if (selectedSubject) {
      filtered = filtered.filter((cls) => cls.subject === selectedSubject);
    }

    setFilteredClasses(filtered);
  };

  return (
    <div className="max-w mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lớp học của tôi</h2>

      {/* Tabs */}
      <div className="flex gap-4">
        {[
          { name: "Tất cả lớp học", path: "all" },
          { name: "Lớp học sắp tới", path: "upcoming" },
          { name: "Lớp học đã hoàn thành", path: "completed" },
          { name: "Lớp học chưa hoàn thành", path: "incomplete" },
        ].map((tab) => (
          <NavLink
            key={tab.path}
            to={`/student/my-classes/list/${tab.path}`}
            className={({ isActive }) =>
              `min-w-[150px] max-w-[150px] flex items-center justify-center text-center px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-300 ${isActive
                ? "bg-orange-500 text-white"
                : "border-t-2 border-l-2 border-r-2 border-b-0 border-orange-500 text-black bg-white border hover:bg-orange-100"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
        
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mt-4 p-4 bg-white rounded-md items-center">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Chọn niên khóa</label>
          
          <div className="relative border border-black rounded flex items-center">
            <select
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
              className="appearance-none bg-transparent px-4 py-2">
              <option value="">Chọn niên khóa</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
            </select>
            <div className="w-px bg-black self-stretch"></div>
            <label className="px-2">
              <FaChevronDown className="text-orange-500 w-4 h-4" />
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Chọn ngày</label>
          
          <div className="flex items-center border border-black rounded-md appearance-none bg-transparent pl-2 pr-4 py-1">
            <DatePicker
              value={selectedDate}

              dateFormat="dd/MM/yyyy"
              className="outline-none text-sm w-[110px] text-center px-4 pt-2 pb-1"
              
            />
            <FaRegCalendarAlt className="ml-2 text-orange-500 pr-0" />
            
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Chọn môn học</label>
          
           <div className="relative border border-black rounded flex items-center">
              <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="appearance-none bg-transparent px-4 py-2 ">
                <option value="">Chọn tất cả</option>
                <option value="Toán">Toán</option>
                <option value="Văn">Văn</option>
                <option value="Lý">Lý</option>
                <option value="Hóa">Hóa</option>
                <option value="Anh">Anh</option>
              </select>
              <div className="w-px bg-black self-stretch"></div>
              <label className="px-2">
                <FaChevronDown className="text-orange-500 w-4 h-4" />
              </label>
            </div>
          
        </div>

        <div className="flex flex-col">
          <br />
          <button
            onClick={filterClasses}
            className="px-4 py-2 mt-1 bg-[#F0F3F6] text-[#373839] rounded focus:bg-[#FF7506] focus:text-white font-semibold"
          >
            Lọc kết quả
          </button>
        </div>

        {/* Nút Tất cả khóa học */}
        <div className="flex flex-col">
          <br />
          <button
            onClick={() => setFilteredClasses(classes)}
            className="px-4 py-2 mt-1 bg-[#F0F3F6] text-[#373839] rounded focus:bg-[#FF7506] focus:text-white font-semibold"
          >
            Tất cả khóa học
          </button>
        </div>

        <div className="flex flex-1 justify-end items-center py-2">
          <div className="relative w-[240px] mt-7">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="pl-10 pr-4 py-2 rounded-3xl bg-gray-100 w-full focus:outline-none text-sm font-normal italic"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Danh sách lớp học */}
      <div className="overflow-x-auto p-4">
        <table className="w-full border-separate border-spacing-0 border-collapse border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <thead className="bg-orange-500 text-white">
            <tr>
              {[
                { key: 'id', label: 'Mã lớp' },
                { key: 'subject', label: 'Môn học' },
                { key: 'time', label: 'Thời gian' },
                { key: 'teacher', label: 'Giảng viên' },
                { key: 'status', label: 'Trạng thái' },
                { key: 'info', label: '' },
                
              ].map(({ key, label }) => (
                <th key={key} className="px-4 py-2 text-left whitespace-nowrap font-mulish font-[550]">
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => (
                <tr key={cls.id} className="odd:bg-gray-100 even:bg-white">
                  <td className="px-4 py-2 text-left font-source-sans">{cls.id}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{cls.subject}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{cls.time}</td>
                  
                  <td className="px-4 py-2 text-left font-source-sans">{cls.teacher}</td>
                  {/* <td className="px-4 py-2 text-left font-source-sans">{cls.status}</td> */}
                  <td
                    className={`px-4 py-2 text-left font-source-sans ${cls.status === "upcoming"
                        ? "text-red-500 italic"
                        : cls.status === "completed"
                          ? "text-green-500 italic"
                          : "text-gray-500 italic"
                      }`}
                  >
                    {cls.status === "upcoming"
                      ? "Chưa bắt đầu"
                      : cls.status === "completed"
                        ? "Đã hoàn thành"
                        : "Chưa hoàn thành"}
                  </td>
                  <td className="px-4 py-2 text-left font-source-sans">
                    <button className="text-orange-500">
                      <img src="/icon/fi-info.png" alt="Exclamation" className="w-[24px] h-[24px] mt-2" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                <td className="px-4 py-2 text-center text-gray-700">
                  Không có lớp học nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* Phân trang */}
      <div className="flex items-center justify-between pt-6 pb-4">
        <div className="text-sm text-gray-600 flex items-center space-x-2">
          <span className="italic">Hiển thị</span>
          <select
            className="w-16 h-8 border border-orange-500 rounded-md text-center focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="italic">hàng trong mỗi trang</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"
          >
            &#10094;
          </button>

          <button className="px-2 h-6 w-6 mx-[2px] rounded-full bg-orange-500 text-white">
            1
          </button>
          <button className="px-2 h-6 w-6 mx-[2px] rounded-full text-gray-600 hover:bg-gray-200">
              2
          </button>
  
          <button
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"
          >
            &#10095;
          </button>
        </div>
      </div>
      

      <Outlet />
    </div>
  );
};

export default ClassList;
