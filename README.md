# Características clave del sistema
Actualización en tiempo real: Cada tienda puede actualizar el estado de su inventario inmediatamente.
Reportes de stock: Generación de reportes dinámicos sobre las existencias actuales.
Pedidos de reabastecimiento: Los proveedores pueden generar órdenes de reabastecimiento de productos cuando el stock baja de cierto nivel.
Sincronización con ventas: Actualización automática del inventario según las ventas realizadas en el sistema de ventas conectado.
🔧 Tecnologías utilizadas
Frontend:
React,
Tailwind CSS,
Vite
Backend:
Node.js,
Sequelize ORM
Base de datos:
MySQL
Autenticación:
JWT (JSON Web Token)
🛠️ Instalación
Requisitos previos
Node.js
MySQL
Git
Pasos para la instalación
Clonar el repositorio:
bash
Copiar código
git clone https://github.com/tu-usuario/inventory-management-system.git
cd inventory-management-system
Instalar dependencias del backend y frontend:
bash
Copiar código
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
Configurar la base de datos:
Configura las variables de entorno para la base de datos en el archivo .env dentro de /server:

makefile
Copiar código
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=inventory_db
Iniciar la aplicación:
bash
Copiar código
# Backend (desde la carpeta /server)
npm start

# Frontend (desde la carpeta /client)
npm run dev
🖥️ Uso
Proveedor: Puede acceder a la aplicación para gestionar inventarios, realizar pedidos de reabastecimiento, y generar reportes de productos y stock.
Panel de control: Muestra gráficas y estadísticas en tiempo real sobre el estado del inventario.
🔗 Enlaces
Documentación de API
Despliegue en producción
📜 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para obtener más información.

