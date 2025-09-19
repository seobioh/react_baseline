import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import './AccountEdit.css';

const AccountEdit : React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({name: '', mobile: '', birthYear: '', birthMonth: '', birthDay: '', gender: ''});
    const [originalData, setOriginalData] = useState({name: '', mobile: '', birthYear: '', birthMonth: '', birthDay: '', gender: ''});

    const navigate = useNavigate();
    const { token, user, updateAccount } = useAccountStore();
    
    useEffect(() => {
        if (!token) {
            navigate('/accounts/login');
        }
    }, [token, navigate]);
    
    useEffect(() => {
        if (user) {
            const birthday = user.birthday || '';
            const [year, month, day] = birthday ? birthday.split('-') : ['', '', ''];
            const userData = {
                name: user.name || '',
                mobile: user.mobile || '',
                birthYear: year || '',
                birthMonth: month || '',
                birthDay: day || '',
                gender: user.gender || ''
            };
            setFormData(userData);
            setOriginalData(userData);
        }
    }, [user]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);     
        try {
            const submitData: any = {
                name: formData.name,
                mobile: formData.mobile.replace(/-/g, ''),
                gender: formData.gender
            };
            
            // birthday가 모두 입력되었을 때만 포함
            if (formData.birthYear && formData.birthMonth && formData.birthDay) {
                const birthday = `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`;
                submitData.birthday = birthday;
            }
            
            await updateAccount(submitData);
            alert('계정 정보가 성공적으로 수정되었습니다.');
            navigate('/accounts');
        } catch (error) {
            console.error('계정 정보 수정 실패:', error);
            alert('계정 정보 수정에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/accounts');
    };

    const hasChanges = () => {
        return (
            formData.name !== originalData.name ||
            formData.mobile !== originalData.mobile ||
            formData.birthYear !== originalData.birthYear ||
            formData.birthMonth !== originalData.birthMonth ||
            formData.birthDay !== originalData.birthDay ||
            formData.gender !== originalData.gender
        );
    };


    if (!token) {
        return null;
    }

    return (
        <div className="account-edit">
            <div className="account-edit-container">
                <div className="account-edit-space" />
                <h3>계정 정보 수정</h3>
                <div className="account-edit-space-small" />
                <p>계정 정보를 수정하면 재인증이 필요할 수 있습니다.</p>
                <div className="account-edit-space" />
                <div className="account-edit-input-field">
                    <label>이메일</label>
                    <input
                        className={'account-edit-input-invalid'}
                        type="text"
                        placeholder="이메일"
                        value={user?.email}
                        disabled
                    />
                </div>
                <div className="account-edit-input-field">
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="account-edit-input-field">
                    <label>휴대폰 번호</label>
                    <input
                        type="text"
                        name="mobile"
                        placeholder="전화번호"
                        value={formData.mobile}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="account-edit-input-field">
                    <label>생년월일</label>
                    <div className="account-edit-birthday-row">
                        <input
                            type="number"
                            name="birthYear"
                            placeholder="년"
                            value={formData.birthYear}
                            onChange={handleInputChange}
                            min="1900"
                            max="2024"
                        />
                        <p>.</p>
                        <input
                            type="number"
                            name="birthMonth"
                            placeholder="월"
                            value={formData.birthMonth}
                            onChange={handleInputChange}
                            min="1"
                            max="12"
                        />
                        <p>.</p>
                        <input
                            type="number"
                            name="birthDay"
                            placeholder="일"
                            value={formData.birthDay}
                            onChange={handleInputChange}
                            min="1"
                            max="31"
                        />
                    </div>
                </div>
                <div className="account-edit-input-field">
                    <label>성별</label>
                    <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">성별을 선택하세요</option>
                        <option value="MALE">남성</option>
                        <option value="FEMALE">여성</option>
                    </select>
                </div>
                <button 
                    onClick={handleSubmit} 
                    disabled={isLoading || !hasChanges()}
                    className={hasChanges() ? 'account-edit-button-valid' : 'account-edit-button-invalid'}
                >
                    {isLoading ? '수정 중...' : '수정'}
                </button>
                <button onClick={handleCancel}>취소</button>
            </div>
        </div>
    )
}

export default AccountEdit;