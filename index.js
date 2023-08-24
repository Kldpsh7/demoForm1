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
                //logging input values in console
                console.log(event.target.Name.value);
                console.log(event.target.mail.value);
                console.log(event.target.phone.value);

                //Saving input data in localstorage
                localStorage.setItem('Name: '+event.target.Name.value,'Email: '+event.target.mail.value+', Phone No.: '+event.target.phone.value);

                //Inserting input values into ol element and displayign them on screen
                const li=document.createElement('li');
                li.style='color:green;font-size:20px;'
                li.appendChild(document.createTextNode(`${event.target.Name.value} : ${event.target.mail.value} : ${event.target.phone.value}`));
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

        //MouseOver Function
        function MO(){
            document.querySelector('#form1').style.background='pink'
        }

        //MouseOut function
        function MOut(){
            document.querySelector('#form1').style.background='white'
       
        }