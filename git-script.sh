#!/bin/bash
# Get own token
# https://github.com/settings/tokens

clear

# Remove git
#rm -rf .git/
#rm .gitignore

# Ignore vscode dir
#echo .vscode/ >> .gitignore
#echo .gitignore >> .gitignore
#echo .gitignore >> /.pnp
#echo .gitignore >> .pnp.js
#echo .gitignore >> /coverage
#echo .gitignore >> /build
#echo .gitignore >> .DS_Store
#echo .gitignore >> .env.local
#echo .gitignore >> .env.development.local
#echo .gitignore >> .env.test.local
#echo .gitignore >> .env.production.local
#echo .gitignore >> npm-debug.log*
#echo .gitignore >> yarn-debug.log*
#echo .gitignore >> yarn-error.log*
echo .gitignore >> /node_modules
echo .gitignore >> !backup_project
echo .gitignore >> git-script

# Get current folder name (repository name)
REPO_NAME=${PWD##*/}
LOGIN=OlgaPavlenko
TOKEN=089134032864ba882a38e9bf891eb40415af8a09
JSON='{"name":"'$REPO_NAME'"}'

# Delete repository:
curl -X DELETE -H "Authorization: token $TOKEN" https://api.github.com/repos/$LOGIN/$REPO_NAME

# Create new repository:
curl -u $LOGIN:$TOKEN https://api.github.com/user/repos -H "Content-Type:application/json" -d $JSON

# Create readme file
# touch README.md
# https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

# Create local repository and upload to github
git init
git add .
git commit -m "Created repository - ${REPO_NAME}"
git remote add origin https://github.com/${LOGIN}/${REPO_NAME}.git
git branch -M main
git push -u origin main

# Deploy on gh-pages (gh-pages -d build)
#npm run build -prod
npm run deploy

