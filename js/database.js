require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

class database {

    //  получение всех клиентов
    static async getClients() {
        return new Promise((resolve, reject) => {
                let sql = `select * from clients order by id`;

                pool.query(sql, (err, result) => {
                    if (err) reject('[getClients] error in: ' + err.message);
                    resolve(result.rows);
                });
            })
            .then((res) => { return res; })
            .catch((err) => { console.log(err); });
    }

    //  создание клиента
    static async create(client) {
        return new Promise((resolve, reject) => {
                let sql = `insert into clients(surname, "name", "lastName", "createdAt" , "updatedAt" , contacts)
                values('${client.surname}', '${client.name}', '${client.lastName}', current_timestamp, current_timestamp, 
                '${JSON.stringify(client.contacts)}')`;

                pool.query(sql, (err, result) => {
                    if (err) reject('[create] error in: ' + err.message);

                    if (result) resolve(`[create] Добавлен новый пользователь --> ${client.surname} ${client.name} ${client.lastName}`)
                    else reject('[create] ошибка');
                });
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    //  редактирование данных о клиенте
    static async update(client) {
        return new Promise((resolve, reject) => {
                let sql = `
                update clients 
                set surname='${client.surname}', "name"='${client.name}', "lastName"='${client.lastName}', 
                "updatedAt"=current_timestamp, contacts='${JSON.stringify(client.contacts)}'
                where id=${client.id}`;

                pool.query(sql, (err, result) => {
                    if (err) reject('[update] error in: ' + err.message);

                    if (result) resolve(`[update] данные о клиенте с id=${client.id} успешно изменены`);
                });
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    //  удаление клиентов по id
    static async delete(id) {
        return new Promise((resolve, reject) => {
                let sql = `delete from clients where id=${id}`;

                pool.query(sql, (err, result) => {
                    if (err) reject('[delete] error in: ' + err.message);

                    if (result) resolve(`[delete] клиент с id=${id} был удален`);
                });
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    //  поиск клиентов
    static async searchClients(query) {
        return new Promise((resolve, reject) => {
                let sql =
                    `select * from clients where lower(surname) like '${query}%' or lower("name") like '${query}%'or lower("lastName") like '${query}%' ` +
                    `or lower(surname) like '%${query}' or lower("name") like '%${query}' or lower("lastName") like '%${query}'` +
                    `order by surname`;

                pool.query(sql, (err, result) => {
                    if (err) reject('[searchClients] error in: ' + err.message);
                    if (result.hasOwnProperty('rows')) resolve([result.rows]);
                    return;
                });
            })
            .then((res) => { return res; })
            .catch((err) => console.log(err));
    }

    //  сортировка по ID
    static async sortedForID() {
        return new Promise((resolve, reject) => {
                let sql = `select * from clients c order by id`;

                pool.query(sql, (err, result) => {
                    if (err) reject('error in: ' + err.message);

                    if (result.rows) resolve(result.rows);

                    return;
                });
            })
            .then((clients) => { return clients; })
            .catch((err) => console.log(err));
    }

    //  сортировка по ФИО
    static async sortedForFio() {
        return new Promise((resolve, reject) => {
                let sql = `select * from clients c order by surname`;

                pool.query(sql, (err, result) => {
                    if (err) reject('[sortedForFio] error in: ' + err.message);

                    if (result.rows) resolve(result.rows);

                    return;
                });
            })
            .then((res) => { return res; })
            .catch((err) => console.log(err));
    }

    //  сортировка по дате создания
    static async sortedForCreated() {
        return new Promise((resolve, reject) => {
                let sql = `select * from clients c order by "createdAt" desc`;

                pool.query(sql, (err, result) => {
                    if (err) reject('[sortedForCreated] error in: ' + err.message);

                    if (result.rows) resolve(result.rows);

                    return;
                });
            })
            .then((res) => { return res; })
            .catch((err) => console.log(err));
    }

    //  сортировка по дате изменения
    static async sortedForUpdated() {
        return new Promise((resolve, reject) => {
                let sql = `select * from clients c order by "updatedAt" desc`;

                pool.query(sql, (err, result) => {
                    if (err) reject('[sortedForUpdated] error in: ' + err.message);

                    if (result.rows) resolve(result.rows);

                    return;
                });
            })
            .then((res) => { return res; })
            .catch((err) => console.log(err));
    }

    //  генерация новых клиентов в базе
    static async generateClients(count) {
        return new Promise((resolve, reject) => {

                let names = [
                    'Степан', 'Владислав', 'Иван', 'Константин', 'Демьян',
                    'Сергей', 'Леон', 'Тимур', 'Василий', 'Валерий',
                ];

                let surnames = [
                    'Титов', 'Громов', 'Дмитриев', 'Тихонов', 'Долгов',
                    'Киселев', 'Исаев', 'Горлов', 'Ушаков', 'Харитонов'
                ];

                let lastNames = [
                    'Сергеевич', 'Андреевич', 'Артёмович', 'Егорович', 'Фёдорович',
                    'Матвеевич', 'Викторович', 'Ильич', 'Александрович', 'Романович'
                ];

                let clients = []

                for (let i = 0; i < count; i++) {
                    let indexS = Math.round(Math.random() * 9); //  случайный индекс для фамилии (от 0 до 9)
                    let indexN = Math.round(Math.random() * 9); //  случайный индекс для имени (от 0 до 9)
                    let indexL = Math.round(Math.random() * 9); //  случайный индекс для отчества (от 0 до 9)

                    let client = {
                        surname: surnames[indexS],
                        name: names[indexN],
                        lastName: lastNames[indexL],
                        contacts: generateContacts()
                    }

                    clients.push(client);
                }

                //  очищение таблицы
                this.clearDB();

                //  иницализация таблицы новыми клиентами
                for (let i in clients) {
                    let sql =
                        `insert into clients(surname, "name", "lastName", "createdAt" , "updatedAt" , contacts)
                    values('${clients[i].surname}', '${clients[i].name}', '${clients[i].lastName}', current_timestamp, current_timestamp, 
                    '${JSON.stringify(clients[i].contacts)}');`;

                    pool.query(sql, (err, result) => {
                        if (err) reject('[generateClients] error in: ' + err.message);

                        if (!result) {
                            reject('[generateClients] error in: ' + err.message);
                            return;
                        }
                    });
                }

                resolve('[generateClients] клиенты успешно сгенерированы');

            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        function generateContacts() {
            let countOfContacts = Math.ceil(Math.random() * 4); // количество контактов 
            let contacts = []; //  массив с контактами

            for (let i = 0; i < countOfContacts; i++) {
                let indexC = Math.round(Math.random() * 3); //  индекс генерируемого контакта
                switch (indexC) {
                    case 0:
                        contacts.push({
                            type: 'phone',
                            value: randomPhone()
                        });
                        break;
                    case 1:
                        contacts.push({
                            type: 'Email',
                            value: randomLink() + '@mail.ru'
                        });
                        break;
                    case 2:
                        contacts.push({
                            type: 'VK',
                            value: 'https://vk.com/' + randomLink()
                        });
                        break;
                    case 3:
                        contacts.push({
                            type: 'Facebook',
                            value: 'https://facebook.com/' + randomLink()
                        });
                        break;
                    default:
                        console.log('error');
                }
            }

            return contacts;

            function randomLink() {
                let alphabet = 'abcdefghijklmnopqrstuvwxyz';
                let link = '';

                for (let i = 0; i < 10; i++) {
                    link += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
                }

                return link;
            }

            function randomPhone() {
                let numbers = '0123456789';
                let phone = '+79';

                for (let i = 0; i < 9; i++) {
                    phone += numbers[Math.round(Math.random() * (numbers.length - 1))];
                }

                return phone;
            }
        }
    }

    //  очищение базы данных
    static async clearDB() {
        return new Promise((resolve, reject) => {
                let sql = `delete from clients`;

                pool.query(sql, (err, result) => {
                    if (err) reject('[generateClients] error in: ' + err.message);
                    if (result) resolve('[generateClients] база данных очищена');
                });
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

    }
}

module.exports = database;