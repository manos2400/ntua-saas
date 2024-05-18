# NTUA ECE SAAS 2024 PROJECT
  
## TEAM 17
  
  
Περιγραφή - οδηγίες
  
Περιέχονται φάκελοι για 15 microservices. Ο αριθμός είναι εντελώς ενδεικτικός. Δημιουργήστε ακριβώς όσα απαιτούνται από τη λύση σας.

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





