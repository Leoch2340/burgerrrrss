// Импорт типа FC (Functional Component) из React
import { FC } from 'react';

// Импорт компонента одного ингредиента (карточки)
import { BurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';

// Импорт хука useSelector для получения данных из Redux store
import { useSelector } from '../../services/hooks';

// Импорт типа пропсов компонента
import { TBurgerIngredientsSet } from '../../services/types/types';

// Объявление и экспорт компонента BurgerIngredientsSet как функционального компонента с типизацией пропсов
export const BurgerIngredientsSet: FC<TBurgerIngredientsSet> = ({ type }) => {

  // Получение всех ингредиентов из Redux store
  const ingredients = useSelector(state => state.burgerIngredients.burgerIngredients);

  return (
    <>
      {ingredients
        // Фильтрация ингредиентов по типу (например, "bun", "sauce", "main")
        .filter((ingredient) => ingredient.type === type)
        // Отображение отфильтрованных ингредиентов в виде списка компонентов BurgerIngredientsItem
        .map((ingredient) => (
          <BurgerIngredientsItem
            key={ingredient._id} // Уникальный ключ для React
            ingredient={ingredient} // Передача ингредиента в компонент
          />
        ))}
    </>
  )
}
