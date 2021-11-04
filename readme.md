# Buscaminas
## Api rest del clasico juego 

Simple implementación del algoritmo del Juego el Buscaminas creado por Curt Johnson y Robert Donner en 1989

## Caracteristicas
- Filas, Columnas y cantidad de minas configurables
- Genera partidas aleatorias
- Guarda partidas 

## Installation

Requiere de Nodejs 10+

Instalación de dependencias

```sh
cd Buscaminas
npm i
node app.js
```

## Testing
```sh
cd Buscaminas
npx mocha
```

Servidor local en 

```sh
127.0.0.1:5050
```
## EndPoint 
```
[GET] /buscaminas/:id -> Integer
[POST] /buscaminas/:id -> Integer Required
    Content-type: application/json
    body {
    minasLocalizadas -> Integer Required
    campo -> Array  Required
    resolved -> true | false | null
    }
```
## Licencia

MIT


