using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Dtos.SiparisDtos;
using ShopApp.Application.Dtos.SiparisUrunleriDto;
using ShopApp.Application.Services.SiparisServices;
using ShopApp.Application.Services.SiparisUrunServices;

namespace src.Monolith.ShopApp.Api.Controller;

[ApiController]
[Route("api/siparis")]
public sealed class SiparisController : ControllerBase
{
    private readonly ISiparisService _siparisService;
    private readonly ISiparisUrunService _siparisUrunService;

    public SiparisController(ISiparisService siparisService, ISiparisUrunService siparisUrunService)
    {
        _siparisService = siparisService;
        _siparisUrunService = siparisUrunService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ResultSiparisDto>>> GetAll()
        => Ok(await _siparisService.GetAllSiparisAsync());

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ResultSiparisDto>> GetById(Guid id)
    {
        try
        {
            return Ok(await _siparisService.GetSiparisByIdAsync(id));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSiparisDto dto)
    {
        var id = await _siparisService.CreateSiparisAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSiparisDto dto)
    {
        if (dto.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki sipariş kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            await _siparisService.UpdateSiparisAsync(dto with { Id = id });
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _siparisService.DeleteSiparisAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{siparisId:guid}/urunler")]
    public async Task<ActionResult<List<ResultSiparisUrunleriDto>>> GetUrunler(Guid siparisId)
    {
        try
        {
            return Ok(await _siparisUrunService.GetBySiparisIdAsync(siparisId));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{siparisId:guid}/urunler/{urunId:guid}")]
    public async Task<ActionResult<ResultSiparisUrunleriDto>> GetUrunById(Guid siparisId, Guid urunId)
    {
        try
        {
            return Ok(await _siparisUrunService.GetByIdAsync(siparisId, urunId));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost("{siparisId:guid}/urunler")]
    public async Task<IActionResult> CreateUrun(Guid siparisId, [FromBody] CreateSiparisUrunleriDto dto)
    {
        if (dto.SiparisId != siparisId)
            return BadRequest(new { message = "İstek gövdesindeki sipariş kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            var id = await _siparisUrunService.CreateSiparisUrunAsync(siparisId, dto with { SiparisId = siparisId });
            return CreatedAtAction(nameof(GetUrunById), new { siparisId, urunId = id }, new { id });
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPut("{siparisId:guid}/urunler/{urunId:guid}")]
    public async Task<IActionResult> UpdateUrun(Guid siparisId, Guid urunId, [FromBody] UpdateSiparisUrunleriDto dto)
    {
        if (dto.Id != urunId || dto.SiparisId != siparisId)
            return BadRequest(new { message = "İstek gövdesindeki ürün veya sipariş kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            await _siparisUrunService.UpdateSiparisUrunAsync(siparisId, dto with { Id = urunId, SiparisId = siparisId });
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpDelete("{siparisId:guid}/urunler/{urunId:guid}")]
    public async Task<IActionResult> DeleteUrun(Guid siparisId, Guid urunId)
    {
        try
        {
            await _siparisUrunService.DeleteSiparisUrunAsync(siparisId, urunId);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}
