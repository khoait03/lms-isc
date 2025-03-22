import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Tổng quan (Overview)
const Overview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBottom, setIsOpenBottom] = useState(false);
  const data = [
    { name: "Tổng số học sinh giỏi", value: 300, color: "#3498db" },
    { name: "Tổng số học sinh khá", value: 125, color: "#f39c12" },
    { name: "Tổng số học sinh trung bình", value: 75, color: "#2ecc71" },
  ];

  const students = [
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'completed' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'completed' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'completed' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'incomplete' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'completed' },
    { id: '2020-6A', name: 'Toán đại số', class: 'Lớp 10A1', time: 'Thứ 2 - 8:00', date: '12/05 - 10/07', status: 'completed' },
  ]


  return (
    <div className="flex">
      <div className="w-5/12">
        {/* {Thống kê} */}
        <p className="text-[48px] font-bold">Tổng quan</p>
        <div className="grid grid-cols-2 gap-10">
          <div className=" bg-gradient-to-r from-[#F17F21] to-[#FF5400] px-6 py-3 rounded-2xl shadow-lg text-center text-white ">
            <p className="text-lg font-bold ">Khóa học của tôi</p>
            <p className="text-[48px] font-bold">10</p>
          </div>
          <div className=" bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] px-6 py-3 rounded-2xl shadow-lg text-center text-white">
            <p className="tewxt-lg font-bold">Lớp học online</p>
            <p className="text-[48px]  font-bold">2</p>
          </div>
          <div className=" bg-gradient-to-r from-[#FDC830] to-[#F37335] px-6 py-3 rounded-2xl shadow-lg text-center text-white">
            <p className="text-lg font-bold">Bài kiểm tra chưa chấm</p>
            <p className="text-[48px]  font-bold">8</p>
          </div>
          <div className=" bg-gradient-to-r from-[#2EACEE] to-[#0016DA] px-6 py-3 rounded-2xl shadow-lg text-center text-white">
            <p className="text-lg font-bold">Hỏi đáp Q & A</p>
            <p className="text-[48px]  font-bold">5</p>
          </div>
        </div>
        {/* {Chart} */}
        <div className="mt-6">
          <p className="text-[28px] font-bold mt-4">Thống kê kết quả học tập của học viên</p>
          <div className=" bg-white rounded-2xl shadow-2xl mt-4  w-[100%] h-[427px]">
            {/* {Pie chart} */}
            <div className="flex">
              <div className="flex-1 mt-[65px] ml-[74px]">
                <PieChart width={166} height={166} >
                  <Pie data={data} dataKey="value" outerRadius={83} fill="#8884d8">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              {/* {Thong so} */}
              <div className="flex-1 mt-[65px] mr-6">
                <div className="flex justify-between border-b-4  border-b-[#823B00] py-1">
                  <span>Tổng số lớp: </span><span className="text-[#373839] font-bold">10</span>
                </div>
                <div className="flex justify-between border-b-4  border-b-[#823B00] py-1">
                  <span>Tổng số học sinh giỏi: </span><span className="text-[#2EACEE] font-bold">10</span>
                </div>
                <div className="flex justify-between border-b-4  border-b-[#823B00] py-1">
                  <span>Tổng số học sinh khá: </span> <span className="text-[#FF7506] font-bold">10</span>
                </div>
                <div className="flex justify-between border-b-4  border-b-[#823B00] py-1">
                  <span>Tổng số học sinh trung bình:  </span><span className="text-[#49C510] font-bold">10</span>
                </div>
                <div className="flex justify-between border-b-4  border-b-[#823B00] py-1">
                  <span>Tổng số học sinh yếu: </span><span className="text-[#C9C4C0] font-bold">10</span>
                </div>
              </div>
            </div>
            <div className="mt-4 ml-[74px]">
              <div className="flex items-center" >
                <div className="w-[32px] h-[16px] rounded-[2px] bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] mr-1"></div><p>Tổng số học sinh giỏi</p>
              </div>
              <div className="flex items-center" >
                <div className="w-[32px] h-[16px] rounded-[2px] bg-gradient-to-r from-[#FDC830] to-[#F37335] mr-1"></div><p>Tổng số học sinh khá</p>
              </div>
              <div className="flex items-center" >
                <div className="w-[32px] h-[16px] rounded-[2px] bg-gradient-to-r from-[#DCE35B] to-[#45B649] mr-1"></div><p>Tổng số học sinh trung bình</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {Table list} */}
      <div className="w-7/12">
        <p className="text-[48px] font-bold ms-5">Tất cả khóa học</p>
        <div className="rounded-md h-[724px] overflow-auto">
          <div className="px-5">
            <div
              className={`flex items-center gap-2 p-4 ${isOpen ? 'rounded-t-xl' : 'rounded-xl'} cursor-pointer transition-all ${isOpen ? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Icon mũi tên */}
              <svg
                className={`w-4 h-4 transition-transform transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>

              {/* Tiêu đề */}
              <p className="font-extrabold text-[16px]">Học kỳ II - 2020</p>
            </div>

            {isOpen && (
              <div className="overflow-hidden rounded-lg shadow-sm">
                <table className="w-full table-auto">
                  <tbody className="rounded-xl">
                    {students.map((student, index) => (
                      <tr key={student.id} style={{ borderRadius: '20px' }} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="px-0 py-4 text-center font-bold font-source-sans w-2/12">{student.name}</td>
                        <td className="px-2 py-4 text-base font-source-sans w-2/12">{student.class}</td>
                        <td className="px-4 py-4 text-base font-source-sans w-2/12">{student.time}</td>
                        <td className="px-4 py-4 text-base font-source-sans w-2/12">{student.date}</td>
                        <td className={`px-4 py-4 text-base text-center font-source-sans w-2/12 ${student.status === 'completed' ? 'text-[#0B80EC]' : 'text-[#ED2025]'} `}>
                          {student.status === 'completed' ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</td>
                        <td className="px-4 py-4 text-center w-1/12 text-[#F17F21] cursor-pointer">
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            )}
          </div>
          <div className="px-5 mt-3">
            <div
              className={`flex items-center gap-2 p-4 ${isOpenBottom ? 'rounded-t-xl' : 'rounded-xl'} cursor-pointer transition-all ${isOpenBottom ? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              onClick={() => setIsOpenBottom(!isOpenBottom)}
            >
              {/* Icon mũi tên */}
              <svg
                className={`w-4 h-4 transition-transform transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>

              {/* Tiêu đề */}
              <p className="font-extrabold text-[16px]">Học kỳ I - 2020</p>
            </div>

            {isOpenBottom && (
              <div className="overflow-hidden rounded-lg shadow-sm">
                <table className="w-full table-auto">
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="px-0 py-4 text-center font-bold font-source-sans w-2/12">{student.name}</td>
                        <td className="px-2 py-4 text-base font-source-sans w-2/12">{student.class}</td>
                        <td className="px-4 py-4 text-base font-source-sans w-2/12">{student.time}</td>
                        <td className="px-4 py-4 text-base font-source-sans w-2/12">{student.date}</td>
                        <td className={`px-4 py-4 text-base text-center font-source-sans w-2/12 ${student.status === 'completed' ? 'text-[#0B80EC]' : 'text-[#ED2025]'} `}>
                          {student.status === 'completed' ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                        </td>
                        <td className="px-4 py-4 text-center w-1/12 text-[#F17F21] cursor-pointer">
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Overview;
