using System.Text.RegularExpressions;

namespace Day3_Part1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string input = File.ReadAllText("C:\\Dokumente\\BBB\\Lernatelier\\Lernperiode-7\\AoC_2024\\Day3\\input.txt");

            int totalSum = 0;
            bool isEnabled = true; // Mul instructions start enabled

            // Use a regular expression to find valid patterns
            string pattern = @"(mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\))|don't\(\)|do\(\)";
            MatchCollection matches = Regex.Matches(input, pattern);

            foreach (Match match in matches)
            {
                if (match.Value.StartsWith("don't"))
                {
                    isEnabled = false; // Disable future mul instructions
                }
                else if (match.Value.StartsWith("do"))
                {
                    isEnabled = true; // Enable future mul instructions
                }
                else if (match.Value.StartsWith("mul") && isEnabled)
                {
                    // Extract numbers and calculate the product
                    int x = int.Parse(match.Groups[2].Value);
                    int y = int.Parse(match.Groups[3].Value);

                    totalSum += x * y;
                }
            }

            Console.WriteLine($"Total sum of all enabled multiplications: {totalSum}");
        }
    }
}
