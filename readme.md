Projet gestion concession 

SOMMAIRE :
I- Présentation du projet
II- Organisation des fichiers dans le projet
III - TO DO (fix) 

I- Présentation du projet

Equipe : Jean-Fred Glamport , Idriss Hoarau, Barret Alison 

    Le projet consiste à créer une application avec Node.js qui permet à un utilisateur de gérer une liste de voiture qui s'affichera à l'accueil, de pouvoir l'éditer (créer , modifier , désactiver* les voitures  ) par la suite grâce à une page "admin".  Pour ce projet, la base de donnée "voiture" sera géré par mongoose.

    * (les voitures ne s'afficheront plus à l'accueil)

II - Organisation des fichiers dans le projet

        1.  www/bin -> fichier qui gére les port de node.js
        
        2. /controllers -> permet l'utilisation de mongoose
        
        3.  /models -> permet de créer la structure de la base de donnée "voitures"

        4. /routes -> index.js : fichier qui gère la route pour accèder à la page d'accueil
                   -> voiture.js : fichier qui gére les routes correspondant à la partie admin de l'application
        
        5. /views -> index.ejs : (front) accueil de l'application avec la liste des voitures activé à partir du back
                -> /partials : rangement des parties template head, header, footer
                -> /voiture/admin :  regroupement des fichiers : - index.ejs : page admin qui édite les voitures 
                                                                - create.ejs : page formulaire qui ajoute une voiture
                                                                - edit.ejs : page formulaire qui modifie les voitures
                -> /voiture/viewdetails.ejs : page descriptif des voitures accessible depuis la page accueil(front).


                                
                                                               