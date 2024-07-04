# Analytics Microservice
> shows analytics about problems

The service listens to the `submit-queue` to log problems and their upload timestamps, and to the `problem-solved` queue to update problem statuses and gather execution statistics.

The following endpoints are available:

- `GET /status`: Displays a message indicating that the microservice is operational.
- `GET /analytics`: Provides general statistics, including average, minimum, and maximum execution times and memory usage.
- `GET /log`: Displays a minimal list of all uploaded problems, including those that have been deleted.
- `GET /analytics/:id`: Provides detailed statistics for a specific problem identified by its ID.
