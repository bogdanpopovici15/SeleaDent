using SeleaDent.BussinessLogic.Core;
using SeleaDent.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeleaDent.Web.Controllers
{
    public partial class BugetController : BaseController
    {
        // GET: Buget
        public virtual ActionResult Index()
        {
            return View();
        }

        public virtual JsonResult GetBugetCategories()
        {
            var response = new { Success = false, Data = "" };

            var bugetCategoryList = BugetCategoriesCore.GetList();
            if (bugetCategoryList == null)
            {
                return Json(response);
            }

            return Json(new { Success = true, Data = bugetCategoryList });
        }

        public virtual JsonResult Save(SaveBugetCategoryModel model)
        {
            var response = new { Success = false, Data = "" };
            if (model == null)
            {
                return Json(response);
            }

            //var customIdentity = GetIdentity();
            var reponse = BugetCategoriesCore.Save(model, 2);
            if (!reponse)
            {
                return Json(response);
            }

            return Json(new { Success = true });
        }
    }
}