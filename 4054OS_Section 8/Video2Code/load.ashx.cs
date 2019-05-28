using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Section3Part1
{
    /// <summary>
    /// Summary description for save
    /// </summary>
    public class Load : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            string appDataFolder = Path.Combine(context.Request.PhysicalApplicationPath, "App_Data");
            var path = Path.Combine(appDataFolder, "data.json");
            context.Response.WriteFile(path);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}