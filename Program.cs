namespace Day2_Part1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string input = File.ReadAllText("C:\\Dokumente\\BBB\\Lernatelier\\Lernperiode-7\\AoC_2024\\Day2\\input.txt");

            string[] levels = input.Split("\n", StringSplitOptions.RemoveEmptyEntries);

            int safeCount = 0;

            foreach (var line in levels)
            {
                string[] values = line.Split(" ", StringSplitOptions.RemoveEmptyEntries);
                int[] numbers = Array.ConvertAll(values, int.Parse);

                if (IsSafe(numbers))
                {
                    safeCount++;
                }
            }

            Console.WriteLine($"Number of safe reports: {safeCount}");
        }

        static bool IsSafe(int[] levels)
        {
            bool isIncreasing = true;
            bool isDecreasing = true;

            for (int i = 1; i < levels.Length; i++)
            {
                int diff = levels[i] - levels[i - 1];

                // Check the difference is within the valid range
                if (Math.Abs(diff) < 1 || Math.Abs(diff) > 3)
                {
                    return false;
                }

                // Check increasing or decreasing
                if (diff < 0)
                {
                    isIncreasing = false;
                }
                else if (diff > 0)
                {
                    isDecreasing = false;
                }   
            }

            // Must be either strictly increasing or strictly decreasing
            return isIncreasing || isDecreasing;
        }
    }
}
