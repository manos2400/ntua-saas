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
  - [Build and run from docker images](#build-and-run-from-docker-images)
  - [Build and run from source code](#build-and-run-from-source-code)


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
- `adminer`: localhost:8080



## Installation and Usage

You can choose to install from the docker images or from the source code.

### Build and run from docker images
TODO


### Build and run from source code (LINUX)
<!--
#### Requirements

install docker:
> installation is different for every OS, so read the official documentation. Example, for Linux Mint:
```bash
sudo apt update
sudo apt -y install apt-transport-https ca-certificates curl software-properties-common
sudo apt -y remove docker docker-engine docker.io containerd runc

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu jammy stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

sudo usermod -aG docker $USER
newgrp docker

docker version
docker run --rm -it  --name test alpine:latest /bin/sh
```

install pnpm and node:
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc # update the shell
pnpm -v # verify

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source ~/.bashrc # update the shell
nvm -v # verify

# Node.js
nvm install 20
node -v # verify
npm -v # verify
```-->

#### Build

clone the repo:
```bash
git clone https://github.com/ntua/saas2024-17.git
cd saas2024-17
```

<!-- DEN XREIAZETAI, GINETAI STO DOCKERFILE
build the typescript microservices
```bash
cd results_ms
pnpm install
pnpm build

cd ../problems_ms
pnpm install
pnpm build

cd ../analytics_ms
pnpm install
pnpm build
```-->

create docker network for the project:
```bash
cd ../
sudo docker network create saas
```

compose the project:
```bash
sudo docker compose up -d
```
<!--
initialize kafka:
```bash
# sudo docker ps
sudo docker exec -it solve-my-problem-kafka-1 /bin/bash

# then (in kafka):
kafka-topics.sh --create --topic MyTopic1 --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1

# verify (in kafka):
kafka-topics.sh --list --bootstrap-server localhost:9092
```-->

the project is already running, so you can open your browser and navigate to `localhost:3000`.
If you want to stop it, see the next paragraph.

#### Start and Stop

to stop the execution
```bash
sudo docker compose down
```

to run again (no need to re-build or re-initialize):
```bash
sudo docker compose up -d
```






