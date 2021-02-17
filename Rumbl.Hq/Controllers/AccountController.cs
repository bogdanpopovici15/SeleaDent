using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Web.Security;
using System.IO;
using SeleaDent.Web.App_Start;
using SeleaDent.Web.Models;

namespace SeleaDent.Web.Controllers
{
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }


        public virtual ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public virtual async Task<JsonResult> Login(LoginViewModel model)
        {
            var response = "null";
            if (!ModelState.IsValid)
            {
                return Json(response);
            }

            var applicationUser = await CheckEmailAndPassword(model.Email, model.Password).ConfigureAwait(false);

            if (applicationUser == null)
            {
                return Json(response);
            }
            CreateCookie(applicationUser.UserName, applicationUser.Id);
            return Json(applicationUser);

        }


        #region private methods
        private async Task<ApplicationUser> CheckEmailAndPassword(string email, string password)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return null;
            }

            var aspNetUser = await UserManager.FindByEmailAsync(email).ConfigureAwait(false);
            if (aspNetUser == null)
            {
                return null;
            }

            var validPassword = await UserManager.CheckPasswordAsync(aspNetUser, password).ConfigureAwait(false);
            return !validPassword ? null : aspNetUser;
        }

        private void CreateCookie(string userName, string id)
        {
            var ticketsToken = new FormsAuthenticationTicket(1, userName, DateTime.Now, DateTime.Now.AddMinutes(1440), true, id,
                FormsAuthentication.FormsCookiePath);

            var cookiestr = FormsAuthentication.Encrypt(ticketsToken);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, cookiestr)
            {
                Expires = ticketsToken.Expiration,
                Path = FormsAuthentication.FormsCookiePath
            };
            Response.Cookies.Add(cookie);
        }
        #endregion
    }
}