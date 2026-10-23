# Muqeet Mahmood — portfolio

A static personal portfolio for AI, computer vision, and software engineering projects. The current page includes project highlights, skills, experience, education, and contact links.

## Preview locally

No package installation or build step is required. From the repository root, start a local HTTP server with Python 3:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [the local preview](http://127.0.0.1:8000). Stop the server with Ctrl+C.

The page loads Tailwind CSS, Google Fonts/Material Symbols, Three.js, and a project image from external services, so an internet connection is needed for the complete appearance.

## Edit the current site

The active `index.html` contains the page markup, Tailwind configuration, custom CSS, and interaction scripts. Edit that file to change the deployed page.

| Section ID | Content |
| --- | --- |
| `prologue` | Introduction |
| `vision` | Computer vision highlight |
| `systems` | Projects and systems |
| `matrix` | Skills |
| `experience` | Experience |
| `education` | Academic background |
| `transmission` | Contact actions |

Keep navigation anchors aligned with these IDs. Contact details appear in both the markup and the `copyEmail()` helper; update both when changing the address.

The separate `style.css` and `script.js` files are not loaded by the current `index.html`. The `stitch_temp/` directory contains separate design reference pages.

## Check before publishing

- Preview desktop and phone widths; open the mobile menu and follow its links.
- Check the project tooltip, skills selector, and contact links.
- Test Copy Email on localhost or HTTPS and check the browser console for errors.
- Confirm the 3D background and scroll effects load with the external resources available.

## Hosting

Publish the repository root with a static host and use `index.html` as the entry page. Use HTTPS for the Clipboard API used by Copy Email. No server-side application or generated build directory is required.

