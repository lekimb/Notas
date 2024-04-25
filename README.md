# Notas-React-App
https://mikelbarberoles.netlify.app/notas

## Componentes
`NotasApp` es el componente raíz de la aplicación. `NotaActiva` visualiza y permite la edición de la nota activa, mientras que `ColumnaNotas` ofrece la lista de notas en miniatura. 

## Estructura de datos
- Un array `notas` para almacenar y ordenar las notas.
- Un string `notaActiva` para almacenar una referencia al id de la nota activa.

Cada nota es un objeto con los siguientes atributos: 
- created_at
- updated_at
- titulo
- cuerpo
- deleted (bool)

## Eventos
### onClick botón 'Nueva nota'
- Añadir nota vacía al array de notas
- Cambiar valor de la nota activa por el id de la nueva nota
- Poner el focus en el título de la nueva nota
- Si la nota activa está vacía, no hacer nada de lo anterior

### onClick nota en miniatura, en ColumnaNotas
- Cambiar valor de la nota activa por el id de la nota clickada
- Eliminar posibles notas vacías
- Poner el focus en el cuerpo de la nota activa

### onClick botón delete de nota en miniatura, en ColumnaNotas
- Eliminar nota de array de notas
- En caso de que la nota eliminada fuera la nota activa, cambiar el valor de la nota activa según corresponda

### onChange título y cuerpo, en NotaActiva
- Actualizar el título o el cuerpo de la nota activa
- Actualizar valor updated_at de la nota activa
