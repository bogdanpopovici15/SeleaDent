function lateBind(ViewModel, view) {
    console.log("late binding...");

    if (isElementBound(view)) {

        ko.cleanNode(document.getElementById(view));
    }
    ko.applyBindings(ViewModel, document.getElementById(view));
}

function isElementBound(id) {
    if (document.getElementById(id) != null) {
        return !!ko.dataFor(document.getElementById(id));
    }
    else {
        return false;
    }
};
/***User Data***/
var userWrapper = localStorage.getItem("userData");
var userData = JSON.parse(userWrapper);
/********/
var app = null;
// app.js
(function ($) {
    app = Sammy("body", function () {
        this.raise_errors = true;
        this.post('#:id', function () {
            // do something...
            return false; // avoid form submission
        });

        this.get('#:id', function () {
            return false; // avoid form submission
        });

        // Make Sammy.js leave the forms alone!
        this._checkFormSubmission = function (form) {
            return false;
        };
        this.error = function (message, error) {
            app.setLocation("#/");;
        };
    });
    app.use(Sammy.Template, "html");
    $(document).ready(function () {
        setTimeout(function () {
            app.run("#/");
            //user logged
            ManageHeaderSite.LoggedUserViewModel(loggedUserVM);
            loggedUserVM.GetLoggedUserData();
        }, 00);
    });
})(jQuery);

// controller.home
(function () {
    var app = Sammy.apps.body;

    app.get("#/", homeController);
    app.get("#/home", homeController);

    function homeController(context) {
        context.render($("#home_html"), {}, homeLoaded);
    };

    function homeLoaded(view) {
        $("#view").html(view);

        lateBind(ManageHome, "home-organization");
        setTimeout(function () {
            //all activity
            ManageHome.AllBugetCategoriesVM(bugetPageVM);
            bugetPageVM.Init();
        }, 100);
    }

})();


(function () {
})(window);
