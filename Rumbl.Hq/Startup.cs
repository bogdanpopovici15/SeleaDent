using Microsoft.Owin;
using Owin;

[assembly: OwinStartup("SeleaDent.Web", typeof(SeleaDent.Web.Startup))]
namespace SeleaDent.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}