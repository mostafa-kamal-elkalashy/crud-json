let inputName = document.getElementById('name');
let select = document.getElementById('select');
let inputSalary = document.querySelectorAll('#inputdalary input');
let rowCount = document.getElementById('rows-counts');
let image = document.getElementById('img-url');
let addTaskBtn = document.getElementById('btn-add');
let empity_task = document.getElementById('empity_task');
let input_table = document.getElementById('input_table');
let tbody = document.getElementById('tbody');
let clearAllBtn = document.getElementById('clearAllBtn');
let result = document.getElementById('error');
let layOut = document.getElementById('layout');
let myModel = document.getElementById('mymodel');
let close = document.getElementById('close');
let card = document.getElementById('caard');
let counter_card = document.getElementById('counter-card');
let mood = "create";
let globalId ;
let input = document.querySelectorAll('input');

let valadation = ()=>{
    for(let i=0 ; i<input.length ; i++){
        if(input[i].value.length == 0){
            input[i].classList.add('input-error');
        }else{
            input[i].classList.remove('input-error');
        }
    }
}

for(let x=0; x < input.length ; x++){
    input[x].addEventListener('change', valadation);
}



let allProdact ;
// localStorage.clear();
if(localStorage.getItem("myProdact") == null){
    allProdact = [];
}else{
allProdact = JSON.parse(localStorage.getItem("myProdact"));
}

let checkEmpty = () =>{
    if(card.childElementCount == 0 || localStorage.length == 0 ||allProdact.length == 0){
    empity_task.classList.remove('none');
    input_table.classList.add('none');
    clearAllBtn.classList.add('none');
    }else{
    empity_task.classList.add('none');
    input_table.classList.add('none');
    clearAllBtn.classList.remove('none');
    }

}
checkEmpty();




let get_profit = function(){
    let cost = inputSalary[0].value;
    let tax = inputSalary[1].value;
    let my_return = inputSalary[2].value;
    let discount = inputSalary[3].value;
    let sales_cost = inputSalary[4].value;
    let net_profit = inputSalary[5].value;


    let tax_cost = +cost * (+tax / 100);
    let cost_after_addtax = +cost + +tax_cost;
    let myreturn_profit = +cost_after_addtax + +my_return;
    let discountcost = +myreturn_profit * (+discount / 100);
    let my_return_profit_after_discount = +myreturn_profit - +discountcost ;
    inputSalary[4].value = Math.ceil( my_return_profit_after_discount);
    inputSalary[5].value =Math.ceil( my_return_profit_after_discount - +cost_after_addtax);
   
    
}
for(let i = 0 ; i<inputSalary.length ; i++){
    inputSalary[i].addEventListener("keyup" , get_profit)
}


// let creat_object = ()=>{
//     let new_project = {
//          product_name : inputName.value,
//          category : select.value , 
//          cost : inputSalary[0].value,
//          tax : inputSalary[1].value,
//          my_return : inputSalary[2].value,
//          discount : inputSalary[3].value,
//          sales_cost : inputSalary[4].value,
//          net_profit : inputSalary[5].value,
//          image : image.value ,

//     }
    
//     allProdact.push(new_project);
//     console.log(allProdact);
//     localStorage.setItem('myProdact' , JSON.stringify(allProdact));
//     show_data() ; 
//     checkEmpty();
//     error();
// }
// addTaskBtn.addEventListener('click' , creat_object);


let show_data = ()=>{
    let tableRow = "";
    for(let i = 0 ; i <allProdact.length ; i++){
        // tableRow +=`
        // <tr>
        //     <th>${i+1}</th>
        //     <th>${allProdact[i].product_name}</th>
        //     <th>${allProdact[i].category}</th>
        //     <th><i onclick="viewOneItem(${i})" class="text-primary fa-solid fa-eye"></i></th>
        //     <th><i onclick="removeOneItem(${i})" class="text-danger fa-solid fa-trash"></i></th>
        //     <th><i  onclick = "update(${i})"class=" text-success fa-solid fa-pen"></i></th>
        // </tr>
        // `

        tableRow +=`
        <div display = "block">
            <h6>card : ${i+1} </h6>
            <h6>name : ${allProdact[i].product_name} </h6>
            <h6>gender : ${allProdact[i].category} </h6>
            <p> <i onclick="viewOneItem(${i})" class="text-primary fa-solid fa-eye"></i> </p>
            <p> <i onclick="removeOneItem(${i})" class="text-danger fa-solid fa-trash"></i> </p>
            <p> <i onclick = "update(${i})"class=" text-success fa-solid fa-pen"></i></p>
            <hr>
        </div>
            
        `
    }
    card.innerHTML =tableRow ; 
    checkEmpty();
}

show_data();
let viewOneItem = (i)=>{
    myModel.innerHTML = `
      
            <div class="">
                <div class="modelbody">
                    <h6> prodact name : ${allProdact[i].product_name}</h6>
                    <hr>
                    <h6> category : ${allProdact[i].category}</h6>
                    <hr>
                    <h6> cost : ${allProdact[i].cost}</h6>
                    <hr>
                    <h6> cost tax : ${allProdact[i].tax}</h6>
                    <hr>
                    <h6> my return : ${allProdact[i].my_return}</h6>
                    <hr>
                    <h6> discount : ${allProdact[i].discount}</h6>
                    <hr>
                    <h6> sales cost : ${allProdact[i].sales_cost}</h6>
                    <hr>
                    <h6>  net profit : ${allProdact[i].net_profit}</h6>
                    <hr>
                    <img src="${allProdact[i].image}"width="40" margin="auto">
                    <hr>
                </div>
            </div>
    `
    layOut.style.display="flex";
}

