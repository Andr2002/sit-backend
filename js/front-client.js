document.addEventListener('DOMContentLoaded', () => { //  отображение списка клиентов при загрузке страницы
    fetch('/get-clients')
        .then((response) => {
            return response.json();
        })
        .then((clients) => {
            drawingTable(clients);
        });
});

sort();

deleteCreateContact(); //  удаление контактов из формы "Добавить"

deleteUpdateContact(); //  удаление контактов из формы "Изменить"

selectOutput(); //  при выборе option изменяется значение input

selectOutputUpdate(); //  при выборе option изменяется значение input

function selectOutputUpdate() {
    let target = document.querySelector('#update-contact');

    var observer = new MutationObserver(mutation => {
        let select = mutation[0].addedNodes[1].querySelector('select');
        // console.log(select);

        select.addEventListener('change', () => {
            switch (select.value) {
                case 'Email':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = '@mail.ru';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'phone':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = '+79';
                    select.parentElement.parentElement.parentElement.querySelector('input').setAttribute('maxlength', 12);
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'VK':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = 'https://vk.com/';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'Facebook':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = 'https://facebook.com/';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'Другое':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = '';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

            }
        });
    });

    var config = {
        // attributes: true,
        childList: true,
        CharacterData: true
    };

    observer.observe(target, config);
}

function selectOutput() {
    let selects = document.querySelectorAll('select');

    selects.forEach(select => {
        if (select.value == 'Email') {
            select.parentElement.parentElement.parentElement.querySelector('input').value = '@mail.ru';
            select.parentElement.parentElement.parentElement.querySelector('input').focus();
        }

        select.addEventListener('change', () => {
            switch (select.value) {
                case 'Email':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = '@mail.ru';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'phone':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = '+79';
                    select.parentElement.parentElement.parentElement.querySelector('input').setAttribute('maxlength', 12);
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'VK':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = 'https://vk.com/';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'Facebook':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = 'https://facebook.com/';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'Другое':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = '';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;
            }
        });
    })

    let target = document.querySelector('#add-contact');

    var observer = new MutationObserver(mutation => {
        let select = mutation[0].addedNodes[1].querySelector('select');

        select.addEventListener('change', () => {
            switch (select.value) {
                case 'Email':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = '@mail.ru';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'phone':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = '+79';
                    select.parentElement.parentElement.parentElement.querySelector('input').setAttribute('maxlength', 12);
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'VK':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = 'https://vk.com/';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'Facebook':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = 'https://facebook.com/';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

                case 'Другое':
                    select.parentElement.parentElement.parentElement.querySelector('input').value = '';
                    select.parentElement.parentElement.parentElement.querySelector('input').focus();
                    break;

            }
        });
    });

    var config = {
        // attributes: true,
        childList: true,
        CharacterData: true
    };

    observer.observe(target, config);
}

function deleteCreateContact() { //  обработчик изменений для удаления контакта из формы
    let target = document.querySelector('#add-contact');

    var observer = new MutationObserver(mutation => {
        mutation[0].addedNodes[1].querySelectorAll('#modal-client-contact-create-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentElement.parentElement.parentElement.innerHTML = '';
            });
        });
    });

    var config = {
        // attributes: true,
        childList: true,
        CharacterData: true
    };

    observer.observe(target, config);
}

function deleteUpdateContact() { //  обработчик изменений для удаления контакта из формы
    let target = document.querySelector('#update-contact');

    var observer = new MutationObserver(mutation => {
        mutation[0].addedNodes[1].querySelectorAll('#modal-client-contact-update-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentElement.parentElement.parentElement.remove();
            });
        });
    });

    var config = {
        attributes: true,
        childList: true,
        CharacterData: true
    };

    observer.observe(target, config);
}

function search() {
    let query = document.getElementById('search-input').value.toLowerCase();

    fetch('/search-clients', {
            method: 'post',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ "query": query })
        })
        .then((response) => response.json())
        .then((response) => drawingTable(response[0]))
}

