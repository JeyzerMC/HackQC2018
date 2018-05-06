using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using DynamoDbAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DynamoDbAPI.Models
{
    public class DynamoDb : IDynamoDb
    {
        private IAmazonDynamoDB Dynamoclient { get; set; }
        private static readonly string _tableUsers = "Users";
        private static readonly string _tableFields = "Fields";
        private static readonly string _tableProducts = "Products";

        public DynamoDb(IAmazonDynamoDB dynamoclient)
        {
            this.Dynamoclient = dynamoclient;   
        }

        
        /* ==================================== */
        /* ========== RECIPE SECTION ========== */
        /* ==================================== */

        public async Task CreateUserAsync(Users user)
        {
            var something = user.CreateRequest();
            var copy = something;

            try
            {
                var request = new PutItemRequest
                {
                    TableName = _tableUsers,
                    Item = user.CreateRequest(),
                };
                await Dynamoclient.PutItemAsync(request);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task CreateFieldAsync(Fields field)
        {
            try
            {
                var request = new PutItemRequest
                {
                    TableName = _tableFields,
                    Item = field.CreateRequest(),
                };
                await Dynamoclient.PutItemAsync(request);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task CreateProductAsync(Products product)
        {
            try
            {
                var request = new PutItemRequest
                {
                    TableName = _tableProducts,
                    Item = product.CreateRequest(),
                };
                await Dynamoclient.PutItemAsync(request);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Users> RetriveUserAsync(string id)
        {
            try
            {
                var query = new ScanRequest
                {
                    TableName = _tableUsers,
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        { ":v_UserId", new AttributeValue{ S = id }},
                    },
                    FilterExpression = "UserId = :v_UserId",

                };

                var response = await Dynamoclient.ScanAsync(query);

                return MapUser(response.Items.First());
            }
            catch(Exception e)
            {
                Console.Write(e);
                throw;
            }
        }

        public async Task<Users> RetriveUserByEmailAsync(string email)
        {
            try
            {
                var query = new ScanRequest
                {
                    TableName = _tableUsers,
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        { ":v_Email", new AttributeValue{ S = email }},
                    },
                    FilterExpression = "Email = :v_Email",

                };

                var response = await Dynamoclient.ScanAsync(query);

                return MapUser(response.Items.First());
            }
            catch (Exception e)
            {
                Console.Write(e);
                throw;
            }
        }

        public async Task<Fields> RetriveFieldAsync(string id)
        {
            try
            {
                var query = new ScanRequest
                {
                    TableName = _tableFields,
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        { ":v_FieldId", new AttributeValue{ S = id }},
                    },
                    FilterExpression = "FieldId = :v_FieldId",

                };

                var response = await Dynamoclient.ScanAsync(query);

                return MapField(response.Items.First());
            }
            catch (Exception e)
            {
                Console.Write(e);
                throw;
            }
        }

        public async Task<Fields> RetriveFieldPositionAsync(string posX, string posY)
        {
            try
            {
                var query = new ScanRequest
                {
                    TableName = _tableFields,
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        { ":v_PosX", new AttributeValue{ S = posX }},
                        { ":v_PosY", new AttributeValue{ S = posY }},
                    },
                    FilterExpression = "PosX = :v_PosX and PosY = :v_PosY",

                };

                var response = await Dynamoclient.ScanAsync(query);

                if (response.Items.Count == 0) { return null; }

                return MapField(response.Items.First());
            }
            catch (Exception e)
            {
                Console.Write(e);
                throw;
            }
        }

        public async Task<Products> RetriveProductAsync(string id)
        {
            try
            {
                var query = new ScanRequest
                {
                    TableName = _tableProducts,
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        { ":v_ProductId", new AttributeValue{ S = id }},
                    },
                    FilterExpression = "ProductId = :v_ProductId",

                };

                var response = await Dynamoclient.ScanAsync(query);

                return MapProduct(response.Items.First());
            }
            catch (Exception e)
            {
                Console.Write(e);
                throw;
            }
        }


        public async Task<List<Users>> RetriveAllUsersAsync()
        {
            try
            {
                var request = new ScanRequest
                {
                    TableName = _tableUsers
                };

                var response = await Dynamoclient.ScanAsync(request);
                return response.Items.Select(MapUser).ToList();
            }
            catch (Exception e)
            {
                Console.Write(e);
                throw;
            }
        }

        public async Task<List<Fields>> RetriveAllFieldsAsync()
        {
            try
            {
                var request = new ScanRequest
                {
                    TableName = _tableFields
                };

                var response = await Dynamoclient.ScanAsync(request);
                return response.Items.Select(MapField).ToList();
            }
            catch (Exception e)
            {
                Console.Write(e);
                throw;
            }
        }

        public async Task<List<Products>> RetriveAllProductsAsync()
        {
            try
            {
                var request = new ScanRequest
                {
                    TableName = _tableProducts
                };

                var response = await Dynamoclient.ScanAsync(request);
                var copy = response;
                return response.Items.Select(MapProduct).ToList();
            }
            catch (Exception e)
            {
                Console.Write(e);
                throw;
            }
        }

        
        //UPDATE a Recipe from the table
        public async Task UpdateUserAsync(Users updatedUser, string id)
        {
            try
            {
                var currentUser = await RetriveUserAsync(id);

                var request = new UpdateItemRequest
                {
                    Key = new Dictionary<string, AttributeValue>
                    {
                        { "UserId", new AttributeValue
                            { S = currentUser.UserId }
                        }
                    },
                    ExpressionAttributeNames = new Dictionary<string, string>
                    {
                        { "#FN", "FirstName" },
                        { "#LN", "LastName" },
                        { "#EM", "Email" },
                        { "#PN", "PhoneNumber" },
                        { "#PW", "Password" },
                        { "#FIU", "FieldsIdUsed" },
                        { "#FIO", "FieldsIdOwned" },
                        { "#PIA", "ProductsIdArriving" },
                        { "#PIB", "ProductsIdBought" },
                        { "#PIS", "ProductsIdSelling" },

                    },
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        {":FirstName", new AttributeValue
                        {
                            S = updatedUser.FirstName
                        }},
                        {":LastName", new AttributeValue
                        {
                            S = updatedUser.LastName
                        }},
                        {":Email", new AttributeValue
                        {
                            S = updatedUser.Email
                        }},
                        {":PhoneNumber", new AttributeValue
                        {
                            S = updatedUser.PhoneNumber
                        }},
                        {":Password", new AttributeValue
                        {
                            S = updatedUser.Password
                        }},
                        {":FieldsIdUsed", new AttributeValue
                        {
                            SS = updatedUser.FieldsIdUsed
                        }},
                        {":FieldsIdOwned", new AttributeValue
                        {
                            SS = updatedUser.FieldsIdOwned
                        }},
                        {":ProductsIdArriving", new AttributeValue
                        {
                            SS = updatedUser.ProductsIdArriving
                        }},
                        {":ProductsIdBought", new AttributeValue
                        {
                            SS = updatedUser.ProductsIdBought
                        }},
                        {":ProductsIdSelling", new AttributeValue
                        {
                            SS = updatedUser.ProductsIdSelling
                        }},

                    },
                    UpdateExpression = "SET #FN = :FirstName, #LN = :LastName, #EM = :Email, #PN = :PhoneNumber, #PW = :Password, #FIU = :FieldsIdUsed, #FIO = :FieldsIdOwned, #PIA = :ProductsIdArriving, #PIB = :ProductsIdBought, #PIS = :ProductsIdSelling",
                    TableName = _tableUsers
                };

                var result = await Dynamoclient.UpdateItemAsync(request);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        } 

        public async Task DeleteUserAsync(string id)
        {
            try
            {
                var request = new DeleteItemRequest
                {
                    TableName = _tableUsers,
                    Key = new Dictionary<string, AttributeValue>()
                    {
                        { "UserId", new AttributeValue { S = id } },

                    },
                };
                var reponse = await Dynamoclient.DeleteItemAsync(request);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task DeleteFieldAsync(string id)
        {
            try
            {
                var request = new DeleteItemRequest
                {
                    TableName = _tableFields,
                    Key = new Dictionary<string, AttributeValue>()
                    {
                        { "FieldId", new AttributeValue { S = id } },

                    },
                };
                var reponse = await Dynamoclient.DeleteItemAsync(request);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task DeleteProductAsync(string id)
        {
            try
            {
                var request = new DeleteItemRequest
                {
                    TableName = _tableProducts,
                    Key = new Dictionary<string, AttributeValue>()
                    {
                        { "ProductId", new AttributeValue { S = id } },

                    },
                };
                var reponse = await Dynamoclient.DeleteItemAsync(request);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            

        }


        /* ==================================== */
        /* ========== HELPER METHODS ========== */
        /* ==================================== */


        //Recipe Mapper for DynamoDB query

        private static Users MapUser(Dictionary<string, AttributeValue> response)
        {
            return new Users
            {
                UserId = response.ContainsKey("UserId") ? response["UserId"].S : "",
                FirstName = response.ContainsKey("FirstName") ? response["FirstName"].S : "",
                LastName = response.ContainsKey("LastName") ? response["LastName"].S : "",
                Email = response.ContainsKey("Email") ? response["Email"].S : "",
                PhoneNumber = response.ContainsKey("PhoneNumber") ? response["PhoneNumber"].S : "",
                Password = response.ContainsKey("Password") ? response["Password"].S : "",
                FieldsIdUsed = response.ContainsKey("FieldsIdUsed") ? response["FieldsIdUsed"].SS : null,
                FieldsIdOwned = response.ContainsKey("FieldsIdOwned") ? response["FieldsIdOwned"].SS : null,
                ProductsIdArriving = response.ContainsKey("ProductsIdArriving") ? response["ProductsIdArriving"].SS : null,
                ProductsIdBought = response.ContainsKey("ProductsIdBought") ? response["ProductsIdBought"].SS : null,
                ProductsIdSelling = response.ContainsKey("ProductsIdSelling") ? response["ProductsIdSelling"].SS : null,

            };
        }

        private static Fields MapField(Dictionary<string, AttributeValue> response)
        {
            return new Fields
            {
                FieldId = response.ContainsKey("FieldId") ? response["FieldId"].S : "",
                PosX = response.ContainsKey("PosX") ? response["PosX"].S : "",
                PosY = response.ContainsKey("PosY") ? response["PosY"].S : "",
                ProductsList = response.ContainsKey("ProductsList") ? response["ProductsList"].SS : null,
                OwnerId = response.ContainsKey("OwnerId") ? response["OwnerId"].S : "",
                RenterId = response.ContainsKey("RenterId") ? response["RenterId"].S : "",
            };
        }

        private static Products MapProduct(Dictionary<string, AttributeValue> response)
        {
            return new Products
            {
                Name = response.ContainsKey("Name") ? response["Name"].S : "",
                ProductId = response.ContainsKey("ProductId") ? response["ProductId"].S : "",
                CultureType = response.ContainsKey("CultureType") ? response["CultureType"].S : "",
                Options = response.ContainsKey("Options") ? response["Options"].SS : null,
                StartDate = response.ContainsKey("StartDate") ? response["StartDate"].S : "",
                GrowthDuration = response.ContainsKey("GrowthDuration") ? response["GrowthDuration"].S : "",
                Price = response.ContainsKey("Price") ? float.Parse(response["Price"].N) : -1,
                Amount = response.ContainsKey("Amount") ? float.Parse(response["Amount"].N) : -1,
                TimeStamp = response.ContainsKey("TimeStamp") ? Convert.ToInt64(response["TimeStamp"].N) : -1,


            };
        }

    }
}
