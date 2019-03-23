window.PhoneBook = {

    apiUrl: "http://localhost:8081/phone-book",

    const: API = {
        CREATE: "./api/add.json",
        READ: "./api/list.json",
        UPDATE: "./api/update.json",
        DELETE: "./api/delete.json"
    },
const:ACTION_METHODS = {
    CREATE: "GET",
    READ: "GET",
    UPDATE: "GET",
    DELETE: "GET"
},


add: function () {
        var first_name = $("input[title='First Name']").val();
        var last_name = $("input[title='Last Name']").val();
        var phone_number = $("input[title='Phone Number']").val();
        var email = $("input[title='Email']").val();

        var data = {
            'first_name': first_name,
            'last_name': last_name,
            'phone_number': phone_number,
            'email': email
        };

        $.ajax({
            url: PhoneBook.apiUrl,
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
        });
    },

    getRow: function (phone) {

        return `<tr>
<td class="first_name">${phone.first_name}</td>
<td class="last_name">${phone.last_name}</td>
<td class="phone_number">${phone.phone_number}</td>
<td class="email">${phone.email}</td>


<td><a href="#" class="fa fa-trash delete" data-id="${phone.id}"></a></td>
</tr>
`
    },

    display: function (phones) {
        console.log('Displaying phone book.');

        var rows = '';

        phones.forEach(phone => rows += PhoneBook.getRow(phone));

        console.log(rows);

        $('#phone-book tbody').html(rows);
    },

    get: function () {
        $.ajax({
            url: PhoneBook.apiUrl,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            // reload items table

            PhoneBook.display(response);
        });
    },

    load: function () {
        $.ajax({
            url: API.READ,
            method: ACTION_METHODS.READ
        }).done(function (response) {
            console.info('done:', response);
            PhoneBook.load(response);
            PhoneBook.display(response);
    });
},


    delete: function (id) {
        $.ajax({
            url: API.DELETE + '?id=' + id,
            method: ACTION_METHODS.DELETE
        }).done(function (response) {
            console.log(response);
            // reload items table
            PhoneBook.get();
        });
    },

    update: function(phone) {
        $.ajax({
            url: API.UPDATE + '?id' + id,
            method: ACTION_METHODS.UPDATE,
            data: phone
        }).done(function (response) {
            if (response.success) {
                PhoneBook.update(phone);
            }
        });
    },



    bindEvents: function () {

        $("#create-phone-form").submit(function (event) {
            event.preventDefault();

            console.log('Submitting form');

            PhoneBook.add();

            return false;
        });

        $('#phone-book tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');
            PhoneBook.delete(id);
        });
    }
};


PhoneBook.load();
PhoneBook.get();
PhoneBook.bindEvents();