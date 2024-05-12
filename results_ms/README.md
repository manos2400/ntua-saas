# MICROSERVICE

## Result List

This microservice is responsible to:
 - Get and format the results from the other microservices in the **solved-problems** topic.
 - Save the results in a database.
 - Delete the results from the database if they are no longer needed.
 - Announce the results to the other microservices in the **results-queue** topic.

These results can be accessed through an API with the following endpoint:
 - >**GET** /results/{id}