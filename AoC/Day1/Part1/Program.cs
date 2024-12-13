using System;
using System.Collections.Generic;
using System.Linq;

namespace AoC_Day1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var list1 = new List<int>();
            var list2 = new List<int>();

            string line;
            while ((line = Console.ReadLine()) != null && !string.IsNullOrWhiteSpace(line))
            {
                var parts = line.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length == 2 &&
                    int.TryParse(parts[0], out var number1) &&
                    int.TryParse(parts[1], out var number2))
                {
                    list1.Add(number1);
                    list2.Add(number2);
                }
            }

            list1.Sort();
            list2.Sort();

            int totalDiff = list1.Zip(list2, (a, b) => Math.Abs(a - b)).Sum();

            Console.WriteLine(totalDiff);
        }
    }
}
