const MONTHS = ['янв','фев', 'мар', 'апр', 'мая','июн', 'июл', 'авг', 'cен', 'окт', 'ноя', 'дек']
export const getRusShortDate = (date: Date) => {
    return date.getDate() + ' ' + MONTHS[date.getMonth()]
}