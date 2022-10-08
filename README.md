# hotels_server

Servidor para el manejo de reservaciones de habitaciones de hotel

## Models

![IMG](https://i.ibb.co/fpWVGvP/hotel-server-models.jpg)

## Documentación de Postman

https://www.postman.com/joint-operations-technologist-37890296/workspace/hotel-app/documentation/22487968-0a34018d-ee15-4e67-ba65-923287c949ca

## Instrucciones

###### Clonar repositorio.

###### Instalar dependencias (npm i).

###### Crear el archivo ENV (.env).

###### Iniciar seridor (npm run start-dev | npm run start)

## Endpoints

## Users

#### ('api/v1/users')

-   POST ('/singup')

    > Creación de usuarios.

-   POST ('/login')

    > Inicio de sesión.

-   GET ('/')

    > Únicamente accesible por administradores, solicitamos información de los usuarios registrados.

-   PATCH ('/:id')

    > Para modificar los datos de un usuario registrado a través del ID, solo el dueño de la cuenta tiene acceso.

-   DELETE ('/:id')

    > Deshabilitar una cuenta de usuario a través del ID, solo el dueño de la cuenta tiene acceso.

-   GET ('/me')
    > Obtener información del usuario en sesión.

##

## Hotels

#### ('api/v1/hotels')

-   POST ('/')

    > Creación de hoteles, solo los administradores pueden crearlos.

-   GET ('/')

    > Endpoint sin protección de usuario, obtener información de los hoteles registrados. Así como sus habitaciones.

-   GET ('/:id')

    > Endpoint sin protección de usuario, obtener información de un hotel a través de su ID.

-   PATCH ('/:id')

    > Únicamente accesible por administradores, sirve para modificar los datos de un hotel registrado a través de su ID.

-   DELETE ('/:id')
    > Únicamente accesible por administradores, deshabilitar un hotel registrado.

##

## Rooms

#### ('api/v1/hotels/rooms')

-   POST ('/:hotelId')

    > Creación de habitación de hotel a través del hotelId enviado como parámetro, solo los administradores pueden crearlas.

-   PATCH ('/:id')

    > Únicamente accesible por administradores, sirve para modificar los datos de una habitación registrada a través de su ID.

-   DELETE ('/:id')
    > Únicamente accesible por administradores, sirve para deshabilitar una habitación registrada a través de su ID.

##

## Reservations

#### ('api/v1/reservations')

-   POST ('/')

    > Creación de una reservación de habitación, enviamos los días (days) de reserva y el roomId a través del body. Se verifica que la habitación esté disponible, antes de crear la reservación.

-   GET ('/')
    > Obtener las reservaciones realizadas por el usuario en sesión.

POST ('/:reservationId')

> Para marcar la reservación (encontrada a través del parámetro reservationId) como pagada, enviamos el método de pago (paymentMethodId) a través del body.

DELETE ('/:reservationId')

> Únicamente accesible por administradores, sirve para deshabilitar una reservación registrada a través de su ID.

PATCH ('/:reservationId')

> Únicamente accesible por administradores, su función es dar por concluida la reserva cuando se cumplan los días de la misma. También se marca la habitación que estaba ocupada como disponible.

##

## Payment Methods

#### ('api/v1/paymentMethods')

-   POST ('/')
    > Creación de un método de pago, solo los administradores pueden crearlos. Enviamos el nombre (name) del método de pago a través del body.

PATCH ('/:paymentMethodId')

> Únicamente accesible por administradores, para actualizar el nombre (name) de un método de pago registrado a través de su ID.

DELETE ('/:paymentMethodId')

> Únicamente accesible por administradores, para deshabilitar un método de pago registrado a través de su ID.
