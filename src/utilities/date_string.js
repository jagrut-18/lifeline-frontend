export default function getDateString(dateString) {
    // const date = new Date(dateString);
    // console.log({ dateString })
    console.log({ dateString })
    console.log(dateString)
    const date = dateString.split(" ")
        //     // return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`
    return `${date[2]} ${parseInt(date[1])}, ${date[3]}`
}