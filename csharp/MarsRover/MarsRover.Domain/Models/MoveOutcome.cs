using Space.Helpers;

namespace Space.Models;

public class MoveOutcome
{
    public MoveStatus Status { get; }
    public Position? BlockedAt { get; }
}
