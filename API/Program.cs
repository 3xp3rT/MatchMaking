
using API.Data;
using API.Extentions;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            
            builder.Services.AddControllers();

            builder.Services.AddApplicationServices(builder.Configuration);
            builder.Services.AddIdentityServices(builder.Configuration);
            
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.UseCors(response=>
                          response.AllowAnyHeader()
                                  .AllowAnyMethod()
                                  .WithOrigins("http://localhost:4200"));
            app.MapControllers();
            app.Run();
        }
    }
}