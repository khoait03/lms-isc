import { useState } from 'react';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

export default function ClassSetup() {
  const [subjectType, setSubjectType] = useState('');
  const [userGroup, setUserGroup] = useState('');
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
        <h2 className="text-xl font-semibold text-center mb-4">Thiết lập Lớp học</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mt-2 mb-2">Loại Lớp học</label>
          <Input
            type="text"
            border="grey"
            size="full"
            value={subjectType}
            onChange={(e) => setSubjectType(e.target.value)}
            placeholder="Nhập loại Lớp học"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="text-gray-700 mr-2">Trạng thái:</label>
          <input type="checkbox" className="toggle-checkbox hidden" checked={isActive} onChange={() => setIsActive(!isActive)} />
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isActive ? 'bg-blue-500' : 'bg-gray-400'
            }`}
            onClick={() => setIsActive(!isActive)}
          >
            <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${isActive ? 'translate-x-6' : ''}`}></div>
          </div>
          <span className="ml-2 text-gray-700">{isActive ? 'Đang hoạt động' : 'Không hoạt động'}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mt-2 mb-2">Nhóm người dùng</label>
          <Input
            type="text"
            value={userGroup}
            onChange={(e) => setUserGroup(e.target.value)}
            placeholder="Nhập nhóm người dùng"
            border="grey"
            size="full"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <Button label="Hủy" size="medium" variant="solid" backgroundColor="grey" textColor="black" onClick={() => console.log('Hủy')} />
          <Button label="Lưu" size="medium" variant="solid" onClick={() => console.log('Lưu')} />
        </div>
      </div>
    </div>
  );
}
