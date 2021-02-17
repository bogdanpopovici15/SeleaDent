using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeleaDent.DataLayer.Interfaces
{
    public interface ISinglePkLongModel : IModel
    {
        long Id { get; set; }
    }
}
