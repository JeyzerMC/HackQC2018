using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.Model;
using DynamoDbAPI.Models.Interfaces;
using Newtonsoft;

namespace DynamoDbAPI.Models
{
    public class Fields : IFields
    {
        public string FieldId { get; set; }
        public string PosX { get; set; }
        public string PosY { get; set; }
        public List<string> ProductsList { get; set; }
        public string OwnerId { get; set; }
        public string RenterId { get; set; }


        public Fields()
        {

        }

        public Dictionary<string, AttributeValue> CreateRequest()
        {
            var request = new Dictionary<string, AttributeValue>
            {
                {"FieldId", new AttributeValue{S = FieldId } },
                {"PosX", new AttributeValue{S = PosX } },
                {"PosY", new AttributeValue{S = PosY } },
                {"ProductsList", new AttributeValue{SS = ProductsList} },
                {"OwnerId", new AttributeValue{S = OwnerId} },
                {"RenterId", new AttributeValue{S = RenterId} },
            };

            List<string> removals = new List<string>();
            foreach (KeyValuePair<string, AttributeValue> entry in request)
            {
                // do something with entry.Value or entry.Key
                if (entry.Value.S == null && (entry.Value.SS == null || entry.Value.SS.Count == 0))
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
