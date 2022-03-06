export default function getDateString(dateString) {
    // const date = new Date(dateString);
    // console.log({ dateString })
    if (typeof dateString === 'string' || dateString instanceof String) {
        const date = dateString.split(" ")
            //     // return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`
        return `${date[2]} ${parseInt(date[1])}, ${date[3]}`
    } else {
        return dateString.year + '-' + dateString.month + '-' + dateString.day
    }
}