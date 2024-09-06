export const validateForm = (formData) => {
    const errors = {};

    if (!formData.username.match(/^[\w_]{8,}$/)) {
        errors.username = 'Логин должен содержать минимум 8 символов и состоять только из латинских букв, цифр и символа "_".';
    }

    if (!formData.password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)) {
        errors.password = 'Пароль должен содержать минимум 8 символов и включать хотя бы одну заглавную букву, одну цифру и один спецсимвол.';
    }

    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают.';
    }

    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        errors.email = 'Некорректный email.';
    }

    return errors;
};