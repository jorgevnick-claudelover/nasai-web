# NASAI · Açaí & Specialty Coffee — Web

Web de una sola página (bilingüe ES/EN) para NASAI, hecha con HTML, CSS y JavaScript puros. Sin frameworks ni build: se despliega tal cual en Vercel.

## Estructura

```
nasai web/
├── index.html        · toda la página
├── css/styles.css    · estilos (colores, tipografía, responsive)
├── js/main.js        · idioma ES/EN, menú móvil, horario, galería
├── img/              · imágenes optimizadas para la web
├── README.md
└── .gitignore        · excluye las capturas originales del repositorio
```

Las capturas originales (`Captura de pantalla…`, `carta…`, `uber eats…`, etc.) siguen en la carpeta pero **no se suben** a GitHub gracias a `.gitignore`. Las fotos que usa la web ya están copiadas y optimizadas dentro de `img/`.

## Ver la web en tu ordenador

Abre `index.html` con doble clic. Para que el mapa y las fuentes carguen igual que en producción, mejor con un servidor local:

```bash
cd "nasai web"
python3 -m http.server 8000
# abre http://localhost:8000
```

## Publicar: GitHub → Vercel

**1. Subir a GitHub**
- Crea un repositorio nuevo en https://github.com/new (por ejemplo `nasai-web`).
- Sube la carpeta. Con GitHub Desktop: *Add local repository* → elige esta carpeta → *Publish*. O por terminal:

```bash
cd "nasai web"
git init
git add .
git commit -m "Web NASAI"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/nasai-web.git
git push -u origin main
```

**2. Desplegar en Vercel**
- Entra en https://vercel.com con tu cuenta de GitHub.
- *Add New… → Project* → importa el repositorio `nasai-web`.
- Framework Preset: **Other** (es estático). No hace falta *build command* ni *output directory*.
- *Deploy*. En unos segundos tendrás una URL `…vercel.app`.

Cada vez que hagas `git push`, Vercel actualiza la web sola.

**3. Dominio propio (opcional)**
- En Vercel: *Project → Settings → Domains* → añade tu dominio y sigue los pasos de DNS.

## Editar contenido

- **Carta y precios:** en `index.html`, sección `<!-- CARTA -->`. Cada texto tiene dos versiones: `data-es="…"` (español) y `data-en="…"`. Cambia las dos para mantener el bilingüe.
- **Horario:** en `index.html`, tabla `id="hoursTable"`, y los mismos horarios en `js/main.js` (objeto `schedule`, en minutos desde medianoche) para que el cartel de “Abierto/Cerrado” sea correcto.
- **Enlaces (Instagram, Maps, Uber Eats, teléfono):** busca las URLs en `index.html`; aparecen en la cabecera, el hero, la sección “Nos vemos en NASAI” y el pie.
- **Fotos:** sustituye los archivos dentro de `img/` manteniendo el mismo nombre.

## Datos usados

- Dirección: Carrer del Músic Padilla, 2 · 46005 València
- Teléfono: 961 46 40 21 (enlace `tel:+34961464021`)
- Instagram: https://www.instagram.com/nasai___/
- Google Maps: https://maps.app.goo.gl/KGhSkRRMwUVXgosRA
- Uber Eats: https://www.ubereats.com/es/store/nasai-acai/1jHlIJSFUn2y9zw0Q5KOKA
