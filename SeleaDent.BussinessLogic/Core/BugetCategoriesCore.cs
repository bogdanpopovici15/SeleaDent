using SeleaDent.BussinessLogic.Models;
using SeleaDent.DataLayer;
using SeleaDent.DataLayer.Repository;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeleaDent.BussinessLogic.Core
{
    public class BugetCategoriesCore : BaseRepository<BugetCategory>
    {
        public BugetCategoriesCore() : base(new Entities()) { }

        public static List<BugetCategoryMinifiedModel> GetList()
        {
            var bugetCategoriesCore = new BugetCategoriesCore();
            var categoryList = bugetCategoriesCore.GetListQuery(t => t.Id != 0)
               .Select(item => new BugetCategoryMinifiedModel
               {
                   Id = item.Id,
                   OrganizationId = item.OrganizationId,
                   Name = item.Name,
               }).ToList();

            return categoryList;
        }

        public static bool Save(SaveBugetCategoryModel model,long userId)
        {
            var bugetCategoriesCore = new BugetCategoriesCore();

            if (model.Id == 0)
            {
                //Create Product

                var parameters = GetProductSqlParameters(model,userId);
                var query = "INSERT INTO BugetCategories(OrganizationId,Name,CreatedBy,CreatedAt)" +
                            "VALUES(@organizationId, @name, @createdBy, @createdAt)";
                try
                {
                    var rows = bugetCategoriesCore.ExecuteSqlCommand(query, parameters);
                    if (rows == 0)
                    {
                        return false;
                    }
                }
                catch (Exception e)
                {

                    throw;
                }
              

            }
            else
            {
                //Update 
                var parameters = GetProductSqlParameters(model,userId);
                var query = "UPDATE Products SET  Name=@name, OrganizationId=@organizationId" +
                                                " WHERE Id=@id";

                var rows = bugetCategoriesCore.ExecuteSqlCommand(query, parameters);
                if (rows == 0)
                {
                    return false;
                }
            }

            return true;
        }


        private static object[] GetProductSqlParameters(SaveBugetCategoryModel model,long userId)
        {
            object[] parameters = new object[]
            {
                new SqlParameter("id", model.Id),
                new SqlParameter("organizationId", model.OrganizationId),
                new SqlParameter("name", model.Name),
                new SqlParameter("createdBy", userId),
                new SqlParameter("createdAt",DateTime.UtcNow),
            };

            return parameters;
        }

    }

}
