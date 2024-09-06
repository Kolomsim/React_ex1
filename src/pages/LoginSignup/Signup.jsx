import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateForm } from '../../utils/validation.js';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        fullname: '',
    });

    const [errors, setErrors] = useState({}); 

    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/signup`,
                    formData
                );
                localStorage.setItem('accessToken', response.data.accessToken);
                const userData = {
                    id: response.data._id,
                    username: response.data.username,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                navigate('/example_page');
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        }
    };

    return (
        <div className='LoginBlock'>
            <div className='LoginInfoBlock'>
                <h1>Добро пожаловать в WorkNetwork!</h1>
                <p>Пожалуйста, зарегистрируйтесь, чтобы продолжить.</p>
            </div>
            <div className='loginOrRegister'>
                <form className='LoginForm' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='username'
                        placeholder='Логин'
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                    <input
                        type='text'
                        name='fullname'
                        placeholder='Имя'
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <input
                        type='password'
                        name='password'
                        placeholder='Пароль'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Подтвердите пароль'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    <button type='submit'>Регистрация</button>
                </form>
                <div className='goToLogin'>
                    <Link to='/login'>
                        <button>Войти</button>
                    </Link>
                    <p>Уже есть аккаунт в WorkNetwork? Войдите в него!</p>
                </div>
            </div>
        </div>
    );
}
