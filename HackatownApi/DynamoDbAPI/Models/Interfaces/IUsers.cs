using System.Collections.Generic;
using Amazon.DynamoDBv2.Model;

namespace DynamoDbAPI.Models.Interfaces
{
    public interface IUsers
    {
        Dictionary<string, AttributeValue> CreateRequest();
    }
}
