// Импорт иконок из UI-библиотеки Яндекс Практикума
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// Импорт CSS-модуля для стилизации хедера
import styles from './app-header.module.css';
// Импорт компонентов навигации из react-router-dom
import { NavLink, useRouteMatch } from 'react-router-dom';

// Компонент шапки приложения
export function AppHeader() {
    // Проверка, находится ли пользователь на главной странице ("/")
    const isConstructor = useRouteMatch({ path: "/", exact: true });
    // Проверка, находится ли пользователь на странице ленты заказов ("/feed")
    const isFeed = useRouteMatch({ path: "/feed" });
    // Проверка, находится ли пользователь на странице профиля ("/profile")
    const isProfile = useRouteMatch({ path: "/profile" });

    return (
        // Обёртка для шапки
        <header className={styles.header}>
            {/* Навигационная панель */}
            <nav className={styles.navigation}>
                {/* Список навигационных элементов */}
                <ul className={styles.list}>
                    {/* Левая колонка с двумя пунктами: Конструктор и Лента заказов */}
                    <div className={styles.columns}>
                        <li>
                            {/* Ссылка на главную страницу */}
                            <NavLink to='/' className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
                                {/* Иконка "Бургер" меняет цвет в зависимости от активного маршрута */}
                                <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
                                {/* Подпись к иконке */}
                                <p className={isConstructor ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>
                                    Конструктор
                                </p>
                            </NavLink>
                        </li>
                        <li>
                            {/* Ссылка на страницу ленты заказов */}
                            <NavLink to='/feed' className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
                                {/* Иконка списка */}
                                <ListIcon type={isFeed ? 'primary' : 'secondary'} />
                                {/* Подпись к иконке */}
                                <p className={isFeed ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>
                                    Лента заказов
                                </p>
                            </NavLink>
                        </li>
                    </div>
                    {/* Центр — логотип */}
                    <li className={styles.logo}>
                        {/* Ссылка на главную страницу с логотипом */}
                        <NavLink to='/'>
                            <Logo />
                        </NavLink>
                    </li>
                    {/* Правая часть — личный кабинет */}
                    <li className={styles.personal_account}>
                        {/* Ссылка на страницу профиля */}
                        <NavLink to='/profile' className={`${styles.link} pl-5 pr-5 pt-4 pb-4`} >
                            {/* Иконка профиля */}
                            <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
                            {/* Подпись к иконке */}
                            <p className={isProfile ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>
                                Личный кабинет
                            </p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
