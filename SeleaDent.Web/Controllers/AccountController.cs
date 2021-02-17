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
using SeleaDent.Web.Models;
using SeleaDent.BussinessLogic.Core;

namespace SeleaDent.Web.Controllers
{
    public partial class AccountController : BaseController
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
            var response = new { Sucess = false, data = "" };
            var password = HashPassword(model.Password);
            if (!ModelState.IsValid)
            {
                return Json(new { Sucess = false, Data = "" });
            }

            var applicationUser = await CheckEmailAndPassword(model.Email, model.Password).ConfigureAwait(false);

            if (applicationUser == null)
            {
                return Json(new { Sucess = false, Data = "" });
            }
            var userResponse = AspNetUserCore.HasValidRole(model.Email);
            if (userResponse == null)
            {
                return Json(new { Sucess = false, Data = "" });
            }

            CreateCookie(applicationUser.UserName, applicationUser.Id);
            return Json(new { Sucess = true, Data = userResponse });

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

        protected string HashPassword(string password)
        {
            return UserManager.PasswordHasher.HashPassword(password);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public virtual ActionResult LogOff()
        {
            var cookie = System.Web.HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (cookie != null)
            {
                var httpCookie = HttpContext.Response.Cookies[FormsAuthentication.FormsCookieName];
                if (httpCookie != null)
                {
                    httpCookie.Expires = DateTime.Now.AddDays(-1d);
                }
            }
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            HttpContext.Request.Cookies.Clear(); // clear all cookies, to start a fresh session
            return RedirectToAction(MVC.Home.ActionNames.Index, MVC.Home.Name);
        }
        #endregion

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

    }
}