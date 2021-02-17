using Membership;
using SeleaDent.BussinessLogic.Core;
using SeleaDent.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeleaDent.Web.Controllers
{
    public partial class UserController : BaseController
    {
        // GET: User
        public virtual ActionResult Index()
        {
            return View();
        }

        public virtual JsonResult GetLoggedUser()
        {
            var response = new { Success = false, Data = "" };

            var aspnetEmail = GetMyAspnetEmail();
            if (string.IsNullOrEmpty(aspnetEmail))
            {
                return Json(response, JsonRequestBehavior.AllowGet);

            }
            var user = UserCore.GetEFByAspNetEmail(aspnetEmail);
            if (user == null)
            {
                return Json(response, JsonRequestBehavior.AllowGet);
            }

            var userModel = new UserLoginResponse
            {
                Id = user.Id,
                OrganizationId = user.OrganizationId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                FullName = user.FirstName,
                Email = user.AspNetUser.Email,
                DisplayName = user.DisplayName,
                ProfilePictureUrl = user.ProfilePictureUrl,
                RolesId = AspNetUserCore.SetRolesId(user.AspNetUser.AspNetRoles),
            };
            return Json(new { Success = true, Data = userModel }, JsonRequestBehavior.AllowGet);
        }
    }
}