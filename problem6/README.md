# Scoreboard API Module

This module is part of the backend service that supports a live-updating scoreboard on the website. It handles user score updates and ensures secure, real-time synchronization of top user scores.

## Features

- **Real-time Scoreboard Updates**: The scoreboard reflects the top 10 users' scores in real-time.
- **Score Increment**: Users' scores increase upon completing specific actions.
- **Security**: Ensures that score updates are authorized to prevent malicious activities.

## Endpoints

### 1.`POST /api/score`

- **Description**: Updates the score of a user upon completion of an action.
- **Request Header**:
  ```json
    "Authorization": "Bearer token"
  ```
- **Response**:
  - 200 OK: Score updated successfully
  ```json
  {
    "message": "Score updated successfully"
  }
  ```
  - 400 Bad Request: Invalid request data.
  - 401 Unauthorized: Unauthorized score update attempt.
  - 500 Internal Server Error: An error occurred on the server.

### 2.`GET /api/scoreboard`

- **Description**: Retrieves the top 10 users’ scores for display on the scoreboard.
- **Request Header**:
  ```json
    "Authorization": "Bearer token"
  ```
- **Response**:
  - 200 OK: Returns the top 10 users
  ```json
    [
      { "userId": "user1", "score": 250 },
      { "userId": "user2", "score": 200 },
      ...
    ]
  ```
  - 400 Bad Request: Invalid request data.
  - 401 Unauthorized: Unauthorized score update attempt.
  - 500 Internal Server Error: An error occurred on the server.

## Notes
  - User Information: User id will be stored in JWT token
  - Action Token Validation: Each score update requires a valid token in header to prevent unauthorized updates.
  - Rate Limiting: Limits the frequency of score updates to prevent abuse.
  - Logging and Monitoring: All score update attempts are logged for monitoring and auditing purposes.
  - Caching: Implement caching strategies to improve response time for frequent scoreboard requests
    - Using Redis SortedSet to increase and store score of user (ZINCRBY to increase, ZRANGE to get top 10)
    - Do not set expired time
  - Using MongoDb
    - Store data
    - Store audit log
    - Create a view to get top 10 users score

## Improvements
  -  WebSocket Integration: Consider using WebSockets for pushing real-time updates to the frontend.
  -  Scalability: Consider designing the system to handle a large number of simultaneous users, especially during peak times (example: multiple servers/services handle api requests or websocket)
