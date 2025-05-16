//Modulok definiálása
const app = express();
const express = require('express');
const axios = require('axios');
const port = 3000;
app.use(express.static('public'));
//Visszajelzés a backend működéséről
app.get('/', (req, res) => {
    res.send("Működik a Backend")
});
app.get('/users', async (req, res) => {
    try {
        // A weboldalról a felhasználók lekérése
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;
        // Alap weboldal létrehozása
        let html = `
        <!DOCTYPE html>
        <html lang="hu">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Felhasználók listája</title>
            <style>
                h1 { color: #211f1f; }
                .felhasznalo { border: 1px solid #9c9292; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
                .felhasznalo { margin-top: 0; color: #292626; }
                h2 { margin-top: 0; color: #292626; }
                .felhasznalo { margin: 5px 0; }
                p { margin: 5px 0; }
                .cim { margin-left: 20px; color: #383333; }
                .ceg { margin-left: 20px; color: #383333; }
            </style>
        </head>
        <body>
            <h1>Felhasználók:</h1>
        `;
        // Html kibővítése a felhasználókkal
        users.forEach(user => {
            html += `
            <div class="felhasznalo">
                <h2>${user.name}</h2>
                <p>Felhasználónév: ${user.username}</p>
                <p>Telefonszám: ${user.phone}</p>
                <p>Email: ${user.email}</p>
                <p>Weboldal: <a href="${user.website}" target="_blank">${user.website}</a></p>
                <div class="cim">
                    <h3>Cím</h3>
                    <p>${user.address.city}, ${user.address.zipcode}</p>
                    <p>${user.address.street}, ${user.address.suite}</p>
                    <p>Koordináták: ${user.address.geo.lat}, ${user.address.geo.lng}</p>
                </div>
                <div class="ceg">
                    <h3>Cég</h3>
                    <p>Név: ${user.company.name}</p>
                    <p>Tevékenység: ${user.company.bs}</p>
                    <p>Szlogen: ${user.company.catchPhrase}</p>
                </div>
            </div>
            `;
        });
        html += `</body></html>`;
        res.send(html);
    //Hiba kiírása, ha nem sikerült az adatokat lekérni
    } catch (error) {
        console.error('Hiba történt:', error);
        res.status(500).send('Hiba történt az adatok lekérése közben');
    }
});
// Szerver elindítása
app.listen(port, () => {
    console.log(`A szerver elindult itt:http://localhost:${port}`);
});