# Projet gestion concession 

Application qui permettra d'ajouter, modifier des voitures dans une base de donnée mongodb

## Mongodb
- Nom de la base : Idriss
- Nom de la collection : voitures

## Changement du port
- Accès au port dans bin/www => ligne 15

## SOMMAIRE :
I- Présentation du projet
II- Organisation des fichiers dans le projet
III - TO DO (fix) 

##I- Présentation du projet

Equipe : Jean-Fred Glamport , Idriss Hoarau, Barret Alison 

    Le projet consiste à créer une application avec Node.js qui permet à un utilisateur de gérer une liste de voiture qui s'affichera à l'accueil, de pouvoir l'éditer (créer , modifier , désactiver* les voitures  ) par la suite grâce à une page "admin".  Pour ce projet, la base de donnée "voiture" sera géré par la dépendance mongoose.

    * (les voitures ne s'afficheront plus à l'accueil)

##II - Organisation des fichiers dans le projet

        1.  www/bin -> fichier qui gére les port de node.js
        
        2. /controllers -> va appeller les modèles 
        
        3.  /models -> - voiture.js : permet de créer la structure de la base de donnée "voitures"
                       - user.js : permet de créer la structure de la base de donnée "user" 
                       - droit.js : permet de créer la structure de la base de donnée "droit"

        4. /routes -> index.js : fichier qui gère la route pour accèder à la page d'accueil du login 
                   -> voiture.js : fichier qui gére les routes correspondant à la partie collection des voitures
                     -> users.js : fichier qui gére les routes correspondant à la partie utilisateur et de sa collection
        
        5. /views -> index.ejs : (front) accueil de l'application avec le login
                 -> /partials : rangement des parties template head, header, footer
                -> /voiture: 
                            -/voiture/admin :  regroupement des fichiers pour l'admin : - index.ejs : page admin qui édite les voitures 
                                                                                - create.ejs : page formulaire qui ajoute une voiture
                                                                                - edit.ejs : page formulaire qui modifie les voitures
                            -/voiture/viewdetails.ejs : page descriptif des voitures accessible depuis la page accueil(front).
                            -/voiture/index.ejs : liste des voitures active de la base de donnée.
                -> /user/admin :  - creatuser.ejs : créer un utilisateur via un formulaire
                                  - edit.ejs : modifie l'utilisateur
                                  - index.ejs : page avec la liste d eotus le sutilisateur de la base de donnée "user"
                 
                 



                                
                                                               
