// Импорт библиотеки React
import React from 'react';
// Импорт хука useDispatch из кастомных хуков
import { useDispatch } from '../../services/hooks';
// Импорт компонента шапки приложения
import { AppHeader } from '../app-header/app-header';
// Импорт компонента модального окна
import { Modal } from '../modal/modal';
// Импорт компонента с деталями ингредиента
import { IngredientDetails } from '../ingredient-details/ingredient-details';
// Импорт действия для получения ингредиентов
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
// Импорт компонентов маршрутизации и хука useLocation
import { Switch, Route, useLocation } from 'react-router-dom';
// Импорт страницы регистрации
import { Registration } from '../../pages/registration';
// Импорт страницы авторизации
import { Authorization } from '../../pages/authorization';
// Импорт страницы восстановления пароля
import { ForgotPassword } from '../../pages/forgot-password';
// Импорт страницы сброса пароля
import { ResetPassword } from '../../pages/reset-password';
// Импорт страницы профиля
import { Profile } from '../../pages/profile';
// Импорт главной страницы
import { Main } from '../../pages/main';
// Импорт страницы информации об ингредиенте
import { IngredientInfo } from '../../pages/ingredient-info';
// Импорт защищённого маршрута (только для авторизованных)
import { ProtectedRoute } from '../protected-route/protected-route';
// Импорт страницы ленты заказов
import { Feed } from '../../pages/feed';
// Импорт типа местоположения (location)
import { TLocation } from '../../services/types/types';
// Импорт компонента заказа
import { Order } from '../order/order';
// Импорт страницы информации о заказе
import { OrderInfo } from '../../pages/order-info';
// Импорт компонента заказа пользователя
import { OrderUser } from '../order-user/order-user';
// Импорт страницы информации о заказе в профиле
import { ProfileOrderInfo } from '../../pages/profile-order-info';
// Импорт хука useSelector из кастомных хуков
import { useSelector } from '../../services/hooks';

// Основной компонент приложения
export function App() {

  // Получение dispatch-функции Redux
  const dispatch = useDispatch();
  // Получение текущего местоположения (URL) и типа TLocation
  const location = useLocation<TLocation>();
  // Проверка, есть ли фоновое местоположение (для отображения модального окна)
  const background = location.state && location.state.background;

  // Эффект, вызывающий загрузку ингредиентов при монтировании компонента
  React.useEffect(() => {
    dispatch(getBurgerIngredients())
  }, [dispatch])

  // Получение ингредиентов из Redux-состояния
  const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients);
  // Вывод ингредиентов в консоль для отладки
  console.log(ingredients)

  // Возврат JSX разметки
  return (
    <>
      {/* Отображение шапки приложения */}
      <AppHeader />

      {/* Основные маршруты приложения */}
      <Switch location={background || location}>
        {/* Главная страница */}
        <Route exact path="/" component={Main} />
        {/* Информация об ингредиенте */}
        <Route exact path="/ingredients/:id" component={IngredientInfo} />
        {/* Регистрация */}
        <Route exact path="/register" component={Registration} />
        {/* Авторизация */}
        <Route exact path="/login" component={Authorization} />
        {/* Восстановление пароля */}
        <Route exact path="/forgot-password" component={ForgotPassword} />
        {/* Сброс пароля */}
        <Route exact path="/reset-password" component={ResetPassword} />
        {/* Лента заказов */}
        <Route exact path="/feed" component={Feed} />
        {/* Информация о заказе из ленты */}
        <Route exact path="/feed/:id" component={OrderInfo} />
        {/* Защищённый маршрут — профиль */}
        <ProtectedRoute exact path="/profile" component={Profile} />
        {/* Защищённый маршрут — список заказов пользователя */}
        <ProtectedRoute exact path="/profile/orders" component={Profile} />
        {/* Защищённый маршрут — детальная информация о заказе пользователя */}
        <ProtectedRoute exact path="/profile/orders/:id" component={ProfileOrderInfo} />
      </Switch>

      {/* Отображение модальных окон поверх текущей страницы, если есть фон */}
      {background && (
        <>
          {/* Модальное окно с деталями ингредиента */}
          <Route path="/ingredients/:id" >
            <Modal>
              <IngredientDetails />
            </Modal>
          </Route>
          {/* Модальное окно с информацией о заказе из ленты */}
          <Route path="/feed/:id">
            <Modal>
              <Order />
            </Modal>
          </Route>
          {/* Модальное окно с информацией о заказе пользователя */}
          <Route path="/profile/orders/:id">
            <Modal>
              <OrderUser />
            </Modal>
          </Route>
        </>
      )}
    </>
  )
}
