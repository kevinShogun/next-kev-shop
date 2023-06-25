# KevShop - Aplicación de Next.js

¡Bienvenido a KevShop! Esta es una aplicación de Next.js que es un clon del Tesla Shop. Está desarrollada utilizando Typescript, Material UI y MongoDB. Además, se utiliza gitmoji y docker-compose para crear el Seed de MongoDB.

## Requisitos previos

Asegúrate de tener los siguientes requisitos previos instalados en tu sistema:

- Node.js (v14 o superior)
- npm (v6 o superior)
- MongoDB
- Docker y docker-compose (opcional, solo si deseas utilizar el Seed de MongoDB)

## Instalación

Sigue estos pasos para instalar y ejecutar KevShop en tu máquina local:

1. Clona este repositorio en tu máquina local utilizando el siguiente comando:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd KevShop
   ```

3. Instala las dependencias utilizando npm:

   ```bash
   npm install
   ```

4. Configura las variables de entorno:
   
   Crea un archivo `.env.local` en el directorio raíz del proyecto y establece las siguientes variables de entorno:

   ```
   MONGODB_URL=<URL_DE_TU_MONGODB>
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Esto iniciará la aplicación en modo de desarrollo. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Uso

Una vez que la aplicación esté en funcionamiento, puedes navegar por las diferentes páginas y explorar las funcionalidades de KevShop. La aplicación está diseñada para ser fácil de usar e intuitiva.

## Docker Compose y Seed de MongoDB

Si deseas utilizar Docker y docker-compose para crear el Seed de MongoDB, sigue estos pasos adicionales:

1. Asegúrate de tener Docker y docker-compose instalados en tu sistema.

2. En el directorio raíz del proyecto, ejecuta el siguiente comando para crear y ejecutar los contenedores de Docker:

   ```bash
   docker-compose up -d
   ```

   Esto creará un contenedor de MongoDB y ejecutará el Seed para poblar la base de datos con datos de ejemplo.

## Contribución

Si deseas contribuir a KevShop, ¡estamos encantados de recibir tus aportes! Puedes abrir un Pull Request en este repositorio para sugerir mejoras, correcciones de errores o nuevas funcionalidades.

Antes de abrir un Pull Request, asegúrate de seguir estas pautas:

- Realiza cambios en una rama separada y no en la rama principal (main).
- Sigue las convenciones de estilo de código y asegúrate de que el código sea legible y esté correctamente documentado.
- Asegúrate de que los cambios sean probados y funcionen correctamente.

## Licencia

KevShop se distribuye bajo la licencia MIT. Puedes consultar el archivo [LICENSE](LICENSE) para obtener más información.

## Contacto

Si tienes alguna pregunta o sugerencia relacionada con KevShop, no dudes en ponerte en contacto con nosotros a través de la sección de "Issues" en este repositorio. ¡Estamos aquí para ayudarte!

¡Esperamos que disfrutes usando KevShop y te agradecemos por tu interés en nuestra aplicación!