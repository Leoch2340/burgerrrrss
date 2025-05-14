import { useEffect } from "react"; // Импорт хука useEffect для работы с побочными эффектами
import { useDispatch } from "../services/hooks"; // Импорт хука useDispatch для диспатча действий в Redux
import styles from './pages.module.css'; // Импорт стилей для компонента, определённых в CSS-модуле
import { Route } from 'react-router-dom'; // Импорт компонента Route для работы с роутингом
import { ProfileMenu } from '../components/profile-menu/profile-menu'; // Импорт компонента меню профиля
import { UpdateProfileForm } from '../components/update-profile-form/update-profile-form'; // Импорт формы обновления профиля
import { OrderHistory } from '../components/order-history/order-history'; // Импорт компонента истории заказов
import { wsConnectionStartUser, wsConnectionClosedUser } from '../services/actions/websockets'; // Импорт действий для управления WebSocket-соединением для пользователя

export const Profile = () => { // Основной компонент профиля пользователя
  const dispatch = useDispatch(); // Инициализация диспетчера Redux

  useEffect(() => { // Эффект, который запускает соединение с WebSocket сервером для пользователя
    dispatch(wsConnectionStartUser()); // Запуск WebSocket-соединения для получения данных о заказах пользователя
    return () => { // Очистка WebSocket-соединения при размонтировании компонента
      dispatch(wsConnectionClosedUser()); // Закрытие WebSocket-соединения
    };
  }, []); // Пустой массив зависимостей гарантирует, что эффект будет выполнен только один раз при монтировании компонента

  return (
    <section className={styles.profile}> {/* Основная обертка для профиля */}
      <ProfileMenu /> {/* Компонент для отображения меню профиля */}
      <Route exact path="/profile" component={UpdateProfileForm} /> {/* Роут для страницы с формой обновления профиля */}
      <Route path="/profile/orders" component={OrderHistory} /> {/* Роут для страницы с историей заказов */}
    </section>
  )
}
