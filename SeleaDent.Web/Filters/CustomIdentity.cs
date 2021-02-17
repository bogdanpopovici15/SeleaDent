using System;
using System.Security.Principal;

namespace SeleaDent.Web.Filters
{
    internal class CustomIdentity: IIdentity
    {
        #region from interface

        public string Name => IsAuthenticated ? FullName : null;

        public string AuthenticationType => "Custom";

        public bool IsAuthenticated => !string.IsNullOrWhiteSpace(AspNetUserId);

        #endregion

        #region custom fields

        public long Id { get; set; }

        public long OrganizationId { get; set; }

        public string AspNetUserId { get; set; }


        public int Status { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string FullName { get; set; }

        public string DisplayName { get; set; }

        public string Email { get; set; }

        public string ProfilePictureUrl { get; set; }



        #endregion
    }
}