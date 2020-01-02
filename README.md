# fox


## env configs default values
- TRAFFIC_THRESHOLD_HIGH=10  
- TRAFFIC_ALERT_TIMEBOX_SEC=120  
- FILE_PATH=/tmp/access.log  
- REFRESH_TIME_SEC=10  

## run
### with docker
- run in prod : 
`docker run -v /tmp/access.log:/tmp/access.log pljarlegan/fox:1.0.0 -ti --env "TERM=xterm-256color" --env TRAFFIC_THRESHOLD_HIGH=10 --env TRAFFIC_ALERT_TIMEBOX_SEC=120 --env FILE_PATH=/tmp/access.log `

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

## Follow Up
Ne pas utiliser en prod : utiliser la stack grafana / prometus / loki > c'est fait pour : ca le fait bien
Améliorations : 
- Si gros besoin de perfs > utiliser une base de donnée temporelle (influx par exemple)
- découpage de la fonction d'affichage pour la rendre modulaire (refacto : alert / table / top) et testable ...
- le dossier lib ne sert à rien > à clean
- plus de tests notamment sur la partie lecture du fichier > aujourd'hui on ce contente de crasher comme une merde si le fichier n'est pas présen
- ajouter des test d'intégrations sur la partie alerting
- utilisation de "moment" > c'est probablement overkill

Difficulté : 
- temps perdu créer des logs à la main > mauvais fuseau horraire -_-
- temps perdu à la mise en place d'un apache / configuration du log pour créer des logs quivontbien : ca ne sert à rien 
We would appreciate if you could write a little bit about how you would improve on this
application design. If you encountered difficulties what were they and of course, we are
opened to feedback about the test itself so please share your thoughts with us.

Nous apprécierions si vous pouviez écrire un peu sur la façon dont vous amélioreriez la conception de cette application. 
Si vous avez rencontré des difficultés, quelles étaient-elles et bien sûr,
 nous sommes ouverts aux commentaires sur le test lui-même, veuillez donc partager vos réflexions avec nous.
