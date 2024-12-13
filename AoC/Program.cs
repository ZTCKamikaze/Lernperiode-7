using System;
using System.IO;

namespace Day4_Part1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string input = File.ReadAllText("C:\\Dokumente\\BBB\\Lernatelier\\Lernperiode-7\\AoC_2024\\Day4\\input.txt");
            string[] wordSearch = input.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);

            string targetWord = "XMAS";
            int count = CountOccurrences(wordSearch, targetWord);

            Console.WriteLine($"The word '{targetWord}' appears {count} times.");
        }

        static int CountOccurrences(string[] grid, string word)
        {
            int rows = grid.Length;
            int cols = grid[0].Length;
            int wordLength = word.Length;
            int count = 0;

            // Directions: right, left, down, up, diag-right-down, diag-left-up, diag-right-up, diag-left-down
            int[] dx = { 0, 0, 1, -1, 1, -1, 1, -1 };
            int[] dy = { 1, -1, 0, 0, 1, -1, -1, 1 };

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    for (int d = 0; d < 8; d++) // Iterate over all directions
                    {
                        if (IsWordPresent(grid, word, i, j, dx[d], dy[d]))
                        {
                            count++;
                        }
                    }
                }
            }

            return count;
        }

        static bool IsWordPresent(string[] grid, string word, int x, int y, int dx, int dy)
        {
            int rows = grid.Length;
            int cols = grid[0].Length;
            int wordLength = word.Length;

            for (int k = 0; k < wordLength; k++)
            {
                int newX = x + k * dx;
                int newY = y + k * dy;

                if (newX < 0 || newX >= rows || newY < 0 || newY >= cols || grid[newX][newY] != word[k])
                {
                    return false;
                }
            }

            return true;
        }
    }
}
