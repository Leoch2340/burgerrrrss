import React, { FormEventHandler } from 'react'; // Импорт React и типа FormEventHandler для обработки событий формы
import { useSelector, useDispatch } from '../services/hooks'; // Хуки для взаимодействия с Redux store
import styles from './pages.module.css'; // Импорт CSS-модуля для стилизации компонента
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; // Компоненты для ввода данных и кнопки
import { Link, Redirect } from 'react-router-dom'; // Компоненты Link и Redirect для навигации
import { resetPassword } from '../services/actions/reset-password'; // Действие для сброса пароля

export const ResetPassword = () => { // Основной компонент для сброса пароля

    const dispatch = useDispatch(); // Диспетчер для отправки действий в Redux

    // Получение данных из состояния Redux
    const forgot = useSelector((state) => state.forgotPassword.success); // Флаг успешного запроса на восстановление пароля
    const authorization = useSelector((state) => state.userAuthorization.authorization); // Флаг авторизации пользователя

    // Локальное состояние для хранения введенных данных (пароль и токен)
    const [value, setValue] = React.useState({
        password: '',
        token: ''
    })

    // Обработчик отправки формы для сброса пароля
    const handleReset: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault(); // Предотвращение стандартного поведения формы
        dispatch(resetPassword(value.password, value.token)); // Диспатч действия сброса пароля с введенными данными
    }

    // Ссылка на input для фокусировки на нем при клике на иконку
    const inputRef = React.useRef<HTMLInputElement>(null);
    const onIconClick = () => { // Коллбек для клика на иконку
        setTimeout(() => inputRef.current?.focus(), 0); // Установка фокуса на input
        alert('Icon Click Callback'); // Всплывающее сообщение при клике
    }

    // Условие для редиректа, если запрос на восстановление пароля не был сделан (ошибка)
    if (!forgot) {
        return (
            <Redirect to={'/login'} /> // Перенаправление на страницу входа, если нет успешного запроса на восстановление пароля
        )
    }
    
    // Условие для редиректа, если пользователь уже авторизован
    if (authorization) {
        return (
            <Redirect to={'/profile'} /> // Перенаправление на страницу профиля, если пользователь авторизован
        )
    }

    return (
        <form className={styles.default} onSubmit={handleReset}> {/* Форма для сброса пароля */}
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            {/* Поле для ввода нового пароля */}
            <PasswordInput
                placeholder='Введите новый пароль'
                onChange={(evt) => setValue({ ...value, password: evt.target.value })}
                value={value.password}
                name={'password'}
                icon="ShowIcon"
                extraClass="mt-6"
            />
            {/* Поле для ввода токена из письма */}
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={(evt) => setValue({ ...value, token: evt.target.value })}
                value={value.token}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mt-6"
            />
            {/* Кнопка для отправки формы */}
            <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6">Сохранить</Button>
            {/* Ссылки для перехода на страницу входа */}
            <div className={`${styles.choice} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
            </div>
        </form>
    )
}
