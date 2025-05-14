import { Route, Redirect, useLocation, RouteProps } from "react-router-dom"; // Импортируем компоненты из react-router-dom для создания защищенного маршрута
import { useSelector } from '../../services/hooks'; // Импортируем useSelector для получения состояния Redux

export const ProtectedRoute = ({ component, path }: RouteProps) => { // Функциональный компонент для защищенного маршрута

  const authorization = useSelector((state) => state.userAuthorization.authorization); // Получаем состояние авторизации из Redux
  const location = useLocation(); // Получаем текущий путь с помощью хука useLocation

  if (!authorization) { // Если пользователь не авторизован

    return ( // Рендерим защищенный маршрут с редиректом на страницу логина
      <Route path={path}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} /> {/* Перенаправляем на страницу логина с сохранением текущего пути */}
      </Route>
    )
  }

  return <Route path={path} component={component} /> // Если авторизован, рендерим компонент для указанного пути
}


// return (
//   <Route
//     render={() =>
//       authorization ? (
//         children
//       ) : (<Redirect to={`/login?retpath=${path}`} />)
//     }
//   />
// );


//   return (
//     <Route>
//       {login ? (
//         children
//       ) : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
//       || (<Redirect to={{ pathname: '/profile', state: { from: location } }} />)
//       }
//     </Route>
//   );
// }
