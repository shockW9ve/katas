using Space.Helpers;
using Space.ValueObjects;

namespace Space.Interfaces;

public interface IMovementPolicy
{
    void TryStep(Position from, Direction direction, out Position to);
}
