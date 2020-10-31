# Front-end project template.

前面工程模板, 集成 Next.js(9.x) 和 Antd (4.x) less.

可以配合后端[工程模板](https://github.com/espring/fullstack-frontend)使用

参考: [Next.js官网 9.x](https://nextjs.org/docs/getting-started) [Antd官网 4.x](https://ant.design/components/overview-cn/)

## Quick start

```
git clone https://github.com/espring/fullstack-backend myproj
```

删除模板工程的.git, 重新初始.
```
cd myproj
rm -rf ./.git

git init
```

安装
```
npm i 
```

环境变量配置, 将.env_example 改名 .env
```
APIV1=http://127.0.0.1:9001/
API_TOKEN=token01
PORT=9002
```

APIV1 是后端接口, API_TOKEN是以token方式访问, 参考[后端工程模板](https://github.com/espring/fullstack-backtend)


## 部署

使用pm2进行部署, 请先阅读[pm2官网](https://pm2.keymetrics.io/docs/usage/deployment/)

```
npm i pm2 -g
```

第一次需要修改配置文件 ecosystem.prod.config.js 和 deploy.prod.config.js.

可以在ecosystem.prod.config.js 中配置运行期的环境变量, 也可以在 deploy.prod.config.js, 建议在deploy.prod.config.js中配置, 并且 deploy.prod.config.js保留在本地, 不要再上传至git.

deploy.prod.config.js 内容说明
```
module.exports = {
  deploy : {
    production : {
      user : 'user-name',
      host : ['127.0.0.1'],
      ref  : 'origin/main',
      repo : 'https://github.com/espring/fullstack-frontend',
      path : '/app/front-end',
      'post-setup': 'npm install',
      'pre-deploy': 'git fetch --all && git reset --hard origin/main',
      'post-deploy' : 'npm install && npm run build && pm2 restart ecosystem.prod.config.js --env production',
      env: {
        NODE_ENV: 'production',
        APIV1: 'http://127.0.0.1:9001/',
        API_TOKEN: 'token',
        PORT:9002
      }
    }
  }
}

```
  * user 和 host, 是通过ssh可访问的服务器及用户.
  * ref: 是git分支. repo是git仓库
  * path: 是服务器上配置的目录名, 注意需要事先创建, 并且设置可访问权限.
  * pre-deploy: 在服务器运行的更新代码的命令, 因为服务器端也会修改代码, 所以需要强制更新为git repo最新代码.
  * env 是定义运行期的环境变量,  会自动带到post-deploy命令中.

第一次部署需要先调用pm2 setup
```
pm2 deploy deploy.prod.config.js production setup
```

之后每次部署, 先将代码提供到git repo的指定分支上.
```
pm2 deploy deploy.prod.config.js production
```

建议: 创建一个分支用于发布.

## 说明

Next.js工程中引入antd:
  * next.config.js 中以less 方式配置 webpack相关项.
  * .babelrc 中import antd, 引入less需要设置style = true, 
  * 只支持less, 不能同时支持css.
  * assets/custom-less/antd-custom.less 中定义antd相关的less变量.
  
js内css 使用的是 styled-jsx
  * styled-jsx 定义类无法直接用在antd的component上. 
  * 如果要修改antd component的style, 需要定义在less文件中.
  
使用swr, 尽量避免引入redux
  




