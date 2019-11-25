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

## Testing
Vi benytter jester. Du kan læse deres dokumentation [her](https://jestjs.io/docs/en/getting-started.html).

Kør testen
```
npm test
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


### Routes
Routes skal indeholder CRUD operation og kun det.
<br>F.eks.
```javascript
/* (C) GET root page. */
router.get('/', function(req, res, next) {
  /* Handle root get request */
});
/* (R) POST root page. */
router.post('/', function(req, res, next) {
  /* Handle root post request */
});
/* (U) PUT root page. */
router.put('/', function(req, res, next) {
  /* Handle root put request */
});
/* (D) DELETE root page. */
router.delete('/', function(req, res, next) {
  /* Handle root delete request */
});
``` 
