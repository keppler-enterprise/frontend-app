# Visualizador 3D de Satélites y Desechos Espaciales

Este proyecto es una aplicación 3D interactiva que muestra la Tierra, satélites en órbita y desechos espaciales utilizando datos reales.

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd visualizador-espacial

# Instalar dependencias
npm install
# o
yarn install
```

## Dependencias Requeridas

Asegúrate de instalar estas dependencias para que la aplicación funcione correctamente:

```bash
npm install three @react-three/fiber @react-three/drei satellite.js
# o
yarn add three @react-three/fiber @react-three/drei satellite.js
```

## Acerca de las APIs

El proyecto utiliza las siguientes fuentes de datos:

1. **Datos de satélites**:
   - CelesTrak (https://celestrak.org/NORAD/elements/): Proporciona TLEs (Two Line Elements) que se utilizan para calcular las posiciones de los satélites.
   - La aplicación obtiene datos de la URL: `https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle`

2. **Datos de desechos espaciales**:
   - Actualmente utiliza datos simulados generados internamente.
   - Para datos reales, considera registrarte en Space-Track.org (https://www.space-track.org) que ofrece una API completa.

## Estructura del Proyecto

- `App.tsx`: Componente principal que configura el canvas 3D y los controles de visualización
- `Earth.tsx`: Renderiza el planeta Tierra con texturas y efectos atmosféricos
- `Satellites.tsx`: Muestra satélites con posiciones calculadas a partir de TLEs reales
- `SpaceDebris.tsx`: Visualiza desechos espaciales (simulados o reales)
- `OrbitLines.tsx`: Muestra órbitas comunes (LEO, MEO, GEO)

## Configuración de APIs Reales

Para utilizar Space-Track.org para datos reales:

1. Regístrate en https://www.space-track.org/
2. Crea un archivo `.env` con tus credenciales:
   ```
   SPACE_TRACK_USERNAME=tu_usuario
   SPACE_TRACK_PASSWORD=tu_contraseña
   ```

3. Modifica el componente SpaceDebris.tsx para usar la API real:
   ```typescript
   const fetchDebris = async () => {
     try {
       // Basic auth
       const username = process.env.SPACE_TRACK_USERNAME;
       const password = process.env.SPACE_TRACK_PASSWORD;
       
       const response = await fetch(
         'https://www.space-track.org/basicspacedata/query/class/gp/OBJECT_TYPE/DEBRIS/orderby/NORAD_CAT_ID/format/json', 
         {
           headers: {
             'Authorization': 'Basic ' + btoa(`${username}:${password}`)
           }
         }
       );
       
       const data = await response.json();
       // Procesar los datos...
     } catch (error) {
       console.error('Error fetching debris data:', error);
     }
   };
   ```

## Características

- Visualización 3D interactiva de la Tierra con texturas de alta calidad
- Datos de satélites reales actualizados periódicamente
- Simulación de desechos espaciales basada en parámetros orbitales realistas
- Controles para activar/desactivar capas (satélites, desechos, órbitas)
- Información detallada al hacer clic en objetos
- Visualización de órbitas comunes (LEO, MEO, GEO)

## Notas sobre el rendimiento

Para mejorar el rendimiento:
- Los satélites se limitan a 100 objetos
- Los desechos espaciales se limitan a 150 objetos
- Considera reducir estos números si experimentas problemas de rendimiento
