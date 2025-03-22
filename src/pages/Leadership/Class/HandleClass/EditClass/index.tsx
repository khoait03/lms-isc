/**
 * AddClassForm Component
 *
 * This component renders a form for adding a new class. It includes fields for school year, grade, class name,
 * number of students, class type, teacher, and a description. It also allows the user to add and remove subjects
 * from the class.
 *
 * @component
 * @example
 * return (
 *   <AddClassForm />
 * )
 */

import React, { useState, FormEvent } from 'react';
import Dropdown from '../../../../../components/Dropdown';
import { Subject, ClassData } from '../AddClass/type';

const EditClass: React.FC = () => {
  const [formData, setFormData] = useState<ClassData>({
    schoolYear: '2020-2021',
    grade: 'Khối 6',
    className: '6A1',
    numberOfStudents: '45',
    classType: 'Lớp chuyên ban',
    teacher: 'Trần Thị B',
    note: 'Lorem ipsum dolor sit amet...',
  });

  const [subjects, setSubjects] = useState<Subject[]>([{ value: 'Toán' }, { value: 'Hóa' }, { value: 'Sample' }]);
  const availableSubjects: string[] = ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh', 'Sử', 'Địa', 'Tin học', 'GDCD'];
  const [inheritYear, setInheritYear] = useState<string>('2015-2016');
  const [errors, setErrors] = useState({
    className: '',
    numberOfStudents: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dropdown options
  const schoolYears: any = ['2020-2021', '2021-2022', '2022-2023', '2023-2024'].map((year, index) => ({
    id: index,
    value: year,
  }));
  const grades: any = ['Khối 6', 'Khối 7', 'Khối 8', 'Khối 9'].map((grade, index) => ({
    id: index,
    value: grade,
  }));
  const classTypes: any = ['Lớp chuyên ban', 'Lớp cá nhân', 'Lớp thông thường'].map((type, index) => ({
    id: index,
    value: type,
  }));
  const teachers: any = ['Trần Thị B', 'Nguyễn Văn A', 'Lê Thị C'].map((teacher, index) => ({
    id: index,
    value: teacher,
  }));
  const inheritYears: any = ['2015-2016', '2016-2017', '2017-2018', '2018-2019'].map((year, index) => ({
    id: index,
    value: year,
  }));

  // Handle change in form fields
  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // Filter available subjects
  const filteredSubjects = availableSubjects.filter((subject) => !subjects.some((s) => s.value === subject));

  // Add a subject to the list
  const handleAddSubject = (subject: string) => {
    setSubjects([...subjects, { value: subject }]);
    setIsDropdownOpen(false);
  };

  // Remove a subject from the list
  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      className: '',
      numberOfStudents: '',
    };

    if (formData.className.trim() === '') {
      newErrors.className = 'Vui lòng nhập Tên lớp';
    }
    if (formData.numberOfStudents.trim() === '' || isNaN(Number(formData.numberOfStudents))) {
      newErrors.numberOfStudents = 'Vui lòng nhập số lượng học viên hợp lệ';
    }

    setErrors(newErrors);

    if (!newErrors.className && !newErrors.numberOfStudents) {
      console.log(formData, subjects, inheritYear);
      alert('Form đã được gửi thành công!');
    }
  };

  return (
    <div className=" mx-auto max-h-[600px] overflow-y-auto p-2">
      <h1 className="text-2xl font-medium mb-6 text-center">Sửa lớp học</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-[#CC5C00] font-bold text-lg mb-4">Thông tin chung</div>
        <div className="flex space-x-14">
          {/* School Year */}
          <div className="flex items-start w-1/3">
            <span className="block text-sm font-semibold w-1/3 pt-2">Niên khóa:</span>
            <Dropdown options={schoolYears} width="medium" />
          </div>
          {/* Grade */}
          <div className="flex-1 flex items-start">
            <span className="block text-sm font-semibold w-1/4 pt-1">
              Khóa - Khối:* <span className="text-red-500 ml-1">*</span>
            </span>
            <Dropdown options={grades} width="medium" />
          </div>
        </div>
        {/* Class Name */}
        <div className="flex items-start">
          <span className="block text-sm font-semibold w-1/3 pt-2">
            Tên lớp:* <span className="text-red-500 ml-1">*</span>
          </span>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={(e) => handleChange('className', e.target.value)}
            className="w-2/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF7506]"
          />
        </div>
        {errors.className && <p className="text-red-500 text-xs ml-1/3 mt-1">{errors.className}</p>}

        {/* Number of Students */}
        <div className="flex items-start">
          <span className="block text-sm font-semibold w-1/3 pt-2">
            Số lượng học viên:* <span className="text-red-500 ml-1">*</span>
          </span>
          <input
            type="number"
            name="numberOfStudents"
            value={formData.numberOfStudents}
            onChange={(e) => handleChange('numberOfStudents', e.target.value)}
            className="w-2/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF7506]"
          />
        </div>
        {errors.numberOfStudents && <p className="text-red-500 text-xs ml-1/3 mt-1">{errors.numberOfStudents}</p>}

        {/* Class Type */}
        <div className="flex items-start">
          <span className="block text-sm font-semibold w-1/3 pt-2">
            Phân loại lớp:* <span className="text-red-500 ml-1">*</span>
          </span>
          <Dropdown options={classTypes} width="medium" />
        </div>

        {/* Teacher */}
        <div className="flex items-start">
          <span className="block text-sm font-semibold w-1/3 pt-2">Giáo viên chủ nhiệm:</span>
          <Dropdown options={teachers} width="medium" />
        </div>

        {/* Note */}
        <div className="flex items-start">
          <span className="block text-sm font-semibold w-1/3 mb-2">Mô tả:</span>
          <textarea
            name="note"
            value={formData.note}
            onChange={(e) => handleChange('note', e.target.value)}
            className="w-2/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF7506] h-20"
          />
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="space-y-4">
          <h2 className="text-[#CC5C00] font-bold text-[18px]">Danh sách môn học</h2>
          <div className="mb-4 flex items-center">
            <input type="checkbox" className="mr-2 w-4 h-4 accent-blue-500" />
            <span className="block text-sm font-semibold">Kế thừa dữ liệu:</span>
            <div className="ml-2">
              <Dropdown width="medium" options={inheritYears} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(index)}
                  className="flex items-center justify-center w-6 h-6 rounded-full border border-blue-500 text-blue-500 
                             hover:bg-blue-500 hover:text-white transition-colors"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span>{subject.value}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 group"
          >
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full border border-blue-500 
                     transition-colors group-hover:bg-blue-500 group-hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14" />
              </svg>
            </span>
            <span className="text-base font-bold">Thêm môn học mới</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 bg-white border border-gray-300 shadow-md rounded-md w-48">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleAddSubject(subject)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    {subject}
                  </button>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">Không còn môn nào để thêm</p>
              )}
            </div>
          )}
        </div>
        {/* ----------------------------------------------- */}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 w-1/3 mx-auto">
          <button type="button" className="flex-1 text-lg font-semibold px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
            Huỷ
          </button>
          <button
            type="submit"
            className="flex-1 text-lg font-semibold px-4 py-2 bg-[#FF7506] text-white rounded-md hover:bg-[#e66b05] transition-colors"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClass;
