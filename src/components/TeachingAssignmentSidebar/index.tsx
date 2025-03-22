import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Option, SidebarProps } from './type';
import Dropdown from '../Dropdown';

const instructors = [
  { id: '1', name: 'Tô An' },
  { id: '2', name: 'Hoàng Mỹ Trưng' },
  { id: '3', name: 'Nguyễn Kỳ Nguyên' },
  { id: '4', name: 'Mộc Tâm Tâm' },
  { id: '5', name: 'Trần Thoa Hân' },
  { id: '6', name: 'Nguyễn Ngọc Điệp' },
];
const filter1Options: Option[] = [
  { id: 'all', value: '2020-2021' },
  { id: 'option2', value: '2021-2022' },
];

const filter2Options: Option[] = [
  { id: 'all', value: 'Toán đại số' },
  { id: 'option2', value: 'Toán hình học' },
];

const TeachingAssignmentSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownFilter1 = filter1Options.map((opt) => ({
    id: Number(opt.id),
    value: opt.value,
  }));

  const dropdownFilter2 = filter2Options.map((opt) => ({
    id: Number(opt.id),
    value: opt.value,
  }));
  return (
    <div className="w-70 h-full">
      <div className="bg-[#373839] p-3 rounded-t-xl mb-4">
        <p className="text-sm text-white font-medium mb-3">Đang chọn xem:</p>
        <div className="flex items-center mb-2">
          <label className="text-sm text-white font-medium w-20">Niên khóa:</label>
          <Dropdown options={dropdownFilter1} width="medium" />
        </div>

        <div className="flex items-center">
          <label className="text-sm text-white font-medium w-20">Bộ môn:</label>

          <Dropdown options={dropdownFilter2} width="medium" />
        </div>
      </div>

      <ul className="space-y-3">
        {instructors.map((instructor) => (
          <li
            key={instructor.id}
            onClick={() => navigate(`/leadership/teacher/teaching-assignment/${instructor.id}`)}
            className={`p-3 py-4 mx-8 border border-[#FF7506] rounded-lg cursor-pointer 
              ${
                location.pathname.includes(instructor.id) ? 'bg-[#823B00] text-white' : 'bg-[#FFF9F4] text-black hover:bg-[#823B00] hover:text-white'
              }`}
          >
            {instructor.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachingAssignmentSidebar;
