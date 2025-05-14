// Импортируем функции isToday, isYesterday и format из библиотеки date-fns
import { isToday, isYesterday, format } from 'date-fns';
// Импортируем тип TOptionsDateFormat из типов приложения
import { TOptionsDateFormat } from '../services/types/types';

// Функция определяет, когда была дата: сегодня, вчера или раньше
export const dateWhen = (date: Date) => {
    // Если дата — сегодня, возвращаем "Сегодня"
    if (isToday(date)) {
        return 'Сегодня'
    // Если дата — вчера, возвращаем "Вчера"
    } else if (isYesterday(date)) {
        return 'Вчера'
    // В остальных случаях форматируем дату в виде MM.dd.yyyy
    } else {
        return format((date), 'MM.dd.yyyy');
    }
}

// Функция форматирует строку даты в локальный формат с указанием времени и временной зоны
export const dateFormat = (date: string) => {
    // Опции форматирования даты и времени
    const options: TOptionsDateFormat = {
        timezone: 'Moscow',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: "short",
    }

    // Возвращаем строку даты в формате "ru" с указанными опциями
    return new Date(Date.parse(date)).toLocaleString("ru", options)
}
