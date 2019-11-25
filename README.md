# Daplex

## Get started
Kør disse kommandoer i terminalen.

Hent git projekt
```
git clone https://github.com/KugelbergDK/daplex.git
```
Instaler moduler
```
npm install
```
Kør server
```
npm start
```


## Arkitektur
|   |   |
|---|---|
|  **Backend-sprog** |  Javascript |
|  **Framework** |  Express |
|  **View Engine** |  Pug |
|  **Database** |  MariaDB |
|  **ORM** |  Sequelize |
|  **Container** |  Docker |

### Mappe struktur
```
root/
├── bin/
│   └── www
├── public/
│   └── assets/
│      ├── images/
│      ├── javascript/
│      └── stylesheets/
├── routes/
├── model/
├── views/
└── app.js
```
**Noter til struktur:**

“root”: Den øverste mappe
“bin”: Mappe, som indeholder “www”-JavaScript-filen, som køres for at starte serveren
“public”: Mappe indeholdende filer, som er direkte tilgængelige via GET request
“routes”: Mappe indeholdende route-filer (end points)
“model”: 
“views”: Mappe indeholdende Pug-filer
“app.js”: JavaScript-fil, hvor middleware opsættes osv.


## Regler

* **Der skal pushes til master ved green bar, efter refaktoring**
    * Der skal helst pulles hvert 5. minut   

* **Der må ikke pushes noget der ikke kan kompileres/bygges**
* **Branches skal kun oprettes hvis man skal eksperimentere med noget**
* **Branches må ikke merges med master**
