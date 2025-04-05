
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态资源
npm run docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

# 添加CNAME，链接到自定义域名
echo 'blog.aaronkong.top' > CNAME

# 提交构建后的页面到github
git init
git add -A
git commit -m 'deploy'

git config --local user.name "kongyajie"
git config --local user.email "308522505@qq.com"

# 直接提交并覆盖
# git push -f https://github.com/kongyajie/kongyajie.github.io.git master

# 使用 travis 持续集成
git push -f https://${access_token}@github.com/kongyajie/kongyajie.github.io.git master