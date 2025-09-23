#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Uso: npm run deploy:all -- 'Mensaje de commit'"
  exit 1
fi

# 1. Commit y push en el repo de juegos
git add .
git commit -m "$1"
git push

# 2. Build web y fix-paths
npm run predeploy

# 3. Deploy a gh-pages
npm run deploy

# 4. Deploy static al repo raíz
npm run deploy:static-root

echo "\n¡Deploy completo! Cambios publicados en ambos repositorios."