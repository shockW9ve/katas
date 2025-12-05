using Space.Helpers;

namespace Space.Models;

public class MarsRover
{
    public Direction Heading { get; private set; } = Direction.North;
    public readonly Position Position { get; private set; }

    public MarsRover(int x, int y)
    {
        Position = new Position(x, y);
    }

    public string Report()
    {
        return $"{_position.x} {_position.y} {Heading}";
    }

    public void TurnRight()
    {
        switch (Heading)
        {
            case Direction.North:
                Heading = Direction.East;
                break;
            case Direction.East:
                Heading = Direction.South;
                break;
            case Direction.South:
                Heading = Direction.West;
                break;
            case Direction.West:
                Heading = Direction.North;
                break;
            default:
                throw new ArgumentException("Use a compass to move");
        }
    }

    public void TurnLeft()
    {
        switch (Heading)
        {
            case Direction.North:
                Heading = Direction.West;
                break;
            case Direction.East:
                Heading = Direction.North;
                break;
            case Direction.South:
                Heading = Direction.East;
                break;
            case Direction.West:
                Heading = Direction.South;
                break;
            default:
                throw new ArgumentException("Use a compass to move");
        }
    }

    public void MoveForward()
    {
        switch (Heading)
        {
            case Direction.North:
                _position.y++;
                break;
            case Direction.East:
                _position.x++;
                break;
            case Direction.South:
                _position.y--;
                break;
            case Direction.West:
                _position.x--;
                break;
            default:
                throw new ArgumentException("Use a compass to move");
        }
    }
    //     public void Turn(string turn)
    //     {
    //         if (turn is null)
    //         {
    //             throw new ArgumentException("Invalid input");
    //         }
    //
    //         foreach (char c in turn.ToUpper())
    //         {
    //             if (c.Equals('M'))
    //             {
    //                 Move();
    //                 continue;
    //             }
    //
    //             switch (Compas)
    //             {
    //                 case Direction.North:
    //                     if (c.Equals('L'))
    //                     {
    //                         Compas = Direction.West;
    //                     }
    //                     else
    //                     {
    //                         Compas = Direction.East;
    //                     }
    //                     break;
    //
    //                 case Direction.East:
    //                     if (c.Equals('L'))
    //                     {
    //                         Compas = Direction.North;
    //                     }
    //                     else
    //                     {
    //                         Compas = Direction.South;
    //                     }
    //                     break;
    //
    //                 case Direction.South:
    //                     if (c.Equals('L'))
    //                     {
    //                         Compas = Direction.East;
    //                     }
    //                     else
    //                     {
    //                         Compas = Direction.West;
    //                     }
    //                     break;
    //
    //                 case Direction.West:
    //                     if (c.Equals('L'))
    //                     {
    //                         Compas = Direction.South;
    //                     }
    //                     else
    //                     {
    //                         Compas = Direction.North;
    //                     }
    //                     break;
    //
    //                 default:
    //                     Console.WriteLine("Wrong direction input");
    //                     break;
    //             }
    //         }
    //     }
    //
    //     public void Move()
    //     {
    //         if (Compas is Direction.North)
    //         {
    //             Y_Position++;
    //         }
    //
    //         if (Compas is Direction.East)
    //         {
    //             X_Position++;
    //         }
    //
    //         if (Compas is Direction.South)
    //         {
    //             Y_Position--;
    //         }
    //
    //         if (Compas is Direction.West)
    //         {
    //             X_Position--;
    //         }
    //     }
}

