import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import caretDown from './../../../../../assets/images/caret_down.png';
import Button from '../../../../../components/Button';

const ManageSubjectAdd = () => {
  const [subject, setSubject] = useState('Toán');
  const [level, setLevel] = useState('Cơ bản');

  const handleCancel = () => {
    alert('handleCancel');
  };
  
  const handleSave = () => {
    alert('handleSave');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Thêm môn học mới</h1>
      <div className="bg-white max-w-3xl mx-auto p-6 shadow-md rounded-lg">
        <form className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="subject" className="font-medium">
              Tổ - bộ môn:
            </label>
            <div className="relative w-2/3">
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border rounded-md px-4 py-2 w-full appearance-none pr-8"
              >
                <option>Khoa học tự nhiên</option>
                <option>Văn hóa xã hội</option>
                <option>Sample</option>
              </select>
              <img src={caretDown} alt="caret" className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="level" className="font-medium">
              Tên môn học:
            </label>
            <div className="relative w-2/3">
              <input
                id="name"
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border rounded-md px-4 py-2 w-full"
                placeholder="Nhập tên môn học"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Mã môn:</label>
            <div className="relative w-2/3">
              <input id="subjectCode" type="text" className="border rounded-md px-4 py-2 w-1/2" placeholder="Nhập mã môn" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="subjectType" className="font-medium">
              Loại môn học:
            </label>
            <div className="relative w-2/3">
              <select id="subjectType" className="border rounded-md px-4 py-2 w-full appearance-none pr-8">
                <option>Môn học bắt buộc</option>
                <option>Môn học tự chọn</option>
                <option>Sample</option>
              </select>
              <img src={caretDown} alt="caret" className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <hr className="border-t border-gray-300 my-4" />

          <h3 className="text-orange-500 font-bold text-lg">Số tiết/ học kì</h3>

          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between">
              <label className="font-medium mt-1">Học kì 1:</label>
              <input id="semester1" type="text" className="border rounded-md px-4 py-2 w-[171px]" />

              <label className="font-medium mt-1">Học kì 2:</label>
              <input id="semester2" type="text" className="border rounded-md px-4 py-1 w-[171px]" />
            </div>

            <div className="flex justify-center space-x-6 mt-10">
              <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={handleCancel} />
              <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageSubjectAdd;
