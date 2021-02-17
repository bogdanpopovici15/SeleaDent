using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SeleaDent.DataLayer.Repository
{
    public interface IRepository<TEntity> where TEntity : class
    {
        void Delete(TEntity entityToDelete);
        void Delete(object id);
        IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "");
        TEntity GetByID(object id, string includeProperties = null);
        IEnumerable<TEntity> GetWithRawSql(string query,
            params object[] parameters);
        void Insert(TEntity entity);
        void Update(TEntity entityToUpdate);

        List<TEntity> GetAll(string navigationProperties = null);

        IQueryable<TEntity> GetListQuery(Expression<Func<TEntity, bool>> where, string navigationProperties = null);

        TEntity GetSingle(Expression<Func<TEntity, bool>> where, string includeProperties = null);

        int ExecuteSqlCommand(string query, object[] parameters);
    }
}
