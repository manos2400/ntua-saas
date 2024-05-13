# Analytics Microservice
> shows analytics about problems

- listens to `submit-queue` and `solved-problems-queue`
- current setup for localhost:3002

Available endpoints (GET):
- `/status` - shows status of the service, example:
```json
{
    "message":"Analytics microservice is running!"
}
```
- `/analytics` - shows general analytics about all problems, example:
```json
{
    "nProblemsTotal":3,
    "nProblemsFinished":3,
    "avgExecTime":1884628.6666666667,
    "avgExecTimeHR":"31 minutes 24 seconds",
    "minExecTime":709793,
    "minExecTimeHR":"11 minutes 49 seconds",
    "maxExecTime":3452382,
    "maxExecTimeHR":"57 minutes 32 seconds"
}
```
- `/analytics/logs` - shows log (history) problems, example:
```json
// TODO
```
- `/analytics/:problemId` - shows analytics about a specific problem, examples:
    - /analytics/abc
    ```json
    {
        "message":"Problem id must be a number!"
    }
    ```
    - /analytics/500
    ```json
    {
        "message":"Problem not found!"
    }
    ```
    - /analytics/1
    ```json
    {
        "id":1,
        "description":"Random problem 0",
        "solver":"solver0",
        "submitted":"2024-05-13T16:13:44.093Z",
        "finished":"2024-05-13T16:25:33.886Z",
        "execTime":709793,
        "execTimeHR":"11 minutes 49 seconds"
    }
    ```
