module.exports = {
  apps: [
    {
      name: 'usflashfeed',
      cwd: '/var/www/usflashfeed',
      script: '.next/standalone/server.js',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3004,
        HOSTNAME: '127.0.0.1',
      },
      autorestart: true,
      max_memory_restart: '1G',
    },
  ],
}
