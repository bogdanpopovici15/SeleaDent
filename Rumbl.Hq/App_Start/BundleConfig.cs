using System.Web;
using System.Web.Optimization;

namespace SeleaDent.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //BundleTable.EnableOptimizations = true;

            #region SCRIPTS
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                          "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryUi").Include(
                     "~/Scripts/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/Bloodhound").Include(
                 "~/Scripts/bloodhound.min.js"
                 ));

            bundles.Add(new ScriptBundle("~/bundles/typeahead").Include(
                      "~/Scripts/typeahead.jquery.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout")
                        .Include("~/Scripts/knockout-*")
                        .Include("~/Scripts/knockout.mapping-latest.js"));

            bundles.Add(new ScriptBundle("~/bundles/loginPage").Include(
                     "~/Scripts/Page/LoginPage.js"
               ));

            bundles.Add(new ScriptBundle("~/bundles/common").Include(
             "~/Scripts/common/ajax.js")
            .Include("~/Scripts/common/Utils.js").Include("~/Scripts/Pages/LoginPage.js"));
            #endregion

            #region CSS
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            #endregion

           

        }
    }
}
