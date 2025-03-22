
import { useState } from 'react';
import { SearchIcon, Edit2Icon, Trash2Icon, ArrowUpDownIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import GradeSelector from './grade-selector';
import { useNavigate } from 'react-router';

interface Course {
  id: string;
  code: string;
  name: string;
  type: string;
  creditsHK1: number;
  creditsHK2: number;
}

export default function ManageSubjects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Course | null; direction: 'asc' | 'desc' | null }>({
    key: null,
    direction: null,
  });
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([
    { id: '1', code: 'KHTN', name: 'Ngữ Văn', type: 'Môn bắt buộc', creditsHK1: 4, creditsHK2: 4 },
    { id: '2', code: 'VHXH', name: 'Toán', type: 'Môn tự chọn', creditsHK1: 4, creditsHK2: 4 },
    { id: '3', code: 'AV', name: 'Anh Văn', type: 'Môn bắt buộc', creditsHK1: 4, creditsHK2: 4 },
    { id: '4', code: 'AV', name: 'Anh Văn', type: 'Môn bắt buộc', creditsHK1: 4, creditsHK2: 4 },
    { id: '5', code: 'VHXH', name: 'Giáo dục công dân', type: 'Môn tự chọn', creditsHK1: 4, creditsHK2: 4 },
    { id: '6', code: 'KHTN', name: 'Sinh học', type: 'Môn bắt buộc', creditsHK1: 4, creditsHK2: 4 },
    { id: '7', code: 'VHXH', name: 'Hoá học', type: 'Môn tự chọn', creditsHK1: 4, creditsHK2: 4 },
    { id: '8', code: 'AV', name: 'Anh Văn', type: 'Môn bắt buộc', creditsHK1: 4, creditsHK2: 4 },
    { id: '9', code: 'VHXH', name: 'Giáo dục công dân', type: 'Môn tự chọn', creditsHK1: 4, creditsHK2: 4 },
    { id: '10', code: 'KHTN', name: 'Sinh học', type: 'Môn bắt buộc', creditsHK1: 4, creditsHK2: 4 },
    { id: '11', code: 'VHXH', name: 'Hoá học', type: 'Môn tự chọn', creditsHK1: 4, creditsHK2: 4 },
    { id: '12', code: 'AV', name: 'Anh Văn', type: 'Môn bắt buộc', creditsHK1: 4, creditsHK2: 4 },
  ]);

  const filteredCourses = courses.filter(
    (course) => course.name.toLowerCase().includes(searchQuery.toLowerCase()) || course.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );


  // Hàm sắp xếp
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortConfig.key) {
      const valueA = a[sortConfig.key].toString().toLowerCase();
      const valueB = b[sortConfig.key].toString().toLowerCase();

      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Lấy danh sách môn học sau khi sắp xếp và phân trang
  const pageCount = Math.ceil(sortedCourses.length / itemsPerPage);
  const paginatedCourses = sortedCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Xử lý khi nhấn vào tiêu đề cột để sắp xếp
  const handleSort = (key: keyof Course) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Hàm xóa khóa học theo id
  const handleDelete = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const [isCheckedCourses, setIsCheckedCourses] = useState(false);
  const handleCheckboxChange = () => {
    if (selectedCourses.length === paginatedCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(paginatedCourses.map((c) => c.id));
    }
  };

  const handleCheckboxChangeCourse = (courseId: string) => {
    setSelectedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]));
  };

  // Cập nhật isChecked dựa trên selectedCourses
  const isChecked = paginatedCourses.length > 0 && paginatedCourses.every((course) => selectedCourses.includes(course.id));

  return (
    <div className="w-full mx-auto font-sans relative -top-[100px] mb-[-100px]">
      <div className="relative -top-[20px] w-[80%]">
        <GradeSelector />
      </div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-medium">Môn học</h2>
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="pl-10 pr-4 py-2 border rounded-[50px] w-full outline-none bg-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="rounded-md shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#ff7a45] text-white">
              <th className="p-3 text-left font-normal">
                <label className="ps-3 flex items-center cursor-pointer">
                  <input type="checkbox" className="hidden" checked={isChecked} onChange={handleCheckboxChange} />
                  <div
                    className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-blue-500'
                      }`}
                  >
                    {isChecked && (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20.285 6.295l-11.26 11.295-5.322-5.295-1.417 1.417 6.739 6.74 12.68-12.715z" />
                      </svg>
                    )}
                  </div>
                </label>
              </th>
              {['code', 'name', 'type'].map((key) => (
                <th key={key} className="p-3 text-left font-normal cursor-pointer" onClick={() => handleSort(key as keyof Course)}>
                  <div className="flex items-center gap-2">
                    {key === 'code' && 'Mã môn học'}
                    {key === 'name' && 'Tên môn học'}
                    {key === 'type' && 'Loại môn'}
                    <ArrowUpDownIcon className="h-4 w-4" />
                  </div>
                </th>
              ))}
              <th className="p-3 text-center font-normal ">Số tiết HK1</th>
              <th className="p-3 text-center font-normal">Số tiết HK2</th>
              <th className="p-3 w-24"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course, index) => (
              <tr key={course.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <input
                  type="checkbox"
                  className="w-6 h-6 border-2 rounded-md  ml-6 mt-4 "
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleCheckboxChangeCourse(course.id)}
                />

                <td className="p-3 ">{course.code}</td>
                <td className="p-3 ">{course.name}</td>
                <td className="p-3 ">{course.type}</td>
                <td className="p-3 text-center">{course.creditsHK1}</td>
                <td className="p-3 text-center">{course.creditsHK2}</td>
                <td className="p-3 text-center">
                  <button onClick={() => navigate(`edit/${course.id}`)} className="text-orange-500 hover:text-orange-700 mr-2">
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>
                  <button className="text-orange-500 hover:text-orange-700" onClick={() => handleDelete(course.id)}>
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between pt-10">
        <div className="text-sm text-gray-600 flex items-center space-x-2">
          <span className="italic">Hiển thị</span>
          <input
            type="number"
            min={5}
            max={20}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-12 h-6 border border-orange-500 rounded-md text-center focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <span className="italic">hàng trong mỗi trang</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            &lt;
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 rounded ${currentPage === page ? 'bg-[#ff7a45] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
          <span className="px-2">...</span>
          <button onClick={() => setCurrentPage(100)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
            100
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
