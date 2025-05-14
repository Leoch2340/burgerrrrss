import styles from './pages.module.css'; // Импорт стилей, определённых в CSS-модуле
import { HTML5Backend } from 'react-dnd-html5-backend'; // Импорт бэкенда для drag-and-drop, основанного на HTML5
import { DndProvider } from 'react-dnd'; // Импорт провайдера для работы с drag-and-drop в React
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients'; // Компонент для отображения ингредиентов для бургера
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor'; // Компонент для конструктора бургера

export const Main = () => { // Главный компонент страницы
    return (
        <DndProvider backend={HTML5Backend}> {/* Провайдер drag-and-drop, который оборачивает компоненты, поддерживающие перетаскивание */}
            <main className={styles.content}> {/* Основной контейнер для контента страницы с применением стилей */}
                <BurgerIngredients /> {/* Компонент для отображения списка ингредиентов, доступных для добавления в бургер */}
                <BurgerConstructor /> {/* Компонент для отображения текущего состояния бургера (составленного из ингредиентов) */}
            </main>
        </DndProvider>
    )
}
