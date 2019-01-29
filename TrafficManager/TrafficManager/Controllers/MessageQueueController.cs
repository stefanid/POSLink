using TrafficManager.Models;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrafficManager.Controllers
{
    public class MessageQueueController
    {
        private ConnectionFactory _factory;
        private HeaderDataController _headercontroller;

        public MessageQueueController()
        {
            _headercontroller = new HeaderDataController();
            _factory = new ConnectionFactory() { HostName = "localhost", RequestedHeartbeat = 30 };
        }

        public void checkQueue()
        {
            List<string> headers = new List<string>();
            using (var connection = _factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    var messageCount = channel.MessageCount("TrafficManager");

                    channel.QueueDeclare(queue: "TrafficManager", durable: true, exclusive: false, autoDelete: false, arguments: null);
                    var consumer = new QueueingBasicConsumer(channel);
                    const bool autoAck = false;
                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true;
                    channel.BasicConsume(queue: "TrafficManager", autoAck: autoAck, consumer: consumer);
                    Console.WriteLine("---Waiting for messages---");

                    while (true)
                    {
                        var ea = (BasicDeliverEventArgs)consumer.Queue.Dequeue();
                        var body = ea.Body;
                        var Header_UID = Encoding.UTF8.GetString(body);
                        headers.Add(Header_UID);
                        Console.WriteLine("---Message recieved---\n" + Header_UID);
                        if (headers.Count == messageCount)
                        {
                            Console.WriteLine("---Finding distinct UIDs---");
                            byte[] bodyToSend = null;
                            var ifTypes = _headercontroller.getHeaderData(Header_UID);
                            if (ifTypes)
                            {
                                var Client_UID = _headercontroller.getClient(Header_UID);
                                if (Client_UID != null)
                                {
                                    var typeID = _headercontroller.getTypes(Client_UID);
                                    if (typeID != 0)
                                    {
                                        switch (typeID)
                                        {
                                            case 100:
                                                Console.WriteLine("-- Queueing Financial 100 - Billy --");
                                                bodyToSend = Encoding.UTF8.GetBytes(Header_UID);
                                                channel.QueueDeclare(queue: "BillyQueue", durable: true, exclusive: false, autoDelete: false, arguments: null);
                                                channel.BasicPublish(exchange: "", routingKey: "BillyQueue", basicProperties: properties, body: bodyToSend);
                                                Console.WriteLine("-- Queueing finished --");
                                                break;
                                            case 200:
                                                Console.WriteLine("-- Queueing Financial 200 - Dinero --");
                                                bodyToSend = Encoding.UTF8.GetBytes(Header_UID);
                                                channel.QueueDeclare(queue: "DineroQueue", durable: true, exclusive: false, autoDelete: false, arguments: null);
                                                channel.BasicPublish(exchange: "", routingKey: "DineroQueue", basicProperties: properties, body: bodyToSend);
                                                Console.WriteLine("-- Queueing finished --");
                                                break;
                                            case 300:
                                                Console.WriteLine("-- Queueing Financial 200 - eConomic --");
                                                bodyToSend = Encoding.UTF8.GetBytes(Header_UID);
                                                channel.QueueDeclare(queue: "eConomicQueue", durable: true, exclusive: false, autoDelete: false, arguments: null);
                                                channel.BasicPublish(exchange: "", routingKey: "eConomicQueue", basicProperties: properties, body: bodyToSend);
                                                Console.WriteLine("-- Queueing finished --");
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                        channel.BasicAck(ea.DeliveryTag, false);
                    }
                }
            }
        }
    }
}
