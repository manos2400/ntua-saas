# Analytics Microservice
> shows analytics about problems

*TODO: integrate statistics from 'solved-problems-queue' (if any)*

- listens to `submit-queue` and `solved-problems-queue`
- current setup for localhost:3002

## Available endpoints (GET):
- `/status` - shows status of the service, example:
```json
{
    "message":"Analytics microservice is running!"
}
```
- `/analytics` - shows general analytics about all problems, example:
```json
{
  "nProblemsTotal": 3,
  "nProblemsFinished": 3,
  "avgTimeAfterSubmission": 1452178,
  "avgTimeAfterSubmissionHR": "24 minutes 12 seconds",
  "minTimeAfterSubmission": 528961,
  "minTimeAfterSubmissionHR": "8 minutes 48 seconds",
  "maxTimeAfterSubmission": 2585361,
  "maxTimeAfterSubmissionHR": "43 minutes 5 seconds",
  "solversStats": [
    {
      "name": "solver1",
      "nProblemsSubmitted": 2,
      "nProblemsSolved": 2,
      "avgTimeAfterSubmission": 1913786.5,
      "avgTimeAfterSubmissionHR": "31 minutes 53 seconds",
      "minTimeAfterSubmission": 1242212,
      "minTimeAfterSubmissionHR": "20 minutes 42 seconds",
      "maxTimeAfterSubmission": 2585361,
      "maxTimeAfterSubmissionHR": "43 minutes 5 seconds"
    },
    {
      "name": "solver2",
      "nProblemsSubmitted": 1,
      "nProblemsSolved": 1,
      "avgTimeAfterSubmission": 528961,
      "avgTimeAfterSubmissionHR": "8 minutes 48 seconds",
      "minTimeAfterSubmission": 528961,
      "minTimeAfterSubmissionHR": "8 minutes 48 seconds",
      "maxTimeAfterSubmission": 528961,
      "maxTimeAfterSubmissionHR": "8 minutes 48 seconds"
    }
  ],
  "monthlyStats": [
    {
      "month": "2024-05",
      "nProblemsFinishedInThisMonth": 3,
      "avgTimeAfterSubmission": 1452178,
      "avgTimeAfterSubmissionHR": "24 minutes 12 seconds",
      "minTimeAfterSubmission": 528961,
      "minTimeAfterSubmissionHR": "8 minutes 48 seconds",
      "maxTimeAfterSubmission": 2585361,
      "maxTimeAfterSubmissionHR": "43 minutes 5 seconds"
    }
  ]
}
```
- `/analytics/logs` - shows log (history) problems, example:
```json
[
  {
    "id": "probl9nref",
    "description": "Random problem 0",
    "submitted": "2024-05-15T14:34:30.182Z",
    "finished": "2024-05-15T15:25:27.872Z"
  },
  {
    "id": "probmxln58",
    "description": "Random problem 1",
    "submitted": "2024-05-15T14:34:30.246Z",
    "finished": "2024-05-15T15:31:25.012Z"
  },
  {
    "id": "proboj4fvn",
    "description": "Random problem 2",
    "submitted": "2024-05-15T14:34:30.257Z",
    "finished": "2024-05-15T14:58:18.286Z"
  }
]
```
- `/analytics/:problemId` - shows analytics about a specific problem, examples:
    - /analytics/abc
    ```json
    {
        "message":"Problem id must be a number!"
    }
    ```
    - /analytics/probl9nref
    ```json
    {
        "id": "probl9nref",
        "description": "Random problem 0",
        "solver": "solver0",
        "submitted": "2024-05-15T14:34:30.182Z",
        "finished": "2024-05-15T15:25:27.872Z",
        "timeAfterSubmission": 3057690,
        "timeAfterSubmissionHR": "50 minutes 57 seconds"
    }
    ```
