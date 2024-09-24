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

const subscribe = document.getElementById('subscribe');
const subscribe_block = document.getElementById('subscribe-block');

subscribe.onclick = async ()=>{
  const email = document.getElementById('subscribe-email').value;

  const existingErrorDiv = document.querySelector('.alert.alert-danger');
  if (existingErrorDiv) {
    existingErrorDiv.remove();
  }
  
  subscribe.innerHTML = `<span class="spinner-border spinner-border-sm text-black" role="status" aria-hidden="true"></span> Loading...`;
  
  try {
    const response = await fetch('https://yol-eg.com/backend/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email}),
    });

    subscribe.innerHTML = `SUBSCRIBE <i class="fa-solid fa-right-long fs-6"></i>`;

    if(response.ok){
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your email has been added successfully, you will be directed to home page',
      });
      setTimeout(() => {
        window.location.href = "https://prelaunch.yol-eg.com/";
      }, 5000);
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

        subscribe_block.prepend(errorDiv);
      }
    }

  } catch (error) {
    return;
  }
}