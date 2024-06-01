# MICROSERVICE

## Problem List

This microservice is responsible to:
 - Get the problems from the other microservices in the **submit-queue** topic.
 - Save the problems in a database.
 - Delete the problems from the database if requested and announce it to the other microservices in the **problem-deleted** topic.
 - Update the status of the problems in the database when they are solved.

The problems can be accessed or deleted through an API with the following endpoints:
 - >**GET** /problems
 - >**GET** /problems/{id}
 - >**DELETE** /problems/{id}