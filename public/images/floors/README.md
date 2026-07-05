# Imágenes de suelos — VinylPro Canarias

Las imágenes del **catálogo de productos** se gestionan en código:

```
src/data/floor-images.ts → VINYL_FLOOR_LIBRARY
```

## Cómo cambiar imágenes del catálogo

1. Abre `src/data/floor-images.ts`
2. Localiza la categoría (ej. `roble-claro`, `espiga-oscura`, `nogal`)
3. Sustituye la URL en el rol correspondiente:
   - `texture` — primer plano de lamas PVC
   - `installed` — suelo instalado en interior
   - `detail` — detalle de color y veta
   - `room` — estancia recomendada

## Imágenes locales (opcional)

Esta carpeta está preparada para fotos de fabricante en el futuro.
Si copias archivos aquí, añade la ruta en `VINYL_FLOOR_LIBRARY` y
configura el dominio en `next.config.ts` si es necesario.

## Reglas

- Solo suelos vinílicos / PVC / laminado
- Nunca casas exteriores, agua, plástico ni decoración sin suelo visible
- La imagen del hero de la home no se usa en el catálogo
