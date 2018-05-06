using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using DynamoDbAPI.Models;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace DynamoDbAPI.Controllers
{


    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly DynamoDb _client;
        private IAmazonDynamoDB Dynamoclient { get; set; }

        //Default Constructor
        public UsersController(IAmazonDynamoDB dynamoclient)
        {
            this.Dynamoclient = dynamoclient;
            this._client = new DynamoDb(dynamoclient);
        }

        [HttpGet(Name = "GetAllUsers")]
        public async Task<IActionResult> GetAll()
        {
            var response = await _client.RetriveAllUsersAsync();

            return Ok(response);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> Get(string id)
        {
            var response = await _client.RetriveUserAsync(id);

            return Ok(response);
        }

        [HttpGet("SearchByEmail")]
        public async Task<IActionResult> GetByEmail(string email)
        {

            var response = await _client.RetriveUserByEmailAsync(email);

            return Ok(response);
        }

        [HttpPost(Name = "PostUser")]
        public async Task<IActionResult> Post([FromBody] Users user)
        {
            if (user == null)
            {
                return BadRequest("The request body is null or could not be retrived");
            }

            user.UserId = Guid.NewGuid().ToString();

            try
            {
                await _client.CreateUserAsync(user);
            }
            catch (Exception e)
            {
                return BadRequest(user);
            }

            return CreatedAtRoute("GetUser", new { id = user.UserId }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Users user)
        {
            try
            {
                await _client.UpdateUserAsync(user, id);
                return Ok("Recipe with the id" + id + "was updated successfully");
            }
            catch (Exception)
            {
                return BadRequest("Recipe with the id " + id + " could not be updated, please check your id again");
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _client.DeleteUserAsync(id);
                return Ok("User with the id" + id + "was deleted successfully");

            }
            catch (Exception)
            {
                return BadRequest("User with the id " + id + " could not be deleted, please check your id again");
            }
        }
    }
}
