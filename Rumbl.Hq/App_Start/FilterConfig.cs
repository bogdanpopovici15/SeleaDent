using Rumbl.Hq.Filters;
using System.Web.Mvc;

namespace SeleaDent.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new GlobalIdentityInjectorAttribute());
        }
    }
}
