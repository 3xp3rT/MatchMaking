using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
 
    public class UsersController : BaseApiController
    {
        private readonly DataContext _dataContext;
        public UsersController(DataContext dataContext)
        {
          _dataContext = dataContext;
        }

        [HttpGet]
        public async Task< IEnumerable<AppUser>> GetUserAsync()
        {
            var users = await _dataContext
                              .Users
                              .AsNoTracking()
                              .ToListAsync();
            return users;
        }

        [HttpGet("{id}")]
        public async Task<AppUser> GetAsync(int id)
        {
            var user = await _dataContext
                            .Users
                            .SingleOrDefaultAsync(x => x.Id == id);
            return user;
        }

        [HttpPost]
        public async void Post([FromBody] AppUser user)
        {
            await _dataContext.AddAsync(user);
            await _dataContext.SaveChangesAsync();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
