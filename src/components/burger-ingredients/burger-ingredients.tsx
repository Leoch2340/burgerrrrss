// Импорт CSS-модуля для стилизации компонента
import styles from './burger-ingredients.module.css';

// Импорт компонента с вкладками (например, "Булки", "Соусы", "Начинки")
import { BurgerIngredientsTabs } from '../burger-ingredients-tabs/burger-ingredients-tabs';

// Импорт компонента с наборами ингредиентов (списками элементов для бургера)
import { BurgerIngredientsSets } from '../burger-ingredients-sets/burger-ingredients-sets';

// Объявление и экспорт React-компонента BurgerIngredients
export function BurgerIngredients() {
    return (
        // Секция с классом из CSS-модуля — контейнер для всего блока ингредиентов
        <section className={styles.burger_ingredients}>
            {/* Заголовок блока с классами для шрифта и отступов */}
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>

            {/* Компонент с вкладками (переключение между категориями ингредиентов) */}
            <BurgerIngredientsTabs />

            {/* Компонент с отображением самих ингредиентов, разбитых по категориям */}
            <BurgerIngredientsSets />
        </section>
    )
}
