# TP-authenfification

Déployer un serveur Node.js et permettre de se connecter via un système d'authentification.

# Télécharger et installer l'application

**Pré-requis** : Vous devez disposer d'une installation fonctionnelle de Docker et NPM pour utiliser cette application. Le port 80 de votre machine doit être libre. 

**1. Télécharger l'application :** Positionnez-vous là où vous souhaitez télécharger l'application et éxecutez la commande:

``` git clone https://github.com/bernascpaul/TP-authentification.git ```

**2. Installez les dépendances du projet :** positionnez-vous dans le répertoire du projet et éxecutez la commande suivante:

``` npm install ``` 


**3. Lancez l'application :** sous docker en la buildant au passage grâce à la commande suivante : 

``` sudo docker-compose up --build ``` 

- Le message suivant doit s'afficher dans votre console : nodejs | Example app listening on port 3000!

- Sinon cela veut dire qu'il y a eut un problème de build ou de compilation. Reprenez la manipulation au 1. Téléchargez l'application.

# Executer et tester l'application

- L'application s'execute à partir d'un navigateur à l'adresse : localhost.

- Vous ne devez pas avoir accès à la zone sécurisée : localhost/content si vous n'êtes pas authentifié.

- Testez la connexion avec les accès suivants : login : Alex - Mot de passe : Xela .

- Vous devez maintenant avoir accès à la zone sécurisée.

- Déconnectez-vous comme cela est indiqué. Vous ne devriez plus avoir accès à la zone sécurisé.

- Revenez à la page d'accueil : locahost.

- Créez un compte en suivant les instructions. Une fois la création de compte validée, revenez sur la page d'accueil, authentifiez-vous et vous devriez de nouveau avoir accès à la zone sécurisée.

- Déconnectez-vous et revenez à la page d'accueil : vous ne pouvez normalement plus accéder à la zone sécurisée. 

# Authors

Paul Bernasconi
Alexandre Nizery
