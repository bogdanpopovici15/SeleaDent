using System.Web;
using System.Web.Optimization;

namespace SeleaDent.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            #region SCRIPTS
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                          "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryUi").Include(
                             "~/Scripts/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/Bloodhound").Include(
                 "~/Scripts/bloodhound.min.js"
                 ));

            bundles.Add(new ScriptBundle("~/bundles/typeahead").Include(
                      "~/Scripts/typeahead.jquery.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                   "~/Scripts/bootstrap.js",
                   "~/Scripts/bootstrap-dialog.js",
                   "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                   "~/Scripts/moment.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout")
                        .Include("~/Scripts/knockout-*")
                        .Include("~/Scripts/knockout.mapping-latest.js"));

            bundles.Add(new ScriptBundle("~/bundles/loginPage").Include(
                     "~/Scripts/Page/LoginPage.js"
                          ));

            bundles.Add(new ScriptBundle("~/bundles/loginPage").Include(
                      "~/Scripts/Pages/LoginPage.js"));

            bundles.Add(new ScriptBundle("~/bundles/loggedUserVM").Include(
                     "~/Scripts/Pages/LoggedUserVM.js"));


            bundles.Add(new ScriptBundle("~/bundles/mainViewModel").Include(
                     "~/Scripts/Pages/MainViewModel.js"));

            bundles.Add(new ScriptBundle("~/bundles/common").Include(
                             "~/Scripts/common/ajax.js")
                            .Include("~/Scripts/common/Utils.js"));


            bundles.Add(new ScriptBundle("~/bundles/sammy").Include(
                       "~/Scripts/sammy.js"));
            #endregion

            #region CSS
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Site.css"));

            bundles.Add(new StyleBundle("~/Content/pages").IncludeDirectory(
                    "~/Content/Pages", "*.css"));
            #endregion
        }
    }
}
