window.onload = () => {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.querySelector('#email-input');

        if (email.value !== '') {
            const emailValid = validateEmail(email.value);
            const errorMessage = document.querySelector('#login-error');


            if (emailValid) {
                //errorMessage.innerHTML = 'El correo registrado no se encuentra registrado, intenta de nuevo';
                //email.classList.add('has-error');
                window.location.href = 'home.html'
            } else {
                errorMessage.innerHTML = 'Por favor ingrese un e-mail válido';
                email.classList.add('has-error');
            }
        }
    });

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;

        return re.test(email);
    }
}