function addSelectContact() {
    let selectModal = document.querySelector('#add-contact');
    // let selectCount = document.querySelectorAll('#add-contact-select').length; //  количество контактов уже созданных в форме

    let html = `
    <div class="container" id="add-contact-select">
        <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <select class="form-select" id="modal-client-new-contact-type" name="contactType">
                        <option value="Email">Email</option>
                        <option value="phone">Телефон</option>
                        <option value="VK">VK</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Другое">Другое</option>
                    </select>
                </div>
            </div>

            <div class="col-md-5 ps-0">
                <input type="text" id="modal-client-new-contact" class="form-control" aria-label="Контакт" value="" name="contactValue" required>
            </div>
        
            <div class="col-md-3">
                <button id="modal-client-contact-create-delete-btn" type="button" class="btn btn-outline-danger" title="Удалить контакт">
                    <img src="../img/delete-logo.svg" class="delete-logo">
                </button>
            </div>
        </div>
    </div>`;

    selectModal.insertAdjacentHTML('beforeend', html);
}

function updateSelectContact() {
    deleteUpdateContact();
    let selectModal = document.querySelector('#update-contact');
    // let selectCount = document.querySelectorAll('#update-contact-select').length; //  количество контактов уже созданных в форме

    let html = `
    <div class="container" id="update-contact-select">
        <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <select class="form-select" id="modal-client-update-contact-type" name="contactType">
                        <option value="Email">Email</option>
                        <option value="phone">Телефон</option>
                        <option value="VK">VK</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Другое">Другое</option>
                    </select>
                </div>
            </div>

            <div class="col-md-5 ps-0">
                <input type="text" id="modal-client-new-contact" class="form-control" aria-label="Контакт" value="" name="contactValue" required>
            </div>
        
            <div class="col-md-3">
                <button id="modal-client-contact-update-delete-btn" type="button" class="btn btn-outline-danger" title="Удалить контакт">
                    <img src="../img/delete-logo.svg" class="delete-logo">
                </button>
            </div>
        </div>
    </div>`;

    selectModal.insertAdjacentHTML('beforeend', html);
}

function sort() {
    //  сортировка по ID
    document.querySelector('#sort-id').addEventListener('click', () => {
        document.querySelector('#sort-id').children[0].style.rotate = `180deg`;
        document.querySelector('#sort-fio').children[0].style.rotate = `0deg`;
        document.querySelector('#sort-created').children[0].style.rotate = `0deg`;
        document.querySelector('#sort-updated').children[0].style.rotate = `0deg`;

        fetch('/sort-id')
            .then((response) => {
                return response.json();
            })
            .then((clients) => drawingTable(clients));
    });

    //  сортировка по ФИО
    document.querySelector('#sort-fio').addEventListener('click', () => {
        document.querySelector('#sort-id').children[0].style.rotate = `0deg`;
        document.querySelector('#sort-fio').children[0].style.rotate = `180deg`;
        document.querySelector('#sort-created').children[0].style.rotate = `0deg`;
        document.querySelector('#sort-updated').children[0].style.rotate = `0deg`;

        fetch('/sort-fio')
            .then((response) => {
                return response.json();
            })
            .then((clients) => drawingTable(clients));
    });

    //  сортировка по дате создания
    document.querySelector('#sort-created').addEventListener('click', () => {
        document.querySelector('#sort-id').children[0].style.rotate = `0deg`;
        document.querySelector('#sort-fio').children[0].style.rotate = `0deg`;
        document.querySelector('#sort-created').children[0].style.rotate = `180deg`;
        document.querySelector('#sort-updated').children[0].style.rotate = `0deg`;

        fetch('/sort-created')
            .then((response) => {
                return response.json();
            })
            .then((clients) => drawingTable(clients));
    });

    //  сортировка по дате изменения
    document.querySelector('#sort-updated').addEventListener('click', () => {
        document.querySelector('#sort-id').children[0].style.rotate = `0deg`;
        document.querySelector('#sort-fio').children[0].style.rotate = `0deg`;
        document.querySelector('#sort-created').children[0].style.rotate = `0deg`;
        document.querySelector('#sort-updated').children[0].style.rotate = `180deg`;

        fetch('/sort-updated')
            .then((response) => {
                return response.json();
            })
            .then((clients) => drawingTable(clients));
    });
}

