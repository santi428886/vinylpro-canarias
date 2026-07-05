# Texturas del catálogo

El catálogo **no usa fotografías**. Cada producto muestra una textura CSS
controlada según su tipo de suelo vinílico.

## Archivos

| Archivo | Qué editar |
|---------|------------|
| `src/data/floor-images.ts` | Asignación producto → categoría de textura |
| `src/components/ui/floor-texture-styles.ts` | Colores y patrones CSS por categoría |

## Categorías

Roble claro/medio/oscuro · Gris claro/medio/oscuro · Espiga clara/oscura ·
Piedra beige/gris · Hormigón claro/oscuro · Nogal · Blanco nórdico · Negro premium

## Fotos reales (futuro)

Cuando tengas fotos de fabricante, copia a esta carpeta y adapta
`textureToken()` + `FloorImage.tsx` para servir archivos locales.
