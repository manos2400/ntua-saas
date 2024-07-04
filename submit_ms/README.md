# Submit Microservice
> uploads a problem and its metadata to the server

The service produces the uploaded problem information to the `submit-queue`.
It also requests credits to be reducted by producing a message to the `test_creds` queue.

The following endpoints are available:

- `GET /status`: Displays a message indicating that the microservice is operational.
- `POST /submit_metadata`: Uploads the necessary information for a problem passed as parameter.