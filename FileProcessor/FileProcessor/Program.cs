using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using DatabaseComponent.Models;
using FileProcessor.Controllers;

namespace FileProcessor
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("---File Processor initiated---");
            MessageQueueController messageQueueController = new MessageQueueController();
            messageQueueController.checkQueue();
        }
    }
}
