import React, { FormEventHandler } from 'react'; // Импорт React и типа FormEventHandler для обработки событий формы
import { useSelector, useDispatch } from '../services/hooks'; // Импорт хука useSelector для доступа к состоянию и useDispatch для отправки действий
import styles from './pages.module.css'; // Импорт CSS-модулей для стилизации компонента
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'; // Импорт компонентов для ввода email, пароля и кнопки
import { Link, Redirect } from 'react-router-dom'; // Импорт компонентов Link для навигации и Redirect для редиректа
import { userAuthorization } from '../services/actions/authorization'; // Импорт действия userAuthorization для авторизации пользователя

export const Authorization = () => { // Объявление компонента Authorization
    const dispatch = useDispatch(); // Получение dispatch из хука useDispatch для отправки действий
    const authorization = useSelector((state) => state.userAuthorization.authorization); // Получение состояния авторизации из Redux

    // Создание состояния для хранения введенных данных (email и пароль)
    const [value, setValue] = React.useState({
        email: '', // Изначальное значение для email
        password: '' // Изначальное значение для пароля
    })

    // Функция для обработки отправки формы (авторизация пользователя)
    const handleAuthorization: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault(); // Отмена стандартного поведения формы
        dispatch(userAuthorization(value.email, value.password)); // Отправка действия для авторизации с введенными email и паролем
    }

    // Если пользователь уже авторизован, редирект на страницу, указанную в параметре 'retpath', или на главную
    if (authorization) {
        const searchParams = new URLSearchParams(window.location.search) // Создание объекта URLSearchParams для работы с параметрами URL
        return (
            <Redirect to={searchParams.get('retpath') ||  '/'} /> // Перенаправление на страницу, указанную в 'retpath', или на главную
        )
    }

    // Возврат JSX разметки для формы авторизации
    return (
        <form className={styles.default} onSubmit={handleAuthorization}> {/* Форма с обработчиком submit */}
            <h2 className="text text_type_main-medium">Вход</h2> {/* Заголовок формы */}
            <EmailInput
                onChange={(evt) => setValue({ ...value, email: evt.target.value })} // Обработчик изменения email
                value={value.email} // Значение email из состояния
                name={'email'} // Имя поля
                extraClass="mt-6" // Дополнительный класс для стилизации
            />
            <PasswordInput
                onChange={(evt) => setValue({ ...value, password: evt.target.value })} // Обработчик изменения пароля
                value={value.password} // Значение пароля из состояния
                name={'password'} // Имя поля
                icon="ShowIcon" // Иконка для отображения/скрытия пароля
                extraClass="mt-6" // Дополнительный класс для стилизации
            />
            <Button type="primary" size="medium" htmlType="submit" extraClass="mt-6">Войти</Button> {/* Кнопка для отправки формы */}
            <div className={`${styles.choice} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p> {/* Вопрос о новом пользователе */}
                <Link to='/register' className={`${styles.link} text text_type_main-default`}>Зарегистрироваться</Link> {/* Ссылка на страницу регистрации */}
            </div>
            <div className={`${styles.choice} mt-4`}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p> {/* Вопрос о восстановлении пароля */}
                <Link to='/forgot-password' className={`${styles.link} text text_type_main-default`}>Восстановить пароль</Link> {/* Ссылка на страницу восстановления пароля */}
            </div>
        </form>
    )
}
