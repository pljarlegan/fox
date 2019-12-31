# fox

## run
### with docker
- run in prod : 
`docker run -v /tmp/access.log:/tmp/access.log pljarlegan/fox:1.0.0 -ti --env TRAFFIC_THRESHOLD_HIGH=10 --env TRAFFIC_ALERT_TIMEBOX_SEC=120 --env FILE_PATH=/tmp/access.log `

### with docker-compose
-  run in prod : 
`docker-compose up`

-  run in dev : 
`docker-compose -f docker-compose.dev up`

### in dev
- install dependency `yarn`
- run test `yarn test`
- run it ! `yarn start:dev`
- clean code `yarn lint-fix`
- build new wonderful docker img `yarn build`

