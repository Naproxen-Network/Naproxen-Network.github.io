from pathlib import Path
import shutil
root = Path(__file__).resolve().parents[1]
build = root / "website" / "dist"
assert (build / "index.html").is_file(), "Run npm run build in website first"
assert all(p.relative_to(build).as_posix() == "hyholic/main.pdf" for p in build.rglob("*") if p.suffix.lower() == ".pdf"), "Only the explicitly authorized HYHOLIC PDF may be published"
for name in ["assets", "fonts", "images", "papers"]:
    p = root / name
    if p.exists(): shutil.rmtree(p)
for p in build.iterdir():
    if p.is_dir(): shutil.copytree(p, root / p.name, dirs_exist_ok=True)
    else: shutil.copy2(p, root / p.name)
(root / ".nojekyll").touch()
