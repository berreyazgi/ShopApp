using Microsoft.AspNetCore.Identity;
using ShopApp.Infrastructure.Identity;
using src.IJwtTokenGenerator.ShopApp.Application.Common.Interfaces;
using src.Monolith.ShopApp.Application.Auth;
using src.Monolith.ShopApp.Application.Common.Interfaces;
using src.Monolith.ShopApp.Application.Common.Models;

namespace ShopApp.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole<Guid>> roleManager,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userManager      = userManager;
        _roleManager      = roleManager;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

//login logic flow 
    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        //Find user by email using UserManager.FindByEmailAsync
       var user=await _userManager.FindByEmailAsync(request.Email);
       if(user==null)
       {
        throw new InvalidOperationException("User not found");
       }
       //check password using UserManager.CheckPasswordAsync
       var result=await _userManager.CheckPasswordAsync(user,request.Sifre);
       if(!result)
       {
        throw new InvalidOperationException("Invalid password");
       }
       //generate token using IJwtTokenGenerator.GenerateToken
       var token=_jwtTokenGenerator.GenerateToken(user.Id.ToString(),user.Email!,request.Sifre);

       //return the AuthResponse
       return new AuthResponse
       {
        Token=token,
        Email=user.Email!,
        Ad=user.Ad,
        Soyad=user.Soyad,
        Role=user.Role
       };
    }

//register logic flow kısmı
    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        // Kullanıcı var mı?
        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
            throw new InvalidOperationException("User with this email already exists.");

        // Yeni kullanıcı oluştur
        var newUser = new ApplicationUser
        {
            UserName         = request.Email,
            Email            = request.Email,
            Ad               = request.Ad,
            Soyad            = request.Soyad,
            durum            = "Active",
            OlusturmaTarihi  = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),
            GuncellemeTarihi = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss")
        };

        //Call UserManager.CreateAsync(user, password)
        var result = await _userManager.CreateAsync(newUser, request.Sifre);
        if (!result.Succeeded)
            throw new InvalidOperationException("Failed to create user.");

        
    

//4. If roles exist (e.g. `"Customer"`), assign them with `UserManager.AddToRoleAsync`
        var roles = new List<string> { "Musteri" }; // Varsayılan olarak "Musteri" rolü
        await _userManager.AddToRolesAsync(newUser, roles);

 //5. Generate a token with `IJwtTokenGenerator.GenerateToken`
        var token = _jwtTokenGenerator.GenerateToken(
            newUser.Id.ToString(),
            newUser.Email!,
            roles);

 //6. Return the `AuthResponse`
        return new AuthResponse
        {
            Token = token,
            Email = newUser.Email!,
            Ad    = newUser.Ad,
            Soyad = newUser.Soyad,
            Role  = roles
        };
    }
}
