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
#### User
1. https://sterling-premier-league.herokuapp.com/api/v1/user/login
2. https://sterling-premier-league.herokuapp.com/api/v1/user/signup

#### Admin
1. https://sterling-premier-league.herokuapp.com/api/v1/admin/login
2. https://sterling-premier-league.herokuapp.com/api/v1/admin/signup


