### Prérequis :

* nodejs
* npm
* grunt 
```
npm install -g grunt-cli
```
* browserify 
```
npm install -g browserify
```

### Commandes de dev

* Installer / maj les deps pour développer : 
```
npm install
```
* Builder le js et les css : 
```
grunt build
```
* Lancer les tests : 
```
grunt test
```
* Lancer le programme en local : 
```
supervisor web.js
```

### Commandes git

* Récupérer le code sur GitHub
```
git pull
```
* Commiter le code (en local)

```
git add .
git commit -m "Message de commit"
```

* Envoyer le code commité sur GitHub :
```
git push origin master
```
* Envoyer le code commité sur Heroku :
```
git push heroku master
```

### Stack 

* framework : [http://nodejs.org/](node.js) et [http://expressjs.com/](expressjs)
* templating : [http://paularmstrong.github.io/swig/](swig)
* css : [http://learnboost.github.io/stylus/](stylus)
