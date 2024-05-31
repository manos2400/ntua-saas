# Analytics Microservice
> shows analytics about problems

- listens to `submit-queue` and `resultqueue`
- current setup for localhost:4003

## Available endpoints (GET):
- `/status` - shows status of the service
- `/analytics` - shows general analytics about all problems
- `/analytics/logs` - shows log (history) problems
- `/analytics/:problemId` - shows analytics about a specific problem
