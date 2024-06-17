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
- [Installation and Usage](#installation-and-usage)
  - [Build the container images from source and run](#build-the-container-images-from-source-and-run)
  - [Download and run using the prebuilt images](#download-and-run-using-the-prebuilt-images)


### Directories Overview

- `*_ms`: the microservices
- `frontend`: UI for the project
- `ai-log`: zip files with the logs of the AI models
- `jmeter`: test plan file and results of stress testing using JMeter
- `architecture`: diagrams using Visual Paradigm

### Routes
> frontend routes use the frontend host and port, while every microservice route uses its own host and port

#### Routes for credits_ms
- `PUT` request to add credits:
    - *microservice route*: `/addCredits`
    - *frontend route*: `/solver_api/credits/getCredits`
- `GET` request to get credits:
    - *microservice route*: `/getCredits`
    - *frontend route*: `/solver_api/credits/getCredits`

#### Routes for submit_ms
- `GET` reuest to get microservice status:
    - *microservice route*: `/status`
    - *frontend route*: `/solver_api/submitProblem/status`
- `POST` request to submit a problem:
    - *microservice route*: `/submit_problem`
    - *frontend route*: `/solver_api/submitProblem/submit_problem`
- `POST` request to submit metadata:
    - *microservice route*: `/submit_metadata`
    - *frontend route*: `/solver_api/submitProblem/submit_metadata`

#### Routes for generate_result_ms
- `GET` request to get microservice status:
    - *microservice route*: `/status`
    - *frontend route*: `/solver_api/generateResults/status`
- `GET` request to solve a problem:
    - *microservice route*: `/solveproblem`
    - *frontend route*: `/solver_api/generateResults/solveproblem`

#### Routes for results_ms
- `GET` request to get microservice status:
    - *microservice route*: `/status`
    - *frontend route*: `/solver_api/results/status`
- `GET` request to get results for a problem:
    - *microservice route*: `/results/:id`
    - *frontend route*: `/solver_api/results/results/:id`

#### Routes for problems_ms
- `GET` request to get microservice status:
    - *microservice route*: `/status`
    - *frontend route*: `/solver_api/problems/status`
- `GET` request to get all problems:
    - *microservice route*: `/problems`
    - *frontend route*: `/solver_api/problems/problems`
- `GET` request to get a specific problem:
    - *microservice route*: `/problems/:id`
    - *frontend route*: `/solver_api/problems/problems/:id`
- `DELETE` request to remove a specific problem:
    - *microservice route*: `/problems/:id`
    - *frontend route*: `/solver_api/problems/problems/:id`

#### Routes for analytics_ms
- `GET` request to get microservice status:
    - *microservice route*: `/status`
    - *frontend route*: `/solver_api/analytics/status`
- `GET` request to get analytics for all problems:
    - *microservice route*: `/analytics`
    - *frontend route*: `/solver_api/analytics/analytics`
- `GET` request to get analytics for a specific problem:
    - *microservice route*: `/analytics/:id`
    - *frontend route*: `/solver_api/analytics/analytics/:id`
- `GET` request to get a list of all submitted problems:
    - *microservice route*: `/log`
    - *frontend route*: `/solver_api/analytics/log`

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


## Installation and Usage

All the microservices are dockerized and have been bundled with other necessary services in a docker-compose file.
The images are also available on Github Packages.

### Build the container images from source and run
 
Build (only once):
```bash
git clone https://github.com/ntua/saas2024-17.git
cd saas2024-17
docker network create saas
docker compose build
```
Start:
```bash
docker compose up -d
```
Stop:
```bash
docker compose down
```

### Download and run using the prebuilt images

Authenticate to Github Packages, using a personal access token (PAT) with read:packages scope, because the images are private.
```bash
echo GHCR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```
where USERNAME is your Github username and GHCR_PAT is your personal access token.

Now modify the docker-compose.yml file to use the prebuilt images as shown in its comments.

Start:
```bash
docker compose up -d
```

Stop:
```bash
docker compose down
```





