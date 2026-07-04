# Cotizador de préstamos para motocicletas

Prueba Tecni para banco promerica

## Requisitos

- Node.js 26
- npm 
- Angular CLI 22

## Instalación

```bash
npm install
```

## Ejecución

Iniciar la API simulada para esto se utiliso json-server

```bash
npm run api
```

En otra terminal, iniciar Angular:

```bash
npm start
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

La API estará disponible en:

```text
http://localhost:3000
```

## Rutas

- `/cotizaciones`: listado de cotizaciones.
- `/nueva-cotizacion`: formulario de registro.
- `/detalle/:id`: detalle de una cotización.

## Compilación

```bash
npm run build
```

## Tecnologías

- Angular 22
- Angular Material
- Reactive Forms
- JSON Server
