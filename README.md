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
> Únicamente accesible por administradores, solicitamos la información de los usuarios registrados.

- PATCH ('/:id')
> Para modificar los datos de un usuario registrado a través del ID, solo el dueño de la cuenta tiene acceso.

- DELETE ('/:id')
> Deshabilitar una cuenta de usuario a través del ID, solo el dueño de la cuenta tiene acceso.

- GET ('/me')
> Obtener la información del usuario en sesión.
