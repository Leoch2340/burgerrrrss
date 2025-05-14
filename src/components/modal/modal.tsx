// Импорт React и необходимых хуков
import React, { FC } from "react";
// Импорт для рендеринга в портал (создание модального окна)
import { createPortal } from "react-dom";
// Импорт хука useHistory для работы с историей навигации
import { useHistory } from "react-router-dom";
// Импорт стилей компонента
import styles from './modal.module.css';
// Импорт иконки закрытия из библиотеки UI компонентов
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// Импорт компонента Overlay для модального окна
import { ModalOverlay } from "../modal-overlay/modal-overlay";
// Импорт типа TModal, который описывает пропсы модального окна
import { TModal } from "../../services/types/types";

// Основной компонент модального окна
export const Modal: FC<TModal> = ({ children, onClose }) => {

    // Хук useHistory для работы с историей браузера
    const history = useHistory();
    
    // Функция для закрытия модального окна
    const closeModal = () => {
        // Если передан onClose, вызываем его, иначе возвращаемся на предыдущую страницу
        onClose ? onClose() : history.goBack();
    };

    // Хук useEffect для отслеживания нажатия клавиши Escape
    React.useEffect(() => {
        // Обработчик нажатия клавиши
        function onKeyDown(evt: KeyboardEvent) {
            if (evt.key === 'Escape') {
                closeModal(); // Закрыть модалку при нажатии Escape
            }
        }

        // Добавляем обработчик события keydown на document
        document.addEventListener('keydown', onKeyDown)

        // Очистка обработчика при размонтировании компонента
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, []) // Пустой массив зависимостей: эффект сработает только один раз при монтировании

    // Рендерим модалку через createPortal для рендеринга в отдельный DOM-узел
    return createPortal(
        <>
            {/* Оверлей модального окна, который закрывает окно при клике */}
            <ModalOverlay onClose={closeModal} />
            
            {/* Содержимое модального окна */}
            <div className={styles.modal}>
                {/* Кнопка для закрытия модального окна */}
                <button className={styles.closeButton} onClick={closeModal}>
                    <CloseIcon type="primary" />
                </button>
                {/* Вставляем детей в модальное окно */}
                {children}
            </div>
        </>,
        // Рендерим в узел с id="modals", который должен быть в DOM
        document.getElementById('modals') as HTMLDivElement
    )
}
