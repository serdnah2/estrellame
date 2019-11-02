window.onload = () => {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.querySelector('#email-input');
        const errorMessage = document.querySelector('#login-error');

        if (email.value !== '') {
            const emailValid = validateEmail(email.value);
            if (emailValid) {
                //errorMessage.innerHTML = 'El correo registrado no se encuentra registrado, intenta de nuevo';
                //email.classList.add('has-error');
                window.location.href = 'home.html'
            } else {
                errorMessage.innerHTML = 'No se ha ingresado un correo válido';
                email.classList.add('has-error');
            }
        } else {
            errorMessage.innerHTML = 'No se ha ingresado ningún correo';
            email.classList.add('has-error');
        }
    });

    function validateEmail(email) {
        const regularExpression = /\S+@\S+\.\S+/;

        return regularExpression.test(email);
    }
}
