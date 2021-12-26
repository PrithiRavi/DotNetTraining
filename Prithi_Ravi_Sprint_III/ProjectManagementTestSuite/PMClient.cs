using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Testing;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore;

namespace ProjectManagementXUnitTestSuite
{
    public class PMClient: WebApplicationFactory<Startup>
    {
        protected override IWebHostBuilder CreateWebHostBuilder()
        {
            return WebHost.CreateDefaultBuilder()
                .UseStartup<Startup>();
        }
    }
}
