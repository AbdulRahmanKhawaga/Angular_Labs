//Q2
function logProduct(product) {
    console.log("Product id is: ".concat(product.id, ", with name = ").concat(product.name, ", and price = ").concat(product.price, ", and inStock = ").concat(product.inStock));
}
//testing example
var product1 = {
    id: 1001,
    name: 'Smart watch series 8',
    price: 120,
    inStock: true
};
logProduct(product1);
//Q4
function arrayWrap(value) {
    return [value];
}
//testing example
console.log(arrayWrap("AbdulRahman"));
//BONUS
function printApiProductResult(apiResult) {
    if (apiResult.success) {
        logProduct(apiResult.data);
        console.log("Product data is fetched successfully");
    }
}
//testing example
var apiResponse = {
    data: product1,
    success: true,
    message: 'Hello from inside api'
};
printApiProductResult(apiResponse);
