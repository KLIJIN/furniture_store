export const formatPrice = (numb) => {
    const newNumber = Intl.NumberFormat(`en-US`, {
        style: "currency",
        currency: "USD"
    }).format(numb / 100)
    return newNumber;
}




export const getUniqueValues = (data, type) => {
    let unique = data.map(item => item[type]) //перебираем массив all_products и оставляем только айтем с параметром type

    //console.log("Filters__getUniqueValues", unique)
    //если цвета уже представляют собой массив, то нужно развернуть массив массивов в одномерный массив. 
    if (type === "colors") {
        unique = unique.flat()
    }
    return ["all", ...new Set(unique)]
}
