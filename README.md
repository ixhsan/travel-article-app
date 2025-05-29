# Travel Article Application

A full-stack application for managing and sharing travel articles, built with modern web technologies.

## Project Structure

```
travel-article-app/
├── travel-article-app_back-end/    # NestJS Backend
├── travel-article-app_front-end/   # React Frontend
└── docker-compose.yml              # Docker Compose configuration
```

## Tech Stack

### Backend (NestJS)

- Node.js with NestJS framework
- TypeORM for database management
- PostgreSQL database
- JWT authentication
- Swagger API documentation
- Class-validator and class-transformer
- TypeScript

### Frontend (React)

- React with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Shadcn/ui components
- React Query for data fetching
- Zustand for state management
- React Hook Form with Zod validation
- React Router for navigation

## Running the Project (via Local / Docker)

1. Clone the repository
2. if you want to run it on host locally, then create a `.env` file in the root directory, example already provided
3. if you wan to run this via docker, then make sure Docker and Docker Compose are installed, and run these commands in order:
```bash
docker-compose build --no-cache
docker-compose up
```
4. The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API Documentation: http://localhost:3000/api

## API Endpoints

### Authentication

- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login user

### Articles

- GET `/articles` - Get all articles
- POST `/articles` - Create new article
- GET `/articles/:id` - Get article by ID
- PATCH `/articles/:id` - Update article
- DELETE `/articles/:id` - Delete article
- POST `/articles/:id/like` - Toggle article like

### Comments

- GET `/comments/:articleId` - Get all comments for an article
- POST `/comments/:articleId` - Add comment to article
- PATCH `/comments/:id` - Update comment
- DELETE `/comments/:id` - Delete comment

### Users (extras)

- GET `/users` - Get all users (protected)

## API Examples

### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response:

```json
{
  "success": true,
  "message": "Register Success",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Create Article

```http
POST /articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Amazing Trip to Bali",
  "description": "Experience the beauty of Bali's beaches and culture",
  "imageUrl": "https://example.com/bali.jpg",
  "content": "Detailed article content here..."
}
```

Response:

```json
{
  "success": true,
  "message": "Article created successfully",
  "data": {
    "id": 1,
    "title": "Amazing Trip to Bali",
    "description": "Experience the beauty of Bali's beaches and culture",
    "imageUrl": "https://example.com/bali.jpg",
    "content": "Detailed article content here...",
    "createdAt": "2024-03-20T12:00:00Z",
    "updatedAt": "2024-03-20T12:00:00Z",
    "author": {
      "id": 1,
      "name": "John Doe"
    }
  }
}
```

## Project Structure Details

### Backend Structure

```
src/
├── common/              # Common utilities, decorators, filters
├── shared/              # Common utilities, decorators, filters
│   ├── entities/       # Shared entities
│   └── utils/         # Utility and helper
├── modules/            # Feature modules
│   ├── article/       # Article feature
│   ├── auth/         # Authentication
│   ├── comment/      # Comment feature
│   └── user/         # User management
├── config/            # Configuration
└── main.ts           # Application entry point
```

### Frontend Structure

```
src/
├── components/        # Reusable components
├── lib/              # Utilities and helpers
├── pages/            # Page components
├── services/         # API services
└── types/            # TypeScript types
```

## Development

### Backend Development

```bash
cd travel-article-app_back-end
npm install
npm run start:dev
```

### Frontend Development

```bash
cd travel-article-app_front-end
npm install
npm run dev
```
