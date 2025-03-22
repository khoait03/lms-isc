import React, { useState } from "react";
import Dropdown from "../../../../components/Dropdown";
import { Check, Circle, X } from "lucide-react";

const studentsData = {
  name: "Trần Thị M",
  gender: "Nữ",
  dob: "10/10/2002",
  email: "tran.m@gmail.com",
  class: "10A1",
  teacher: "Cô Nguyễn Thị A",
  year: "2019 - 2020",
  image: "https://via.placeholder.com/100", // Thay thế bằng URL hình ảnh thực tế
};

const grades = [
  { id: 1, subject: "Toán Đại Số", teacher: "Cô. Trần Thị Thu Thủy", attendance: 0, oral: 0, fifteenMin: 0, coefficient2: 0, coefficient3: 0, average: 0, averages: 7.0, finalAverage: 0, passed: true, update: "20/08/2020 09:00 AM" },
  { id: 2, subject: "Toán Hình Học", teacher: "Cô. Trần Thị Thu Thủy", attendance: 0, oral: 0, fifteenMin: 0, coefficient2: 0, coefficient3: 0, average: 0, averages: 4.8, finalAverage: 0, passed: false, update: "20/08/2020 09:00 AM" },
  { id: 3, subject: "Lịch Sử", teacher: "Cô. Trần Thị Thu Thủy", attendance: 0, oral: 0, fifteenMin: 0, coefficient2: 0, coefficient3: 0, average: 0, averages: 7.6, finalAverage: 0, passed: true, update: "20/08/2020 09:00 AM" },
  { id: 4, subject: "Tiếng Anh", teacher: "Cô. Trần Thị Thu Thủy", attendance: 0, oral: 0, fifteenMin: 0, coefficient2: 0, coefficient3: 0, average: 0, averages: 7.2, finalAverage: 0, passed: true, update: "20/08/2020 09:00 AM" },
  { id: 5, subject: "Sinh Học", teacher: "Cô. Trần Thị Thu Thủy", attendance: 0, oral: 0, fifteenMin: 0, coefficient2: 0, coefficient3: 0, average: 0, averages: 8.5, finalAverage: 0, passed: true, update: "20/08/2020 09:00 AM" },
  { id: 6, subject: "Địa Lý", teacher: "Cô. Trần Thị Thu Thủy", attendance: 0, oral: 0, fifteenMin: 0, coefficient2: 0, coefficient3: 0, average: 0, averages: 3.8, finalAverage: 0, passed: false, update: "20/08/2020 09:00 AM" },
  { id: 7, subject: "Tin học", teacher: "Cô. Trần Thị Thu Thủy", attendance: 0, oral: 0, fifteenMin: 0, coefficient2: 0, coefficient3: 0, average: 0, averages: 9.3, finalAverage: 0, passed: true, update: "20/08/2020 09:00 AM" },
  { id: 8, subject: "Vật Lý", teacher: "Cô. Trần Thị Thu Thủy", attendance: 0, oral: 0, fifteenMin: 0, coefficient2: 0, coefficient3: 0, average: 0, averages: 4.0, finalAverage: 0, passed: false, update: "20/08/2020 09:00 AM" },
];

const yearOptions = [
  { id: 1, value: "2019 - 2020" },
  { id: 2, value: "2020 - 2021" },
];

const gradeOptions = [
  { id: 1, value: "10" },
  { id: 2, value: "11" },
  { id: 3, value: "12" },
];

const semesterOptions = [
  { id: 1, value: "Học Kì 1" },
  { id: 2, value: "Học Kì 2" },
];

