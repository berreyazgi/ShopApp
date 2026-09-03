using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Dtos.SepetDtos;
using ShopApp.Application.Dtos.SepetUrunDtos;
using ShopApp.Application.Services.SepetServices;
using ShopApp.Application.Services.SepetUrunleri;

namespace src.Monolith.ShopApp.Api.Controller;

[ApiController]
[Route("api/sepet")]
public sealed class SepetController : ControllerBase
{
    private readonly ISepetService _sepetService;
    private readonly ISepetUrunService _sepetUrunService;

    public SepetController(ISepetService sepetService, ISepetUrunService sepetUrunService)
    {
        _sepetService = sepetService;
        _sepetUrunService = sepetUrunService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ResultSepetDto>>> GetAll()
        => Ok(await _sepetService.GetAllSepetAsync());

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ResultSepetDto>> GetById(Guid id)
    {
        try
        {
            return Ok(await _sepetService.GetSepetByIdAsync(id));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSepetDto dto)
    {
        var id = await _sepetService.CreateSepetAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSepetDto dto)
    {
        if (dto.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki sepet kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            await _sepetService.UpdateSepetAsync(dto with { Id = id });
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
            await _sepetService.DeleteSepetAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{sepetId:guid}/urunler")]
    public async Task<ActionResult<List<ResultSepetUrunDto>>> GetUrunler(Guid sepetId)
    {
        try
        {
            return Ok(await _sepetUrunService.GetBySepetIdAsync(sepetId));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{sepetId:guid}/urunler/{urunId:guid}")]
    public async Task<ActionResult<ResultSepetUrunDto>> GetUrunById(Guid sepetId, Guid urunId)
    {
        try
        {
            return Ok(await _sepetUrunService.GetByIdAsync(sepetId, urunId));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost("{sepetId:guid}/urunler")]
    public async Task<IActionResult> CreateUrun(Guid sepetId, [FromBody] CreateSepetUrunDto dto)
    {
        if (dto.SepetId != sepetId)
            return BadRequest(new { message = "İstek gövdesindeki sepet kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            var id = await _sepetUrunService.CreateSepetUrunAsync(sepetId, dto with { SepetId = sepetId });
            return CreatedAtAction(nameof(GetUrunById), new { sepetId, urunId = id }, new { id });
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPut("{sepetId:guid}/urunler/{urunId:guid}")]
    public async Task<IActionResult> UpdateUrun(Guid sepetId, Guid urunId, [FromBody] UpdateSepetUrunDto dto)
    {
        if (dto.Id != urunId || dto.SepetId != sepetId)
            return BadRequest(new { message = "İstek gövdesindeki ürün veya sepet kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            await _sepetUrunService.UpdateSepetUrunAsync(sepetId, dto with { Id = urunId, SepetId = sepetId });
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpDelete("{sepetId:guid}/urunler/{urunId:guid}")]
    public async Task<IActionResult> DeleteUrun(Guid sepetId, Guid urunId)
    {
        try
        {
            await _sepetUrunService.DeleteSepetUrunAsync(sepetId, urunId);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}
