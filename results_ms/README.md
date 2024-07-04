# Results Microservice
> shows problem results

This microservice is responsible to:
 - Get and format the results from the other microservices in the `problem-solved` topic.
 - Save the results in a database.
 - Delete the results of a problem that is announced to be deleted in the `problem-deleted` topic.
 - Announce the results to the other microservices in the `result-queue` topic.

The following endpoints are available:

 - `GET /status`: Displays a message indicating that the microservice is operational.
 - `GET /results/:id`: Provides the results of a specific problem identified by its ID.