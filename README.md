![Banner](banner.png)
# Proyecto 4: API de reservacion de hotel
## Planteamiento.
En este pryecto, construirás una aplicación de servicios para la gestión de reservas en hoteles que involucre las 4 operaciones `CRUD` y otras 6 adicionales relacionadas con filtros, utilizando Node.js y Express.  Opcionalmente, realizarás un proceso de investigación relacionado con la documentación de API, usando Swagger, con la estandarización OPENAPI, la cual se utiliza en equipos internacionales para construir servicios escalables.
## Requisitos y caracteristicas.
- Utilizar Node.js y Express para el desarrollo del servidor.
- Contar con un archivo `.env` para las variables de entorno, el cual establecerás el puerto.
- Contar con un archivo `.gitignore` que incluya las carpetas y archivos que deberán ocultarse para el repositorio.
- Usar una arquitectura de carpetas clara. La idea es que la asignación de responsabilidades de tu código pueda ser ubicado fácilmente.
- Implementar los siguientes 10 endpoints:
  |Descripcion del endpoint|Método|Endpoint|
  |---|---|---|
  |Crear reserva|POST|/api/reservas|
  |Obtener la lista de reservas|GET|/api/reservas|
  |Obtener información de una reserva específica|GET|/api/reservas/:id|
  |Actualizar información de una reserva|PUT|/api/reservas/:id|
  |Eliminar una reserva específica|DELETE|/api/reservas/:id|
  |Filtrar reservas por hotel|GET|/api/reservas?hotel=HOTEL|
  |Filtrar reservas por rango de fechas|GET|/api/reservas?fecha_inicio=FECHA_INICIO&fecha_fin=FECHA_FIN|
  |Filtrar reservas por tipo de habitación|GET|/api/reservas?tipo_habitacion=TIPO_HABITACION|
  |Filtrar reservas por estado|GET|/api/reservas?estado=ESTADO|
  |Filtrar reservas por número de huéspedes|GET|/api/reservas?num_huespedes=NUM_HUESPEDES|
  

- Opcionalmente, documentar todos tus `endpoints` utilizando `Swagger` y `OpenAPI`.
  ## Detalles de implementación.
