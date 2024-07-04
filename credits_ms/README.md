# Credits Microservice
> manages credits

The service listens to the `test_creds` queue to remove credits when needed.

The following endpoints are available:

- `GET /status`: Displays a message indicating that the microservice is operational.
- `PUT /addCredits`: Adds credits passed as parameter to the total credits.
- `GET /getCredits`: Displays the total credits.
