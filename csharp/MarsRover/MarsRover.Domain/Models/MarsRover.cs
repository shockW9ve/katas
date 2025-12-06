using Space.Helpers;

namespace Space.Models;

public class MarsRover
{
    public Direction Heading { get; private set; } = Direction.North;
    public Position Position { get; private set; }
    public MoveStatus Status { get; private set; }

    public MarsRover(int x, int y)
    {
        Position = new Position(x, y);
    }

    public string Report()
    {
        return $"{Position.X} {Position.Y} {Heading}";
    }

    public void TurnRight()
    {
        Heading = DirectionExtension.RotateRight(Heading);
    }

    public void TurnLeft()
    {
        Heading = DirectionExtension.RotateLeft(Heading);
    }

    public void MoveForward(Position position)
    {
        var (dx, dy) = DirectionVectors.Delta(Heading);
        Position = Position with { X = Position.X + dx, Y = Position.Y + dy };
    }

    public void RoverStatus(MoveStatus status)
    {
        Status = status;
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

