// Импорт стилей компонента
import styles from './burger-ingredients-tabs.module.css';

// Импорт компонента Tab для отображения вкладок
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

// Импорт экшенов для установки активной вкладки и прокрутки ингредиентов
import { setActiveTab, scrollIngredients } from '../../services/actions/burger-ingredients-scroll';

// Импорт хуков useSelector и useDispatch для работы с Redux
import { useSelector, useDispatch } from '../../services/hooks';

// Основной компонент вкладок для выбора ингредиентов
export function BurgerIngredientsTabs() {

    // Инициализация dispatch для отправки экшенов в Redux
    const dispatch = useDispatch();

    // Получаем текущую активную вкладку из состояния Redux
    const current = useSelector(state => state.scrollIngredients.current);

    // Функция для установки текущей вкладки и прокрутки к соответствующему разделу
    const setCurrent = (value: string) => {
        // Отправляем экшен для установки активной вкладки
        dispatch(setActiveTab(value));
        // Отправляем экшен для прокрутки к соответствующему разделу
        dispatch(scrollIngredients(value));
    };

    // Рендеринг вкладок для выбора булок, соусов и начинок
    return (
        <div className={styles.tab_list}>
            {/* Вкладка для булок */}
            <Tab value="bun" active={current === 'bun'} onClick={() => setCurrent('bun')}>
                Булки
            </Tab>
            {/* Вкладка для соусов */}
            <Tab value="sauce" active={current === 'sauce'} onClick={() => setCurrent('sauce')}>
                Соусы
            </Tab>
            {/* Вкладка для начинок */}
            <Tab value="main" active={current === 'main'} onClick={() => setCurrent('main')}>
                Начинки
            </Tab>
        </div>
    );
}
