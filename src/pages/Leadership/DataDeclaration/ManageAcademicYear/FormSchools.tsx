import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../../../config/scss/FormSchools.module.scss'; // SCSS module
import Dropdown from '../../../../components/Dropdown';
import { Option } from '../../../../components/Dropdown/type';
import Input from '../../../../components/Input';
import { FaMinus, FaPlus } from 'react-icons/fa';
import DatePicker from '../../../../components/DatePicker';
import Button from '../../../../components/Button';

const FormSchools: React.FC = ({}) => {
  const { id } = useParams(); // Lấy id từ URL
  const [startYear, setStartYear] = useState<number>(2020);
  const [endYear, setEndYear] = useState<number>(2021);
  const [keThua, setKeThua] = useState<boolean>(false);
  const [semesters, setSemesters] = useState<string[]>(['Học kì I']);
  const [semesterDates, setSemesterDates] = useState<string[]>(['']);
  // State để kiểm soát việc mở/đóng form (nếu cần)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);

  const addSemester = () => {
    setSemesters([...semesters, `Học kì ${semesters.length + 1}`]);
    setSemesterDates([...semesterDates, '']);
  };

  const removeSemester = (index: number) => {
    setSemesters(semesters.filter((_, i) => i !== index));
    setSemesterDates(semesterDates.filter((_, i) => i !== index));
  };
  // Danh sách các năm cho dropdown
  const yearOptions: Option[] = Array.from({ length: 51 }, (_, i) => ({
    id: 2000 + i,
    value: (2000 + i).toString(),
  }));

  const nameOption: Option[] = Array.from({ length: 51 }, (_, i) => {
    const startYear = 2000 + i;
    const endYear = startYear + 1;
    return {
      id: startYear,
      value: `Niên khóa `,
    };
  });

  // Hàm xử lý nút "Hủy"
  const handleCancel = () => {
    // Reset lại giá trị form về giá trị ban đầu
    setSemesters(['Học kì I']); // Set lại mặc định học kì
    setSemesterDates(['']); // Set lại mặc định ngày

    // Đóng form nếu cần
    setIsFormOpen(false); // Đóng form lại
    console.log('Đã hủy và reset form');
  };

  const handleSave = () => {
    // Logic lưu (gửi dữ liệu form, ...)
    console.log('Lưu');
  };

  return (
    <div className="w-full min-h-screen py-8 px-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        {/* Tiêu đề chính */}
        <h2 className={`${styles['form-title']} text-center mb-4`}>Thiết lập niên khóa {id ?? ''}</h2>

        {/* Niên khóa & Kế thừa dữ liệu */}
        <div className="flex items-start gap-8 mb-6">
          {/* Cột trái: Niên khóa */}
          <div className="w-1/2">
            <div className="flex flex-col items-start">
              <label className={`${styles['text-menu']} text-left`}>Niên khóa:</label>
              <div className="flex items-center space-x-2 mt-1">
                <Dropdown options={yearOptions} width="short" state="normal" />
                <span className={`${styles['text-content']} text-center`}>đến</span>
                <Dropdown options={yearOptions} width="short" state="normal" />
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex items-center mt-1 ml-0">
              <input
                type="checkbox"
                checked={keThua}
                onChange={(e) => setKeThua(e.target.checked)}
                className="w-6 h-6 border-2 border-blue-600 rounded-md accent-blue-500 mr-2 cursor-pointer"
              />
              <label className={`${styles['text-menu']} text-left mr-2 pl-0`}>Kế thừa dữ liệu:</label>
              <Dropdown options={nameOption} width="short" state="normal" />
            </div>
            {/* Phần cảnh báo nằm dưới */}
            <div className="flex items-start mt-2 ml-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-orange-600 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <div className="ml-2 pl-0">
                <p className={`${styles['text-note']} pl-0`}>Dữ liệu được kế thừa bao gồm các thông tin:</p>
                <p className={`${styles['text-note']} pl-0`}>- Thông tin học viên và Danh sách lớp học</p>
                <p className={`${styles['text-note']} pl-0`}>- Thông tin môn học</p>
                <p className={`${styles['text-note']} pl-0`}>- Phân công giảng dạy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Đường gạch ngang phân cách */}
        <hr className="my-6 border-t border-gray-300" />

        {/* Cài đặt thời gian */}
        <h3 className={`${styles['text-sub-note']} text-lg mb-2`}>Cài đặt thời gian</h3>
        {semesters.map((semester, index) => (
          <div key={index} className="semester-row mb-2 flex items-center gap-2">
            {/* Nút xóa học kỳ */}
            <div className="semester-remove-btn mr-2">
              <button onClick={() => removeSemester(index)} className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full">
                <FaMinus />
              </button>
            </div>

            {/* Tên học kỳ */}
            <div className="semester-label mr-2">
              <label className={`${styles['text-menu']} text-left`}>Tên học kỳ:</label>
            </div>

            {/* Input tên học kỳ */}
            <div className="semester-input w-1/5 h-16">
              <Input
                type="text"
                value={semester}
                onChange={(e) => {
                  const newSemesters = [...semesters];
                  newSemesters[index] = e.target.value;
                  setSemesters(newSemesters);
                }}
                size="small"
                border="grey"
                background="white"
              />
            </div>

            {/* Thời gian: Từ... đến... */}
            <div className="semester-dates flex items-center w-3/5 gap-2">
              <div>
                <label className={`${styles['text-content']} text-right`}>Từ:</label>
              </div>
              <div className="w-45">
                <DatePicker
                  value={semesterDates[index] || ''}
                  onChange={(date) => {
                    setSemesterDates((prevDates) => {
                      const newDates = [...prevDates];
                      newDates[index] = date || ''; // Ensure valid value
                      return newDates;
                    });
                  }}
                />
              </div>
              <div>
                <span className={`${styles['text-content']} text-center`}>đến</span>
              </div>
              <div className="w-45">
                <DatePicker
                  value={semesterDates[index] || ''}
                  onChange={(date) => {
                    setSemesterDates((prevDates) => {
                      const newDates = [...prevDates];
                      newDates[index] = date || '';
                      return newDates;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mb-6 flex items-center gap-2">
          <button onClick={addSemester} className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full">
            <FaPlus />
          </button>
          <div className="semester-label">
            <label className={`${styles['text-menu']} text-left ms-2 text-[#0B80EC]`}>Thêm học kỳ mới</label>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
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

export default FormSchools;
