module.exports = {
  apps: [
    {
      name: "mandados-node",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    },
    {
      name: "mandados-python",
      script: "ORQUESTADOR_LEDL_PRO.py",
      interpreter: "python3"
    }
  ]
};
