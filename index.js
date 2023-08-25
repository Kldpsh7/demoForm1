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
                //Saving input data in localstorage
                localStorage.setItem(obj.email,JSON.stringify(obj));

                //Inserting input values into ol element and displayign them on screen
                const li=document.createElement('li');
                li.style='color:green;font-size:15px;';
                li.appendChild(document.createTextNode(obj.name+' - '+obj.email+' - '+obj.phone));
                //adding delete button to list
                li.appendChild(delBtn.cloneNode(true));
                //adding edit button to list
                li.appendChild(edit.cloneNode(true));
                //adding list item to orderd list
                document.querySelector('#users').appendChild(li);

                //Displaying a message when form is succesfully submitted with timeout
                document.querySelector('#msg').style.background='green';
                document.querySelector('#msg').innerHTML='Your request has been recieved';
                setTimeout(tOut,4000);
                function tOut(){
                    document.querySelector('#msg').style.background='red'
                    document.querySelector('#msg').innerHTML='';
                }

                //Clearing input fields
                event.target.mail.value=event.target.Name.value=event.target.phone.value='';               
            }
        }

        //Creating a delete button to add with list element
        let delBtn=document.createElement('button');
        delBtn.innerText='X';
        delBtn.className='delete'
        delBtn.style='background-Color:red; color:yellow; float:right; font-Size:10px;';


        //Adding eventlistner for delete button and edit button
        document.getElementById('users').addEventListener('click',Delete);
        function Delete(e){
            if (e.target.className=='delete'){
                e.target.parentElement.remove();
                localStorage.removeItem(e.target.parentElement.innerText.split(' - ')[1]);
            }
        
            if (e.target.className=='edit'){
                //removing item from localstorage
                localStorage.removeItem(e.target.parentElement.innerText.split(' - ')[1]);
                //populating input fields to edit them
                document.getElementById('Name').value=e.target.parentElement.innerText.split(' - ')[0];
                document.getElementById('mail').value=e.target.parentElement.innerText.split(' - ')[1];
                document.getElementById('phone').value=e.target.parentElement.innerText.split(' - ')[2].slice(0,-6);
                e.target.parentElement.remove();
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