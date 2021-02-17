using SeleaDent.DataLayer;
using SeleaDent.DataLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeleaDent.BussinessLogic.Core
{
    public class UserCore : BaseRepository<User>
    {
        public UserCore() : base(new Entities()) { }


        public static User GetEFByAspNetUserId(string aspNetUserId)
        {
            var userCore = new UserCore();

            var user = userCore.GetSingle(usr => usr.AspNetUserId == aspNetUserId, $"{nameof(User.AspNetUser)}.{nameof(AspNetUser.AspNetRoles)}");
            return user;

        }

        public static User GetEFByAspNetEmail(string aspnetEmail)
        {
            var userCore = new UserCore();

            var user = userCore.GetSingle(usr => usr.AspNetUser.Email.Contains(aspnetEmail), $"{nameof(User.AspNetUser)}.{nameof(AspNetUser.AspNetRoles)}");
            return user;
        }


        public static User GetEfByEmail(string email, IList<string> navProperties = null)
        {
            var userCore = new UserCore();

            var userDAL = userCore.GetSingle(user => user.AspNetUser.Email == email, $"{nameof(User.AspNetUser)}.{nameof(AspNetUser.AspNetRoles)}");
            if (userDAL == null)
            {
                return null;
            }
            return userDAL;
        }
    }
}
