# System-Wyszukiwania-Prowadzacych
29.06:
weryfikacja google nie zwraca tokena dostępu :(
[![.github/workflows/build.yml](https://github.com/serwus701/System-Wyszukiwania-Prowadzacych/actions/workflows/build.yml/badge.svg)](https://github.com/serwus701/System-Wyszukiwania-Prowadzacych/actions/workflows/build.yml)

## Budowanie
```
docker compose up
```

## Wdrażanie aplikacji w realnym środowisku
Podczas wdrażania aplikacji należy zmienić klucze dostępu zawarte w server/settings.json. Narazie używane są klucze prywatne studentów :). Następnie należy podmienić adresy URL używane do proxy, na pożądane w server/server/settings.py [CORS_ALLOWED_ORIGINS] [CORS_ALLOWED_WHITELIST].
