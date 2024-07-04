# Generate Result Microservice
> solves a problem

The service listens to `submit-queue` for any new submitted problems and produces the output to the `problem-solved` queue when finished solving.

The following endpoints are available:

- `GET /status`: Displays a message indicating that the microservice is operational.
- `POST /solveproblem`: Solves the problem passed as parameter.