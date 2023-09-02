var isEdit=0;
var eid;
//initializing a baseURL for crud base URL and use it anywhere on the page
var baseUrl='https://crudcrud.com/api/89c17bcb17eb4a3bb8f9fc7af454f77a/aptdata'
// Getting form element and setting event listners
const myForm = document.querySelector('[name=form1]');
myForm.addEventListener('submit', buttonPress);
myForm.addEventListener('mouseover',MO);
myForm.addEventListener('mouseout', MOut);

// Defining what happens on occurence of an event (form submit)
function buttonPress(event){

    //preventing defgault page relaod on form submit
    event.preventDefault(); 

    //Validating input fields
    if (event.target.Name.value==='' || event.target.mail.value==='' ||
    event.target.phone.value===''){
                
        //If any field is empty, displaying a message with timeout
        document.querySelector('#msg').innerHTML='Please fill all fields';
        setTimeout(()=>document.querySelector('#msg').innerHTML='',3000)
    }
    else{

        //Getting data from form
        let name=event.target.Name.value;
        let email=event.target.mail.value;
        let phone=event.target.phone.value;

        //creating object
        let obj={
            name,
            email,
            phone
        }
        //Saving input data on crudcrud if post
        if (isEdit==1){
            console.log('Put Request')
            axios.put(`${baseUrl}/${eid}`,obj)
                .then(()=>{
                    document.getElementById(eid).firstElementChild.textContent=obj.name+' - '+obj.email+' - '+obj.phone;
                })
                .catch(err=>console.log(err))
            isEdit=0
        }
        else{
            axios.post(baseUrl,obj)
            .then((res)=>{
                console.log(res);
                showOnScreen(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        //Displaying a message when form is succesfully submitted with timeout
        document.querySelector('#msg').style.background='green';
        document.querySelector('#msg').innerHTML='Your appointment has been booked';
        setTimeout(tOut,4000);
        function tOut(){
            document.querySelector('#msg').style.background='red'
            document.querySelector('#msg').innerHTML='';
        }

        //Clearing input fields
        event.target.mail.value=event.target.Name.value=event.target.phone.value='';               
    }
}

//SHOWING ALL THE PREVIOUSLY BOOKED APPOINTMENTS ON SCREEN WHEN PAGE LOADS
window.addEventListener('DOMContentLoaded',()=>{
    axios.get(baseUrl)
    .then((res)=>{
        for (let index = 0; index < res.data.length; index++) {
            showOnScreen(res.data[index])
        }
    })
    .catch((err)=>console.log(err))
})

//Inserting input values into ol element and displayign them on screen
function showOnScreen(obj){
    const li=document.createElement('li');
    const span=document.createElement('span');
    li.style='color:green;font-size:15px;';
    //GIVING ID OF OBJECT TO LI SO WE CAN GRAB ON TO IT WHEN NEEDED
    li.id=obj._id;
    span.innerText=obj.name+' - '+obj.email+' - '+obj.phone;
    li.appendChild(span);
    //adding delete button to list
    li.appendChild(delBtn.cloneNode(true));
    //adding edit button to list
    li.appendChild(edit.cloneNode(true));
    //adding list item to orderd list
    document.querySelector('#users').appendChild(li);
}

//Creating a delete button to add with list element
let delBtn=document.createElement('button');
delBtn.innerText='X';
delBtn.className='delete'
delBtn.style='background-Color:red; color:yellow; float:right; font-Size:10px;';


//Adding eventlistner for delete button and edit button
document.getElementById('users').addEventListener('click',action);
function action(e){
    if (e.target.className=='delete'){
        
        axios.delete(`${baseUrl}/${e.target.parentElement.id}`)
        .then(()=>e.target.parentElement.remove())
        .catch((err)=>console.log(err))
    }
        
    if (e.target.className=='edit'){
            //populating input fields to edit them
            document.getElementById('Name').value=e.target.parentElement.firstElementChild.textContent.split(' - ')[0];
            document.getElementById('mail').value=e.target.parentElement.firstElementChild.textContent.split(' - ')[1];
            document.getElementById('phone').value=e.target.parentElement.firstElementChild.textContent.split(' - ')[2];
            //after populating the fields, book button will do put request, but it also does post request
            //so, we will initialize a variable, which will define what submit button will do
            isEdit=1; //if true, book button will do a put request with given data, else post
            //also initialing a variable to pass id of edit itme
            eid=e.target.parentElement.id;       
    }
}

//creating an edit button
let edit=document.createElement('button');
edit.innerText='Edit'
edit.className='edit'
edit.style='background-Color:green; color:yellow; float:right; font-Size:10px;';

//MouseOver Function
function MO(){
    document.querySelector('#form1').style.background='pink'
}

//MouseOut function
function MOut(){
    document.querySelector('#form1').style.background='white'
       
}