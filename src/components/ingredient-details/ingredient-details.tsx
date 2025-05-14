// Импорт стилей компонента
import styles from './ingredient-details.module.css';

// Импорт хука useSelector для работы с состоянием Redux
import { useSelector } from '../../services/hooks';

// Импорт типов для деталей ингредиента и типа ингредиента
import { TIngredientDetails } from '../../services/types/types';
import { TIngredientType } from '../../services/types/types';

// Импорт хука useParams для извлечения параметров из URL
import { useParams } from "react-router-dom";

// Основной компонент для отображения деталей ингредиента
export function IngredientDetails() {

  // Получаем список всех ингредиентов из состояния Redux
  const ingredients = useSelector(state => state.burgerIngredients.burgerIngredients);

  // Извлекаем id ингредиента из параметров URL с помощью useParams
  const { id } = useParams<{ id: string }>();

  // Находим нужный ингредиент по id
  const ingredient = ingredients.find(item => item._id === id);

  // Возвращаем JSX разметку для отображения деталей ингредиента
  return (
    <>
      {/* Заголовок страницы с текстом "Детали ингредиента" */}
      <h2 className={`${styles.title} text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h2>
      
      {/* Контейнер для отображения деталей ингредиента */}
      <div className={`${styles.ingredient_details} pl-25 pr-25`}>
        {/* Изображение ингредиента */}
        <img className="ml-5 mr-5" src={ingredient?.image_large} alt={ingredient?.name} />
        
        {/* Название ингредиента */}
        <p className={`${styles.subtitle} text text_type_main-medium mt-4`}>{ingredient?.name}</p>

        {/* Список с питательными веществами */}
        <ul className={`${styles.nutrients} mt-8 mb-15`}>
          {/* Элемент списка для калорий */}
          <li className={styles.nutrient}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient?.calories}</p>
          </li>
          
          {/* Элемент списка для белков */}
          <li className={styles.nutrient}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient?.proteins}</p>
          </li>
          
          {/* Элемент списка для жиров */}
          <li className={styles.nutrient}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient?.fat}</p>
          </li>
          
          {/* Элемент списка для углеводов */}
          <li className={styles.nutrient}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient?.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </>
  )
}
