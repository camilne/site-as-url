ng build --prod
git add dist/
git commit -m "Update dist"
git subtree push --prefix dist origin gh-pages
