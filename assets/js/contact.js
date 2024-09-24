const formEl = document.querySelector('#contact_form');
const send_button = document.getElementById('send-message');

formEl.addEventListener('submit', async function(event) {
  event.preventDefault();
  event.stopPropagation(); 
  
  send_button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;

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

    send_button.innerHTML = `SEND MESSAGE`;

    if (response.ok) {
      formEl.reset();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your Message sent successfully, you will be directed to home page',
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

        formEl.parentNode.insertBefore(errorDiv, formEl);
      }
    }
  } catch (error) {
    return;
  }
});