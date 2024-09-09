# 🏪 **Inventory Management System for Retail Stores** 

![Sistema de Gestión de Inventarios](https://philna.sh/_astro/node.DvAuachI.png)

## **Descripción general** 📋

Este es un sistema **centralizado** de gestión de inventarios desarrollado para un grupo de tiendas minoristas. El sistema permite a cada tienda actualizar el estado de su inventario en **tiempo real**, generar **reportes de stock**, realizar **pedidos de reabastecimiento**, y sincronizar con un sistema de ventas para ajustar automáticamente el inventario. La aplicación está diseñada para **proveedores** que gestionan las existencias de productos en diferentes tiendas.

---

# **📂 Estructura del Proyecto**

El proyecto sigue la arquitectura **MVC (Modelo-Vista-Controlador)** con las siguientes capas:

- **Client:** Contiene el frontend, desarrollado con React y conectado a un backend.
- **Server:** Contiene la lógica del backend, manejado por Node.js con Sequelize como ORM para la base de datos MySQL.

---

# **🚀 Características clave del sistema**

- **Actualización en tiempo real:** Cada tienda puede actualizar el estado de su inventario inmediatamente.
- **Reportes de stock:** Generación de reportes dinámicos sobre las existencias actuales.
- **Pedidos de reabastecimiento:** Los proveedores pueden generar órdenes de reabastecimiento de productos cuando el stock baja de cierto nivel.
- **Sincronización con ventas:** Actualización automática del inventario según las ventas realizadas en el sistema de ventas conectado.

---

# **🔧 Tecnologías utilizadas**

- **Frontend:** ![#61dafb](https://via.placeholder.com/15/61dafb/000000?text=+) `React`, ![#38bdf8](https://via.placeholder.com/15/38bdf8/000000?text=+) `Tailwind CSS`, ![#646cff](https://via.placeholder.com/15/646cff/000000?text=+) `Vite`
- **Backend:** ![#83cd29](https://via.placeholder.com/15/83cd29/000000?text=+) `Node.js`, ![#00d8ff](https://via.placeholder.com/15/00d8ff/000000?text=+) `Sequelize ORM`
- **Base de datos:** ![#4479A1](https://via.placeholder.com/15/4479A1/000000?text=+) `MySQL`
- **Autenticación:** ![#f0db4f](https://via.placeholder.com/15/f0db4f/000000?text=+) `JWT (JSON Web Token)`

---

# **🛠️ Instalación**

### **Requisitos previos**

- Node.js
- MySQL
- Git

### **Pasos para la instalación**

1. **Clonar el repositorio:**

    ``bash
    git clone https://github.com/tu-usuario/inventory-management-system.git
    cd inventory-management-system``

2. **Instalar dependencias del backend y frontend:**

- Backend

  ``bash
  cd server
  npm install``

- Frontend
  
  ``bash
  cd ../client
  npm install``

3. **Configurar la base de datos:**

   ``  DB_HOST=localhost ``
   
   ``  DB_USER=root  ``
   
   `` DB_PASS=password ``
   
   `` DB_NAME=inventory_db ``
      
5. **Configurar la base de datos:**

- Backend (desde la carpeta /server)

  ``bash
  npm start``

- Frontend (desde la carpeta /client)
  
  ``bash
  npm run dev``
---
# 🖥️ Uso

**Proveedor:** 
- Puede acceder a la aplicación para gestionar inventarios, realizar pedidos de reabastecimiento, y generar reportes de productos y stock.
  Panel de control: Muestra gráficas y estadísticas en tiempo real sobre el estado del inventario.
---
# 🔗 Enlaces
  - Documentación de API
  - Despliegue en producción
---

