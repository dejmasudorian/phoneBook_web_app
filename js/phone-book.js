window.PhoneBook = {

    //declare var for update
    phoneBookList:[],
    editId:'',

    apiUrl: "http://localhost:8080/phone-book",

    const: API = {
        CREATE: "http://localhost:8080/phone-book",
        READ: "http://localhost:8080/phone-book",
        UPDATE: "http://localhost:8080/phone-book",
        DELETE: "http://localhost:8080/phone-book"
    },
const:ACTION_METHODS = {
    CREATE: "POST",
    READ: "GET",
    UPDATE: "PUT",
    DELETE: "DELETE"
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
            url: API.CREATE,
            method: ACTION_METHODS.CREATE,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
            $('#phone-book tbody').append(PhoneBook.getRow(response));

        }).fail(function (jqXHR, textStatus, error) {
            alert(textStatus);
        })
    },



    getRow: function (phone) {

        return `<tr id="${phone.id}">
<td class="first_name">${phone.first_name}</td>
<td class="last_name">${phone.last_name}</td>
<td class="phone_number">${phone.phone_number}</td>
<td class="email">${phone.email}</td>

<td><a href='#' data-id='${phone.id}' class='edit'>&#9998;</a>
<a href="#" class="fa fa-trash delete" data-id="${phone.id}"></a></td>
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
            url: API.READ,
            method: ACTION_METHODS.READ
        }).done(function (response) {
            console.log(response);
            // reload items table
            PhoneBook.phoneBookList=response["content"];
            PhoneBook.display(response["content"]);
        });
    },


    startEdit: function (id) {
        // ES5 function systax inside find
        var editPhone = PhoneBook.phoneBookList.find(function (phone) {
            console.log(phone.first_name);
            return phone.id == id;
        });
        console.debug('startEdit', editPhone);

        $('input[name=first_name]').val(editPhone.first_name);
        $('input[name=last_name]').val(editPhone.last_name);
        $('input[name=phone_number]').val(editPhone.phone_number);
        $('input[name=email]').val(editPhone.email);
        PhoneBook.editId = id;
    },

    cancelEdit: function() {
        PhoneBook.editId = '';
        document.querySelector(".create-phone-form").reset();
    },

    delete: function (id) {
        $.ajax({
            url: API.DELETE + '?id=' + id,
            method: ACTION_METHODS.DELETE
        }).done(function (response) {
            console.log(response);
            $('#phone-book tbody').find("tr#" + id).remove();
            // reload items table
            //PhoneBook.get();

        });
    },

    update: function(phone) {
        $.ajax({
            url: API.UPDATE + '?id' + id,
            method: ACTION_METHODS.UPDATE,
            data: phone
        }).done(function (response) {

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

        $('#phone-book tbody').delegate('.edit', 'click', function () {
            var id = $(this).data('id');
            PhoneBook.startEdit(id);
        });
    }
};


PhoneBook.get();
PhoneBook.bindEvents();