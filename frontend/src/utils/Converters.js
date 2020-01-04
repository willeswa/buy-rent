export default (number) => {
    let money = 0;

    money = number.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    return money
}