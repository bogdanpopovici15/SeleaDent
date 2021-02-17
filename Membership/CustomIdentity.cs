using System;
using System.Collections.Generic;
using System.Security.Principal;

namespace Membership
{
    public class CustomIdentity : IIdentity
    {
        #region from interface

        public string Name => IsAuthenticated ? FullName : null;

        public string AuthenticationType => "Custom";

        public bool IsAuthenticated => !string.IsNullOrWhiteSpace(AspNetUserId);

        #endregion

        #region custom fields

        public long Id { get; set; }

        public string AspNetUserId { get; set; }

        public Guid OrganizationId { get; set; }

        public int Status { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string FullName { get; set; }

        public string DisplayName { get; set; }

        public string Email { get; set; }

        public string ProfileImageUrl { get; set; }

        #endregion
    }
}
