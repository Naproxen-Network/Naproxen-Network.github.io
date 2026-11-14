# Bingqiao Gu — Academic Homepage

Bilingual React / TypeScript academic homepage: https://naproxen-network.github.io/

Source is in `website/`. The root contains the production build for GitHub Pages (main branch, root directory).

## Update

```sh
cd website
npm ci
npm run build
cd ..
python3 scripts/publish-build.py
```

Commit and push the updated source and root build together. Paper links point to publisher pages; no paper PDF originals are included.