function drawingTable(clients) {
    document.querySelector('.main__table_tbody').innerHTML = ''; //  очистка таблицы

    //  заполнение таблицы
    for (let i = 0; i < clients.length; i++) {
        const tbodyTr = document.createElement('tr');

        for (let key = 0; key < 6; key++) {
            const tbodyTd = document.createElement('td');
            switch (key) {
                case 0:
                    tbodyTd.classList.add('tbody_id', 'td_text');
                    tbodyTd.textContent = clients[i].id;
                    break;

                case 1:
                    tbodyTd.classList.add('tbody_id', 'td_text');
                    tbodyTd.textContent = `${clients[i].surname} ${clients[i].name} ${clients[i].lastName}`;
                    break;

                case 2:
                    tbodyTd.classList.add('td_create');
                    const date = new Date(clients[i].createdAt);
                    tbodyTd.textContent = date.toLocaleString();
                    break;
                case 3:
                    tbodyTd.classList.add('td_change');
                    const date2 = new Date(clients[i].updatedAt);
                    tbodyTd.textContent = date2.toLocaleString();
                    break;

                case 4:
                    tbodyTd.classList.add('td_contacts');
                    if (clients[i].contacts == 0) {
                        tbodyTd.textContent = 'Контактов нет';
                    } else {
                        for (let j in clients[i].contacts) {
                            let img = document.createElement('img');
                            img.src = `${window.location.href.split('/').slice(0, -1).join('/') + getContactImg(clients[i].contacts[j].type)}`;
                            img.classList.add('contacts-logo');
                            img.setAttribute('data-bs-toggle', 'tooltip');
                            img.setAttribute('data-bs-placement', 'top');
                            img.setAttribute('title', clients[i].contacts[j].value);
                            img.setAttribute('draggable', 'false');
                            tbodyTd.appendChild(img);
                        }
                    }
                    break;

                case 5:
                    tbodyTd.classList.add('td_actions');

                    // кнопка "ИЗМЕНИТЬ"
                    const btnChange = document.createElement('button');
                    btnChange.classList.add('btn', 'btn-outline-primary');
                    btnChange.setAttribute('data-bs-toggle', 'modal');
                    btnChange.setAttribute('data-bs-target', '#update-client-modal');
                    btnChange.setAttribute('id', 'change-btn');
                    btnChange.append('✏️ Изменить');
                    btnChange.addEventListener('click', () => {
                        document.getElementById('update-surname').value = clients[i].surname;
                        document.getElementById('update-name').value = clients[i].name;
                        document.getElementById('update-lastName').value = clients[i].lastName;
                        document.getElementById('client-id').value = btnChange.parentElement.parentElement.children[0].textContent;

                        let id = btnChange.parentElement.parentElement.children[0].textContent;

                        // очистка инпутов в форме
                        let selects = document.querySelectorAll('#update-contact-select');

                        for (let s = 1; s < selects.length; s++) {
                            selects[s].remove();
                        }
                        // очистка инпутов в форме /

                        if (clients[i].contacts.length == 1) {
                            document.querySelector('#update-contact-select').querySelector('select').value = clients[i].contacts[0].type;
                            document.querySelector('#update-contact-select').querySelector('input').value = clients[i].contacts[0].value;

                            return;
                        }

                        document.querySelector('#update-contact-select').querySelector('select').value = clients[i].contacts[0].type;
                        document.querySelector('#update-contact-select').querySelector('input').value = clients[i].contacts[0].value;

                        for (let j = 1; j < clients[i].contacts.length; j++) {
                            let selectModal = document.querySelector('#update-contact');

                            let html = `
                            <div class="container" id="update-contact-select">
                                <div class="row">
                                    <div class="col">
                                        <div class="input-group mb-3">
                                            <select class="form-select" id="modal-client-update-contact-type" name="contactType" selected="phone">
                                                <option value="Email">Email</option>
                                                <option value="phone">Телефон</option>
                                                <option value="VK">VK</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Другое">Другое</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-5 ps-0">
                                        <input type="text" id="modal-client-update-contact" class="form-control" aria-label="Контакт" value="${clients[i].contacts[j].value}" name="contactValue" required>
                                    </div>

                                    <div class="col-md-3">
                                        <button id="modal-client-contact-update-delete-btn" type="button" class="btn btn-outline-danger" title="Удалить контакт">
                                            <img src="../img/delete-logo.svg" class="delete-logo">
                                        </button>
                                    </div>
                                </div>
                            </div>`;

                            selectModal.insertAdjacentHTML('beforeend', html);

                            document.querySelectorAll('#modal-client-update-contact-type')[j].value = clients[i].contacts[j].type;
                        }

                        document.querySelector('#save-update-btn').addEventListener('submit', () => {
                            let client = {
                                id: id,
                                surname: document.getElementById('update-surname').value,
                                name: document.getElementById('update-name').value,
                                lastName: document.getElementById('update-lastName').value,
                                contacts: parseContacts(document.querySelectorAll('#modal-client-update-contact-type'), document.querySelectorAll('#modal-client-update-contact'))
                            };

                            fetch('/update-client', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify({
                                    "client": client
                                })
                            });
                        });


                        document.querySelectorAll('#modal-client-contact-update-delete-btn').forEach(btn => {
                            btn.addEventListener('click', () => {
                                btn.parentElement.parentElement.parentElement.remove();
                            })
                        })

                        function parseContacts(selects, inputs) {
                            console.log(inputs);
                            let contacts = [];
                            // console.log(selects.length);
                            for (let i = 0; i < selects.length; i++) {
                                contacts.push({
                                    "type": selects[i].value,
                                    "value": inputs[i].value
                                });
                            }

                            return contacts;
                        }
                    });

                    //  кнопка "УДАЛИТЬ"
                    const btnDelete = document.createElement('button');
                    btnDelete.classList.add('btn', 'btn-outline-danger');
                    // btnDelete.setAttribute('data-bs-toggle', 'modal');
                    btnDelete.setAttribute('data-bs-target', '#delModal');
                    btnDelete.setAttribute('id', 'delete-btn');
                    btnDelete.append('❌ Удалить');
                    btnDelete.addEventListener('click', () => {
                        if (confirm('Вы уверены?')) {
                            let id = btnDelete.parentElement.parentElement.children[0].textContent;

                            fetch('/delete-client', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify({ "id": id })
                            });

                            //  таймаут для обновления страницы
                            setTimeout(() => {
                                location.reload();
                            }, 500);
                        } else return;
                    });

                    tbodyTd.append(btnChange);
                    tbodyTd.append(btnDelete);
                    break;

                default:
                    break;
            }
            tbodyTr.append(tbodyTd);
        }

        const tableTbody = document.querySelector('.main__table_tbody');
        tableTbody.append(tbodyTr);
    }

    function getContactImg(contactType) {
        switch (contactType) {
            case 'phone':
                return '/img/phone-logo.png';
            case 'Email':
                return '/img/email-logo.png';
            case 'VK':
                return '/img/vkontakte-logo.png';
            case 'Facebook':
                return '/img/facebook-logo.png';
            case 'Другое':
                return '/img/other-logo.png';
        }
    }

    document.getElementById('countOfClients').textContent = `Всего клиентов: ${clients.length}`;
}