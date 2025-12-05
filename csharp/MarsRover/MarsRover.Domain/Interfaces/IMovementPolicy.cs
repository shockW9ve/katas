using Space.Helpers;
using Space.Models;

namespace Space.Interfaces;

public interface IMovementPolicy
{
    void TryStep(Position from, Direction direction, out Position to);
}
