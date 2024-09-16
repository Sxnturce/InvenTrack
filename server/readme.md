# 🖥️ Backend - Sistema de Gestión de Inventarios con MVC

Este proyecto sigue el patrón **Modelo-Vista-Controlador (MVC)** para organizar y separar la lógica de la aplicación. El backend está construido con **Node.js** y **Express**, mientras que el frontend utiliza **React** en la carpeta `client`.

## 📂 Estructura del Proyecto

```
└── 📁server
    └── 📁controllers
        └── userController.js
    └── 📁helpers
        └── conexionDB.js
    └── 📁http
        └── api.http
    └── 📁models
        └── 📁database
            └── database.js
            └── Usuario.js
        └── 📁user
            └── Usuario.js
    └── 📁routes
        └── userRoutes.js
    └── 📁schemes
        └── userValidate.js
    └── .env
    └── .gitignore
    └── app.js
    └── package-lock.json
    └── package.json
    └── readme.md
```

## 🚀 Estructura de **app.js**

El archivo `app.js` actúa como el punto de entrada principal del servidor. Aquí es donde se configura el middleware y se definen las rutas base. Las funciones dentro de `app.js` son **puntuales** y están dedicadas principalmente a:

1. **Configuración del middleware global**, como permitir **CORS** y analizar el formato de datos JSON.
2. **Definir las rutas base** para los distintos módulos (productos, inventarios, pedidos, etc.).
3. **Iniciar el servidor** para escuchar solicitudes.

### Ejemplo de funciones claves en `app.js`:

```js
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para permitir el envío y recepción de JSON
app.use(express.json());

// Conectar las rutas a los controladores
app.use("/api/products/", productRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
```

---

## 📊 Modelos (Models) - Lógica del negocio

La lógica del negocio se gestiona dentro de la carpeta `models`, donde se encuentran los archivos que representan las entidades principales como **( Product, Stock, y Order)**, junto con un archivo `db.js` que establece la conexión con la base de datos.

### Conexión a la base de datos:

En el archivo `db.js`, la conexión a la base de datos MySQL se configura usando Sequelize u otro ORM según las necesidades del proyecto.

```js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("inventory_db", "root", "password", {
	host: "localhost",
	dialect: "mysql",
});

module.exports = sequelize;
```

### Lógica del negocio:

Cada modelo representa una entidad en la base de datos, y la lógica del negocio se maneja a través de clases con métodos como `getAll`, `getById`, `create`, `update`, y `delete`.

Ejemplo en `Product.js`:

```js
const sequelize = require("./db");

class Product {
	// Obtener todos los productos
	static async getAll() {
		const [results, metadata] = await sequelize.query("SELECT * FROM products");
		return results;
	}
}

module.exports = Product;
```

En este ejemplo, el método `getAll` consulta todos los productos desde la base de datos y devuelve los resultados. Luego, este método es invocado desde el controlador para pasar los datos a la vista (React).

---

## 📡 Controladores (Controllers)

Los controladores se encargan de recibir las solicitudes desde las rutas, interactuar con los modelos para obtener o modificar los datos, y luego enviar la respuesta al cliente.

Ejemplo en `productController.js`:

```js
const Product = require("../models/Product");

// Controlador para obtener todos los productos
const getAllProducts = async (req, res) => {
	try {
		const products = await Product.getAll();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ error: "Error al obtener productos" });
	}
};

module.exports = { getAllProducts };
```

Este controlador se encarga de obtener todos los productos llamando a la función `getAll` del modelo `Product` y devolver los datos en formato JSON a la vista.

---

## 🌐 Rutas (Routes)

Las rutas son las responsables de dirigir las solicitudes **(GET, POST, PUT, DELETE)** hacia los controladores correspondientes. Cada módulo tiene su propio archivo de rutas, que luego es conectado en el archivo `app.js`.

Ejemplo en `productRoutes.js`:

```js
const express = require("express");
const { getAllProducts } = require("../controllers/productController");

const router = express.Router();

// Ruta para obtener todos los productos
router.get("/", getAllProducts);

module.exports = router;
```

---

## 🎨 Vistas (Views)

