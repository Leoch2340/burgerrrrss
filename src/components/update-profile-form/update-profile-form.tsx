import React, { FormEventHandler } from 'react'; // Импортируем React и тип FormEventHandler для работы с формами
import styles from './update-profile-form.module.css'; // Импортируем стили для компонента
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; // Импортируем компоненты Input и Button из библиотеки UI
import { useSelector, useDispatch } from '../../services/hooks'; // Хуки для работы с состоянием Redux и для отправки действий
import { getUser } from '../../services/actions/user'; // Импортируем экшен для получения данных пользователя
import { updateUser } from '../../services/actions/user'; // Импортируем экшен для обновления данных пользователя

export function UpdateProfileForm() {

    const dispatch = useDispatch(); // Создаем диспетчер для отправки экшенов
    const userName = useSelector(state => state.profile.user.name); // Получаем имя пользователя из Redux
    const userEmail = useSelector(state => state.profile.user.email); // Получаем email пользователя из Redux
   
    React.useEffect(() => {
        dispatch(getUser()); // При монтировании компонента, получаем данные пользователя
    }, [dispatch])    

    const [value, setValue] = React.useState({ // Состояние для хранения данных формы
        name: userName, // Инициализируем имя из Redux
        email: userEmail, // Инициализируем email из Redux
        password: '' // Изначально пароль пустой
    })

    React.useEffect(() => {
        setValue({ // Обновляем состояние формы при изменении данных пользователя
            name: userName,
            email: userEmail,
            password: ''
        })
    }, [userName, userEmail])

    const updateProfile: FormEventHandler<HTMLFormElement> = (evt) => { // Обработчик отправки формы
        evt.preventDefault(); // Отменяем стандартное поведение формы
        dispatch(updateUser(value.name, value.email, value.password)); // Отправляем экшен для обновления данных пользователя
    }

    const cancelEditing = () => { // Обработчик для отмены изменений
        setValue({
            name: userName, // Возвращаем исходные значения имени и email
            email: userEmail,
            password: ''
        })
    }

    const inputRef = React.useRef<HTMLInputElement>(null); // Реф для фокуса на инпуте
    const onIconClick = () => { // Функция для фокуса на инпуте при клике на иконку
        setTimeout(() => inputRef.current?.focus(), 0); // Устанавливаем фокус на инпут с задержкой
    }

    return (
        <form className={styles.form} onSubmit={updateProfile}> {/* Форма с обработчиком отправки */}
            <Input
                type={'text'} // Тип инпута для имени
                placeholder={'Имя'} // Текст-подсказка
                onChange={(evt) => setValue({ ...value, name: evt.target.value })} // Обновляем имя при изменении
                value={value.name} // Значение инпута
                name={'name'} // Имя поля
                error={false} // Нет ошибки
                ref={inputRef} // Привязываем реф к инпуту
                onIconClick={() => onIconClick()} // Обработчик клика по иконке
                errorText={'Ошибка'} // Текст ошибки
                size={'default'} // Размер инпута
                icon="EditIcon" // Иконка в инпуте
            />
            <Input
                type={'email'} // Тип инпута для email
                placeholder={'Логин'} // Текст-подсказка
                onChange={(evt) => setValue({ ...value, email: evt.target.value })} // Обновляем email при изменении
                value={value.email} // Значение инпута
                name={'email'} // Имя поля
                icon="EditIcon" // Иконка в инпуте
                extraClass="mt-6" // Дополнительный класс для отступов
                ref={inputRef} // Привязываем реф к инпуту
                onIconClick={() => onIconClick()} // Обработчик клика по иконке
            />
            <Input
                type={'password'} // Тип инпута для пароля
                placeholder={'Пароль'} // Текст-подсказка
                onChange={(evt) => setValue({ ...value, password: evt.target.value })} // Обновляем пароль при изменении
                ref={inputRef} // Привязываем реф к инпуту
                onIconClick={() => onIconClick()} // Обработчик клика по иконке
                value={value.password} // Значение инпута
                name={'password'} // Имя поля
                icon="EditIcon" // Иконка в инпуте
                extraClass="mt-6" // Дополнительный класс для отступов
            />
            <div className={`${styles.choice} mt-6`}>
                <Button type="secondary" size="medium" htmlType="reset" extraClass="pr-7" onClick={cancelEditing}>Отмена</Button> {/* Кнопка для отмены изменений */}
                <Button type="primary" size="medium" htmlType="submit">Сохранить</Button> {/* Кнопка для сохранения изменений */}
            </div>
        </form>
    )
}
