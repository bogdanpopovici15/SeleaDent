using System;
using System.Linq;
using System.Security.Principal;

namespace Membership
{
    public class CustomPrincipal : IPrincipal
    {
        protected readonly IIdentity mIdentity;

        public CustomPrincipal(IIdentity identity)
        {
            mIdentity = identity;
        }

        public string[] RoleIds { get; set; }

        public IIdentity Identity => mIdentity;

        public bool IsInRole(string roleId)
        {
            if (string.IsNullOrWhiteSpace(roleId) || RoleIds == null || RoleIds.Length == 0)
            {
                return false;
            }

            return RoleIds.Any(customRoleId => string.Equals(customRoleId, roleId, StringComparison.CurrentCultureIgnoreCase));
        }
    }
}
