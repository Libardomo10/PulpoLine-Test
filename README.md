# Angular Weather App (PWA)

Este proyecto es una aplicación de clima desarrollada con Angular version 16.2.16., que utiliza WeatherAPI para obtener información meteorológica en tiempo real.

# Instalación y Configuración

## 1 Clonar el repositorio

git clone https://github.com/Libardomo10/PulpoLine-Test.git
cd PulpoLine-Test

Sobre el proyecto deberá realizar un paso hacía la rama dev-test-pulpoline
    1. `git fetch origin`
    2. `git checkout dev-test-pulpoline`
    3. `git pull origin dev-test-pulpoline`

## 2 Instalar dependencias
npm install

## 3 Configurar API Key de WeatherAPI

Este proyecto usa WeatherAPI para obtener datos meteorológicos. Este proyecto ya cuenta con la
API Key desde WeatherAPI pero si es necesario cambiarla se deberá ajustar en los archivos environments del proyecto
en la variable "weatherApiKey".

## 4 Ejecutar el proyecto en modo desarrollo

ng serve -o

Luego se abrirá el navegador y cargará la página.

## Optimizaciones

Se implementa a la aplicación el soporte de idioma para Ingles y Español adicional del manejo de estilos con Tailwind,
se manejan estructuras de datos con clases interface y consumos de API con manejo de errores y validaciones,
temas de carga perezosa.
