using SeleaDent.BussinessLogic.Core;
using SeleaDent.DataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace SeleaDent.Web.Filters
{
    public class GlobalIdentityInjector : ActionFilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            try
            {
                var authCookie = filterContext.HttpContext.Request.Cookies[FormsAuthentication.FormsCookieName];
                if (authCookie == null)
                {
                    return;
                }

                //Extract the forms authentication cookie
                var authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                if (authTicket == null)
                {
                    return;
                }
                var concatenatedUserData = authTicket.UserData;
                var data = concatenatedUserData.Split(new[]
                {
                    "#"
                }, StringSplitOptions.RemoveEmptyEntries);

                if (data.Count() != 1)
                {
                    return;
                }

                var validationToken = data[0];
                if (validationToken == null)
                {
                    return;
                }

                PreparePrincipal(filterContext, validationToken);

                FormsAuthentication.RenewTicketIfOld(authTicket);
            }
            catch (Exception ex)
            {
                return;
            }
        }

        private static void PreparePrincipal(AuthorizationContext filterContext, string validationToken)
        {
            var user = UserCore.GetEFByAspNetUserId(validationToken);

            if (user == null ||
                user.Status != 0)
            {
                return;
            }

            SetIdentity(user, filterContext);
        }

        private static void SetIdentity(User user, AuthorizationContext filterContext)
        {
            var identity = new CustomIdentity();
            if (user.AspNetUser.AspNetRoles == null ||
                user.AspNetUser.AspNetRoles.Count == 0)
            {
                return;
            }

            identity.Id = user.Id;
            identity.AspNetUserId = user.AspNetUserId;
            identity.OrganizationId = user.OrganizationId;
            identity.FirstName = user.FirstName;
            identity.LastName = user.LastName;
            identity.FullName = user.FullName;
            identity.DisplayName = user.DisplayName;
            identity.Email = user.AspNetUser.Email;
            identity.ProfilePictureUrl = user.ProfilePictureUrl;
            identity.Status = user.Status;

            SetPrincipal(filterContext, identity, user.AspNetUser.AspNetRoles);
        }

        private static void SetPrincipal(AuthorizationContext filterContext, CustomIdentity identity,
            ICollection<AspNetRole> roles = null)
        {
            if (roles == null)
            {
                return;
            }

            var newUser = new CustomPrincipal(identity);

            if (roles.Any())
            {
                newUser.RoleIds = roles.Select(role => role.Id).ToArray();
            }
            else
            {
                newUser.RoleIds = new string[0];
            }

            filterContext.HttpContext.User = newUser;
        }
    }
}
