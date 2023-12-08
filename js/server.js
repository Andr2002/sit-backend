require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const database = require('./database');

const urlencodedParser = express.urlencoded({ extended: false }); // парсер для сбора данных из форм

app.use(express.static(__dirname.slice(0, -3))); //  использование middleware express для отображения стилей 
app.use(express.json()); //  использование middleware express для отправки и получения json

// перенаправление на /clients
app.get('/', async(request, response) => {
    response.redirect('/clients');
});

//  главная страница со списком клиентов
app.get('/clients', async(request, response) => {
    response.sendFile(__dirname.slice(0, -3) + '/html/index.html');
});

//  получение списка клиентов
app.get('/get-clients', async(request, response) => {
    let contacts = await database.getClients();
    response.send(contacts);
});

//  удаление клиента
app.post('/delete-client', async(request, response) => {
    await database.delete(request.body.id);
});

//  поиск клиентов
app.post('/search-clients', async(request, response) => {
    let clients = await database.searchClients(request.body.query);

    response.send(clients);
});

// генерация базы клиентов
app.get('/generate', async(request, response) => {
    await database.generateClients(50);
    response.sendFile(__dirname.slice(0, -3) + '/html/generate.html');
});

//  создание клиента
app.post('/create-client', urlencodedParser, async(request, response) => {
    let client = {
        surname: request.body.surname,
        name: request.body.name,
        lastName: request.body.lastName,
        contacts: parseContacts(request.body.contactType, request.body.contactValue)
    };

    await database.create(client);

    response.redirect(301, '/');

    function parseContacts(types, values) {
        let contacts = [];

        if (typeof(types) == 'string') { //  если один контакт, то возвращается строкой
            let contact = {
                type: types,
                value: values
            };

            contacts.push(contact);
        }

        if (typeof(types) == 'object') { //  если больше одного контакта, то возвращается объектом
            for (let i in types) {
                let contact = {
                    type: types[i],
                    value: values[i]
                };

                contacts.push(contact);
            }
        }

        return contacts;
    }
});

//  изменение данных о клиенте
app.post('/update-client', urlencodedParser, async(request, response) => {
    let client = {
        id: request.body.id,
        surname: request.body.surname,
        name: request.body.name,
        lastName: request.body.lastName,
        contacts: parseContacts(request.body.contactType, request.body.contactValue)
    };
    await database.update(client);
    response.redirect(301, '/');

    function parseContacts(types, values) {
        let contacts = [];

        if (typeof(types) == 'string') {
            contacts.push({
                type: types,
                value: values
            });

            return contacts;
        }

        for (let i in types) {
            contacts.push({
                type: types[i],
                value: values[i]
            });
        }

        return contacts;
    }
});

//  сортировка по ID
app.get('/sort-id', async(request, response) => {
    let clients = await database.sortedForID();
    response.send(clients);
});

//  сортировка по ФИО
app.get('/sort-fio', async(request, response) => {
    let clients = await database.sortedForFio();
    response.send(clients);
});

//  сортировка по дате создания
app.get('/sort-created', async(request, response) => {
    let clients = await database.sortedForCreated();
    response.send(clients);
});

//  сортировка по дате изменения
app.get('/sort-updated', async(request, response) => {
    let clients = await database.sortedForUpdated();
    response.send(clients);
});

app.listen(port, () => {
    console.log(`[server] started on port ${port}`);
});