En este proyecto, las vistas están gestionadas por **React** y se encuentran en la carpeta `client`. Las vistas son responsables de interactuar con el backend (a través de **fetch** o **axios**) para mostrar y gestionar los datos en la interfaz de usuario.

### Fetch de datos desde React:

```js
useEffect(() => {
	const fetchProducts = async () => {
		const response = await fetch("http://localhost:4000/api/products/");
		const data = await response.json();
		setProducts(data);
	};

	fetchProducts();
}, []);
```

---

## 🗂️ Base de Datos

La base de datos está estructurada para manejar los productos, inventarios y pedidos de reabastecimiento. A continuación se detallan las tablas principales:

### Productos (Products)

| Campo       | Tipo                                      | Descripción                                      |
| ----------- | ----------------------------------------- | ------------------------------------------------ |
| `id`        | `INT` (Autoincremental, clave primaria)   | Identificador único de cada producto.            |
| `name`      | `VARCHAR(100)`                            | Nombre del producto.                             |
| `typeId`    | `INT` (Llave foránea, referencia a Types) | Tipo de producto, referencia a la tabla `Types`. |
| `price`     | `DECIMAL(10, 2)`                          | Precio del producto.                             |
| `createdAt` | `TIMESTAMP`                               | Fecha de creación del producto.                  |
| `updatedAt` | `TIMESTAMP`                               | Fecha de última actualización del producto.      |

---

### Tipos de producto (Types)

| Campo  | Tipo                                    | Descripción                                   |
| ------ | --------------------------------------- | --------------------------------------------- |
| `id`   | `INT` (Autoincremental, clave primaria) | Identificador único de cada tipo de producto. |
| `name` | `VARCHAR(50)`                           | Nombre del tipo de producto.                  |

---

### Inventario (Stock)

| Campo       | Tipo                                         | Descripción                                               |
| ----------- | -------------------------------------------- | --------------------------------------------------------- |
| `id`        | `INT` (Autoincremental, clave primaria)      | Identificador único de cada registro de inventario.       |
| `productId` | `INT` (Llave foránea, referencia a Products) | Referencia al producto en inventario.                     |
| `quantity`  | `INT`                                        | Cantidad de producto en inventario.                       |
| `status`    | `ENUM('bajo', 'adecuado', 'suficiente')`     | Estado del inventario según la cantidad disponible.       |
| `createdAt` | `TIMESTAMP`                                  | Fecha de creación del registro de inventario.             |
| `updatedAt` | `TIMESTAMP`                                  | Fecha de última actualización del registro de inventario. |

---

### Pedidos de reabastecimiento (Orders)

| Campo       | Tipo                                         | Descripción                               |
| ----------- | -------------------------------------------- | ----------------------------------------- |
| `id`        | `INT` (Autoincremental, clave primaria)      | Identificador único de cada pedido.       |
| `productId` | `INT` (Llave foránea, referencia a Products) | Producto solicitado en el pedido.         |
| `quantity`  | `INT`                                        | Cantidad solicitada en el pedido.         |
| `status`    | `ENUM('pendiente', 'enviado', 'entregado')`  | Estado del pedido.                        |
| `createdAt` | `TIMESTAMP`                                  | Fecha de creación del pedido.             |
| `updatedAt` | `TIMESTAMP`                                  | Fecha de última actualización del pedido. |

## 🔑 Autenticación y JWT

La autenticación se gestiona a través de **JWT (JSON Web Tokens)**. Al iniciar sesión, se genera un token que se almacena en el frontend para realizar solicitudes autenticadas. En el backend, el token es verificado para proteger las rutas y validar la identidad del usuario.

---

## 🚀 Despliegue

- Asegúrate de tener configuradas las variables de entorno en un archivo `.env`.
- Ejecuta el proyecto con:

  ```bash
  npm start
  ```

- Accede al frontend (React) para interactuar con la **API**.

## 📧 Contacto

Para preguntas o errores, contacta a: nothing@hotmail.com

---

Este `README.md` te ayudará a documentar la estructura de tu proyecto, las interacciones entre las capas del modelo-vista-controlador, y la configuración básica del backend con JWT para la autenticación.
