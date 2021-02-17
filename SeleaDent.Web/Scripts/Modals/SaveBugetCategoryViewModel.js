function SaveBugetCategoryViewModel() {
    var self = this;

    self.OrganizationList = ko.observableArray();

    self.Id = 0;
    self.OrganizationId = 0;
    self.Name = ko.observable();


    self.Init = function (data) {
        self.Id = data.Id;
        self.OrganizationId = data.OrganizationId;
        self.Name(data.Name);
    }

    self.Save = function () {
        var isValid = validateForm("save-buget-category-form");
        if (!isValid) {
            return;
        }

        var form = new FormData();
        form.append("Id", self.Id);
        form.append("OrganizationId", self.OrganizationId);
        form.append("Name", self.Name());

        ajax.postFile(
            "/Buget/Save",
            form,
            function (result) {
                if (result && result.Success) {
                    self.HideModal();
                    bugetPageVM.Init();
                }
                else {
                    //
                }
            },
            function (error) {
                //
            }
        );
    }


    self.GetOrganizationList = function () {
        ajax.post("/Organization/GetList", {},
            function (result) {
                if (result && result.Success) {
                    self.OrganizationList(result.Data);
                }
                else {
                    //
                }
                //
            },
            function (errr) {
                //
            });
    }


    self.HideModal = function () {
        $("#add-new-buget-category-modal").modal("hide");
    }
}

var saveBugetCategoryVM = new SaveBugetCategoryViewModel();