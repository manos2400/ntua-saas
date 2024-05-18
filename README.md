# NTUA ECE SAAS 2024 PROJECT
  
## TEAM 17
  
## Description
TODO

## Installation and Running
TODO

## Directories Overview

- **\*_ms**: the microservices
- **frontent**: UI for the project
- **ai-log**: zip files with the logs of the AI models
- **architecture**: Diagrams using Visual Paradigm

## Microservice Routes
> using the microservices' own host and port

### Routes for credits_ms

- **/addCredits**: add credits
- **/getCredits**: get credits

### Routes for submit_ms

- **/status**: get microservice status
- **/submit_problem**: TODO
- **/submit_metadata**: TODO

### Routes for generate_result_ms

- **/status**: get microservice status
- **/solveproblem**: initiate the solving of a problem

### Routes for results_ms

- **/status**: get microservice status
- **/results/:id**: get (formatted) results for a problem

### Routes for problems_ms

- **/status**: get microservice status
- **/problems**: get lift of all problems
- **/problems/:id**: get a specific problem

### Routes for analytics_ms

- **/status**: get microservice status
- **/analytics**: get analytics for all problems
- **/analytics/:id**: get analytics for a problem
- **/log**: get a list of all submitted problems


## Project Routes
> using the frontend host and port

(TODO: example routes - update later - also update in jmeter if needed)

### Routes for credits_ms
- **(POST) /solver_api/credits/addCredits**: add credits
- **(GET) /solver_api/credits/getCredits**: get credits

### Routes for submit_ms
- **(GET) /solver_api/submitProblem/status**: get microservice status
- **(POST) /solver_api/submitProblem/submit_problem**: TODO
- **(POST) /solver_api/submitProblem/submit_metadata**: TODO

### Routes for generate_result_ms
- **(GET) /solver_api/generateResults/status**: get microservice status
- **(GET) /solver_api/generateResults/solveproblem**: initiate the solving of a problem

### Routes for results_ms
- **(GET) /solver_api/results/status**: get microservice status
- **(GET) /solver_api/results/results/:id**: get (formatted) results for a problem

### Routes for problems_ms
- **(GET) /solver_api/problemlist/status**: get microservice status
- **(GET) /solver_api/problemlist/problems**: get lift of all problems
- **(GET) /solver_api/problemlist/problems/:id**: get a specific problem
- **(DELETE) /solver_api/problemlist/problems/:id**: get a specific problem

### Routes for analytics_ms
- **(GET) /solver_api/analytics/status**: get microservice status
- **(GET) /solver_api/analytics/analytics**: get analytics for all problems
- **(GET) /solver_api/analytics/analytics/:id**: get analytics for a problem
- **(GET) /solver_api/analytics/log**: get a list of all submitted problems


## Hosts and Ports

- **frontend**: localhost:TODO
- **credits_ms**: localhost:4004
- **submit_ms**: localhost:TODO
- **generate_result_ms**: localhost:TODO
- **results_ms**: localhost:4002
- **problems_ms**: localhost:4000
- **analytics_ms**: localhost:4003
- **kafka**: localhost:9093
- **zookeeper**: localhost:2181
- **adminer**: localhost:8080