// counter of cards ------------
counter_card.innerHTML = `you have ${allProdact.length} card `
let counter =()=>{
    counter_card.innerHTML = `you have ${allProdact.length} card `;
}


layOut.addEventListener("click" , function(){
    layOut.style.display="none";
})

close.addEventListener("click",function(){
    layOut.style.display="none";
})

let removeOneItem = (i)=>{
    if(confirm("you are sure")){
        allProdact.splice(i,1);
        localStorage.myProdact = JSON.stringify(allProdact);
        show_data();
        counter();
    }
}
let update = (i)=>{
    globalId = i ;
    mood = "update";
    inputName.value=allProdact[i].product_name;
     select.value =allProdact[i]. category;
     inputSalary[0].value=allProdact[i].cost;
     inputSalary[1].value=allProdact[i].tax;
     inputSalary[2].value=allProdact[i].my_return;
     inputSalary[3].value=allProdact[i].discount;
     inputSalary[4].value=allProdact[i].sales_cost;
     inputSalary[5].value=allProdact[i].net_profit;
     image.value =allProdact[i].image;
     rowCount.disabled = true ;
     addTaskBtn.innerHTML = `update prodact ${i +1}`;
     addTaskBtn.classList.replace('btn-success',"btn-warning");
}

let reset = ()=>{
    inputName.value="";
     select.value =""; 
     inputSalary[0].value="";
     inputSalary[1].value="";
     inputSalary[2].value="";
     inputSalary[3].value="";
     inputSalary[4].value="";
     inputSalary[5].value="";
     rowCount.value="";
     image.value ="";
}


let clearAll = ()=>{
    if(confirm("are you sure ")){
        localStorage.clear();
        allProdact.splice(0);
        show_data();
        counter();
    }
}
clearAllBtn.addEventListener('click',clearAll);



let creat_object = ()=>{
    let new_project = {
         product_name : inputName.value,
         category : select.value , 
         cost : inputSalary[0].value,
         tax : inputSalary[1].value,
         my_return : inputSalary[2].value,
         discount : inputSalary[3].value,
         sales_cost : inputSalary[4].value,
         net_profit : inputSalary[5].value,
         image : image.value ,

    }
    if(mood=="create"){
        if(rowCount.value <= 0){
            allProdact.push(new_project);
        }else{
            for(let i = 0 ; i < rowCount.value ; i++){
                allProdact.push(new_project);
            }
        }
    }else{
        allProdact[globalId] = new_project ;
        rowCount.disabled = false ;
        addTaskBtn.innerHTML = `add prodact `;
        addTaskBtn.classList.replace("btn-warning",'btn-success');
        mood = "create";
        
    }
    
    // allProdact.push(new_project);
    console.log(allProdact);
    localStorage.setItem('myProdact' , JSON.stringify(allProdact));
    show_data() ; 
    checkEmpty();
    reset();
}



let error = ()=>{
    if(inputName.value ==""){
        result.textContent="enter your name !";
       // inputName.classList.add('input-error');
    }else if(select.value=="selectcategory"){
        result.textContent="choose your gender ";
       // select.classList.add('input-error');
        //inputName.classList.remove('input-error');
    }else if(select.value==""){
        result.textContent="choose your gender ";
    }else if(inputSalary[0].value==""){
        result.textContent="enter your cost";
        //inputSalary[0].classList.add('input-error');
       // select.classList.remove('input-error');
    }else if(inputSalary[0].value<0){
        result.textContent=" your cost must be more then  0 ";
    }else if(inputSalary[1].value==""){
        result.textContent="enter your tax : *** %";
        //inputSalary[0].classList.remove('input-error');
        //inputSalary[1].classList.add('input-error');
    }else if(inputSalary[2].value==""){
        result.textContent="enter your my return ";
        //inputSalary[1].classList.remove('input-error');
        //inputSalary[2].classList.add('input-error');
    }else if(inputSalary[2].value<0){
        result.textContent=" your return must be more then  0 ";
    }else if(inputSalary[3].value==""){
        result.textContent="enter your my discount : *** % ";
       //inputSalary[2].classList.remove('input-error');
        //inputSalary[3].classList.add('input-error');
    }else if(inputSalary[3].value<0){
        result.textContent=" your discount must be more then  0 ";
    }else if(image.value == ""){
       // inputSalary[3].classList.remove('input-error');
        result.textContent="enter your url of image";
        //image.classList.add('input-error');
    }else{
        // inputSalary[0].classList.remove('input-error');
        // inputSalary[1].classList.remove('input-error');
        // inputSalary[2].classList.remove('input-error');
        // inputSalary[3].classList.remove('input-error');
        // select.classList.remove('input-error');
        // inputName.classList.remove('input-error');
        // image.classList.remove('input-error');
        result.textContent = "";
        creat_object();
        counter();
    }
    
}


addTaskBtn.addEventListener('click' , error);