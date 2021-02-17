using CustomMembership;
using Deventure.LoggingService;
using Rumbl.BussinessLogic.Core;
using Rumbl.DataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Rumbl.Hq.Filters
{
    public class GlobalIdentityInjectorAttribute : ActionFilterAttribute, IAuthorizationFilter
    {
        #region Public methods

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
                    //LogHelper.LogException<GlobalIdentityInjectorAttribute>("Validation token is invalid.");
                }

                SetPrincipal(filterContext, validationToken);

                FormsAuthentication.RenewTicketIfOld(authTicket);
            }
            catch (Exception ex)
            {
                LogHelper.LogException<GlobalIdentityInjectorAttribute>(ex);
            }
        }

        #endregion

        #region Private methods

        private static void SetPrincipal(AuthorizationContext filterContext, string validationToken)
        {
            SetIdentity(filterContext, validationToken);
        }

        private static void SetIdentity(AuthorizationContext filterContext, string validationToken)
        {
            var user = UserCore.GetByAspNetUserId(validationToken, new[]
                {
                    nameof(User.AspNetUser)
                });
            if (user == null)
            {
                //LogHelper.LogInfo<GlobalIdentityInjectorAttribute>("failed to retrieve user!");
                return;
            }

            //if (!user.AspNetUser.WhitelabelId.HasValue)
            //{
            //    //LogHelper.LogInfo<GlobalIdentityInjectorAttribute>("user does not have WhitelabelId!");
            //    return;
            //}

            var identity = new CustomIdentity
            {
                Id = user.Id,
                AspNetUserId = validationToken,
                Username = user.AspNetUser.Email,
                //identity.Status = user.AspNetUser.Status;
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.AspNetUser.PhoneNumber,
                ProfileImageUrl = user.ProfilePictureUrl
            };

            SetIdentity(filterContext, identity, user.AspNetUser);
        }

        private static void SetIdentity(AuthorizationContext filterContext, CustomIdentity identity, DataLayer.AspNetUser user)
        {
            var newUser = new CustomPrincipal(identity)
            {
                //RoleIds = user.AspNetRoles.Select(role => role.Id).ToList(),
            };

            filterContext.HttpContext.User = newUser;
        }

        #endregion
    }
}