using SeleaDent.BussinessLogic.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeleaDent.Web.Controllers
{
    public partial class OrganizationController : Controller
    {
        // GET: Organization
        public virtual ActionResult Index()
        {
            return View();
        }

        public virtual JsonResult GetList()
        {
            var response = new { Success = false, Data = "" };

            var organizationList = OrganizationCore.GetList();
            if (organizationList == null)
            {
                return Json(response);
            }

            return Json(new { Success = true, Data = organizationList });
        }
    }
}