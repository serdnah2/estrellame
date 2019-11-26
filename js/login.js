window.onload = () => {
    /**
     * Guardamos los elementos HTML para luegao añadirle escuchadores o capturar valores
     */
    const loginForm = document.querySelector('#login-form'),
        errorMessage = document.querySelector('#login-error'),
        emailInput = document.querySelector('#email-input'),
        api = 'http://ec2-18-220-72-102.us-east-2.compute.amazonaws.com:4000';
    
    /**
     * Agregando el escuchador cuando en el formulario se haga submit
     * event.preventDefault() previene que el formulario se comporte de manera natural y
     * que nosotros podemos manipular los datos y enviarlos por ajax.
     */
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const inputEmailValue = emailInput.value;

        /**
         * Validamos si el campo del email no esté vacío
         */
        if (inputEmailValue !== '') {
            const emailValid = validateEmail(inputEmailValue);
            
            /**
             * Si el usuario es válido entonces llamamos al método de loginUser, que se encarga de hacer el llamado AJAX a la base de datos
             * En caso contrario, simplemente se llama un método llamado setError que recibe un mensaje para mostrar en pantalla
             */
            emailValid ?
                loginUser(inputEmailValue) :
                setError('No se ha ingresado un correo válido');
        } else {
            setError('No se ha ingresado ningún correo');
        }
    });

    /**
     * Este método se encarga de validar el email que ingresamos en el campo correspondiente.
     * Retorna un boolean. Verdadero en caso de que el email esté escrito correctamente o false en su caso negativo
     * @param email {String} Email que se debe validar
     */
    function validateEmail(email) {
        const regularExpression = /\S+@\S+\.\S+/; 

        return regularExpression.test(email);
    }

    /**
     * Este método se encarga de hacer el llamado AJAX a la base de datos para validar el usuario
     * @param email {String} El email de usuario válido
     */
    function loginUser(email) {
        /**
         * El método fetch es quien se encarga de hacer el llamado AJAX a la base de datos,
         * Solo necesitamos pasarle unos parámetros necesarios:
         * - URL: a donde debe traer los datos
         * - headers: (en este caso por que necesitamos enviar en el body los datos para que el backend los pueda capturar)
         * - method: Es el verdo HTPP por el cual el backend está esperando la petición
         * - body: los datos que le enviamos al backend
         */
        fetch(api + '/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(res => {
            /**
             * Validamos que si la respuesta es válida guardamos en la memoria del navegador los datos del usuario
             * y luego lo redireccionamos a home.html
             * En caso contrario, mostramos un error en pantalla
             */
            if (res.success) {
                localStorage.setItem('user', JSON.stringify(res));
                window.location.href = 'home.html'
            } else {
                setError('El correo registrado no se encuentra registrado, intenta de nuevo');
            }
        }).catch(() => {
            setError('Un error ha ocurrido, intenta de  nuevo');
        });
    }

    /**
     * Este método nos muestra en pantalla el error correspondiente
     * @param message {String} mensaje a mostrar
     */
    function setError(message) {
        errorMessage.innerHTML = message;
        emailInput.classList.add('has-error');
    }
}
