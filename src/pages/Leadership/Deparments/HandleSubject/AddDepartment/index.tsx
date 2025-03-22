import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Down from '../../../../../assets/images/caret_down.png';
import { TeacherOption, Departments, FormData } from './type';

// Departments data
const demo: Departments[] = [{ value: 'anh văn' }, { value: 'vật lý' }, { value: 'toán' }];

// teacher list data
const teacherOptions: TeacherOption[] = [
  { value: 'teacher1', label: 'Giáo viên 1' },
  { value: 'teacher2', label: 'Giáo viên 2' },
  { value: 'teacher3', label: 'Giáo viên 3' },
];

const AddDepartmentsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    department: '',
    head: '',
  });

  const [isAddingDepartments, setIsAddingDepartments] = useState<boolean>(false);
  const [newDepartments, setNewDepartments] = useState<string>('');
  const [selectedDepartments, setSelectedDepartments] = useState<Departments | null>(null);
  const [filteredDepartmentss, setFilteredDepartmentss] = useState<Departments[]>([]);

  // State error management
  const [errors, setErrors] = useState({
    department: '',
    head: '',
    selectedDepartments: '',
  });

  // Filter data based on input
  useEffect(() => {
    if (newDepartments.trim() === '') {
      setFilteredDepartmentss([]);
    } else {
      const filtered = demo.filter((item) => item.value.toLowerCase().includes(newDepartments.toLowerCase()));
      setFilteredDepartmentss(filtered);
    }
  }, [newDepartments]);

  // Select a Departments from the suggested list
  const handleDepartmentsSelect = (Departments: Departments) => {
    setSelectedDepartments(Departments);
    setNewDepartments(Departments.value);
    setIsAddingDepartments(false);
    setFilteredDepartmentss([]);
    setErrors({ ...errors, selectedDepartments: '' });
  };

  // Open new course entry box
  const handleAddDepartmentsClick = () => {
    setIsAddingDepartments(true);
    setNewDepartments('');
    setFilteredDepartmentss([]);
  };

  // Close the new course entry box
  const handleAddDepartmentsClose = () => {
    setIsAddingDepartments(false);
    setNewDepartments('');
    setFilteredDepartmentss([]);
  };

  const handleNewDepartmentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDepartments(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {
      department: '',
      head: '',
      selectedDepartments: '',
    };

    // check validate
    if (formData.department.trim() === '') {
      newErrors.department = 'Vui lòng nhập Tên tổ - Bộ môn';
    }
    if (formData.head.trim() === '') {
      newErrors.head = 'Vui lòng chọn Trưởng tổ - Bộ môn';
    }
    if (!selectedDepartments) {
      newErrors.selectedDepartments = 'Vui lòng chọn Môn học';
    }

    setErrors(newErrors);

    // then process the submit
    if (!newErrors.department && !newErrors.head && !newErrors.selectedDepartments) {
      console.log(formData, selectedDepartments);
      alert('Form đã được gửi thành công!');
    }
  };

  return (
    <div className="max-w-3/4 mx-auto p-6">
      <h1 className="text-[28px] font-medium mb-8 text-center">Thêm Tổ - Bộ môn mới</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Department Field */}
        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold">
              Tổ - Bộ môn
              <span className="text-red-500 ml-0.5">*</span>
            </span>
            <input
              type="text"
              className="w-4/5 px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={formData.department}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, department: e.target.value });
                setErrors({ ...errors, department: '' });
              }}
            />
          </div>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>

        {/* Department Head Field */}
        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold">
              Trưởng tổ - Bộ môn
              <span className="text-red-500 ml-0.5">*</span>
            </span>
            <div className="relative w-4/5">
              <select
                className="w-full px-3 py-2 bg-gray-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={formData.head}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setFormData({ ...formData, head: e.target.value });
                  setErrors({ ...errors, head: '' });
                }}
              >
                <option value="">Chọn giáo viên</option>
                {teacherOptions.map((teacher) => (
                  <option key={teacher.value} value={teacher.value}>
                    {teacher.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <img src={Down} alt="Dropdown Icon" className="w-8 h-8" />
              </div>
            </div>
          </div>
          {errors.head && <p className="text-red-500 text-sm mt-1">{errors.head}</p>}
        </div>

        <hr />

        {/* Departmentss List Section */}
        <div className="space-y-4">
          <h2 className="text-[#CC5C00] font-bold text-[18px]">Danh sách môn học</h2>

          {isAddingDepartments ? (
            <div className="relative flex items-center gap-2">
              <span
                onClick={handleAddDepartmentsClose}
                className="flex cursor-pointer items-center justify-center w-6 h-6 rounded-full border border-current"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14" />
                </svg>
              </span>
              <input
                type="text"
                value={newDepartments}
                onChange={handleNewDepartmentsChange}
                placeholder="Nhập môn học mới"
                className="w-[233px] h-10 px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                autoFocus
              />
              {/* Show list of suggestions */}
              {filteredDepartmentss.length > 0 ? (
                <ul className="absolute left-7 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-[233px]">
                  {filteredDepartmentss.map((Departments, index) => (
                    <li key={index} onClick={() => handleDepartmentsSelect(Departments)} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                      {Departments.value}
                    </li>
                  ))}
                </ul>
              ) : (
                newDepartments && (
                  <div className="absolute left-7 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-[233px] px-3 py-2 text-gray-500">
                    Không tìm thấy môn học phù hợp
                  </div>
                )
              )}
            </div>
          ) : (
            <div>
              {selectedDepartments ? (
                <div className="flex items-center gap-2 h-10">
                  <button type="button" onClick={handleAddDepartmentsClick} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current transition-colors bg-blue-700">
                      <svg fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                      </svg>
                    </span>
                    <span className="text-base font-bold">{selectedDepartments.value}</span>
                  </button>
                </div>
              ) : (
                <button type="button" onClick={handleAddDepartmentsClick} className="flex items-center gap-2 text-gray-500 hover:text-blue-700 group">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current transition-colors group-hover:bg-blue-700">
                    <svg className="transition-colors group-hover:stroke-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14" />
                    </svg>
                  </span>
                  <span className="text-base font-bold h-10 pt-2">Thêm môn học mới</span>
                </button>
              )}
              {errors.selectedDepartments && <p className="text-red-500 text-sm mt-1">{errors.selectedDepartments}</p>}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 w-1/4 mx-auto">
          <button type="button" className="flex-1 font-bold text-lg px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors h-[52px]">
            Huỷ
          </button>
          <button type="submit" className="flex-1 font-bold text-lg px-4 py-2 bg-[# FF7506] text-white rounded-md transition-colors h-[52px]">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartmentsForm;
