using Membership;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace SeleaDent.Web.Controllers
{
    public partial class BaseController : Controller
    {
        protected ApplicationUserManager mUserManager;
        protected ApplicationUserManager UserManager
        {
            get { return mUserManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { mUserManager = value; }
        }

        public bool IsAuthenticated => User.Identity.IsAuthenticated;

        //protected Guid GetLoggedUserId()
        //{
        //    return ((CustomIdentity)HttpContext.User.Identity).Id;
        //}

        protected string GetMyAspnetEmail()
        {
            var identity = HttpContext.User.Identity;
            return identity.Name;
        }

        protected CustomIdentity GetIdentity()
        {
            return ((CustomIdentity)HttpContext.User.Identity);
        }

        protected string HashPassword(string password)
        {
            return UserManager.PasswordHasher.HashPassword(password);
        }
    }
}