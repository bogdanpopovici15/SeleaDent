using SeleaDent.BussinessLogic.Models;
using SeleaDent.DataLayer;
using SeleaDent.DataLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeleaDent.BussinessLogic.Core
{
    public class AspNetUserCore : BaseRepository<AspNetUserCore>
    {
        public AspNetUserCore() : base(new Entities()) { }


        public static UserLoginResponse HasValidRole(string email)
        {
            var userResponse = UserCore.GetEfByEmail(email);

            if (userResponse == null)
            {
                return null;
            }

            var user = userResponse;

            return new UserLoginResponse
            {
                Id = user.Id,
                OrganizationId = user.OrganizationId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                FullName = user.FirstName,
                Email = user.AspNetUser.Email,
                DisplayName = user.DisplayName,
                ProfilePictureUrl = user.ProfilePictureUrl,
                RolesId = SetRolesId(user.AspNetUser.AspNetRoles),
            };
        }


        public static string[] SetRolesId(ICollection<DataLayer.AspNetRole> roles = null)
        {
            if (roles == null)
            {
                return new string[0];
            }

            string[] RoleIds = null;

            if (roles.Any())
            {
                RoleIds = roles.Select(role => role.Id).ToArray();
            }
            else
            {
                RoleIds = new string[0];
            }

            return RoleIds;
        }
    }
}
