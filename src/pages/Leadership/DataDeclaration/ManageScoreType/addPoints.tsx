import { useState } from 'react';
import Input from '../../../../components/Input';
import Dropdown from '../../../../components/Dropdown';

const AddPoints = () => {
  const [typePoint, setTypePoint] = useState('');
  const [semester1, setSemester1] = useState('');
  const [semester2, setSemester2] = useState('');

  return (
    <div className="inset-0 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-[884px]">
        <div className="p-4 border-b">
          <h2 className="text-center text-xl font-semibold text-gray-800">Thêm loại điểm mới</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-2 pb-4 border-b border-gray-300">
            <div className="flex items-center col-span-2">
              <label className="pe-3 text-sm font-medium text-gray-700">
                Tên loại điểm: <span className="text-red-500">*</span>
              </label>
              <Input value={typePoint} background="light grey" onChange={(e) => setTypePoint(e.target.value)} />
            </div>
            <div className="flex items-center col-span-1">
              <label className="pe-3 text-sm font-medium text-gray-700">Hệ số:</label>
              <Dropdown
                options={[
                  { id: 0, value: 'Hệ số điểm' },
                  { id: 1, value: 'Hệ số điểm 1' },
                  { id: 2, value: 'Hệ số điểm 2' },
                ]}
              />
            </div>
          </div>

          <h3 className="text-orange-600 font-semibold mt-4 mb-3">Số cột điểm tối thiểu</h3>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center col-span-2">
              <div className="flex items-center" style={{ marginRight: '15%' }}>
                <label className="text-sm text-gray-700 pe-3">Học kì I:</label>{' '}
                <Input value={semester1} size="small" background="light grey" onChange={(e) => setSemester1(e.target.value)} />
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-700 pe-3">Học kì II:</label>{' '}
                <Input value={semester2} size="small" background="light grey" onChange={(e) => setSemester2(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-b-xl flex justify-center gap-4 pb-8">
          <button className="px-10 py-2 bg-gray-300 text-gray-700 rounded-lg me-3">Hủy</button>
          <button className="px-10 py-2 bg-orange-500 text-white rounded-lg">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default AddPoints;
