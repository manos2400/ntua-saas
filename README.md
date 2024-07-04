# NTUA ECE SAAS 2024 PROJECT
  
## TEAM 17
  
## Description
**solveMyProblem** is a SaaS application that enables users to address computationally intensive problems without the need for expensive specialized software or hardware.
It utilizes Google OR-Tools to tackle a range of operational research challenges cost-effectively.

The app was build using Node.js, React, Kafka and Docker.
The architecture of the app is microservices-based using RESTful APIs for communication between the services.

## Table of Contents
- [Directories Overview](#directories-overview)
- [Routes](#routes)
- [Hosts and Ports](#hosts-and-ports)
- [Build](#build)
  - [Build the container images from source](#build-the-container-images-from-source)
  - [Download using the prebuilt images](#download-using-the-prebuilt-images)
- [Run](#run)


### Directories Overview

- `*_ms`: the microservices
- `frontend`: UI for the project
- `ai-log`: zip files with the logs of the AI models
- `jmeter`: test plan file and results of stress testing using JMeter
- `architecture`: diagrams using Visual Paradigm

### Routes

#### Routes for credits_ms
- `GET` request to get microservice status: `/status`
- `PUT` request to add credits: `/addCredits`
- `GET` request to get credits: `/getCredits`

#### Routes for submit_ms
- `GET` request to get microservice status: `/status`
- `POST` request to submit metadata: `/submit_metadata`

#### Routes for generate_result_ms
- `GET` request to get microservice status: `/status`
- `POST` request to solve a problem: `/solveproblem`

#### Routes for results_ms
- `GET` request to get microservice status: `/status`
- `GET` request to get results for a problem: `/results/:id`

#### Routes for problems_ms
- `GET` request to get microservice status: `/status`
- `GET` request to get all problems: `/problems`
- `GET` request to get a specific problem: `/problems/:id`
- `DELETE` request to remove a specific problem: `/problems/:id`

#### Routes for analytics_ms
- `GET` request to get microservice status: `/status`
- `GET` request to get analytics for all problems: `/analytics`
- `GET` request to get analytics for a specific problem: `/analytics/:id`
- `GET` request to get a list of all submitted problems: `/log`

### Hosts and Ports

- `frontend`: localhost:3000
- `credits_ms`: localhost:4004
- `submit_ms`: localhost:4001
- `generate_result_ms`: localhost:4005
- `results_ms`: localhost:4002
- `problems_ms`: localhost:4000
- `analytics_ms`: localhost:4003
- `kafka`: localhost:9093
- `zookeeper`: localhost:2181


## Build

All the microservices are dockerized and have been bundled with other necessary services in a docker-compose file.
The images are also available on Github Packages.

### Build the container images from source

```bash
git clone https://github.com/ntua/saas2024-17.git
cd saas2024-17
docker network create saas
docker compose build
```

### Download using the prebuilt images

Authenticate to Github Packages, using a personal access token (PAT) with read:packages scope, because the images are private.
```bash
echo GHCR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```
where USERNAME is your Github username and GHCR_PAT is your personal access token.

Now modify the docker-compose.yml file to use the prebuilt images as shown in its comments.

## Run

Start:
```bash
docker compose up -d
```

Stop:
```bash
docker compose down
```





