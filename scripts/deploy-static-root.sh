#!/bin/bash
set -e

# Ruta al repo raíz de GitHub Pages (ajusta si lo tienes en otro lado)
ROOT_REPO="../enocmadrigal.github.io"

# Clona el repo si no existe
if [ ! -d "$ROOT_REPO" ]; then
  git clone https://github.com/enocmadrigal/enocmadrigal.github.io.git "$ROOT_REPO"
fi

# Copia la carpeta static
rm -rf "$ROOT_REPO/static"
cp -R ./web-build/static "$ROOT_REPO/static"

cd "$ROOT_REPO"
git add static
git commit -m "Update static assets from Ludoteca App" || echo "No changes to commit."
git push
echo "Static assets deployed to enocmadrigal.github.io/static/"