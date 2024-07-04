# Problems Microservice
> shows submitted problems

This microservice is responsible to:
 - Get the problems from the other microservices in the `submit-queue` topic.
 - Save the problems in a database.
 - Delete the problems from the database if requested and announce it to the other microservices in the `problem-deleted` topic.
 - Update the status of the problems in the database when they are solved.

The following endpoints are available:

- `GET /status`: Displays a message indicating that the microservice is operational.
- `GET /problems`: Provides a list with all submitted problems.
- `GET /problems/:id`: Provides detailed information for a specific problem identified by its ID.
- `DELETE /problems/:id`: Deletes a specific problem identified by its ID.