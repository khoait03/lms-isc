import React from 'react'
import Dropdown from '../../../../components/Dropdown'
import Button from '../../../../components/Button';
import { FaCheck, FaEdit, FaPlus, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from '../../../../components/Input';
import DatePicker from '../../../../components/DatePicker';


export default function SchoolPage() {
    interface DropdownOption {
        id: number;
        value: string;
    }

    interface DropdownProps {
        options: DropdownOption[];
        onChange: (selected: DropdownOption) => void;
        value?: string;
    }

    const yearOptions: DropdownOption[] = Array.from({ length: 50 }, (_, i) => {
        const startYear = 2000 + i;
        const endYear = startYear + 1;
        return {
            id: startYear,
            value: `${startYear}-${endYear}`, // Định dạng "YYYY-YYYY"
        };
    });
    const hinhThucDaoTaoOptions: DropdownOption[] = [
        { id: 1, value: "Công lập" },
        { id: 2, value: "Tư nhân" }
    ];
    const loaiTruongOptions: DropdownOption[] = [
        { id: 1, value: "Trung học cơ sở" },
        { id: 2, value: "Trung học phổ thông" }
    ];
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [schoolData, setSchoolData] = useState({
        email: "nguyesssss@gmail.com",
        manager: "Nguyễn Văn A",
        phone1: "014521447741",
        phone2: "014521447741",
        address: "12 Nguyễn Văn A, phường 12, Quận 6, TP. Hồ Chí Minh",
    });

    const handleChange = (field: string, value: string) => {
        setSchoolData((prev) => ({ ...prev, [field]: value }));
    };
    const [school, setSchool] = useState({
        tenTruong: "THCS Tự Lập",
        fax: "09085677667",
        maChuan: "20202021",
        email: "nguyenasjke@gmail.com",
        tinhThanh: "Tp. Hồ Chí Minh",
        ngayThanhLap: "05/09/2013",
        xaPhuong: "Phường 1",
        hinhThucDaoTao: "Công lập",
        quanHuyen: "Bình Thạnh",
        website: "https://truongabc.com.vn",
        truSoChinh: "Không",
        hieuTruong: "Bùi Văn Phát",
        loaiTruong: "Trung học cơ sở",
        sdtHieuTruong: "0989222112",
        soDienThoai: "0123456789",
    });

    // Hàm cập nhật giá trị khi nhập liệu
    const handleChangeSchol = (field: string, value: string) => {
        setSchool((prev) => ({ ...prev, [field]: value }));
    };
    const dropdownFields = ["loaiTruong", "hinhThucDaoTao"];
    const fieldLabels: Record<string, string> = {
        tenTruong: "Tên trường",
        fax: "Fax",
        maChuan: "Mã chuẩn",
        email: "Email",
        tinhThanh: "Tỉnh/Thành phố",
        ngayThanhLap: "Ngày thành lập",
        xaPhuong: "Xã/Phường",
        hinhThucDaoTao: "Hình thức đào tạo",
        quanHuyen: "Quận/Huyện",
        website: "Website",
        truSoChinh: "Trụ sở chính",
        hieuTruong: "Hiệu trưởng",
        loaiTruong: "Loại trường",
        sdtHieuTruong: "SĐT Hiệu trưởng",
        soDienThoai: "Số điện thoại",
    };

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">Thông tin nhà trường</h1>
                <div className="flex justify-between items-center w-full mb-3 mt-3">
                    {/* Dropdown nằm bên trái */}
                    <div className="w-1/2 flex">
                        <Dropdown options={yearOptions} />
                    </div>

                    {/* Hai nút nằm bên phải */}
                    <div className="w-1/2 flex justify-end gap-3">
                        <Button
                            label="Xuất file"
                            textColor="#FF7506"
                            backgroundColor="white"
                            size="mini"
                            variant="outline"
                            onClick={() => navigate('addButtonLink')}
                        />
                        <Button
                            label={isEditing ? "Lưu" : "Chỉnh sửa"}
                            textColor="white"
                            backgroundColor="#FF7506"
                            size="mini"
                            variant="none"
                            onClick={() => setIsEditing(!isEditing)}
                            icon={isEditing ? <FaSave /> : <FaEdit />}
                        />
                    </div>
                </div>


            </div>
            <div className="p-6 bg-gray-100">
                {/* Thông tin chung */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
                    <div className="bg-orange-700 text-white p-4 font-semibold">Thông tin chung</div>
                    <div className="p-6 flex">
                        {/* Logo */}
                        <div className="w-1/3 flex justify-center items-center">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="School Logo"
                                className="w-40 h-40 object-cover rounded-full"
                            />
                        </div>

                        {/* Thông tin trường */}
                        <div className="w-2/3 grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
                            <h2 className="col-span-2 text-orange-700 font-semibold text-lg">
                                Trung học cơ sở Tự Lập
                            </h2>

                            {Object.entries(school).map(([key, value]) => (
                                <p key={key} className="flex items-center">
                                    <strong className="w-40 capitalize">{fieldLabels[key] || key}:</strong>

                                    {isEditing ? (
                                        key === "ngayThanhLap" ? (
                                            <DatePicker
                                                value={value}
                                                onChange={(date) => handleChange(key, date || "")}
                                                placeholder="Chọn ngày"
                                                width="200px"
                                                height="40px"
                                            />
                                        ) : key === "loaiTruong" ? (
                                            <Dropdown
                                                options={loaiTruongOptions}
                                                width="long"
                                            />
                                        ) : dropdownFields.includes(key) ? (
                                            <Dropdown
                                                options={hinhThucDaoTaoOptions}
                                                width="long"
                                            />
                                        ) : (
                                            <Input
                                                type="text"
                                                value={value}
                                                border="grey"
                                                size="medium"
                                                onChange={(e) => handleChange(key, e.target.value)}
                                            />
                                        )
                                    ) : (
                                        value
                                    )}
                                </p>
                            ))}

                        </div>
                    </div>
                </div>

                {/* Danh sách cơ sở */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">
                    <div className="bg-orange-700 text-white p-4 font-semibold flex justify-between">
                        <span>Danh sách cơ sở</span>
                        <div className="flex space-x-3">
                            {isEditing ? (
                                <>
                                    <FaCheck
                                        className="cursor-pointer text-white text-lg"
                                        onClick={() => setIsEditing(false)}
                                    />
                                    <FaTimes
                                        className="cursor-pointer text-white text-lg"
                                        onClick={() => setIsEditing(false)}
                                    />
                                </>
                            ) : (
                                <FaEdit
                                    className="cursor-pointer text-white text-lg"
                                    onClick={() => setIsEditing(true)}
                                />
                            )}
                            <FaTrash className="cursor-pointer text-white text-lg" />
                        </div>
                    </div>

                    <div className="p-6 flex">
                        <div className="w-1/3">
                            <img
                                src="https://via.placeholder.com/200"
                                alt="Classroom"
                                className="w-full h-40 object-cover rounded-lg"
                            />
                        </div>

                        <div className="w-2/3 grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
                            <h2 className="col-span-2 text-orange-700 font-semibold text-lg">
                                Trung học cơ sở Tự Lập Cơ Sở A
                            </h2>

                            {/* Email */}
                            <p className="flex items-center">
                                <strong>Email:&nbsp;</strong>
                                {isEditing ? (
                                    <Input
                                        type="text"
                                        border="grey"
                                        size="medium"
                                        value={schoolData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                    />
                                ) : (
                                    schoolData.email
                                )}
                            </p>

                            {/* Người phụ trách */}
                            <p className="flex items-center">
                                <strong>Người phụ trách:&nbsp;</strong>
                                {isEditing ? (
                                    <Input
                                        type="text"
                                        border="grey"
                                        size="medium"
                                        value={schoolData.manager}
                                        onChange={(e) => handleChange("manager", e.target.value)}
                                    />
                                ) : (
                                    schoolData.manager
                                )}
                            </p>

                            {/* Số điện thoại */}
                            <p className="flex items-center">
                                <strong>SDT 1:&nbsp;</strong>
                                {isEditing ? (
                                    <Input
                                        type="text"
                                        border="grey"
                                        size="medium"
                                        value={schoolData.phone1}
                                        onChange={(e) => handleChange("phone1", e.target.value)}
                                    />
                                ) : (
                                    schoolData.phone1
                                )}
                            </p>

                            <p className="flex items-center">
                                <strong>SDT 2:&nbsp;</strong>
                                {isEditing ? (
                                    <Input
                                        type="text"
                                        border="grey"
                                        size="medium"
                                        value={schoolData.phone2}
                                        onChange={(e) => handleChange("phone2", e.target.value)}
                                    />
                                ) : (
                                    schoolData.phone2
                                )}
                            </p>

                            {/* Địa chỉ */}
                            <p className="col-span-2 flex items-center">
                                <strong>Địa chỉ:&nbsp;</strong>
                                {isEditing ? (
                                    <Input
                                        type="text"
                                        border="grey"
                                        size="medium"
                                        value={schoolData.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                    />
                                ) : (
                                    schoolData.address
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
