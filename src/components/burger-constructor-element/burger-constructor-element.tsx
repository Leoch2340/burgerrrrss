// Импорт FC (Functional Component) из React
import { FC } from 'react';
// Импорт CSS-модуля
import styles from './burger-constructor-element.module.css';
// Импорт иконки перетаскивания и элемента конструктора
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
// Импорт хуков drag-and-drop из react-dnd
import { useDrag, useDrop } from "react-dnd";
// Импорт экшена для перемещения ингредиента внутри списка
import { moveIngredient } from "../../services/actions/burger-constructor";
// Импорт собственного useDispatch
import { useDispatch } from '../../services/hooks';
// Импорт useRef — нужен для ссылки на DOM-элемент
import { useRef } from "react";
// Импорт типа пропсов компонента
import { TBurgerConstructorElement  } from '../../services/types/types';

// Объявление компонента
export const BurgerConstructorElement: FC<TBurgerConstructorElement> = ({ deleteElement, element, id, index }) => {

    // Создание ссылки на DOM-элемент li, чтобы отслеживать позицию при перетаскивании
    const ref = useRef(null)
    // Получение dispatch
    const dispatch = useDispatch()

    // Диспатч экшена перемещения ингредиентов по списку
    const moveCard = (start: number, end: number) => {
        dispatch(moveIngredient(start, end))
    }

    // useDrop — принимает drop-события (то, что можно перетащить на элемент)
    const [, drop] = useDrop({
        accept: 'item', // Тип dnd-объекта

        // Hover — срабатывает при наведении перетаскиваемого элемента
        hover(item: { index: number }, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Не делать ничего, если наводим на тот же самый элемент
            if (dragIndex === hoverIndex) {
                return
            }

            // Получаем геометрию текущего элемента
            const rect: HTMLElement = ref.current
            const hoverBoundingRect = rect?.getBoundingClientRect()

            // Вычисляем середину элемента по вертикали
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Текущая позиция курсора
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top

            // Если двигаемся вниз, но курсор выше середины — не срабатывает
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Если двигаемся вверх, но курсор ниже середины — не срабатывает
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Выполняем перемещение
            moveCard(dragIndex, hoverIndex)
            // Обновляем индекс в dnd-элементе (мутация допустима для производительности)
            item.index = hoverIndex
        },
    })

    // useDrag — делает элемент перетаскиваемым
    const [, drag] = useDrag({
        type: 'item',
        item: () => {
            return { id, index } // DnD будет знать, какой элемент и где
        },
    })

    // Объединяем drag и drop, применяя их к одному ref
    drag(drop(ref))

    return (
        <li className={styles.constructor_element} key={element.id} ref={ref}>
            <DragIcon type="primary" /> {/* Иконка "ручки" */}
            <ConstructorElement
                handleClose={() => deleteElement(element)} // Удаление ингредиента при клике на "крестик"
                text={element.name}
                price={element.price}
                thumbnail={element.image}
            />
        </li>
    )
}
