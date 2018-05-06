using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.Model;

namespace DynamoDbAPI.Models.Interfaces
{
    public interface IDynamoDb
    {
        Task CreateUserAsync(Users user);

        Task CreateFieldAsync(Fields field);

        Task CreateProductAsync(Products product);

        Task<Users> RetriveUserAsync(string id);

        Task<Fields> RetriveFieldAsync(string id);

        Task<Products> RetriveProductAsync(string id);

        Task<List<Users>> RetriveAllUsersAsync();

        Task<List<Fields>> RetriveAllFieldsAsync();

        Task<List<Products>> RetriveAllProductsAsync();

        Task DeleteUserAsync(string id);

        Task DeleteFieldAsync(string id);

        Task DeleteProductAsync(string id);


    }
}
