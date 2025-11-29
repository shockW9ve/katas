namespace Space.Models;


public class Obstacle
{
    public int XCoordinate { get; set; }
    public int YCoordinate { get; set; }

    public Obstacle(int row, int col)
    {
        YCoordinate = row;
        XCoordinate = col;
    }
}
