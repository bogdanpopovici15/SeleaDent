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
    public class OrganizationCore : BaseRepository<Organization>
    {
        public OrganizationCore() : base(new Entities()) { }

        public static List<NameEntity> GetList()
        {
            var organizationCore = new OrganizationCore();
            var organizatinCore = organizationCore.GetListQuery(t => t.Id != 0 && t.Status == 0)
               .Select(item => new NameEntity
               {
                   Id = item.Id,
                   Name = item.Name,
               }).ToList();

            return organizatinCore;
        }
    }

}
