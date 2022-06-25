export default function changeDateFormat(dateString) {
    let dd = String(dateString.getDate()).padStart(2, '0');
    let mm = String(dateString.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = dateString.getFullYear();

    let today = yyyy + '-' + mm + '-' + dd;

    return today
}