const Scoreboard = () => {
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [selectedGrade, setSelectedGrade] = useState(gradeOptions[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesterOptions[0]);

  const passedSubjects = grades.filter(grade => grade.passed).length;
  const totalSubjects = grades.length;


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
      {/* Thông tin học sinh */}
      <div className="text-gray-400 font-light flex items-center font-bold">
        Bảng điểm <span className="text-orange-500 mx-1 text-sm ">›</span>
        <span className="text-gray-900 text-xl font-bold">{studentsData.class}</span>
      </div>
      <div className="flex items-center border-b pb-4 mb-4 mt-5">
        <img src={studentsData.image} alt="Student" className="w-24 h-24 rounded-lg mr-4" />
        <div className="flex space-x-8 text-sm">
          <div className="">
            <p><strong>Họ và Tên:</strong> {studentsData.name}</p>
            <p><strong>Giới tính:</strong> {studentsData.gender}</p>
            <p><strong>Ngày sinh:</strong> {studentsData.dob}</p>
            <p><strong>Email:</strong> {studentsData.email}</p>
          </div>

          <div className="border-l border-gray-300 pl-8 ">
            <p><strong>Lớp:</strong> {studentsData.class}</p>
            <p><strong>GVCN:</strong> {studentsData.teacher}</p>
            <p><strong>Niên khóa:</strong> {studentsData.year}</p>
          </div>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="flex justify-end items-center space-x-4 mb-4 border-b pb-4">
        <div>
          <label className="block text-sm font-medium">Chọn Niên khóa</label>
          <Dropdown
            options={yearOptions}
            width="medium"
            icon="right"
            state="normal"
            disabled={false}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Chọn khối</label>
          <Dropdown
            options={gradeOptions}
            width="short"
            icon="right"
            state="normal"
            disabled={false}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Chọn học kì</label>
          <Dropdown
            options={semesterOptions}
            width="medium"
            icon="right"
            state="normal"
            disabled={false}
          />
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded mt-5">Tìm kiếm</button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold">
          HỌC KÌ 1 - <span className="text-blue-500">{passedSubjects}/{totalSubjects} môn đạt</span>
        </h2>

        <button className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-500 hover:text-white transition">
          In Bảng Điểm
        </button>
      </div>

      {/* Bảng điểm */}
      <table className="w-full border-collapse rounded-lg overflow-hidden text-sm border">
        <thead>
          <tr className="bg-orange-400 text-white">
            <th className="p-2 ">STT</th>
            <th className="p-2 ">Môn học</th>
            <th className="p-2 ">Giảng viên</th>
            <th className="p-2 border-l border-orange-500">Chuyên cần</th>
            <th className="p-2 ">Miệng</th>
            <th className="p-2 ">15 phút</th>
            <th className="p-2 ">Hệ số II</th>
            <th className="p-2 ">Hệ số III</th>
            <th className="p-2  font-bold border-r border-orange-500npm s">Trung bình</th>
            <th className="p-2  font-bold ">Tổng điểm trung bình</th>
            <th className="p-2 ">Kết quả</th>
            <th className="p-2">Ngày cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id} className="text-center border-b">
              <td className="p-2 ">{grade.id}</td>
              <td className="p-2 ">{grade.subject}</td>
              <td className="p-2 border-r border-orange-500">{grade.teacher}</td>
              <td className="p-2 ">{grade.attendance}</td>
              <td className="p-2 ">{grade.oral}</td>
              <td className="p-2 ">{grade.fifteenMin}</td>
              <td className="p-2 ">{grade.coefficient2}</td>
              <td className="p-2 ">{grade.coefficient3}</td>
              <td className="p-2 border-r border-orange-500">
                {grade.average}
              </td>
              <td className={`p-2  font-bold ${grade.averages < 5 ? "text-red-600" : "text-green-600"}`}>
                {grade.averages}
              </td>
              <td className="p-2">
                {grade.passed ? (
                  <div className="bg-green-500 rounded-full flex items-center justify-center w-5 h-5">
                    <Check className="text-white w-4 h-4" />
                  </div>
                ) : (
                  <div className="bg-red-500 rounded-full flex items-center justify-center w-5 h-5">
                    <X className="text-white w-4 h-4" />
                  </div>
                )}
              </td>

              <td className="p-2 italic ">{grade.update}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard; 