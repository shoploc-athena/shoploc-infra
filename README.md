# shoploc-infra

> Infrastructure repository of **ShopLoc**: Docker Compose, gateway configuration, end-to-end tests and project-wide documentation.

## Table of contents

1. [About](#about)
2. [Repository content](#repository-content)
3. [Prerequisites](#prerequisites)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Gateway and cities](#gateway-and-cities)
7. [Databases](#databases)
8. [End-to-end tests](#end-to-end-tests)
9. [Branching and commits](#branching-and-commits)
10. [Security](#security)
11. [Project status](#project-status)
12. [Team](#team)

## About

ShopLoc is a multi-city local commerce platform split into microservices, each living in its own repository. This repository starts the whole platform locally from the images published by each repository's pipeline, and holds the documentation shared by all services.

| Repository | Purpose |
|---|---|
| `user-service` | Accounts, roles, authentication, loyalty |
| `store-service` | Shops, catalogue, stock, favourites |
| `order-service` | Cart, orders, payment, pick-up |
| `notification-analytics-service` | Notifications, statistics and reports |
| `shoploc-frontend` | Web application and gateway (nginx): routes each `/api` prefix to its service and sets the city |
| `shoploc-infra` | **This repository** |

## Repository content

```text
shoploc-infra
├── docker-compose.yml    # Starts the database, the services and the front end (gateway)
├── db/init-db.sh         # Creates one database and one user per service instance
├── e2e/                  # End-to-end tests (Playwright)
├── .env.example          # Template of the environment variables
├── CONTRIBUTING.md
├── SECURITY.md
├── docs/                 # Diagrams and shared documentation (planned)
└── README.md
```

## Prerequisites

- Git
- Docker Desktop, with at least 4 GB of memory allocated
- Node.js (current LTS), only to run the end-to-end tests

The service images are downloaded from GitHub Container Registry, so the other repositories do not need to be cloned. The images are built for `linux/amd64`: on Apple Silicon Macs they run through emulation.

## Configuration

1. Copy the template: `cp .env.example .env`
2. Edit `.env` and replace every `change-me` with a password of your choice (local development only).
3. Add the local city hosts to your hosts file (`/etc/hosts` on macOS and Linux, `C:/Windows/System32/drivers/etc/hosts` on Windows, as administrator):

```text
127.0.0.1 lille.shoploc.local paris.shoploc.local
```

The `.env` file contains secrets and is ignored by Git. Never commit it.

## Usage

```bash
docker compose pull          # download the latest images
docker compose up -d --wait  # start the platform and wait until it is healthy
docker compose ps            # check the state of every container
docker compose down          # stop it
```

Once the platform is running:

| URL | Description |
|---|---|
| http://lille.shoploc.local:3000 | Web application (Lille) |
| http://lille.shoploc.local:3000/api/products | Catalogue, through the gateway |
| http://localhost:8080/actuator/health | Health of `store-service` (8081: user, 8082: order, 8083: notification) |
| http://localhost:8080/swagger-ui.html | API documentation of `store-service` (Swagger) |

`http://localhost:3000` answers **404** on purpose: the gateway only serves known city hosts. Set `FRONTEND_PORT` in `.env` if port 3000 is already used on your machine.

## Gateway and cities

The front end container runs nginx, which is the single entry point. Each city has its own instance of every service.

| Path | Service (Lille instance) |
|---|---|
| `/api/users` | `user-service-lille` |
| `/api/stores`, `/api/products` | `store-service-lille` |
| `/api/orders` | `order-service-lille` |

- The city is deduced from the host name (`lille.shoploc.local`) and sent to the services in the `X-City` header. An `X-City` header sent by the browser is overwritten, so it is never forwarded.
- An unknown host receives a 404 from nginx and no service is called.
- To add a city, copy the `server` block of `nginx.conf` in `shoploc-frontend`, add the `*-paris` services to `docker-compose.yml`, and add three databases in `db/init-db.sh`.

## Databases

A single PostgreSQL server hosts one database per service instance. Each instance has its own user, and no other user can connect to that database.

| Database and user | Used by |
|---|---|
| `store_lille` | `store-service-lille` |
| `user_lille` | `user-service-lille` |
| `order_lille` | `order-service-lille` |

`db/init-db.sh` creates them the first time the `db-data` volume is created. To apply a change to this script, delete the volume with `docker compose down -v` (this also deletes the data).

## End-to-end tests

With the platform running:

```bash
cd e2e
npm ci
npx playwright install chromium
npm test
```

The tests check the catalogue in the browser, the routing of each API prefix and the 404 for unknown hosts. They also run in the CI of this repository.

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
| Docker Compose with all services, health checks and memory limits | Done |
| Gateway with city header (Lille) | Done |
| One database per service instance (Lille) | Done |
| End-to-end tests in CI | Done |
| Security scanning | Done |
| Paris instances | Planned |
| Architecture diagrams | Planned |

## Team

Master MIAGE, Université de Lille.

- Marie
- Lan
- Brunine
- Angela
