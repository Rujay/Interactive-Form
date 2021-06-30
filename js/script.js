const form = document.getElementsByTagName('form')[0]; 
const inputName = document.getElementById('name'); 
const inputEmail= document.getElementById('email'); 
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
//shirt design variables
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');
const shirtColorOptions = document.querySelectorAll('#color option');
//activities variables
const activities = document.getElementById('activities'); 
const activitiesCost = document.getElementById('activities-cost');
const checkboxes = document.querySelectorAll('[type="checkbox"]');
//Payment Information variables
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const cardNumber = document.getElementById('cc-num'); 
const zipCode = document.getElementById('zip'); 
const cardCvv = document.getElementById('cvv'); 

//Focuses on the name field whenever the page loads.
inputName.focus();
//Hide the other job role by default
otherJobRole.style.display = 'none';
//Job Role event listener
jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other'){
        otherJobRole.style.display = 'inherit';  
    } else {
        otherJobRole.style.display = 'none';
    }
});

//Event listener for t-shirt design/theme
shirtColor.disabled = true;

shirtDesign.addEventListener('change', (e) => {
    shirtColor.disabled = false;
    for (let i = 0; i < shirtColorOptions.length; i++) {
        let optionAttribute = shirtColorOptions[i].getAttribute('data-theme');
        let colorTheme = e.target.value;
        if (colorTheme === optionAttribute) {
            shirtColorOptions[i].hidden = false;
            shirtColorOptions[i].selected = true;
        } else {
            shirtColorOptions[i].hidden = true;
            shirtColorOptions[i].selected = false; 
        }
    }
});

//Register for Activities Event Listener
let totalCost = 0;
activities.addEventListener('change', (e) => {
    let clickedAttributes = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked){
        totalCost += clickedAttributes;
    } else {
        totalCost -= clickedAttributes;
    };
    activitiesCost.innerHTML = `Total: $${totalCost}`;
});

//Accessibility - highlights the activity that is in focus
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('focus', (e)=>{
        e.target.parentNode.classList.add('focus');
    });
    checkboxes[i].addEventListener('blur', (e)=>{
        e.target.parentNode.classList.remove('focus');
    });
}

// Payment information section
paypal.hidden = true;
bitcoin.hidden = true;
payment.children[1].selected = true;

payment.addEventListener('change', (e) => {
    if (e.target.value === paypal.id){
        paypal.hidden = false;
        bitcoin.hidden = true;
        creditCard.hidden = true;
    } else if (e.target.value === bitcoin.id){
        paypal.hidden = true;
        bitcoin.hidden = false;
        creditCard.hidden = true; 
    } else if (e.target.value === creditCard.id){
        paypal.hidden = true;
        bitcoin.hidden = true;
        creditCard.hidden = false;
    }
});

//Validation functions
//Name, Email & Activities
function isNameValid(){
    const nameValue = inputName.value;
    return /^[a-z ,.'-]+$/i.test(nameValue);
}

function isEmailValid(){
   const emailValue = inputEmail.value;
   const emailTest =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(emailValue);
   return emailTest;
}

function isActivitiesValid(){
    let selection = false;   
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selection = true;
        }
    };
    return selection;
}
//Payment validation functions
function isCcNumValid(){
    return /^\d{13,16}$/.test(cardNumber.value)
}
function isZipValid(){
    return /^\d{5}$/.test(zipCode.value)
}
function isCvvValid(){
    return /^\d{3}$/.test(cvv.value)
}
function isCreditCardValid(){
    if (payment.value === 'credit-card') {
        if (isCcNumValid() && isZipValid() && isCvvValid()) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}
/*
* This function shows the user the sections of the form which are invalid
* @param {function} isValid - the function that checks if the element's  input is valid 
* @param {string} - The parent element of the input
*/
function validationError (isValid, element){
    if (!isValid) {
      
        element.classList.add('not-valid');
        element.classList.remove('valid');
        element.lastElementChild.style.display = 'inherit';
    } else {
        element.classList.add('valid');
        element.classList.remove('not-valid');
        element.lastElementChild.style.display = 'none';
    }
}
//Listener for the form submit event
form.addEventListener('submit', (e) => {

   if (isNameValid() && isEmailValid() && isActivitiesValid() && isCreditCardValid()) {
    //Submit the form
   } else {
       e.preventDefault();
       validationError(isNameValid(), inputName.parentElement);
       validationError(isEmailValid(), inputEmail.parentElement);
       validationError(isActivitiesValid(), activities);   
   }
    if (payment.value === "credit-card") {
            validationError(isCcNumValid(), cardNumber.parentElement);
            validationError(isZipValid(), zipCode.parentElement);
            validationError(isCvvValid(), cvv.parentElement);
       }
  
});


