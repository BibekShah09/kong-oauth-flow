### Oauth Flow with Kong
![Kong Logo](https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/themes/konghq/assets/img/gradient-logo.svg)

This is a simple implementation of Oauth 2.0 Authentication plugin of Kong. <br />
For more details refer [here.](https://docs.konghq.com/hub/kong-inc/oauth2/)
 
### Kong Gateway
 First, make sure [Kong Gateway](https://docs.konghq.com/getting-started-guide/2.1.x/overview/) installed, up and running.
 * Enable Oauth 2.0 Authentication plugin (on a service or globally)
 
 * Create Consumer
  ```
 curl -X POST http://localhost:8001/consumers/ \
     --data "username=user123" \
     --data "custom_id=SOME_CUSTOM_ID"
 ```
 
 * Register the Application
  ```
 curl -X POST http://localhost:8001/consumers/{consumer_id}/oauth2 \
     --data "name=Test%20Application" \
     --data "client_id=SOME-CLIENT-ID" \
     --data "client_secret=SOME-CLIENT-SECRET" \
     --data "redirect_uris=http://some-domain/endpoint/"
 ``` 

## Prerequisites
 [Git](https://git-scm.com/) <br />
 [Yarn](https://classic.yarnpkg.com/en/docs/install) <br />

## Installation
  ```sh
  git clone repo_name # or clone your own fork
  cd repo_name
  rm rf .git
  yarn
  ```
 
 Make copy of .env.example to .env file and update application credentials.
 
 Finally, start the application
 ```
    yarn start
 ```
 
 #### Get Access Token & Refresh Token
 ```
curl -X POST -H "Content-Type: application/json" \
    -d '{"client_id": "SOME-CLIENT-ID", "client_secret": "SOME-CLIENT-SECRET", "authenticated_user_id": "SOME_CUSTOM_ID"}' \
    http://localhost:8848/access-refresh-token
```

#### Get Refresh Token From Access Token
```
curl -X POST -H "Content-Type: application/json" \
    -d '{"client_id": "fd1d813b-b355-48f2-8828-55213b2b6694", "client_secret": "fd1d813b-b355-48f2-8828-55213b2b6694", "refresh_token": "isH6SXp3DcTKvNqK6Et7aGVoppeuMdg1"}' \
    http://localhost:8848/access-token
```
