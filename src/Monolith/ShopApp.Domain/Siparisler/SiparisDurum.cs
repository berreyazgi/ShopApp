namespace src.Monolith.ShopApp.Domain.Siparisler;

public enum SiparisDurum 
{
    BekleyenOdeme = 1, //default olarak index 0 dan başlamaması için
    Odenmis,
    Hazirlaniyor,
    Gönderildi,
    TeslimEdildi,
    IptalEdildi,
    IadeEdildi 
}