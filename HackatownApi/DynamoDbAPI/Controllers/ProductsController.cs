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
    public class ProductsController : Controller
    {
        private readonly DynamoDb _client;
        private IAmazonDynamoDB Dynamoclient { get; set; }

        //Default Constructor
        public ProductsController(IAmazonDynamoDB dynamoclient)
        {
            this.Dynamoclient = dynamoclient;
            this._client = new DynamoDb(dynamoclient);
        }

        [HttpGet(Name = "GetAllProducts")]
        public async Task<IActionResult> GetAll()
        {
            var response = await _client.RetriveAllProductsAsync();

            return Ok(response);
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<IActionResult> Get(string id)
        {
            var response = await _client.RetriveProductAsync(id);

            return Ok(response);
        }

        [HttpPost(Name = "PostProduct")]
        public async Task<IActionResult> Post([FromBody] Products product)
        {
            if (product == null)
            {
                return BadRequest("The request body is null or could not be retrived");
            }

            product.TimeStamp = Convert.ToInt64(TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"))
            .ToString("yyyyMMddHHmmssffff"));
            product.ProductId = Guid.NewGuid().ToString();

            var owner = await _client.RetriveUserAsync(product.productOwnerId);
            if (owner.ProductsIdSelling == null)
            {
                owner.ProductsIdSelling = new List<string>();
            }

            owner.ProductsIdSelling.Add(product.ProductId);
            await _client.UpdateUserAsync(owner, owner.UserId);

            try
            {
                await _client.CreateProductAsync(product);
            }
            catch (Exception e)
            {
                return BadRequest(product);
            }

            return CreatedAtRoute("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            // do the same as

            try
            {
                await _client.DeleteProductAsync(id);
                return Ok("Product with the id" + id + "was deleted successfully");

            }
            catch (Exception)
            {
                return BadRequest("Product with the id " + id + " could not be deleted, please check your id again");
            }
        }
    }
}
