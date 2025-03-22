import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Down from '../../../../../assets/images/caret_down.png';
import Trash from '../../../../../assets/images/fi_trash-2.png';
import Cancel from '../../../../../assets/images/fi_x-cancel.png';
import { TeacherOption, Departments, FormData } from './type';

const EditDeparmentsForm: React.FC = ({ data }: any) => {
  const navigate = useNavigate();
  // Data demo
  const teacherOptions: TeacherOption[] = [
    { value: 'teacher1', label: 'Giáo viên 1' },
    { value: 'teacher2', label: 'Giáo viên 2' },
    { value: 'teacher3', label: 'Giáo viên 3' },
  ];

  const departmentList = [
    { name: 'vl01', head: 'Vật ý 9' },
    { name: 'vl03', head: 'Hóa học 10' },
    { name: 'sh01', head: 'Sinh học 10' },
    { name: 'vl02', head: 'Vật ý 10' },
    { name: 'vl06', head: 'Hóa học 11' },
    { name: 'sh03', head: 'Sinh học 11' },
  ];

  const dataDepartmentDetail = [{ ToBoMon: 'Văn hóa xã hội', value: 'teacher1', departmentList: ['anh văn', 'vật lý', 'toán'] }];

  const [formData, setFormData] = useState<FormData>({
    department: '',
    head: '',
  });

  // State
  const [newDepartments, setNewDepartments] = useState<string>('');
  const [selectedDepartmen, setSelectedDepartmen] = useState<Departments | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // State checkbox
  const [selectedDepartmens, setSelectedDepartmens] = useState<string[]>([]);
  const checkAllRef = useRef<HTMLInputElement>(null);

  // State errors
  const [errors, setErrors] = useState({
    department: '',
    head: '',
    selectedDepartmen: '',
  });

  const handleClick = () => {
    navigate('/leadership/data-declaration/departments');
  };

  // update formData from dataDepartmentsDetail
  useEffect(() => {
    const detail = dataDepartmentDetail[0];
    if (detail) {
      setFormData({
        department: detail.ToBoMon,
        head: detail.value,
      });
    }
  }, []);

  // indeterminate for checkbox "Check All"
  useEffect(() => {
    if (checkAllRef.current) {
      checkAllRef.current.indeterminate = selectedDepartmens.length > 0 && selectedDepartmens.length < departmentList.length;
    }
  }, [selectedDepartmens]);

  // open modal
  const handleAddDepartmentsClick = () => {
    setIsModalOpen(true);
    setNewDepartments('');
  };

  // close modal
  const handleAddDepartmentsClose = () => {
    setIsModalOpen(false);
    setNewDepartments('');
  };

  //submit form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      department: '',
      head: '',
      selectedDepartmen: '',
    };

    if (formData.department.trim() === '') {
      newErrors.department = 'Vui lòng nhập Tên tổ - Bộ môn';
    }
    if (formData.head.trim() === '') {
      newErrors.head = 'Vui lòng chọn Trưởng tổ - Bộ môn';
    }
    if (!selectedDepartmen) {
      newErrors.selectedDepartmen = 'Vui lòng chọn Môn học';
    }

    setErrors(newErrors);

    if (!newErrors.department && !newErrors.head && !newErrors.selectedDepartmen) {
      console.log(formData, selectedDepartmen);
      alert('Form đã được gửi thành công!');
    }
  };

  // checkbox row
  const handleRowCheckChange = (name: string) => {
    setSelectedDepartmens((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  // checkbox Check All
  const isAllChecked = departmentList.length > 0 && selectedDepartmens.length === departmentList.length;
  const handleCheckAllChange = () => {
    if (isAllChecked) {
      setSelectedDepartmens([]);
    } else {
      setSelectedDepartmens(departmentList.map((departmentList) => departmentList.name));
    }
  };

  return (
    <div className="max-w-3/4 mx-auto p-6">
      <h1 className="text-[28px] font-medium mb-8 text-center">Thiết lập Tổ - Bộ môn mới</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Department Field */}
        <div className="flex flex-col">
          <div className="flex">
            <span className="block text-[16px] w-1/5 font-bold">Tổ - Bộ môn</span>
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
            <span className="block text-[16px] w-1/5 font-bold">Trưởng tổ - Bộ môn</span>
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
          <div className="flex flex-wrap">
            {dataDepartmentDetail[0].departmentList.map((departments, index) => (
              <div key={index} className="w-1/3 flex items-center gap-2 h-10">
                <button type="button" className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current transition-colors bg-blue-700">
                    <svg fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                  </span>
                  <span className="text-base font-bold">{departments}</span>
                </button>
              </div>
            ))}
          </div>

          <div>
            {selectedDepartmen ? (
              <div className="flex items-center gap-2 h-10">
                <button type="button" onClick={handleAddDepartmentsClick} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current transition-colors bg-blue-700">
                    <svg fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                  </span>
                  <span className="text-base font-bold">{selectedDepartmen.value}</span>
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
            {errors.selectedDepartmen && <p className="text-red-500 text-sm mt-1">{errors.selectedDepartmen}</p>}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[884px] h-[582px]">
              <div className="flex justify-end">
                <img src={Cancel} alt="cancel" className="w-6 h-6 cursor-pointer" onClick={handleAddDepartmentsClose} />
              </div>
              <h2 className="text-[28px] font-bold mb-4 text-center">Danh sách môn học</h2>
              {/* Table */}
              <div className="bg-white rounded-lg shadow">
                <div className="flex justify-end">
                  <button className="p-1 text-orange-500 hover:bg-orange-50 rounded">
                    <img src={Trash} alt="trash" className="w-8 h-8" />
                  </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-[80px_1fr_1fr] bg-orange-500 text-white rounded-t-lg text-[18px]">
                  <div className="p-4 flex items-center justify-center">
                    <input ref={checkAllRef} type="checkbox" className="w-6 h-6" checked={isAllChecked} onChange={handleCheckAllChange} />
                  </div>
                  <button className="p-4 text-left font-medium flex items-center gap-2">
                    Mã môn học
                    <div className="flex flex-col">
                      <ChevronUp className="w-4 h-4" />
                      <ChevronDown className="w-4 h-4 -mt-1" />
                    </div>
                  </button>
                  <button className="p-4 text-left font-medium flex items-center gap-2">
                    Tên môn học
                    <div className="flex flex-col">
                      <ChevronUp className="w-4 h-4" />
                      <ChevronDown className="w-4 h-4 -mt-1" />
                    </div>
                  </button>
                </div>

                {/* Table Body*/}
                <div className="overflow-y-auto max-h-[350px]">
                  <div className="divide-y divide-gray-100">
                    {departmentList.map((departments, index) => (
                      <div key={index} className={`grid grid-cols-[80px_1fr_1fr] hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                        <div className="p-4 flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="w-6 h-6"
                            checked={selectedDepartmens.includes(departments.name)}
                            onChange={() => handleRowCheckChange(departments.name)}
                          />
                        </div>
                        <div className="p-4 text-[16px]">{departments.name}</div>
                        <div className="p-4 flex items-center justify-between">
                          <span>{departments.head}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 w-1/4 mx-auto">
          <button
            type="button"
            onClick={handleClick}
            className="flex-1 font-bold text-lg px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors h-[52px]"
          >
            Huỷ
          </button>
          <button type="submit" className="flex-1 font-bold text-lg px-4 py-2 bg-[#FF7506] text-white rounded-md transition-colors h-[52px]">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDeparmentsForm;
