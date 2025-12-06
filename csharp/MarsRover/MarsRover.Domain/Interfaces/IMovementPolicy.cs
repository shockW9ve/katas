using Space.Helpers;
using Space.Models;

namespace Space.Interfaces;

public interface IMovementPolicy
{
    bool TryStep(Position from, Direction direction, out Position to);
    bool IsBlocked(Position position);
}
