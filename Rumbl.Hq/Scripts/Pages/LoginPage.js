var loginPage = function () {

    function login() {
        var isValid = validateForm("login-form");
        if (!isValid) {
            return;
        }

        var postData = {
            Email: $("#LoginEmail").val(),
            Password: $("#LoginPassword").val()
        }

        ajax.post("/Account/Login/", postData,
            function (response) {
                if (response && response.Sucess) {
                    ///
                } else {
                    ///
                }
            },
            function (err) {
                ////
            }
        )
    }

    return {
        login: login
    }
}();