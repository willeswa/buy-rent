export default (number) => {
    let money = 0;

    money = number.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    return money
}

export const toDateMonth = date => {
let d = new Date(date);
let sDate = d.toString();
let dateMonthArr = sDate.split(' ', 3).slice(1, 3);
return dateMonthArr
}