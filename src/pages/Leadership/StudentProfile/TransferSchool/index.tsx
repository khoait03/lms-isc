import { useState } from 'react';
import Dropdown from '../../../../components/Dropdown';
import { Link } from 'react-router-dom';
import { FaPlus, FaEye, FaAngleDown, FaAngleUp, FaSearch } from 'react-icons/fa';

interface Student {
  id: string;
  name: string;
  dob: string; // Ngày sinh có thể để dạng string (dd/MM/yyyy)
  gender: 'Nam' | 'Nữ'; // Giới tính chỉ có 2 giá trị cố định
  from: string; // Trường cũ
  semester: string; // Học kỳ
  grade: number; // Lớp học
  transferDate: string; // Ngày chuyển trường
}
// Giả lập dữ liệu
const students: Student[] = [
  {
    id: '20206A',
    name: 'Trần Trung',
    dob: '10/10/2002',
    gender: 'Nam',
    from: 'THCS A',
    semester: 'Học kỳ I',
    grade: 6,
    transferDate: '12/12/2020',
  },
  {
    id: '20206B',
    name: 'Nguyễn Ngọc Tuyết',
    dob: '10/10/2002',
    gender: 'Nữ',
    from: 'THCS A',
    semester: 'Học kỳ I',
    grade: 7,
    transferDate: '12/12/2020',
  },
  {
    id: '20206C',
    name: 'Nguyễn Ngọc Ki',
    dob: '10/10/2000',
    gender: 'Nữ',
    from: 'THCS D',
    semester: 'Học kỳ II',
    grade: 8,
    transferDate: '12/12/2018',
  },
  {
    id: '20206D',
    name: 'Nguyễn Ngọc Nga',
    dob: '10/10/2005',
    gender: 'Nữ',
    from: 'THCS V',
    semester: 'Học kỳ I',
    grade: 7,
    transferDate: '12/12/2020',
  },
  {
    id: '20206E',
    name: 'Nguyễn Ngọc Vip',
    dob: '10/10/2002',
    gender: 'Nữ',
    from: 'THCS A',
    semester: 'Học kỳ I',
    grade: 7,
    transferDate: '12/12/2022',
  },
  {
    id: '20206F',
    name: 'Nguyễn Ngọc Tù',
    dob: '10/10/2022',
    gender: 'Nam',
    from: 'THCS S',
    semester: 'Học kỳ II',
    grade: 7,
    transferDate: '12/12/2019',
  },
  {
    id: '20206G',
    name: 'Nguyễn Ngọc d',
    dob: '10/10/2002',
    gender: 'Nữ',
    from: 'THCS A',
    semester: 'Học kỳ I',
    grade: 7,
    transferDate: '12/12/2022',
  },
  {
    id: '20206M',
    name: 'Nguyễn Ngọc z',
    dob: '10/10/2022',
    gender: 'Nam',
    from: 'THCS S',
    semester: 'Học kỳ II',
    grade: 7,
    transferDate: '12/12/2019',
  },
  {
    id: '20206N',
    name: 'Nguyễn Ngọc z',
    dob: '10/10/2022',
    gender: 'Nam',
    from: 'THCS S',
    semester: 'Học kỳ II',
    grade: 7,
    transferDate: '12/12/2019',
  },
];

