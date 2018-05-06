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
    public class FieldsController : Controller
    {
        private readonly DynamoDb _client;
        private IAmazonDynamoDB Dynamoclient { get; set; }

        //Default Constructor
        public FieldsController(IAmazonDynamoDB dynamoclient)
        {
            this.Dynamoclient = dynamoclient;
            this._client = new DynamoDb(dynamoclient);
        }

        [HttpGet(Name = "GetAllFields")]
        public async Task<IActionResult> GetAll()
        {
            var response = await _client.RetriveAllFieldsAsync();

            return Ok(response);
        }

        [HttpGet("{id}", Name = "GetField")]
        public async Task<IActionResult> Get(string id)
        {
            var response = await _client.RetriveFieldAsync(id);

            return Ok(response);
        }

        [HttpGet("SearchBylocation")]
        public async Task<IActionResult> SearchBylocation(string posX, string posY)
        {
            var response = await _client.RetriveFieldPositionAsync(posX, posY);
            if (response == null) { return NotFound("The following X and Y position were not found (" + posX + ", " + posY +")"); }
            return Ok(response);
        }


        [HttpPost(Name = "PostField")]
        public async Task<IActionResult> Post([FromBody] Fields field)
        {

            if (field == null)
            {
                return Ok("The request body is null or could not be retrived");
            }

            field.FieldId = Guid.NewGuid().ToString();

            try
            {
                await _client.CreateFieldAsync(field);
            }
            catch (Exception e)
            {
                return BadRequest(field);
            }

            return CreatedAtRoute("GetField", new { id = field.FieldId }, field);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _client.DeleteFieldAsync(id);
                return Ok("Field with the id" + id + "was deleted successfully");

            }
            catch (Exception)
            {
                return BadRequest("Field with the id " + id + " could not be deleted, please check your id again");
            }
        }
    }
}
