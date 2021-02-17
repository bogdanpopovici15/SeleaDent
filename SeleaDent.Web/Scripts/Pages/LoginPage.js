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
                    setTimeout(function () {
                        var returnUrl = getUrlParam("ReturnUrl");
                        if (returnUrl === undefined || returnUrl === null) {
                            returnUrl = "/Home/Index";
                        }
                        var userWrapper = response.Data;
                        if (typeof (Storage) !== "undefined") {
                            localStorage.setItem("userData", JSON.stringify(userWrapper));
                        }

                        window.location = returnUrl;
                    }, 1500);
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