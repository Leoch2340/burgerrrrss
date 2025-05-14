// Импорт React и стилей
import React from 'react';
import styles from './burger-ingredients-sets.module.css';

// Импорт хука useEffect
import { useEffect } from 'react';

// Импорт хуков useSelector и useDispatch из кастомных хуков
import { useSelector, useDispatch } from '../../services/hooks';

// Импорт компонента, который отображает список ингредиентов определённого типа
import { BurgerIngredientsSet } from '../burger-ingredients-set/burger-ingredients-set';

// Импорт экшена для установки активной вкладки при скролле
import { setActiveTab } from '../../services/actions/burger-ingredients-scroll';

// Основной компонент, содержащий группы ингредиентов: булки, соусы, начинки
export function BurgerIngredientsSets() {

    // Инициализация dispatch для отправки экшенов в Redux
    const dispatch = useDispatch();

    // Получаем из Redux текущую активную вкладку для скролла
    const scroll = useSelector(state => state.scrollIngredients.scroll);
    
    // Создаем ссылки на заголовки разделов и контейнер прокрутки
    const bunRef = React.useRef<HTMLParagraphElement>(null);
    const sauceRef = React.useRef<HTMLParagraphElement>(null);
    const mainRef = React.useRef<HTMLParagraphElement>(null);
    const scrollRef = React.useRef<HTMLParagraphElement>(null);

    // Эффект для плавного скролла к нужному разделу при изменении значения scroll
    useEffect(() => {
        if (scroll === 'bun') {
            bunRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        if (scroll === 'sauce') {
            sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        if (scroll === 'main') {
            mainRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [scroll]);

    // Эффект для слежения за заголовками, чтобы определить, какой из разделов находится в зоне видимости
    useEffect(() => {
        // Массив заголовков (в обратном порядке, как в Tab'ах)
        const headings = [
            mainRef.current,
            sauceRef.current,
            bunRef.current
        ];

        // Создание наблюдателя за пересечением (IntersectionObserver)
        const observer = new IntersectionObserver((headings: IntersectionObserverEntry[]) => {
            headings.forEach((heading) => {
                // Если в область видимости попадает заголовок "Булки", устанавливаем активную вкладку 'bun'
                if (heading.target === bunRef.current) {
                    dispatch(setActiveTab('bun'));
                }
                // Если попадает "Соусы"
                if (heading.target === sauceRef.current) {
                    dispatch(setActiveTab('sauce'));
                }
                // Если попадает "Начинки"
                if (heading.target === mainRef.current) {
                    dispatch(setActiveTab('main'));
                }
            });
        },
        {
            // Контейнер прокрутки — сам scrollRef
            root: scrollRef.current,
            // Отступ сверху, чтобы вкладка менялась до полного попадания заголовка в зону видимости
            rootMargin: '0px 0px -90% 0px'
        });

        // Подписываемся на наблюдение за всеми заголовками
        headings.forEach((heading) => observer.observe(heading!));
    }, [dispatch]);

    // Рендеринг секций с булками, соусами и начинками
    return (
        <div className={`${styles.scroll} mt-10 pr-2`} ref={scrollRef}>
            <div>
                <h3 className="text text_type_main-medium mb-6" ref={bunRef}>Булки</h3>
                <ul className={`${styles.list} pl-4`}>
                    <BurgerIngredientsSet type='bun' />
                </ul>
            </div>
            <div>
                <h3 className="text text_type_main-medium mt-10 mb-6" ref={sauceRef}>Соусы</h3>
                <ul className={`${styles.list} pl-4`}>
                    <BurgerIngredientsSet type='sauce' />
                </ul>
            </div>
            <div>
                <h3 className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>Начинки</h3>
                <ul className={`${styles.list} pl-4`}>
                    <BurgerIngredientsSet type='main' />
                </ul>
            </div>
        </div>
    )
}
