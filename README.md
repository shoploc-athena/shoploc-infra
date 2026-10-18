# shoploc-infra

> Infrastructure repository of **ShopLoc**: Docker Compose, diagrams and project-wide documentation.

## Table of contents

1. [About](#about)
2. [Repository content](#repository-content)
3. [Prerequisites](#prerequisites)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Branching and commits](#branching-and-commits)
7. [Security](#security)
8. [Project status](#project-status)
9. [Team](#team)

## About

ShopLoc is a multi-city local commerce platform split into microservices, each living in its own repository. This repository starts the whole platform locally and holds the documentation shared by all services.

| Repository | Purpose |
|---|---|
| `user-service` | Accounts, roles, authentication, loyalty |
| `store-service` | Shops, catalogue, stock, favourites |
| `order-service` | Cart, orders, payment, pick-up |
| `notification-analytics-service` | Notifications, statistics and reports |
| `shoploc-frontend` | Web application served by nginx, forwards `/api` to `store-service` |
| `shoploc-infra` | **This repository** |

## Repository content

```text
shoploc-infra
├── docker-compose.yml    # Starts the database, store-service and the front end
├── .env.example          # Template of the environment variables
├── docs/                 # Diagrams and shared documentation (planned)
└── README.md
```

## Prerequisites

- Git
- Docker Desktop
- The `store-service` and `shoploc-frontend` repositories cloned **next to** `shoploc-infra` (same parent folder), because the images are built from them:

```text
shoploc/
├── shoploc-infra/
├── store-service/
└── shoploc-frontend/
```

## Configuration

1. Copy the template: `cp .env.example .env`
2. Edit `.env` and set real values.

The `.env` file contains secrets and is ignored by Git. Never commit it.

## Usage

```bash
docker compose up --build    # build the images and start the platform
docker compose up -d         # start it in the background
docker compose down          # stop it
```

Once the platform is running:

| URL | Description |
|---|---|
| http://localhost:3000 | Web application |
| http://localhost:8080/swagger-ui.html | API documentation (Swagger) |

The database content is kept in the `db-data` volume. `docker compose down -v` also deletes it.

## Branching and commits

- `main`: stable, protected, changes only through pull requests.
- `develop`: integration branch.
- Branches are named `feature/<TICKET>-short-description`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/), for example `feat(compose): add the front end to the stack [GLOP-41]`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## Security

See [SECURITY.md](SECURITY.md) to report a vulnerability. The repository is monitored by Dependabot (images used in the Compose file) and GitHub secret scanning with push protection.

## Project status

| Item | Status |
|---|---|
| Repository setup | In progress |
| Docker Compose with `store-service` | Done |
| Front end in Docker Compose | Done |
| Security scanning | Done |
| Architecture diagrams | Planned |

## Team

Master MIAGE, Université de Lille.

- Marie
- Lan
- Brunine
- Angela