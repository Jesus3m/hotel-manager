# Gestor de Hoteles, Habitaciones y Reservas

Este proyecto es un sistema de gestión de hoteles, habitaciones y reservas que permite a los usuarios listar, crear, editar y deshabilitar hoteles y habitaciones, así como también realizar reservas para las habitaciones disponibles.

## Características principales

- **Gestión de Hoteles:** Los usuarios pueden listar, crear, editar y deshabilitar hoteles. Cada hotel puede tener asignada una galería de imágenes.
  
- **Gestión de Habitaciones:** Es posible asignar varias habitaciones a cada hotel. Los usuarios pueden editar y deshabilitar las habitaciones según sea necesario.

- **Filtros Avanzados:** Los usuarios pueden filtrar los hoteles por destino, fechas de entrada y salida, y cantidad de huéspedes.

- **Reservas:** Los usuarios pueden realizar reservas para las habitaciones disponibles.

## Tecnologías Utilizadas

- **Lenguaje de Programación:** Node.js
  
- **Framework:** Next.js
  
- **Base de Datos:** Todo el sistema es mantenido por una API REST basada en nodejs (express) y una base de datos mongodb

- **Frontend:** React


## Detalles técnicos
- **Rounting**: La aplicacion utiliza un sistema de enrutamiento basado en archivos, en donde la carpeta app representa todas las rutas y subrutas con sus respectivas pages

- **Core**: La carpeta core se encarga de el manejo de las vistas y entidades de la aplicacion, como hoteles y reservas, cada una contiene las respectivas views (Elementos UI representados en las pages), las interfaces que definen los tipos de datos, los componentes utilizados en dichas views (como cards), y en caso de necesitarse, custom hooks para el manejo de logica, estados, y queries.

- **Shared**: Todos los elementos compartidos por la aplicacion van en la carpeta shared, aca encontramos:
    * UI: Componentes compartidos, basados en atomic design
    * Services: Clases que manejan la conexion a las apis
    * Context: Estados globales a la aplicación

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias necesarias (`npm install`).
3. Ejecuta el servidor localmente (`npm run dev`).

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tus cambios (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Agrega nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un pull request.

## Autores

Jesus Manuel Moreno Mantilla

## Licencia

MIT License