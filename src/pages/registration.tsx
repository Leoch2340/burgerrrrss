import React, { FormEventHandler } from 'react'; // Импорт React и типа FormEventHandler для обработки форм
import { useSelector, useDispatch } from '../services/hooks'; // Импорт хуков useSelector и useDispatch для работы с Redux
import styles from './pages.module.css'; // Импорт стилей из CSS-модуля
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'; // Импорт компонентов UI для формы
import { userRegistration } from '../services/actions/registration'; // Импорт действия регистрации пользователя
import { Link, Redirect } from 'react-router-dom'; // Импорт компонентов Link и Redirect из react-router для навигации

export const Registration = () => { // Основной компонент формы регистрации

    const success = useSelector((state) => state.registration.success); // Получение состояния успешной регистрации из Redux
    const dispatch = useDispatch(); // Инициализация диспетчера Redux

    // Состояние для хранения значений полей формы
    const [value, setValue] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    // Обработчик отправки формы
    const handleRegistration: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault(); // Отмена стандартного поведения формы
        dispatch(userRegistration(value.name, value.email, value.password)); // Диспатч действия для регистрации пользователя
    }

    // Ссылка на input для фокуса
    const inputRef = React.useRef<HTMLInputElement>(null);
    const onIconClick = () => { // Коллбек для клика на иконку
        setTimeout(() => inputRef.current?.focus(), 0); // Фокус на поле ввода
        alert('Icon Click Callback'); // Всплывающее сообщение при клике
    }

    // Условие для редиректа на страницу входа, если регистрация успешна (закомментировано)
    // if (success) {
    //     return (
    //         <Redirect to={'/login'} />
    //     )
    // }

    return (
        <form className={styles.default} onSubmit={handleRegistration}> {/* Форма с обработчиком отправки */}
            <h2 className="text text_type_main-medium">Регистрация</h2>
            {/* Поле ввода имени */}
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={(evt) => setValue({ ...value, name: evt.target.value })}
                value={value.name}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mt-6"
            />
            {/* Поле ввода email */}
            <EmailInput
                onChange={(evt) => setValue({ ...value, email: evt.target.value })}
                value={value.email}
                name={'email'}
                extraClass="mt-6"
            />
            {/* Поле ввода пароля */}
            <PasswordInput
                onChange={(evt) => setValue({ ...value, password: evt.target.value })}
                value={value.password}
                name={'password'}
                icon="ShowIcon"
                extraClass="mt-6"
            />
            {/* Кнопка отправки формы */}
            <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6">Зарегистрироваться</Button>
            {/* Ссылки для перехода на страницу входа, если уже есть учетная запись */}
            <div className={`${styles.choice} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
            </div>
            {/* Редирект на страницу входа при успешной регистрации */}
            {success ? <Redirect to={'/login'} /> : <Redirect to={'/register'} />}
        </form>
    )
}
