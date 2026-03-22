using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CalendarApp.API.Controllers;

[Authorize]
public class BaseApiController : ControllerBase
{
    protected string? GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier);

    protected static DateTime? ToUtc(DateTime? dt) =>
    dt.HasValue ? DateTime.SpecifyKind(dt.Value, DateTimeKind.Utc) : null;
}