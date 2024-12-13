using System.Text.RegularExpressions;

namespace Day3_Part1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string input = File.ReadAllText("C:\\Dokumente\\BBB\\Lernatelier\\Lernperiode-7\\AoC_2024\\Day3\\input.txt");

            // Extract valid "mul" instructions and calculate the total sum
            int totalSum = 0;

            // Use a regular expression to find valid "mul(X,Y)" patterns
            string pattern = @"mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)";
            MatchCollection matches = Regex.Matches(input, pattern);

            foreach (Match match in matches)
            {
                int x = int.Parse(match.Groups[1].Value);
                int y = int.Parse(match.Groups[2].Value);

                totalSum += x * y;
            }

            Console.WriteLine($"Total sum of all valid multiplications: {totalSum}");
        }
    }
}
