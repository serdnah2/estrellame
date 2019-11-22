window.onload = () => {
    if (localStorage.getItem('user')) {
        document.querySelector(".landing-page").classList.remove('hide');
        /**
         * Guardamos los elementos HTML para luegao añadirle escuchadores o capturar valores
         */
        let user = {},
            allUsers = [],
            allTypeStars = [],
            idStarToSent,
            tryAgainButton = document.querySelector('#dismissing-error'),
            okButton = document.querySelector('#ok-button'),
            messageInput = document.querySelector("#message-text");
        receiverEmail = document.querySelector("#recipient-name");
        userAvatar = document.querySelector('.user-info');

        /**
         * Agregamos los escuchadores al botón de intentar de nuevo y al botón de ok
         */
        tryAgainButton.addEventListener('click', hideError);
        okButton.addEventListener('click', () => {
            document.querySelector('#sent').innerHTML = ''; //De esta forma limpiamos lo que teníamos previamente en la sección de enviadas
            getSentStars();
            $('#giveStartModal').modal('hide'); //De esta forma cerramos el modal de bootstrap
            hideError();
        });
        userAvatar.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });

        /**
         * Este método lo lanza bootstrap cuando el modal se abre
         */
        $('#giveStartModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var type = button.data('type');
            var title = button.data('title');
            var modal = $(this)
            idStarToSent = button.data('id');

            modal.find('.modal-header.title').addClass(type);
            modal.find('#modalTitle').text(title);
        });

        /**
         * Este método lo lanza bootstrap cuando el modal se cierra
         */
        $('#giveStartModal').on('hidden.bs.modal', function () {
            var modal = $(this);
            idStarToSent = null;

            modal.find('.modal-header').removeClass('excellence team-work think-big innovation fun moral');
            modal.find('#modalTitle').text('');
            messageInput.value = '';
            receiverEmail.value = '';
        });

        /**
         * Este método se encarga de mostrar los mensajes de errores y ocultar el formulario de envio de estrella
         */
        function showError() {
            document.querySelector('.modal-header.title').classList.add('d-none');
            document.querySelector('.modal-header.error').classList.add('d-block');

            document.querySelector('.modal-body.add-start').classList.add('d-none');
            document.querySelector('.modal-body.error').classList.add('d-block');
        }

        /**
         * Este método se encarga de mostrar los mensajes de errores y ocultar el formulario de envio de estrella
         * @param userRecieve {Object} los datos del usuario a quien se envía la estrella
         * @param message {String} El mensaje enviado junto con la estrella
         */
        function showSuccess(userRecieve, message) {
            document.querySelector('#user-recieve').innerHTML = userRecieve.NAME + ' ' + userRecieve.LASTNAME1 + ' ' + userRecieve.LASTNAME2;
            document.querySelector('#preview-message').innerHTML = message;

            document.querySelector('.modal-header.title').classList.add('d-none');
            document.querySelector('.modal-header.success').classList.add('d-block');

            document.querySelector('.modal-body.add-start').classList.add('d-none');
            document.querySelector('.modal-body.success').classList.add('d-block');
        }

        /**
         * Este método se encarga de ocultar el error o el mensaje del success y mostrar de nuevo el formulario
         */
        function hideError() {
            document.querySelector('.modal-header.error').classList.remove('d-block');
            document.querySelector('.modal-header.success').classList.remove('d-block');
            document.querySelector('.modal-header.title').classList.remove('d-none');

            document.querySelector('.modal-body.error').classList.remove('d-block');
            document.querySelector('.modal-body.success').classList.remove('d-block');
            document.querySelector('.modal-body.add-start').classList.remove('d-none');
        }

        /**
         * Este método agregar el escuchador de la acción de submit del formulario para enviar una estrella
         */
        function addSubmitListener() {
            const addStarForm = document.querySelector('#addStarForm');

            addStarForm.addEventListener('submit', event => {
                event.preventDefault();
                const userToSent = allUsers.find(user => user.EMAIL === receiverEmail.value);

                if (userToSent) {
                    /**
                     * El método fetch es quien se encarga de hacer el llamado AJAX a la base de datos,
                     * Solo necesitamos pasarle unos parámetros necesarios:
                     * - URL: a donde debe traer los datos
                     * - headers: (en este caso por que necesitamos enviar en el body los datos para que el backend los pueda capturar)
                     * - method: Es el verdo HTPP por el cual el backend está esperando la petición
                     * - body: los datos que le enviamos al backend
                     */
                    fetch('http://localhost:3000/stars', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            RECEIVER_ID: userToSent.ID,
                            SENDER_ID: user.data.ID,
                            STAR_ID: parseInt(idStarToSent),
                            DESCRIPTION: messageInput.value
                        })
                    })
                        .then(response => response.json())
                        .then(res => {
                            /**
                             * Validamos que si la respuesta es válida mostramos el mensaje de success
                             * En caso contrario, mostramos un error en pantalla
                             */
                            res.success ?
                                showSuccess(userToSent, messageInput.value) :
                                showError();
                        }).catch(() => { });
                } else {
                    showError();
                }
            });
        }

        /**
         * Este método captura la información del usuario guardada en la memoria del navegador
         * y a su vez, agrega el nombre del usuario en el header
         */
        function getUserData() {
            user = JSON.parse(localStorage.getItem('user'));

            document.querySelector('#username').innerHTML = user.data.NAME + ' ' + user.data.LASTNAME1 + ' ' + user.data.LASTNAME2;
        }

        /**
         * Este método obtiene mediante AJAX todos los usuarios del sistema
         */
        function getAllUsers() {
            /**
             * El método fetch es quien se encarga de hacer el llamado AJAX a la base de datos.
             * A diferencia de los otros, cuando solo necesitamos hacer una petición GET, solo es necesario definir la URL
             */
            fetch(`http://localhost:3000/users`)
                .then(response => response.json())
                .then(res => {
                    /**
                     * Validamos que la respuesta tenga datos y lo guardamos en la variable de allUsers
                     */
                    if (res.data && res.data.length > 0) {
                        allUsers = res.data;
                    }
                }).catch(() => { });
        }

        /**
         * Este método obtiene mediante AJAX todos los tipos de estrellas
         */
        function getAllStars() {
            /**
             * El método fetch es quien se encarga de hacer el llamado AJAX a la base de datos.
             * A diferencia de los otros, cuando solo necesitamos hacer una petición GET, solo es necesario definir la URL
             */
            fetch(`http://localhost:3000/stars`)
                .then(response => response.json())
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        allTypeStars = res.data;
                        /**
                         * Recorremos cada uno de los elementos de la respuesta y modificamos el DOM agregando una nueva estructura HTML que representa un tipo estrella
                         */
                        allTypeStars.forEach(star => {
                            document.querySelector('#stars').innerHTML += `
                            <li class="star ${star.DESCRIPTION}" data-toggle="modal" data-target="#giveStartModal" data-type="${star.DESCRIPTION}" data-title="${star.NAME}" data-id="${star.ID}">
                                <img src="img/estrellame-star.png" alt="star" />
                                <p>${star.NAME}</p>
                            </li>
                        `;
                        });
                        getSentStars();
                        getReceivedStars();
                    }
                }).catch(() => { });
        }

        /**
         * Este método obtiene mediante AJAX todas las estrellas enviadas
         */
        function getSentStars() {
            fetch(`http://localhost:3000/stars/${user.data.ID}/enviadas`)
                .then(response => response.json())
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        /**
                         * Recorremos cada uno de los elementos de la respuesta y modificamos el DOM agregando una nueva estructura HTML que representa un estrella enviada
                         */
                        res.data.forEach(sentStarItem => {
                            const typeStar = allTypeStars.find(star => star.ID === sentStarItem.STAR_ID);
                            document.querySelector('#sent').innerHTML += `
                            <div class="star-tab">
                                <div class="star-info">
                                    <img class="reciber-profile-img" src="img/estrellame-avatar.png" alt="star reciber profile image">
                                    <div class="name-and-date-wrapper">
                                        <div class="name-and-date">
                                            <h3 class="reciber-name">${sentStarItem.NAME} ${sentStarItem.LASTNAME1} ${sentStarItem.LASTNAME2}</h3>
                                            <p class= "star-date">hace 22 minutos</p>
                                        </div>
                                        <div class="star-type">
                                            <div class="icon-container ${typeStar.DESCRIPTION}">
                                                <img class="star-img" src="img/estrellame-star.png" alt="star image">
                                            </div> 
                                            <p class="star-text excellence">${typeStar.NAME}</p>
                                        </div>
                                        <p class="star-text">${sentStarItem.DESCRIPTION}</p>
                                    </div>
                                </div>
                                <div class="sender-info">
                                    <img class="sender-profile-img" src="img/estrellame-avatar.png" alt="star sender profile image">
                                    <p>Enviada por <b>${user.data.NAME} ${user.data.LASTNAME1} ${user.data.LASTNAME2}</b></p>
                                </div>
                            </div>
                        `;
                        });
                    } else {
                        document.querySelector('#sent').innerHTML = 'Aún no has enviado estrellas';
                    }
                }).catch(() => { });
        }

        /**
         * Este método obtiene mediante AJAX todas las estrellas recibidas
         */
        function getReceivedStars() {
            fetch(`http://localhost:3000/stars/${user.data.ID}/recibidas`)
                .then(response => response.json())
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        /**
                         * Recorremos cada uno de los elementos de la respuesta y modificamos el DOM agregando una nueva estructura HTML que representa un estrella recibida
                         */
                        res.data.forEach(receivedStarItem => {
                            const typeStar = allTypeStars.find(star => star.ID === receivedStarItem.STAR_ID);
                            document.querySelector('#received').innerHTML += `
                            <div class="star-tab">
                                <div class="star-info">
                                    <div class="name-and-date-wrapper">
                                        <div class="star-and-date">
                                            <div class="star-type">
                                                <div class="icon-container ${typeStar.DESCRIPTION}">
                                                    <img class="star-img" src="img/estrellame-star.png" alt="star image">
                                                </div> 
                                                <p class="star-text ${typeStar.DESCRIPTION}">${typeStar.NAME}</p>
                                            </div>
                                            <p class= "star-date">hace 22 minutos</p>
                                        </div>
                                        <p class="star-text">${receivedStarItem.DESCRIPTION}</p>
                                    </div>
                                </div>
                                <div class="sender-info">
                                    <img class="sender-profile-img" src="img/estrellame-avatar.png" alt="star sender profile image">
                                    <p>Enviada por <b>${receivedStarItem.NAME} ${receivedStarItem.LASTNAME1} ${receivedStarItem.LASTNAME2}</b></p>
                                </div>
                            </div>
                        `;
                        });
                    } else {
                        document.querySelector('#received').innerHTML = 'Aún no te han enviado estrellas';
                    }
                }).catch(() => { });
        }

        getUserData();
        getAllUsers();
        getAllStars();
        addSubmitListener();
    } else {
        window.location.href = 'index.html';
    }
}
