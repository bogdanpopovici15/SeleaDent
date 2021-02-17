function BugetPage() {
    var self = this;

    self.ListBugetCategories  = ko.observableArray();

    self.Init = function () {
        self.GetBugetCategories();
    }

    self.InitBugetCategoryList = function (data) {
        var categories = [];
        for (var i = 0; i < data.length; i++) {
            var category = new BugetCategoryViewMode(self);
            category.Init(data[i]);
            categories.push(category);
        }
        self.ListBugetCategories(categories);
    }

    self.GetBugetCategories = function () {
        ajax.post("/Buget/GetBugetCategories", {},
            function (result) {
                if (result && result.Success) {
                    self.InitBugetCategoryList(result.Data);
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


    self.AddCategory = function () {
        showModal(1);
    }
}


function BugetCategoryViewMode(parent) {
    var self = this;
    self.Parent = parent;

    self.Id = null;
    self.OrganizationId = null;
    self.Name = ko.observable()
    self.Status = ko.observable();

    self.Init = function (data) {
        self.Id = data.Id;
        self.OrganizationId = data.OrganizationId
        self.Name(data.Name);
        self.Status(data.Status);
    }

}

var bugetPageVM = new BugetPage();