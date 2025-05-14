import styles from './pages.module.css'; // Импорт CSS-модулей для стилизации компонента
import { IngredientDetails } from '../components/ingredient-details/ingredient-details'; // Импорт компонента для отображения информации об ингредиенте

export const IngredientInfo = () => { // Объявление компонента IngredientInfo
    return (
        <div className={styles.info}> {/* Контейнер для информации об ингредиенте, с применением стилизации */}
            <IngredientDetails /> {/* Вставка компонента IngredientDetails для отображения данных об ингредиенте */}
        </div>
    )
}
