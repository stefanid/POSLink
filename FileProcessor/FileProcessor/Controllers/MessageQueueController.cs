using DatabaseComponent.Models;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileProcessor.Controllers
{
    public class MessageQueueController
    {

        private ConnectionFactory _factory;
        private HeaderDataController _headercontroller;

        public MessageQueueController()
        {
            _headercontroller = new HeaderDataController();
            //RequestHeartbeat - handles a case in which a message is taken by a consumer bu the connection dies before it gets acknowledged. 
            //Also checks if the connection is still up, which is very important. 
            _factory = new ConnectionFactory() { HostName = "localhost", RequestedHeartbeat = 30 };
        }

        public void checkQueue()
        {
            using (var connection = _factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "FileQueue", durable: true, exclusive: false, autoDelete: false, arguments: null);
                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true;
                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += (model, ea) =>
                    {
                        var body = ea.Body;
                        var File_UID = Encoding.UTF8.GetString(body);
                        Console.WriteLine("File UID recieved " + File_UID);
                        Console.WriteLine("--File processing begins--");
                        var Header_UID = _headercontroller.getFile(File_UID);
                        if(Header_UID != null)
                        {
                           var bodyToSend = Encoding.UTF8.GetBytes(Header_UID);
                            channel.QueueDeclare(queue: "TrafficManager", durable: true, exclusive: false, autoDelete: false, arguments: null);
                            channel.BasicPublish(exchange: "", routingKey: "TrafficManager", basicProperties: null, body: bodyToSend);
                            Console.WriteLine("Header_UID " + Header_UID + " is queued");

                        }
                        
                    };
                    channel.BasicConsume(queue: "FileQueue", autoAck: true, consumer: consumer);

                    Console.WriteLine(" Press [enter] to exit.");
                    Console.ReadLine();
                }
            }
        }
    }

}

