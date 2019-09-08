# A mock premier league API

- **Admin accounts** 
can
  - signup/login
  - manage teams (add, remove, edit, view)
  - create fixtures (add, remove, edit, view)
  - Generate unique links for fixture
- **Users accounts** 
Can
  - signup/login
  - view teams
  - view completed fixtures
  - view pending fixtures
  - robustly search fixtures/teams
- Only the search API should be availble to the public.
[Documentation ](https://documenter.getpostman.com/view/7290073/SVmpW23a)
## Base URL
[https://sterling-premier-league.herokuapp.com](https://sterling-premier-league.herokuapp.com)

## END POINT
[https://sterling-premier-league.herokuapp.com/api/v1/{{routes}}](https://sterling-premier-league.herokuapp.com/api/v1/{{routes}})
### End points for Routes 

#### Admin
1. https://sterling-premier-league.herokuapp.com/api/v1/admin/login
2. https://sterling-premier-league.herokuapp.com/api/v1/admin/signup
|End Point   |Payload example   | headers  |  Response body example |
|---|---|---|---|
|POST: https://sterling-premier-league.herokuapp.com/api/v1/user/signup  | {
        "firstName": "jane",
        "lastName": "doe",
        "gender": "female",
        "email": "janedoe@gmail.com",
        "password": "bashbash"
      }  |  None |   {
    "success": true,
    "data": {
        "isAdmin": false,
        "firstName": "jane",
        "lastName": "doe",
        "id": "8e07b592-2613-4fd7-9383-32c0454b9819",
        "createdAt": "2019-09-08T00:21:23.497Z",
        "updatedAt": "2019-09-08T00:21:23.497Z",
        "email": "janedoe@gmail.com",
        "gender": "female",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjpmYWxzZSwiaWQiOiI4ZTA3YjU5Mi0yNjEzLTRmZDctOTM4My0zMmMwNDU0Yjk4MTkiLCJpYXQiOjE1Njc5MDIwODMsImV4cCI6MTU2NzkwMzg4M30.jw6jaJlOhKiZB7GBd_XjQhXL8u2R7sHql7L5u7Gbue4"
    }
}|   
|POST: https://sterling-premier-league.herokuapp.com/api/v1/user/login  |{ "email": "janedoe@gmail.com", "password": "bashbash" }   | None  |  {
    "success": true,
    "data": {
        "isAdmin": false,
        "firstName": "jane",
        "lastName": "doe",
        "id": "8e07b592-2613-4fd7-9383-32c0454b9819",
        "createdAt": "2019-09-08T00:21:23.497Z",
        "updatedAt": "2019-09-08T00:21:23.497Z",
        "email": "janedoe@gmail.com",
        "gender": "female",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjpmYWxzZSwiaWQiOiI4ZTA3YjU5Mi0yNjEzLTRmZDctOTM4My0zMmMwNDU0Yjk4MTkiLCJpYXQiOjE1Njc5MDIwODMsImV4cCI6MTU2NzkwMzg4M30.jw6jaJlOhKiZB7GBd_XjQhXL8u2R7sHql7L5u7Gbue4"
    }
} |   
|   |   |   |   |   


