const WEEK_DAYS = ['Вс','Пн', 'Вт', 'Ср', 'Чт','Пт', 'Сб']
export const getRusShortDay = (date: Date) => {
    return WEEK_DAYS[date.getDay()]
}
