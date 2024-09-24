/*=============== SHOW MENU ===============*/

const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close')

// Menu show

navToggle.addEventListener('click' , ()=>{
  navMenu.classList.add('show-menu')
})

// Menu hidden 

navClose.addEventListener('click', ()=>{
  navMenu.classList.remove('show-menu')
})

/*=============== REMOVE MENU MOBILE ===============*/

const navLink = document.querySelectorAll('.nav__link')

const linkAction = ()=>{
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== sending data to server ===============*/

// contact us 

const formEl = document.querySelector('#contact_form');

  formEl.addEventListener('submit', async function(event) {
    event.preventDefault();
    event.stopPropagation(); 

    const existingErrorDiv = document.querySelector('.alert.alert-danger');
    if (existingErrorDiv) {
      existingErrorDiv.remove();
    }

    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const messageValue = document.getElementById('message').value;

    const data = {
      email: emailValue,
      name: nameValue,
      message: messageValue
    };

    try {
      const response = await fetch('https://yol-eg.com/backend/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {

        formEl.reset();
        alert("Message sent successfully!");
      } else {
        const result = await response.json();

        if (result.errors) {

          const errorDiv = document.createElement('div');
          errorDiv.className = 'alert alert-danger border-0';
          errorDiv.setAttribute('role', 'alert');

          const errorList = document.createElement('ul');
          errorList.classList = 'list-unstyled m-0 ps-1 myriad__font'

          Object.keys(result.errors).forEach((field) => {
            const listItem = document.createElement('li');
            listItem.className = 'ps-0 text-white';
            listItem.textContent = result.errors[field][0];
            errorList.appendChild(listItem);
          });

          errorDiv.appendChild(errorList);

          formEl.parentNode.insertBefore(errorDiv, formEl);
        }
      }
    } catch (error) {
      alert("There was an error sending the message: " + error.message);
    }
  });
