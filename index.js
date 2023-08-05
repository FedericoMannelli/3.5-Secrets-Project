//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

// Importa il modulo Express per creare un server web.
import express from "express";

// Importa il modulo "body-parser" per analizzare i dati inviati nelle richieste.
import bodyParser from "body-parser";

// Importa il modulo "path" per gestire i percorsi dei file.
import { dirname } from "path";

// Importa il modulo "url" per gestire gli URL dei file.
import { fileURLToPath } from "url";

// Ottiene il percorso assoluto della directory corrente (__dirname).
const __dirname = dirname(fileURLToPath(import.meta.url));

// Crea un'istanza di Express e assegna la variabile 'app'.
const app = express();

// Definisce la porta su cui il server ascolterà le richieste.
const port = 3000;

// Variabile per controllare se l'utente è autorizzato o meno (inizialmente impostata a false).
var userIsAuthorised = false;

// Usa il middleware bodyParser per analizzare i dati inviati nelle richieste con il formato URL encoded.
app.use(bodyParser.urlencoded({ extended: true }));

// Funzione middleware per verificare la password inviata nelle richieste POST.
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    // Se la password è corretta, l'utente è autorizzato.
    userIsAuthorised = true;
  }
  next();
}

// Applica il middleware passwordCheck a tutte le richieste.
app.use(passwordCheck);

// Definisce la gestione della richiesta GET all'URL di root ('/').
app.get("/", (req, res) => {
  // Invia il file "index.html" presente nella cartella "public".
  res.sendFile(__dirname + "/public/index.html");
});

// Definisce la gestione della richiesta POST all'URL '/check'.
app.post("/check", (req, res) => {
  // Se l'utente è autorizzato (ha inserito la password corretta),
  // viene inviato il file "secret.html" presente nella cartella "public".
  // Altrimenti, viene reindirizzato nuovamente alla pagina di login (index.html).
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    //Alternative: res.redirect("/");
  }
});

// Avvia il server e inizia ad ascoltare le richieste in arrivo sulla porta specificata.
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/*
In sintesi, questo codice crea un server web utilizzando Express e definisce due rotte, 
una per gestire le richieste GET all'URL di root ('/') e una per gestire le richieste POST all'URL '/check'. 
Il server utilizza il middleware "body-parser" per analizzare i dati inviati nelle richieste POST e 
controllare se l'utente è autorizzato (ha inserito la password corretta). Se l'utente è autorizzato, 
viene mostrata una pagina segreta ("secret.html"), altrimenti viene reindirizzato nuovamente alla pagina di login ("index.html").
*/


/*
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    //Alternatively res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
*/