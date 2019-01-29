using TrafficManager.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrafficManager
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("---Traffic Manager initiated---");
            MessageQueueController messageQueueController = new MessageQueueController();
            messageQueueController.checkQueue();
        }
    }
}
