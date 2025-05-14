// Импорт React и необходимых типов
import { FC } from "react";
// Импорт стилей для компонента
import styles from './modal-overlay.module.css';
// Импорт типа для пропсов компонента
import { TModalOverlay } from '../../services/types/types';

// Компонент ModalOverlay, который отображает фон модального окна
export const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => {

    // Закомментированная функция для обработки клика на overlay
    // const closeModalOverlay = (evt) => {
    //     console.log(evt) // Выводим событие в консоль для отладки
    //     // Проверяем, был ли клик по области overlay
    //     if (evt.target.classList.contains(styles.overlay)) {
    //         // Если да, закрываем модалку
    //         onClose()
    //     }
    // }

    return (
        // Создаем div с классом overlay, который перекрывает остальную часть страницы
        // При клике на него вызывается функция onClose для закрытия модалки
        <div className={styles.overlay} onClick={onClose}>
        </div>
    )
}
