# hotels_server
This server is to manage hotels rooms reservations
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

#### Users

('api/v1/users')

- POST ('/singup')
> Creación de usuarios.

- POST ('/login')
> Inicio de sesión.

- GET ('/')
> Únicamente accesible por administradores, solicitamos información de los usuarios registrados.

- PATCH ('/:id')
> Para modificar los datos de un usuario registrado a través del ID, solo el dueño de la cuenta tiene acceso.

- DELETE ('/:id')
> Deshabilitar una cuenta de usuario a través del ID, solo el dueño de la cuenta tiene acceso.

- GET ('/me')
> Obtener información del usuario en sesión.

#### Hotels

('api/v1/hotels')

- POST ('/')
> Creación de hoteles, solo los administradores pueden crearlos.

- GET ('/')
- > Endpoint sin protección de usuario, obtener información de los hoteles registrados. Así como sus habitaciones.

- GET ('/:id')
- > Endpoint sin protección de usuario, obtener información de un hotel a través de su ID.

- PATCH ('/:id')
> Únicamente accesible por administradores, sirve para modificar los datos de un hotel registrado a través de su ID.

- DELETE ('/:id')
> Únicamente accesible por administradores, deshabilitar un hotel registrado.

#### Rooms

('api/v1/hotels/rooms')

- POST ('/:hotelId')
> Creación de habitación de hotel a través del hotelId enviado como parámetro, solo los administradores pueden crearlas.

- PATCH ('/:id')
> Únicamente accesible por administradores, sirve para modificar los datos de una habitación registrada a través de su ID.

- DELETE ('/:id')
> Únicamente accesible por administradores, sirve para deshabilitar una habitación registrada a través de su ID.
