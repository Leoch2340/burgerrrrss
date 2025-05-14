import React, { FormEventHandler } from 'react'; // Импорт React и FormEventHandler для работы с формами
import { useSelector, useDispatch } from '../services/hooks'; // Импорт хука useSelector для доступа к состоянию и useDispatch для отправки действий в Redux
import styles from './pages.module.css'; // Импорт CSS-модулей для стилизации компонента
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'; // Импорт компонентов EmailInput и Button из библиотеки UI
import { Link, Redirect } from 'react-router-dom'; // Импорт Link для перехода между страницами и Redirect для редиректа
import { forgotPassword } from '../services/actions/forgot-password'; // Импорт действия для восстановления пароля

export const ForgotPassword = () => { // Объявление компонента ForgotPassword
    const dispatch = useDispatch(); // Получение dispatch для отправки действий в Redux

    const success = useSelector((state) => state.forgotPassword.success); // Получение состояния успеха восстановления пароля
    const authorization = useSelector((state) => state.userAuthorization.authorization); // Получение состояния авторизации пользователя

    const [value, setValue] = React.useState({ // Хук состояния для хранения введенного email
        email: ''
    });

    const handleRecover: FormEventHandler<HTMLFormElement> = (evt) => { // Обработчик отправки формы для восстановления пароля
        evt.preventDefault(); // Отмена стандартного поведения формы (перезагрузки страницы)
        dispatch(forgotPassword(value.email)); // Отправка действия для восстановления пароля с введенным email
    }

    if (success) { // Если операция восстановления пароля прошла успешно
        return (
            <Redirect to={'/reset-password'} /> // Перенаправление на страницу сброса пароля
        )
    }
    
    if (authorization) { // Если пользователь уже авторизован
        return (
            <Redirect to={'/profile'} /> // Перенаправление на страницу профиля
        )
    }

    return (
        <form className={styles.default} onSubmit={handleRecover}> {/* Форма для ввода email и восстановления пароля */}
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <EmailInput
                onChange={(evt) => setValue({ ...value, email: evt.target.value })} // Обработчик изменения email
                value={value.email} // Текущее значение email
                name={'email'} // Имя поля
                extraClass="mt-6" // Дополнительный класс для отступов
                placeholder='Укажите e-mail' // Плейсхолдер для поля ввода
            />
            <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6">Восстановить</Button> {/* Кнопка для отправки формы */}
            <div className={`${styles.choice} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link> {/* Ссылка для перехода на страницу входа */}
            </div>
        </form>
    )
}
