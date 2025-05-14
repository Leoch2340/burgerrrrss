import React from 'react'; // Импорт React для использования JSX и функциональных компонентов
import { useSelector, useDispatch } from '../../services/hooks'; // Импорт хука useSelector для доступа к состоянию Redux и useDispatch для отправки экшенов
import styles from './profile-menu.module.css'; // Импорт стилей CSS-модуля для компонента
import { NavLink, useHistory, Redirect, useLocation } from 'react-router-dom'; // Импорт компонентов React Router для навигации
import { userLogout } from '../../services/actions/logout'; // Импорт действия для выхода пользователя

export function ProfileMenu() { // Функциональный компонент ProfileMenu

    const dispatch = useDispatch(); // Хук useDispatch для отправки экшенов в Redux
    const location = useLocation(); // Хук useLocation для получения текущего маршрута
    // const history = useHistory(); // Закомментированное использование хука useHistory для работы с историей маршрутов
    const authorization = useSelector((state) => state.userAuthorization.authorization); // Получаем состояние авторизации пользователя из Redux

    const handleLogout = React.useCallback(() => { // useCallback для оптимизации функции выхода
        dispatch(userLogout()); // Отправляем экшен для выхода пользователя
    }, [dispatch]); // Зависимость от dispatch

    // React.useEffect(() => { // Закомментированный хук, который следил за состоянием авторизации
    //     if (!authorization) { 
    //         history.push('/login'); // Если пользователь не авторизован, перенаправляем на страницу входа
    //     }
    // }, [authorization, history]); // Зависимости от authorization и history

    if (!authorization) { // Если пользователь не авторизован
        return (
            <Redirect to={'/login'} /> // Перенаправляем пользователя на страницу логина
        );
    }

    return ( // Возвращаем JSX для меню профиля
        <section className={styles.menu}> {/* Контейнер для меню */}
            <nav className={styles.navigation}> {/* Навигация в меню */}
                <NavLink
                    to='/profile' // Ссылка на страницу профиля
                    exact={true} // Ссылка активируется только на точное совпадение пути
                    className={`${styles.link} text text_type_main-medium text_color_inactive`} // Классы для стилей
                    activeClassName={styles.link_active} // Класс для активной ссылки
                >
                    Профиль
                </NavLink>
                <NavLink
                    to='/profile/orders' // Ссылка на страницу истории заказов
                    className={`${styles.link} text text_type_main-medium text_color_inactive`} // Классы для стилей
                    activeClassName={styles.link_active} // Класс для активной ссылки
                >
                    История заказов
                </NavLink>
                <button
                    onClick={handleLogout} // Кнопка выхода, вызывает handleLogout при клике
                    className={`${styles.button} text text_type_main-medium text_color_inactive`} // Классы для стилей кнопки
                >
                    Выход
                </button>
            </nav>
            <span className="text text_type_main-default text_color_inactive mt-20"> {/* Описание функционала в меню */}
                В этом разделе вы можете
            </span>
            {location.pathname === '/profile' ? // Проверка текущего маршрута
                <span className="text text_type_main-default text_color_inactive">изменить свои персональные данные</span> // Текст для страницы профиля
                : <span className="text text_type_main-default text_color_inactive">просмотреть свою историю заказов</span> // Текст для страницы истории заказов
            }
        </section>
    );
}
