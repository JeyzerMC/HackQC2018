using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.Model;
using DynamoDbAPI.Models.Interfaces;
using Newtonsoft;

namespace DynamoDbAPI.Models
{
    public class Users : IUsers
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }

        public List<string> FieldsIdUsed { get; set; }
        public List<string> FieldsIdOwned { get; set; }

        public List<string> ProductsIdArriving { get; set; }
        public List<string> ProductsIdBought { get; set; }
        public List<string> ProductsIdSelling { get; set; }


        public Users()
        {

        }

        public Dictionary<string, AttributeValue> CreateRequest()
        {
            var request = new Dictionary<string, AttributeValue>
            {
                {"UserId", new AttributeValue{S = UserId} },
                {"FirstName", new AttributeValue{S = FirstName} },
                {"LastName", new AttributeValue{S = LastName} },
                {"Email", new AttributeValue{S = Email} },
                {"PhoneNumber", new AttributeValue{S = PhoneNumber} },
                {"Password", new AttributeValue{S = Password} },

                {"FieldsIdUsed", new AttributeValue{SS = FieldsIdUsed} },
                {"FieldsIdOwned", new AttributeValue{SS = FieldsIdOwned} },

                {"ProductsIdArriving", new AttributeValue{SS = ProductsIdArriving} },
                {"ProductsIdBought", new AttributeValue{SS = ProductsIdBought} },
                {"ProductsIdSelling", new AttributeValue{SS = ProductsIdSelling} },
            };


            List<string> removals = new List<string>();
            foreach (KeyValuePair<string, AttributeValue> entry in request)
            {
                // do something with entry.Value or entry.Key
                if (entry.Value.S == null && entry.Value.SS == null)
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