const TransferSchool = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfigs, setSortConfigs] = useState<{ [key in keyof Student]?: 'asc' | 'desc' }>({});

  const handleSort = (key: keyof Student) => {
    setSortConfigs((prev) => ({
      ...prev,
      [key]: prev[key] === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Sắp xếp dữ liệu theo cột đã chọn
  const sortedData = [...students].sort((a, b) => {
    return Object.entries(sortConfigs).reduce((acc, [key, direction]) => {
      if (acc !== 0) return acc; // Nếu trước đó đã có sự khác biệt, không cần tiếp tục sắp xếp
      const valueA = a[key as keyof Student];
      const valueB = b[key as keyof Student];

      // Sắp xếp theo kiểu Date
      if (key === 'dob' || key === 'transferDate') {
        const parseDate = (date: any) => new Date(date.split('/').reverse().join('/')).getTime();
        return direction === 'asc' ? parseDate(valueA) - parseDate(valueB) : parseDate(valueB) - parseDate(valueA);
      }

      // Sắp xếp theo String
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      // Sắp xếp theo Number
      return direction === 'asc' ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number);
    }, 0);
  });

  const filteredData = sortedData.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Tính toán phân trang
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(Math.min(Number(e.target.value) || 5, 20));
  };

  return (
    <div className=" px-5 ">
      {/* Phần tiêu đề */}
      <div className="flex items-center space-x-5 mb-9">
        <Link to="/leadership/student/profile" className="text-gray-300 text-[18px] font-mulish font-semibold hover:text-gray-500">
          Hồ sơ học viên
        </Link>
        <span className="text-orange-500 font-mulish text-2xl">{'>'}</span>
        <h1 className="text-[40px] font-bold font-mulish">Tiếp nhận chuyển trường</h1>
      </div>

      {/* Dropdown + Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Dropdown */}
        <Dropdown
          options={[
            { id: 1, value: '2020 - 2021' },
            { id: 2, value: '2021 - 2022' },
            { id: 3, value: '2022 - 2023' },
            { id: 4, value: '2023 - 2024' },
          ]}
        />

        {/* Nút "Thêm mới" */}
        <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md">
          <FaPlus size={14} />
          <span>Thêm mới</span>
        </button>
      </div>
      <div className="bg-white shadow-[0px_0px_2px_rgba(0,0,0,0.15)] rounded-lg px-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-22px font-mulish font-600">Danh sách chuyển trường</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="pl-12 pr-4 py-2 rounded-3xl bg-gray-100 w-[350px] focus:outline-none text-sm font-normal italic"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
          </div>
        </div>

        {/* Bảng hiển thị dữ liệu */}
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse border border-gray-200">
            {/* Header */}
            <thead className="bg-orange-500 text-white">
              <tr>
                {[
                  { key: 'id', label: 'Mã học viên' },
                  { key: 'name', label: 'Tên học viên' },
                  { key: 'dob', label: 'Ngày sinh' },
                  { key: 'gender', label: 'Giới tính' },
                  { key: 'from', label: 'Chuyển từ' },
                  { key: 'semester', label: 'Học kỳ chuyển' },
                  { key: 'grade', label: 'Khối' },
                  { key: 'transferDate', label: 'Ngày chuyển' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-4 py-2 text-left whitespace-nowrap cursor-pointer font-mulish font-[550]"
                    onClick={() => handleSort(key as keyof Student)}
                  >
                    <span className="flex items-center">
                      {label}
                      <div className="ml-1 flex flex-col">
                        <FaAngleUp
                          className={`cursor-pointer text-xs ${sortConfigs[key as keyof Student] === 'asc' ? 'text-black' : 'text-gray-300'}`}
                        />
                        <FaAngleDown
                          className={`cursor-pointer text-xs -mt-1 ${sortConfigs[key as keyof Student] === 'desc' ? 'text-black' : 'text-gray-300'}`}
                        />
                      </div>
                    </span>
                  </th>
                ))}
                <th className="px-4 py-2 font-normal text-left"></th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {currentItems.map((student) => (
                <tr key={student.id} className="odd:bg-gray-100 even:bg-white">
                  <td className="px-4 py-2 text-left font-source-sans">{student.id}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{student.name}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{student.dob}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{student.gender}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{student.from}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{student.semester}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{student.grade}</td>
                  <td className="px-4 py-2 text-left font-source-sans">{student.transferDate}</td>
                  <td className="px-4 py-2 text-left font-source-sans">
                    <button className="text-orange-500">
                      <FaEye size={32} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <div className="flex items-center justify-between pt-6 pb-4">
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
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"
            >
              &#10094;
            </button>

            {[...Array(pageCount)].map((_, i) =>
              i < 2 || i > pageCount - 3 || Math.abs(i + 1 - currentPage) < 2 ? (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 h-6 w-6 mx-[2px] rounded-full ${
                    currentPage === i + 1 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ) : (i === 2 && currentPage > 3) || (i === pageCount - 3 && currentPage < pageCount - 2) ? (
                <span key={i} className="px-3 mx-1">
                  ...
                </span>
              ) : null,
            )}

            <button
              disabled={currentPage === pageCount}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded mx-1"
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferSchool;
