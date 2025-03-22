import React, { useState } from 'react';
import Input from '../../../../components/Input';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
import { Option } from '../../../../components/Dropdown/type';

const UpdateScoreType: React.FC = () => {
  const [scoreType, setScoreType] = useState('');
  const [coefficient, setCoefficient] = useState('');
  const [semester1, setSemester1] = useState('');
  const [semester2, setSemester2] = useState('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);

  const handleSave = () => {
    console.log('Saving:', { scoreType, coefficient, semester1, semester2 });
  };
  const handleCancel = () => {
    setIsFormOpen(false);
    console.log('Đã hủy và reset form');
  };

  const point: Option[] = [
    { id: 1, value: 'Hệ số 1' },
    { id: 2, value: 'Hệ số 1.5' },
    { id: 3, value: 'Hệ số 2' },
  ];

  return (
    <div className="w-full min-h-screen py-8 px-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-700 max-w-2xl mx-auto">
        <h2 className="text-center text-lg font-semibold mb-5">Chỉnh Sửa Loại Điểm</h2>

        {/* Tên loại điểm & Hệ số */}
        <div className="flex items-center gap-8 mb-6">
          <div className="w-1/2 flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">
              Tên loại điểm: <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Nhập tên loại điểm"
              value={scoreType}
              onChange={(e) => setScoreType(e.target.value)}
              size="large"
              border="grey"
              background="white"
            />
          </div>

          <div className="w-1/2 flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">Hệ số:</label>
            <Dropdown options={point} width="short" state="normal" />
          </div>
        </div>

        {/* Đường gạch ngang phân cách */}
        <hr className="my-6 border-t border-gray-300" />

        {/* Số cột điểm tối thiểu */}
        <h3 className="mt-6 text-orange-600 font-semibold mb-3">Số cột điểm tối thiểu</h3>
        <div className="flex gap-4 mt-2">
          <div className="flex-1 flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">Học kì I:</label>
            <Input
              type="number"
              placeholder="Nhập số"
              value={semester1}
              onChange={(e) => setSemester1(e.target.value)}
              size="small"
              border="grey"
              background="white"
            />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">Học kì II:</label>
            <Input
              type="number"
              placeholder="Nhập số"
              value={semester2}
              onChange={(e) => setSemester2(e.target.value)}
              size="small"
              border="grey"
              background="white"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-7 mb-3">
          <Button
            label="Hủy"
            size="big"
            variant="outline"
            onClick={handleCancel}
            textColor="black"
            border="1px solid rgb(193, 189, 189)"
            backgroundColor="#fafafa"
            hoverBackgroundColor="rgba(212, 208, 205, 0.1)"
          />

          <Button
            label="Lưu"
            size="big"
            variant="solid"
            onClick={handleSave}
            textColor="white"
            backgroundColor="#ff7506"
            hoverBackgroundColor="#45a049"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateScoreType;
