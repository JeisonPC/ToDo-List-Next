# Task Management App

Este es un proyecto de gestión de tareas construido con **Next.js 14**, **TypeScript**, **Prisma**, y **Zustand**. El proyecto sigue la arquitectura de **Atomic Design** y se implementan pruebas unitarias con **Jest** y **React Testing Library**.

## Características

- **Gestión de tareas**: Listar, Crear, actualizar y eliminar tareas.
- **Despliegue del formulario**: Formularios dinámicos con efectos de animación (deslizamiento desde la parte inferior).
- **Store global con Zustand**: Manejo del estado global para la gestión de tareas.
- **Pruebas unitarias**: Cobertura de pruebas para componentes y funciones clave.
- **Seguridad**: Sanitización de entradas y validaciones en el backend para prevenir ataques como **XSS**.

## Tecnologías Utilizadas

- **Next.js 14**: Framework React para aplicaciones de servidor y cliente.
- **TypeScript**: Tipado estático para mayor seguridad y robustez.
- **Prisma**: ORM para la manipulación de la base de datos.
- **Zustand**: Manejo del estado global de la aplicación.
- **Tailwind CSS**: Framework de estilos CSS para diseño rápido y responsivo.
- **Jest** y **React Testing Library**: Pruebas unitarias de componentes React.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/task-management-app.git
   ```

2. Instala las dependencias:

   ```bash
   cd task-management-app
   npm install
   ```

3. Configura la base de datos en **Prisma**:

   - Crea un archivo `.env` basado en `.env.example`.
   - Añade la URL de tu base de datos.

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   ```

4. Ejecuta las migraciones de Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`.

## Pruebas

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```bash
npm run test
```

Esto ejecutará las pruebas con Jest y React Testing Library, incluidas pruebas de componentes y funciones del store.

## Seguridad

El proyecto implementa prácticas de seguridad como:

- **Sanitización de entradas**: Usamos la librería `validator` en el backend para sanitizar las entradas del usuario antes de almacenarlas en la base de datos, evitando ataques de **XSS**.
- **Validaciones estrictas**: Se asegura que los datos como el estado de una tarea (`status`) sean válidos antes de ser procesados.
- **Protección de cabeceras HTTP**: Se recomienda implementar **Helmet** para una mejor seguridad en las cabeceras.

## API Endpoints

### Obtener todas las tareas

- **GET** `/api/tasks`

Este endpoint devuelve todas las tareas almacenadas en la base de datos.

**Ejemplo de respuesta**:

```json
{
  "message": "Estas son todas las tareas:",
  "tasks": [
    {
      "id": 1,
      "title": "Tarea 1",
      "description": "Descripción de la tarea 1",
      "status": "PENDING"
    },
    {
      "id": 2,
      "title": "Tarea 2",
      "description": "Descripción de la tarea 2",
      "status": "IN_PROGRESS"
    }
  ]
}
```

### Crear Tarea

- **POST** `/api/tasks/create-task`

  Crea una nueva tarea. Todos los campos son requeridos.

  **Cuerpo de la solicitud**:

  ```json
  {
    "title": "Mi Tarea",
    "description": "Descripción de la tarea",
    "status": "PENDING"
  }
  ```

### Actualizar Tarea

- **PUT** `/api/tasks/update-task`

  Actualiza una tarea existente.

  **Cuerpo de la solicitud**:

  ```json
  {
    "taskId": 1,
    "title": "Tarea Actualizada",
    "description": "Nueva descripción",
    "status": "COMPLETED"
  }
  ```

  ### Eliminar Tarea

- **DELETE** `/api/tasks/delete-task`

  Eliminar una tarea existente.

  **Ejemplo de respuesta**:

  ```json
  {
    "message": "Tarea eliminada correctamente:",
    "deletedTask": {
      "id": 1,
      "title": "Tarea eliminada",
      "description": "Descripción de la tarea",
      "status": "COMPLETED"
    }
  }
  ```

## Prácticas Recomendadas

1. **Sanitización y validación** de datos tanto en el frontend como en el backend para evitar ataques como **XSS** y asegurar la integridad de los datos.
2. **Atomic Design**: Arquitectura utilizada para estructurar los componentes de la UI en átomos, moléculas y organismos.
3. **Separación de responsabilidades**: Código bien estructurado con separación clara entre lógica de estado (Zustand), diseño (Tailwind) y datos (Prisma).

---

¡Gracias por revisar este proyecto! Si tienes alguna duda o sugerencia, no dudes en abrir una issue o hacer un pull request.
