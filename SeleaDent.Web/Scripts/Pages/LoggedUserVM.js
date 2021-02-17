function LoggedUserVM() {
    const self = this;

    self.Id = null;
    self.Organizationid = null
    self.FirstName = ko.observable();
    self.LastName = ko.observable();
    self.DisplayName = ko.observable();
    self.FullName = ko.observable();
    self.Email = ko.observable();
    self.ProfilePictureUrl = ko.observable();
    self.RolesIds = ko.observableArray();

    self.init = function (raw) {
        if (raw) {
            self.Id = raw.Id
            self.Organizationid = raw.OrganizationId;
            self.FirstName(raw.FirstName);
            self.LastName(raw.LastName);
            self.DisplayName(raw.DisplayName);
            self.FullName(raw.FullName);
            self.Email(raw.Email);
            self.ProfilePictureUrl(raw.ProfilePictureUrl);
            self.RolesIds(raw.RolesId)
        }
    }

    self.HasRole = (roleId) => {
        return self.RolesIds().any(t => t === roleId);
    }

    self.GetLoggedUserData = function () {
        ajax.postWithoutData(
            `/User/GetLoggedUser`,
            (result) => {
                if (result && result.Success) {
                    self.init(result.Data)
                }
                else {
                    //error
                }
            },
            (err) => {
                //error
            });
    }

}
var loggedUserVM = new LoggedUserVM();