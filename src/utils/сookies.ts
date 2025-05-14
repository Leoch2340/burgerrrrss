// сохранение токена в куку
export const setCookie = (
  name: string, // имя куки
  value: string, // значение куки
  props: { [key: string]: any } & { expires?: number | Date | string } = {} // объект с дополнительными параметрами (например, expires, path)
): void => {
  props = props || {}; // если props не передан, инициализируем пустым объектом
  let exp = props.expires; // извлекаем значение времени жизни куки
  if (typeof exp == 'number' && exp) { // если expires — число
    const d = new Date(); // создаем объект текущей даты
    d.setTime(d.getTime() + exp * 1000); // добавляем указанное количество секунд
    exp = props.expires = d; // обновляем expires в объекте props на новую дату
  }
  if (exp && (exp as Date).toUTCString) { // если expires можно преобразовать в строку (формат UTC)
    props.expires = (exp as Date).toUTCString(); // преобразуем дату в строку и сохраняем
  }
  value = encodeURIComponent(value); // кодируем значение куки для безопасной передачи
  let updatedCookie = name + '=' + value; // создаем начальную строку куки: "name=value"
  for (const propName in props) { // перебираем все свойства объекта props
    updatedCookie += '; ' + propName; // добавляем имя свойства (например, path, expires)
    const propValue = props[propName]; // получаем значение свойства
    if (propValue !== true) { // если значение не булево true (true добавляется без значения)
      updatedCookie += '=' + propValue; // добавляем значение свойства
    }
  }
  document.cookie = updatedCookie; // записываем строку куки в document.cookie
}

// получение куки с помощью регулярного выражения
export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match( // ищем совпадение по имени куки в строке document.cookie
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') 
    // создаём регулярное выражение, экранируя специальные символы в имени, и ищем соответствующее значение
  );
  return matches ? decodeURIComponent(matches[1]) : undefined; 
  // если кука найдена — декодируем и возвращаем значение, иначе возвращаем undefined
}

export const deleteCookie = (name: string) => {
  setCookie(name, '', { expires: -1 }); // удаляем куку, установив истекшее время жизни
}
