//Q1
interface Product{
    id : number ;
    name : string ;
    price : number ;
    inStock : boolean ;
}

//Q2
function logProduct(product : Product) : void {
    console.log(`Product id is: ${product.id}, with name = ${product.name}, and price = ${product.price}, and inStock = ${product.inStock}`)
}

//testing example
var product1: Product = {
    id : 1001 ,
    name : 'Smart watch series 8' ,
    price : 120 ,
    inStock : true 
}
logProduct(product1);

//Q3
type ProductOrError = Product | string ;

//Q4
function arrayWrap <T>(value : T) : T[]{
    return [value];
}
//testing example
console.log(arrayWrap("AbdulRahman"));

//Q5
interface ApiResult <T>{
    data : T ;
    success : boolean ; 
    message : string ; 
}

//BONUS
function printApiProductResult( apiResult : ApiResult<Product>) : void{
    if(apiResult.success){
        logProduct(apiResult.data);
        console.log(`Product data is fetched successfully`);
    }
}

//testing example


var apiResponse: ApiResult<Product> = {
    data : product1,
    success : true,
    message : 'Hello from inside api'
}

printApiProductResult(apiResponse);