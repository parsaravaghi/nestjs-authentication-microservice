# 🚀 NestJS Microservices Backend

A scalable backend built with **NestJS** following the **microservices architecture**.

## Features

- Microservices Architecture
- NestJS
- TypeScript
- PostgreSQL
- RabbitMQ
- TypeORM
- Docker & Docker Compose
- JWT Authentication
- Event-driven communication

## Architecture

```
                +----------------+
                |    Gateway     |
                +----------------+
                        |
                 RabbitMQ Broker
      +-----------+-----------+-----------+
      |           |           |           |
+-----------+ +-----------+ +-----------+ ...
|   Users   | |   Auth    | |  Courses  |
+-----------+ +-----------+ +-----------+
      |             |             |
 PostgreSQL   PostgreSQL    PostgreSQL
```

## Project Structure

```
apps/
├── gateway/
├── users/
├── auth/
└── courses/

libs/
├── common/
├── database/
├── contracts/
└── logger/
```

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- RabbitMQ
- Docker
- TypeORM

## Getting Started

```bash
npm install
docker compose up -d
npm run start:dev
```

## Services

| Service | Description |
|---------|-------------|
| Gateway | API Gateway |
| Users | User management |
| Auth | Authentication |
| Courses | Course management |

## Development

```bash
npm run lint
npm run test
npm run test:e2e
```

## Commit Convention

```
feat(users): add create user endpoint
fix(auth): validate refresh token
refactor(database): simplify repository
```

## License

MIT