import React, { useState } from 'react';
import { Info } from 'lucide-react';
import DatePicker from '../../../../components/DatePicker';
import Dropdown from '../../../../components/Dropdown';

interface DropdownOption {
  id: number;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onChange: (selected: DropdownOption) => void;
  value?: string;
}

interface Semester {
  name: string;
  startDate: string;
  endDate: string;
}
const AddSchoolYear: React.FC = ({}) => {
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2021);
  const [inheritData, setInheritData] = useState(false);
  const [inheritYear, setInheritYear] = useState<number | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([{ name: 'Học kì I', startDate: '2020-09-05', endDate: '2021-01-02' }]);

  const yearOptions: DropdownOption[] = Array.from({ length: 50 }, (_, i) => ({
    id: 2000 + i,
    value: (2000 + i).toString(),
  }));

  const updateSemesterField = (index: number, field: keyof Semester, value: string) => {
    setSemesters((prev) => prev.map((semester, i) => (i === index ? { ...semester, [field]: value } : semester)));
  };

  const addSemester = () => {
    setSemesters((prev) => [...prev, { name: `Học kì ${prev.length + 1}`, startDate: '', endDate: '' }]);
  };

  const removeSemester = (index: number) => {
    setSemesters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (endYear < startYear) {
      alert('Năm kết thúc không được nhỏ hơn năm bắt đầu.');
      return;
    }

    for (const semester of semesters) {
      if (new Date(semester.endDate) < new Date(semester.startDate)) {
        alert(`Ngày kết thúc của học kì ${semester.name} không hợp lệ.`);
        return;
      }
    }

    alert('Lưu thành công!');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="p-6 bg-white shadow-lg rounded-2xl w-full h-full border border-gray-300">
        <h2 className="text-2xl font-bold mb-6">Thêm niên khóa mới</h2>

        <div className="flex justify-between items-start space-x-4 mb-6">
          <div>
            <label className="text-gray-800 font-medium block">Niên khóa:</label>
            <div className="flex items-center space-x-2 mt-2">
              <Dropdown options={yearOptions} />
              <span className="text-gray-800 font-medium">đến</span>
              <Dropdown options={yearOptions} />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inheritData}
                onChange={() => setInheritData(!inheritData)}
                className="form-checkbox border-orange-500 w-6 h-6"
              />
              <span className="text-gray-800 font-medium">Kế thừa dữ liệu:</span>
              <Dropdown options={yearOptions} />
            </div>
            <div className="flex items-start space-x-2 text-sm text-gray-500 mt-2">
              <Info className="w-5 h-5 text-orange-500 mt-0.5" />
              <span>
                Dữ liệu được kế thừa bao gồm:
                <br />- Thông tin học viên và Danh sách lớp học
                <br />- Thông tin môn học
                <br />- Phân công giảng dạy
              </span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-300" />

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">Cài đặt thời gian</h3>
          {semesters.map((semester, index) => (
            <div key={index} className="flex space-x-4 items-center mb-4">
              <button
                onClick={() => removeSemester(index)}
                className={`w-6 h-6 flex items-center justify-center ${
                  semesters.length === 1 ? 'bg-gray-200' : 'bg-gray-400 hover:bg-gray-600'
                } rounded-full`}
                disabled={semesters.length === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>

              <label className="text-gray-700 font-medium">Tên học kì:</label>
              <input
                type="text"
                value={semester.name}
                onChange={(e) => updateSemesterField(index, 'name', e.target.value)}
                className="border p-1 rounded w-80"
                placeholder="Nhập tên học kì"
              />

              <label className="text-gray-700">Từ</label>
              <DatePicker
                value={semester.startDate}
                onChange={(value) => updateSemesterField(index, 'startDate', value || '')}
                placeholder="Chọn ngày bắt đầu"
                className="w-50"
              />

              <label className="text-gray-700">đến</label>
              <DatePicker
                value={semester.endDate}
                onChange={(value) => updateSemesterField(index, 'endDate', value || '')}
                placeholder="Chọn ngày kết thúc"
                className="w-50"
              />
            </div>
          ))}

          <button onClick={addSemester} className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center bg-blue-400 rounded-full hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
              </svg>
            </div>
            <span className="text-blue-500 font-semibold">Thêm học kì mới</span>
          </button>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded border border-gray-300 hover:bg-gray-300">Hủy</button>
          <button onClick={handleSave} className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSchoolYear;
