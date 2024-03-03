export const getTime = (date: Date) => {
    if ((String(date.getMinutes())).length== 1){
        return date.getHours()+':0'+date.getMinutes()
    }
    

    return date.getHours()+':'+date.getMinutes()
}
