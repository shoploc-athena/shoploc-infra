# shoploc-infra

> Infrastructure repository of **ShopLoc**: Docker Compose, diagrams and project-wide documentation.

## Table of contents

1. [About](#about)
2. [Repository content](#repository-content)
3. [Prerequisites](#prerequisites)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Branching and commits](#branching-and-commits)
7. [Project status](#project-status)
8. [Team](#team)

## About

ShopLoc is a multi-city local commerce platform split into microservices, each living in its own repository. This repository starts the whole platform locally and holds the documentation shared by all services.

| Repository | Purpose |
|---|---|
| `user-service` | Accounts, roles, authentication, loyalty |
| `store-service` | Shops, catalogue, stock, favourites |
| `order-service` | Cart, orders, payment, pick-up |
| `notification-analytics-service` | Notifications, statistics and reports |
| `shoploc-frontend` | Web application |
| `shoploc-infra` | **This repository** |

## Repository content

```text
shoploc-infra
├── docker-compose.yml    # Starts the database and the services (planned)
├── .env.example          # Template of the environment variables
├── docs/                 # Diagrams and shared documentation (planned)
└── README.md
```

## Prerequisites

- Git
- Docker Desktop

## Configuration

1. Copy the template: `cp .env.example .env`
2. Edit `.env` and set real values.

The `.env` file contains secrets and is ignored by Git. Never commit it.

## Usage

> Planned: the Compose file is added with the `store-service` image.

```bash
docker compose up -d     # start the platform
docker compose down      # stop it
```

## Branching and commits

- `main`: stable, protected, changes only through pull requests.
- `develop`: integration branch.
- Branches are named `feature/<TICKET>-short-description`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/), for example `chore(compose): add database service [GLOP-40]`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## Project status

| Item | Status |
|---|---|
| Repository setup | In progress |
| Docker Compose with `store-service` | Planned |
| Architecture diagrams | Planned |

## Team

Master MIAGE, Université de Lille.

- Marie
- Lan
- Brunine
- Angela