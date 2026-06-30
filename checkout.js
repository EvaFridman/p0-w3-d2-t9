const userName = "Anna";
const userEmail = "example@gmail.com";
const userAge = 21;

const goodName = "Book";
const goodPrice = 1000;
const goodQuantity = 5;

const deliveryType = "post";

const promo = undefined;

// Проверка данных пользователя

const isFieldFilled = value => Boolean(value && typeof value === "string" && value.trim().length > 0);
const isEmailValid = email => {
    if (typeof email !== "string") return false;
    return /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(email.trim()) && email.trim().length <= 254;
};
const isNumber = value => Boolean(typeof value === "number" && !isNaN(value));
const isAgeValid = age => Boolean(age >= 18 && age <= 120);

function isFormValid(userEmail, userName, userAge) {

    if (!isFieldFilled(userEmail)) {
        console.log("Error! Set your email");
        return false;
    } else if (typeof userEmail !== "string") {
        console.log("Error! Email has to be a string");
        return false;
    } else if (!isEmailValid(userEmail)) {
        console.log("Error! Email is not valid");
        return false;
    }

    if (!isFieldFilled(userName)) {
        console.log("Error! Set your name");
        return false;
    } else if (typeof userName !== "string") {
        console.log("Error! Name has to be a string");
        return false;
    }

    if (!isNumber(userAge)) {
        console.log("Error! Age has to be a number");
        return false;
    } else if (!isAgeValid(userAge)) {
        console.log("Error! Age has to be in between 18 and 120");
        return false;
    }

    return true;
}

// Замыкание
function makeDiscount(percent) {
    return function(price) {
        return price * (1 - percent / 100);
    };
}

const vipDiscount = makeDiscount(15);
const promoDiscount = makeDiscount(10);

// Доставка
function calcDelivery(deliveryType) {
    switch (deliveryType) {
        case "pickup": return 0;
        case "post": return 100;
        case "courier": return 200;
        default:
            console.log("Error! Unknown delivery type");
            return 0;
    }
}

// Промокод
function applyPromo(price, promo) {
    const promoCode = promo ?? "без промокода";
    if (promoCode === "SALE10") {
        return promoDiscount(price);
    }
    return price;
}

// Подсчёт стоимости товара
function calcTotal(price, qty, userAge, deliveryType, promo) {
    if (!isNumber(price) || price < 0) {
        console.log("Error! Price has to be more than 0");
        return 0;
    }
    if (!isNumber(qty) || qty < 0) {
        console.log("Error! Quantity has to be more than 0");
        return 0;
    }

    let total = price * qty;
    total += calcDelivery(deliveryType);
    total = (userAge < 23 || userAge >= 65) ? vipDiscount(total) : total;
    total = applyPromo(total, promo);

    if (isNaN(total) || total < 0) {
        console.log("Error! Final price has to be more than 0");
        return 0;
    }

    return total;
}

// Форматтеры
function formatUserName(string) {
    if (typeof string !== "string" || !string.trim()) return "Error! Name has to be a string";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function formatSum(number) {
    if (typeof number !== "number" || isNaN(number)) return "Error! Price has to be a number";
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(number);
}

function calcDiscount(originalPrice, qty, finalTotal) {
    return (originalPrice * qty) - finalTotal;
}

function finalText(name, goodName, deliveryType, discount, price) {
    return (
        "Buyer: " + name +
        "\nGood: " + goodName +
        "\nDelivery type: " + deliveryType +
        "\nTotal discount: " + formatSum(discount) +
        "\nFinal price: " + formatSum(price)
    );
}

// Test 1
console.log("\nTest 1");
if (isFormValid(userEmail, userName, userAge)) {
    console.log("Ordering allowed!");
    const total1 = calcTotal(goodPrice, goodQuantity, userAge, deliveryType, promo);
    const discount1 = calcDiscount(goodPrice, goodQuantity, total1);
    console.log(finalText(formatUserName(userName), goodName, deliveryType, discount1, total1));
} else {
    console.log("Ordering denied. Please fix the errors above.");
}

// Test 2
console.log("\nTest 2");
const userName2 = "Max";
const userEmail2 = "max@mail.com";
const userAge2 = 30;
const goodName2 = "Pen";
const goodPrice2 = 100;
const goodQuantity2 = 2;
const deliveryType2 = "p";
const promo2 = "SALE10";

if (isFormValid(userEmail2, userName2, userAge2)) {
    console.log("Ordering allowed!");
    const total2 = calcTotal(goodPrice2, goodQuantity2, userAge2, deliveryType2, promo2);
    const discount2 = calcDiscount(goodPrice2, goodQuantity2, total2);
    console.log(finalText(formatUserName(userName2), goodName2, deliveryType2, discount2, total2));
} else {
    console.log("Ordering denied. Please fix the errors above.");
}

// Test 3
console.log("\nTest 3");
const userName3 = "";
const userEmail3 = "h";
const userAge3 = "21";
const goodName3 = "Pen"
const goodPrice3 = 100;
const goodQuantity3 = 2;
const deliveryType3 = "p";
const promo3 = "SALE";

if (isFormValid(userEmail3, userName3, userAge3)) {
    console.log("Ordering allowed!");
    const total2 = calcTotal(goodPrice3, goodQuantity3, userAge3, deliveryType3, promo3);
    const discount2 = calcDiscount(goodPrice3, goodQuantity3, total3);
    console.log(finalText(formatUserName(userName3), goodName3, deliveryType3, discount3, total3));
} else {
    console.log("Ordering denied. Please fix the errors above.");
}