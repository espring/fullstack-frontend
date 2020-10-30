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

