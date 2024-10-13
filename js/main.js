let inputName = document.getElementById('name');
let select = document.getElementById('select');
let inputSalary = document.querySelectorAll('#inputdalary input');
let rowCount = document.getElementById('rows-counts');
let image = document.getElementById('img-url');
let addTaskBtn = document.getElementById('btn-add');



let get_profit = function(){
    let cost = inputSalary[0].Value;
    let tax = inputSalary[1].Value;
    let my_return = inputSalary[2].Value;
    let discount = inputSalary[3].Value;
    let sales_cost = inputSalary[4].Value;
    let net_profit = inputSalary[5].Value;


    let tax_cost = +cost * (+tax / 100);
    let cost_after_addtax = +cost + +tax_cost;
    let myreturn_profit = +cost_after_addtax + +my_return;
    let discountcost = +myreturn_profit * (+discount / 100);
    let my_return_profit_after_discount = +myreturn_profit - +discountcost ;
    inputSalary[4].Value = +my_return_profit_after_discount;
    inputSalary[5].Value = +my_return_profit_after_discount - +cost_after_addtax;
   

    
}
for(let i = 0 ; i<inputSalary.length ; i++){
    inputSalary[i].addEventListener("keyup" , get_profit)
}