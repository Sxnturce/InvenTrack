# 🛒 **Frontend del Sistema de Gestión de Inventarios**

![Sistema de Gestión de Inventarios]

<img src="https://www.liderlogo.es/wp-content/uploads/2022/12/pasted-image-0-4.png" alt="Sistema de Gestión de Inventarios" width="100%" height="400px"/>

### **Descripción general** 📋

Este es el frontend del sistema de **gestión de inventarios** para tiendas minoristas. La aplicación permite a los proveedores gestionar y visualizar la información de inventario en **tiempo real**, incluyendo gráficos de ventas mensuales y reportes detallados. El frontend fue desarrollado utilizando **React** y está estilizado con **Tailwind CSS** para una experiencia de usuario moderna y responsiva.

---

## **📂 Estructura del Proyecto**

El proyecto sigue una organización que facilita el desarrollo y la escalabilidad, con la siguiente estructura de carpetas:

```
└── 📁client
    └── 📁docs
        └── Diagram-proyect.drawio
    └── 📁public
        └── 📁img
    └── 📁src
        └── 📁assets
            └── react.svg
        └── 📁components
            └── 📁auth
            └── 📁dashboard
            └── 📁layout
                └── adminLayout.jsx
                └── authLayout.jsx
            └── LoadingComponent.jsx
        └── 📁config
            └── Axios.jsx
        └── 📁context
            └── authContext.jsx
        └── 📁graphics
            └── LineChart.jsx
        └── 📁helpers
            └── 📁alerts
        └── 📁hooks
            └── StateAuth.jsx
        └── 📁validate
        └── 📁views
        └── App.jsx
        └── index.css
        └── main.jsx
```

---

## **🚀 Características clave del frontend**

- **Enrutamiento:** La aplicación utiliza `React Router` para manejar la navegación entre las diferentes vistas de forma fluida y eficiente.
- **Gráficos interactivos:** Utiliza la biblioteca `Chart.js` para mostrar gráficos de ventas de los últimos 12 meses, brindando una visión clara de las tendencias de ventas.
- **Paginación:** Implementada con `React Paginate` para facilitar la visualización de datos en tablas de inventario.
- **Manejo de autenticación:** Usa un hook personalizado para el manejo de la autenticación y control de acceso a las rutas.
- **Estilo moderno:** Estilizado con `Tailwind CSS` para un diseño responsivo y atractivo.

---

## **🔧 Tecnologías utilizadas**

- **Frontend:**
  - ![#61dafb](https://via.placeholder.com/15/61dafb/000000?text=+) `React`
  - ![#38bdf8](https://via.placeholder.com/15/38bdf8/000000?text=+) `Tailwind CSS`
  - ![#646cff](https://via.placeholder.com/15/646cff/000000?text=+) `Vite`
  - ![#FF6384](https://via.placeholder.com/15/FF6384/000000?text=+) `Chart.js`
  - ![#CA4245](https://via.placeholder.com/15/CA4245/000000?text=+) `React Router`
  - ![#16a34a](https://via.placeholder.com/15/16a34a/000000?text=+) `React Paginate`
- **Manejo de peticiones:**
  - ![#5A29E4](https://via.placeholder.com/15/5A29E4/000000?text=+) `Axios`

---

## **🛠️ Instalación**

### **Requisitos previos**

- Node.js
- Git

### **Pasos para la instalación**

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Sxnturce/InvenTrack.git
   cd inventory-management-system/client
   ```

2. **Instalar dependencias del backend y frontend:**

- Backend
  npm install

- Frontend
  cd ../client
  npm install

3. **Configurar variables de entorno:**

   VITE_BACKEND_URL=http://localhost:4000

4. **Iniciar la aplicación:**

- npm run dev

## **🖥️ Uso**

El panel de control muestra los gráficos de ventas y el estado del inventario en tiempo real.
Puedes navegar por las diferentes secciones para ver y actualizar la información de productos, generar reportes y realizar pedidos de reabastecimiento.

## **📊 Gráficos de ventas**

Los gráficos de ventas son generados utilizando Chart.js y muestran las ventas de los últimos 12 meses, lo que permite visualizar las tendencias y el rendimiento de la tienda de forma clara y detallada.

## **🌐 Configuración de Axios**

La aplicación utiliza una instancia personalizada de Axios para manejar las peticiones al backend de manera eficiente. Esta configuración se encuentra en la carpeta config y asegura que la URL base de las peticiones sea la definida en las variables de entorno.

## **📁 Configuración de Vite**

Se configuró Vite para permitir el uso de alias @ para las rutas de importación de imágenes y otros archivos dentro del proyecto. Esto facilita la organización y acceso a los recursos en la carpeta assets.

## **🚀 Despliegue**

El frontend está listo para ser desplegado en servicios como Vercel, Netlify o cualquier otro hosting que soporte aplicaciones React. Solo asegúrate de configurar las variables de entorno de producción antes de hacer el despliegue.

---
