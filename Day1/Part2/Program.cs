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
            var count2 = new Dictionary<int, int>();
            string line;
            while ((line = Console.ReadLine()) != null && !string.IsNullOrWhiteSpace(line))
            {
                var parts = line.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length == 2 &&
                    int.TryParse(parts[0], out var number1) &&
                    int.TryParse(parts[1], out var number2))
                {
                    list1.Add(number1);
                    if (count2.ContainsKey(number2))
                    {
                        count2[number2]++;
                    }
                    else
                    {
                        count2[number2] = 1;
                    }
                }
            }

            var total = list1.Sum(num => num * (count2.ContainsKey(num) ? count2[num] : 0));
            Console.WriteLine(total);
        }
    }
}
