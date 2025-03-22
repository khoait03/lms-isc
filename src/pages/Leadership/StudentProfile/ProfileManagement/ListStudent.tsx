import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import StatusComponent from '../../../../components/Status';
import Button from '../../../../components/Button/';
import Pagination from '../../../../components/Pagination';
import UPaperclip from '../../../../assets/images/u_paperclip.png';
import FIDownload from '../../../../assets/images/fi_download_N.png';
import DatePicker from '../../../../components/DatePicker';
import { PaperclipIcon } from 'lucide-react';
import Dropdown from "../../../../components/Dropdown";

interface Student {
    id: string;
    name: string;
    dob: string;
    gender: string;
    ethnicity: string;
    class: string;
    status: string;
}

interface Option {
    id: number;
    value: string;
}

const ListStudent: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([
        { id: '2020-6A', name: 'Nguyễn Văn A', dob: '12/02/1998', gender: 'Nam', ethnicity: 'Kinh', class: '6A', status: 'Đang học' },
        { id: '2020-6B', name: 'Phạm Thị C', dob: '12/02/1998', gender: 'Nữ', ethnicity: 'Kinh', class: '6B', status: 'Đang học' },
        { id: '2020-6C', name: 'Trần Hoàng A', dob: '12/02/1998', gender: 'Nam', ethnicity: 'Kinh', class: '6C', status: 'Đang học' },
        { id: '2020-7A', name: 'Charlie', dob: '12/02/1998', gender: 'Nam', ethnicity: 'Kinh', class: '7A', status: 'Đang học' },
        { id: '2020-7C', name: 'Trần Hoàng A', dob: '12/02/1998', gender: 'Nam', ethnicity: 'Mèo', class: '7C', status: 'Đã tốt nghiệp' },
        { id: '2020-8A', name: 'Phạm Thị C', dob: '12/02/1998', gender: 'Nữ', ethnicity: 'Kinh', class: '8A', status: 'Đã tốt nghiệp' },
        { id: '2020-8B', name: 'Trần Hoàng A', dob: '12/02/1998', gender: 'Nam', ethnicity: 'Khmer', class: '8B', status: 'Đã thôi học' },
        { id: '2020-8C', name: 'Phạm Thị C', dob: '13/02/1998', gender: 'Nữ', ethnicity: 'Kinh', class: '8C', status: 'Chuyển lớp' },
        { id: '2020-9A', name: 'Nguyễn Văn A', dob: '12/02/1998', gender: 'Nam', ethnicity: 'Kinh', class: '9A', status: 'Chuyển trường' },
        { id: '2020-9B', name: 'Trần Hoàng A', dob: '12/02/1998', gender: 'Nam', ethnicity: 'Kinh', class: '9B', status: 'Đã thôi học' },
    ]);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isConfirming, setIsConfirming] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isActionDropdownOpen, setIsActionDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const [isUploadModalOpen, setIsUploadModalOpen] = useState<{ [key: string]: boolean }>({});
    const [isTransferClassModalOpen, setIsTransferClassModalOpen] = useState<{ [key: string]: boolean }>({});
    const [isTransferSchoolModalOpen, setIsTransferSchoolModalOpen] = useState<{ [key: string]: boolean }>({});
    const [isStudySuspensionModalOpen, setIsStudySuspensionModalOpen] = useState<{ [key: string]: boolean }>({});

    const itemsPerPage = 8;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [fileName, setFileName] = useState<string>('');

    const allCheckboxRef = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState<string>('');
    const handleDateChange = (date: string | null) => {
        if (date !== null) {
            setDate(date);
        }
    };
    const handleCheckboxChange = (id: string) => {
        const updatedSelectedIds = selectedIds.includes(id) ? selectedIds.filter((selectedId) => selectedId !== id) : [...selectedIds, id];
        setSelectedIds(updatedSelectedIds);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentStudents = getPaginatedStudents();
        if (event.target.checked) {
            setSelectedIds(currentStudents.map((student) => student.id));
        } else {
            setSelectedIds([]);
        }
    };
    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };
    const handleDeselectAll = () => {
        setSelectedIds([]);
    };

    const handleDeleteSelected = () => {
        setStudents(students.filter((student) => !selectedIds.includes(student.id)));
        setSelectedIds([]);
        setIsConfirming(false);
    };

    const optitionClass: Option[] = [
        { id: 0, value: "Chọn Lớp" },
        { id: 1, value: "10A3" },
        { id: 2, value: "10A4" },
        { id: 3, value: "10A5" },
    ];
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Đang học':
                return '#49C510';
            case 'Đã tốt nghiệp':
                return '#0B80EC';
            case 'Đã thôi học':
                return '#ED2025';
            case 'Chuyển lớp':
                return '#FF7506';
            case 'Chuyển trường':
                return '#373839';
            default:
                return '#373839';
        }
    };

    const getPaginatedStudents = () => students.slice(0, 10);


    const areAllSelected = () => {
        const currentStudents = getPaginatedStudents();
        return currentStudents.every((student) => selectedIds.includes(student.id));
    };

    const areSomeSelected = () => {
        const currentStudents = getPaginatedStudents();
        return selectedIds.length > 0 && !areAllSelected();
    };

    useEffect(() => {
        if (allCheckboxRef.current) {
            allCheckboxRef.current.indeterminate = areSomeSelected();
        }
    }, [selectedIds, currentPage]);


    const handleSave = () => {
        alert(`Lưu Thành Công `);
    };

    const handleActionSelection = (option: string, studentId: string) => {
        console.log(`Selected option: ${option} for student ID: ${studentId}`);
        switch (option) {
            case 'Sửa hồ sơ':
                navigate(`/EditStudent/${studentId}`);
                break;
            case 'Chuyển lớp':
                setIsTransferClassModalOpen((prev) => ({ ...prev, [studentId]: true }));
                break;
            case 'Chuyển trường':
                setIsTransferSchoolModalOpen((prev) => ({ ...prev, [studentId]: true }));
                break;
            case 'Bảo lưu':
                setIsStudySuspensionModalOpen((prev) => ({ ...prev, [studentId]: true }));
                break;
            case 'Cập nhật miễn giảm':
                // Logic for updating exemptions/reductions
                break;
            case 'Cập nhật khen thưởng':
                // Logic for updating awards
                break;
            case 'Cập nhật kỷ luật':
                // Logic for updating discipline
                break;
            case 'Tải lên file':
                setIsUploadModalOpen((prev) => ({ ...prev, [studentId]: true }));
                break;
            default:
                break;
        }
        setIsActionDropdownOpen((prev) => ({ ...prev, [studentId]: false })); // Close dropdown after selection
    };

    // Action options for the dropdown (matching your image)
    const actionOptions: Option[] = [
        { id: 1, value: 'Sửa hồ sơ' },
        { id: 2, value: 'Chuyển lớp' },
        { id: 3, value: 'Chuyển trường' },
        { id: 4, value: 'Bảo lưu' },
        { id: 5, value: 'Cập nhật miễn giảm' },
        { id: 6, value: 'Cập nhật khen thưởng' },
        { id: 7, value: 'Cập nhật kỷ luật' },
    ];

    // Handle file upload actions in the modal
    const handleUpload = (studentId: string, file: File | null) => {
        if (file) {
            console.log(`Uploading file for student ${studentId}:`, file);
            // Add your file upload logic here (e.g., API call)
        }
        setIsUploadModalOpen((prev) => ({ ...prev, [studentId]: false })); // Close modal after upload
    };

    const handleDownloadTemplate = (studentId: string) => {
        console.log(`Tải xuống mẫu file cho học viên ${studentId}...`);
        // Add your logic here to download the template file (e.g., API call or file URL)
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 items-center">
                    <div className="flex gap-2">
                        <Dropdown
                            options={[{ id: 1, value: "2020-2021" }, { id: 2, value: "2021-2022" }]}
                            width="medium"
                        />
                        <Dropdown
                            options={[{ id: 1, value: "Chọn lớp" }]}
                            width="medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-black text-white px-4 py-1 rounded-lg">Tất cả hồ sơ</button>
                        <button className="bg-gray-300 px-4 py-1 rounded-lg">Khen thưởng</button>
                        <button className="bg-gray-300 px-4 py-1 rounded-lg">Kỷ luật</button>
                    </div>
                </div>
                <Button label="+ Thêm mới" variant="solid" size="medium" textColor="white" backgroundColor="#F97316" onClick={() => { }} />
            </div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-mulis">Danh sách học viên</h2>
                <div className="relative max-w-lg" style={{ width: 438 }}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="px-3 py-2 text-sm font-normal rounded-3xl w-full pl-10 focus:outline-none focus:ring-2 font-source-sans focus:ring-orange-500 bg-gray-200 italic"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaSearch className="text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-sm">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-white" style={{ background: 'linear-gradient(to right, #F17F21, #FF5400)' }}>
                            <th className="px-0 py-2 text-left text-lg">
                                <input
                                    ref={allCheckboxRef}
                                    type="checkbox"
                                    checked={areAllSelected()}
                                    onChange={(e) => {
                                        if (areAllSelected()) {
                                            handleSelectAll(e);
                                        } else if (areSomeSelected()) {
                                            handleDeselectAll();
                                        } else {
                                            handleSelectAll(e);
                                        }
                                    }}
                                    className="w-6 h-6 ml-6"
                                />
                            </th>
                            <th className="px-0 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Mã học viên</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-0 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Tên học viên</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-2 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Ngày sinh</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Giới tính</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Dân tộc</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Lớp</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-6 h-6 ml-1" />
                                </div>
                            </th>
                            <th className="pr-4 pl-12 py-2 text-left text-lg w-1/12">
                                <div className="flex items-center">
                                    <span className="font-mulis">Tình trạng</span>
                                    <img src="/icon/u_arrow up down.png" alt="" className="w-4 h-4 ml-1" />
                                </div>
                            </th>
                            <th className="px-4 py-2 text-center text-lg w-1/12"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {getPaginatedStudents().map((student, index) => (
                            <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td className="px-0 py-3 text-left w-1/12">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(student.id)}
                                        onChange={() => handleCheckboxChange(student.id)}
                                        className="w-6 h-6 ml-6"
                                    />
                                </td>
                                <td className="px-0 py-3 text-left text-base font-source-sans w-1/12">{student.id}</td>
                                <td className="px-0 py-3 text-base font-source-sans w-1/12">{student.name}</td>
                                <td className="px-2 py-3 text-base font-source-sans w-1/12">{student.dob}</td>
                                <td className="px-4 py-3 text-base font-source-sans w-1/12">{student.gender}</td>
                                <td className="px-4 py-3 text-base font-source-sans w-1/12">{student.ethnicity}</td>
                                <td className="px-4 py-3 text-base font-source-sans w-1/12">{student.class}</td>
                                <td className="px-4 py-3 text-left w-1/12">
                                    <StatusComponent status={student.status} color={getStatusColor(student.status)} />
                                </td>
                                <td className="px-4 py-3 text-center w-2/12">
                                    <button onClick={() => navigate(`/leadership/student/profile/${student.id}`)} className="text-orange-500 hover:text-orange-700 mx-2">
                                        <img src="/icon/u_eye_HSHS.png" alt="Xem" className="w-8 h-8" />
                                    </button>
                                    <div className="relative inline-block">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsActionDropdownOpen((prev) => ({ ...prev, [student.id]: !prev[student.id] }));
                                            }}
                                            className="text-orange-500 hover:text-orange-700 mx-2"
                                        >
                                            <img src="/icon/fi_edit_HSHS.png" alt="Hành động" className="w-8 h-8" />
                                        </button>
                                        {isActionDropdownOpen[student.id] && (
                                            <div
                                                className="absolute z-50 bg-white rounded-lg shadow-lg p-2"
                                                style={{
                                                    top: '-10px',
                                                    left: '-200px',
                                                    width: '200px',
                                                    border: '1px solid #e5e7eb',
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                }}
                                            >
                                                {actionOptions.map((option) => (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => handleActionSelection(option.value, student.id)}
                                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                                                    >
                                                        {option.value}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => setIsConfirming(true)} className="text-orange-500 hover:text-orange-700 mx-2">
                                        <img src="/icon/fi_trash-2.png" alt="Xóa" className="w-8 h-8" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isConfirming && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: 435 }}>
                        <h3 className="text-2xl font-bold text-center">Xóa học viên</h3>
                        <p className="text-base mt-5 mb-10 font-normal font-source-sans">
                            Xác nhận muốn xoá những thông tin đã chọn? Sau khi xoá sẽ không thể hoàn tác.
                        </p>
                        <div className="flex justify-between w-full px-4 font-bold">
                            <button onClick={() => setIsConfirming(false)} className=" px-4 py-2 rounded-lg w-40 h-14 text-lg font-mulis" style={{ backgroundColor: "#F2F2F2" }}>
                                Hủy
                            </button>
                            <button onClick={handleDeleteSelected} className="bg-orange-500 text-white px-4 py-2 rounded-lg w-40 h-14 text-lg">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload File Modal */}
            {Object.entries(isUploadModalOpen).map(
                ([studentId, isOpen]) =>
                    isOpen && (
                        <div key={studentId} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-3 rounded-lg shadow-lg" style={{ width: 884, maxWidth: '90%' }}>
                                <h3 className="text-lg font-bold text-center mb-3">Tải lên file</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <label className="text-sm font-medium text-gray-700 w-32">Tệp đính kèm:</label>
                                        <div className="flex-1 flex items-center border border-gray-300 rounded-md shadow-sm bg-white px-2 py-1">
                                            <img src={UPaperclip} alt="Paperclip" className="mr-2 w-4 h-4" />
                                            <input
                                                type="text"
                                                value={isOpen ? 'HTKT_KT45P_10A1.doc' : ''}
                                                className="flex-1 text-sm text-gray-700 border-none focus:outline-none"
                                                placeholder="Chọn loại tài liệu"
                                                readOnly
                                            />
                                            <button
                                                className="ml-3 px-3 py-1 text-sm text-orange-700 bg-orange-100 hover:bg-orange-200 rounded-r-md focus:outline-none"
                                                onClick={() => document.getElementById(`fileInput_${studentId}`)?.click()}
                                            >
                                                Chọn tệp tải lên...
                                            </button>
                                            <input
                                                id={`fileInput_${studentId}`}
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    handleUpload(studentId, file);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {' '}
                                        {/* Đặt nhãn trên input và canh bên trái, không có viền */}
                                        <label className=" text-sm font-medium text-gray-700 w-32">Tải file mẫu:</label>
                                        <div className="flex-1 flex items-center border  rounded-md border-none shadow-sm  px-2 py-1">
                                            <button
                                                className="flex items-center space-x-2 text-sm text-gray-700 border-none focus:outline-none"
                                                onClick={() => handleDownloadTemplate(studentId)}
                                            >
                                                <img src={FIDownload} alt="Download" className="w-4 h-4" />
                                                <span>Tải xuống file mẫu</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end space-x-4">
                                    {' '}
                                    {/* Tăng khoảng cách mt-6 và space-x-4 để khớp với hình ảnh */}
                                    <Button
                                        label="Hủy"
                                        size="medium"
                                        variant="outline"
                                        onClick={() => setIsUploadModalOpen((prev) => ({ ...prev, [studentId]: false }))}
                                        textColor="#6B7280" // Gray color as shown in the image
                                        border="2px solid #6B7280"
                                        hoverBackgroundColor="rgba(107, 114, 128, 0.1)"
                                    />
                                    <Button
                                        label="Tải lên"
                                        size="medium"
                                        variant="solid"
                                        onClick={() => {
                                            const fileInput = document.getElementById(`fileInput_${studentId}`) as HTMLInputElement;
                                            const file = fileInput?.files?.[0] || null;
                                            handleUpload(studentId, file);
                                        }}
                                        textColor="#ffffff"
                                        backgroundColor="#FF7506"
                                        hoverBackgroundColor="#E06504"
                                    />
                                </div>
                            </div>
                        </div>
                    ),
            )}

            {/* TransferClass */}
            {Object.entries(isTransferClassModalOpen).map(([studentId, isOpen]) => {
                if (!isOpen) return null;
                const student = students.find((s) => s.id === studentId);
                if (!student) return null;

                return (
                    <div key={studentId} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[884px] mx-auto">
                            <h2 className="text-28px font-bold text-center mb-4">Cập nhật chuyển lớp</h2>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Tên học viên:</span>
                                    <span className="text-16px">{student.name}</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Lớp hiện tại:</span>
                                    <span className="text-16px">{student.class}</span>
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Ngày chuyển lớp: <span className='text-red-500'>*</span></label>
                                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full w-4/12" />
                                    <input type="text" value={"Học Kỳ I"} readOnly name="" id="" className="border rounded p-2 w-28 bg-gray-200 text-gray-600 cursor-not-allowed ml-5" />
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Chuyển đến lớp: <span className='text-red-500'>*</span></label>
                                    <Dropdown options={optitionClass} disabled={false} icon="right" width="w-2/5" state="normal" />
                                </div>

                                <div className="flex">
                                    <label className="font-medium w-52 h-40 text-16px">Lý do chuyển lớp: <span className='text-red-500'>*</span></label>
                                    <textarea className="w-2/3 border rounded p-2 text-16px max-h-72" rows={3}></textarea>
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium pr-11">
                                        Tệp đính kèm: <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex flex-col w-9/12 pl-12">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border rounded-md px-4 py-2 w-full">
                                                <PaperclipIcon className="w-5 h-5 text-gray-500" />
                                                <span className="flex-1 px-2 text-gray-600">{fileName || 'Chưa có tệp nào được chọn'}</span>
                                                <input ref={fileInputRef} readOnly type="file" className="hidden" />
                                            </div>
                                            <button
                                                type="button"
                                                className="w-[200px] bg-[#FFD8B8] text-black border border-orange-500 px-1 py-1 rounded-md"
                                                onClick={handleFileUploadClick}>
                                                Chọn tệp tải lên
                                            </button>
                                        </div>

                                        <p className="text-sm text-gray-500 mt-2 italic"> Kiểu file .pdf .jpeg .png .jpg với dung lượng tối đa là 100 MB.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center space-x-4">
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex justify-center space-x-6 mt-10">
                                        <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => setIsTransferClassModalOpen((prev) => ({ ...prev, [studentId]: false }))} />
                                        <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* TransferSchool */}
            {Object.entries(isTransferSchoolModalOpen).map(([studentId, isOpen]) => {
                if (!isOpen) return null;
                const student = students.find((s) => s.id === studentId);
                if (!student) return null;

                return (
                    <div key={studentId} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[884px] mx-auto">
                            <h2 className="text-28px font-bold text-center mb-4">Cập nhật chuyển trường</h2>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Tên học viên:</span>
                                    <span className="text-16px">{student.name}</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Lớp hiện tại:</span>
                                    <span className="text-16px">{student.class}</span>
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Ngày chuyển trường: <span className='text-red-500'>*</span></label>
                                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full w-4/12" />
                                    <input type="text" value={"Học Kỳ I"} readOnly name="" id="" className="border rounded p-2 w-28 bg-gray-200 text-gray-600 cursor-not-allowed ml-5" />
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Chuyển đến trường: <span className='text-red-500'>*</span></label>
                                    <input type="text" name="" id="" className="border rounded p-2 w-8/12 " />
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Địa chỉ trường: <span className='text-red-500'>*</span></label>
                                    <input type="text" name="" id="" className="border rounded p-2 w-8/12 " />
                                </div>

                                <div className="flex">
                                    <label className="font-medium w-52 h-40 text-16px">Lý do chuyển lớp: <span className='text-red-500'>*</span></label>
                                    <textarea className="w-2/3 border rounded p-2 text-16px max-h-72" rows={3}></textarea>
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium pr-11">
                                        Tệp đính kèm: <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex flex-col w-9/12 pl-12">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border rounded-md px-4 py-2 w-full">
                                                <PaperclipIcon className="w-5 h-5 text-gray-500" />
                                                <span className="flex-1 px-2 text-gray-600">{fileName || 'Chưa có tệp nào được chọn'}</span>
                                                <input ref={fileInputRef} readOnly type="file" className="hidden" />
                                            </div>
                                            <button
                                                type="button"
                                                className="w-[200px] bg-[#FFD8B8] text-black border border-orange-500 px-1 py-1 rounded-md"
                                                onClick={handleFileUploadClick}>
                                                Chọn tệp tải lên
                                            </button>
                                        </div>

                                        <p className="text-sm text-gray-500 mt-2 italic"> Kiểu file .pdf .jpeg .png .jpg với dung lượng tối đa là 100 MB.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center space-x-4">
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex justify-center space-x-6 mt-10">
                                        <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => setIsTransferSchoolModalOpen((prev) => ({ ...prev, [studentId]: false }))} />
                                        <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* StudySuspension */}
            {Object.entries(isStudySuspensionModalOpen).map(([studentId, isOpen]) => {
                if (!isOpen) return null;
                const student = students.find((s) => s.id === studentId);
                if (!student) return null;

                return (
                    <div key={studentId} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[884px] mx-auto">
                            <h2 className="text-28px font-bold text-center mb-4">Cập nhật chuyển trường</h2>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Tên học viên:</span>
                                    <span className="text-16px">{student.name}</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="font-medium w-52 text-16px">Lớp hiện tại:</span>
                                    <span className="text-16px">{student.class}</span>
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">Ngày bảo lưu: <span className='text-red-500'>*</span></label>
                                    <DatePicker onChange={handleDateChange} value={date} className="max-w-full w-4/12" />
                                    <input type="text" value={"Học Kỳ I"} readOnly name="" id="" className="border rounded p-2 w-28 bg-gray-200 text-gray-600 cursor-not-allowed ml-5" />
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium w-52 text-16px">thời hạn bảo lưu: <span className='text-red-500'>*</span></label>
                                    <input type="text" name="" id="" className="border rounded p-2 w-8/12 " />
                                </div>

                                <div className="flex">
                                    <label className="font-medium w-52 h-40 text-16px ">Lý do bảo lưu: <span className='text-red-500'>*</span></label>
                                    <textarea className="w-2/3 border rounded p-2 text-16px max-h-72" rows={3}></textarea>
                                </div>

                                <div className="flex items-center">
                                    <label className="font-medium pr-11">
                                        Tệp đính kèm: <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex flex-col w-9/12 pl-12">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border rounded-md px-4 py-2 w-full">
                                                <PaperclipIcon className="w-5 h-5 text-gray-500" />
                                                <span className="flex-1 px-2 text-gray-600">{fileName || 'Chưa có tệp nào được chọn'}</span>
                                                <input ref={fileInputRef} readOnly type="file" className="hidden" />
                                            </div>
                                            <button
                                                type="button"
                                                className="w-[200px] bg-[#FFD8B8] text-black border border-orange-500 px-1 py-1 rounded-md"
                                                onClick={handleFileUploadClick}>
                                                Chọn tệp tải lên
                                            </button>
                                        </div>

                                        <p className="text-sm text-gray-500 mt-2 italic"> Kiểu file .pdf .jpeg .png .jpg với dung lượng tối đa là 100 MB.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center space-x-4">
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex justify-center space-x-6 mt-10">
                                        <Button label="Hủy" backgroundColor="#F2F2F2" size="big" variant="none" onClick={() => setIsStudySuspensionModalOpen((prev) => ({ ...prev, [studentId]: false }))} />
                                        <Button label="Lưu" size="big" variant="solid" onClick={handleSave} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Pagination */}
            <Pagination limit={itemsPerPage} activation={currentPage} max={Math.ceil(students.length / itemsPerPage)} />
        </div>
    );
};

export default ListStudent;
