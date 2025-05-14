import { Middleware } from "redux"; // Импортирует тип Middleware из библиотеки redux для определения структуры миддлвара.
import { IWsActions } from "../actions/interfaces"; // Импортирует интерфейс IWsActions, который содержит типы действий для WebSocket.

export const socketMiddleware = (url: () => string, actions: IWsActions): Middleware => { // Создаём миддлвар, принимающий функцию url и объект actions с типами WebSocket-действий.
    return (store) => { // Возвращаем функцию, которая принимает store как аргумент.
        let socket: WebSocket | null = null; // Инициализируем переменную socket, которая будет хранить объект WebSocket.
        return (next) => { // Возвращаем функцию, которая принимает next, функцию для передачи действия дальше.
            return (action) => { // Возвращаем функцию, которая принимает сам action.
                const { dispatch } = store; // Извлекаем функцию dispatch из store для отправки действий.
                const { type } = action; // Извлекаем type из action, чтобы проверить, какой тип действия был вызван.
                const { wsInit, onOpen, onClose, onError, onOrders } = actions; // Извлекаем типы действий для различных состояний WebSocket из объекта actions.
                
                if (type === wsInit) { // Если тип действия — wsInit (инициализация WebSocket),
                    socket = new WebSocket(url()); // Создаём новое соединение WebSocket с URL, полученным из функции url().
                    if (socket) { // Если соединение успешно установлено,
                        socket.onopen = () => { // Когда соединение откроется,
                            dispatch({ type: onOpen }); // Отправляем действие onOpen, информируя Redux о том, что соединение установлено.
                        };
                        socket.onerror = () => { // Если возникает ошибка в соединении,
                            dispatch({ type: onError }); // Отправляем действие onError для обработки ошибки.
                        };
                        socket.onmessage = (evt) => { // Когда получено сообщение от сервера,
                            const { data } = evt; // Извлекаем данные из события.
                            const parsedData = JSON.parse(data); // Парсим полученные данные как JSON.
                            const { success } = parsedData; // Извлекаем поле success из данных.
                            success && dispatch({ type: onOrders, payload: parsedData }); // Если success == true, отправляем действие onOrders с данными.
                        };
                        socket.onclose = () => { // Когда соединение закрывается,
                            dispatch({ type: onClose }); // Отправляем действие onClose для уведомления о закрытии соединения.
                        }
                    }
                }
                return next(action) // Передаём action дальше в следующую часть middleware цепочки.
            }
        }
    }
}
