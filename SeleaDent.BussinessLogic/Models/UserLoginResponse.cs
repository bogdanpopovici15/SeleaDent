﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeleaDent.BussinessLogic.Models
{
    public class UserLoginResponse
    {
        public long Id { get; set; }

        public long OrganizationId { get; set; }

        public string[] RolesId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string DisplayName { get; set; }

        public string ProfilePictureUrl { get; set; }
    }
}
