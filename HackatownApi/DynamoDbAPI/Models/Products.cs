using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.Model;
using DynamoDbAPI.Models.Interfaces;
using Newtonsoft;

namespace DynamoDbAPI.Models
{
    public class Products : IProducts
    {
        public string Name { get; set; }
        public string ProductId { get; set; }
        public string CultureType { get; set; }
        public List<string> Options { get; set; }
        public string StartDate { get; set; }
        public string GrowthDuration { get; set; }
        public float Price { get; set; }
        public float Amount { get; set; }
        public long? TimeStamp { get; set; }

        public string productOwnerId { get; set; }

        public Products()
        {

        }

        public Dictionary<string, AttributeValue> CreateRequest()
        {
            var request =  new Dictionary<string, AttributeValue>
            {
                {"Name", new AttributeValue{ S = Name } },
                {"ProductId", new AttributeValue{ S = ProductId } },
                {"CultureType", new AttributeValue{ S = CultureType } },
                {"Options", new AttributeValue{ SS = Options } },
                {"StartDate", new AttributeValue{ S = StartDate } },
                {"GrowthDuration", new AttributeValue{ S = GrowthDuration } },
                {"Price", new AttributeValue{N = Price.ToString()} },
                {"Amount", new AttributeValue{N = Amount.ToString()} },
                {"TimeStamp", new AttributeValue{N = TimeStamp.ToString()} },

            };

            List<string> removals = new List<string>();
            foreach (KeyValuePair<string, AttributeValue> entry in request)
            {
                // do something with entry.Value or entry.Key
                if (entry.Value.S == null && entry.Value.SS == null && entry.Value.N == null)
                {
                    removals.Add(entry.Key);
                }
            }

            foreach (string address in removals)
            {
                request.Remove(address);
            }

            return request;
        }
    }
}
