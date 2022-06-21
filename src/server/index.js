const express = require('express');

async function createServer(environment, discordClient) {
  const server = express();

  server.get('/healthz', (request, response) => {
    if (!discordClient.isReady()) {
      response.status(503).send('not ready');
      return;
    }

    response.send('ok');
  });

  return new Promise((resolve, reject) => {
    server.listen(environment.server.kPort, () => {
      console.log(`Health check active on port ${environment.server.kPort}`);
      resolve();
    });
  });
}

module.exports = {
  createServer,
};
