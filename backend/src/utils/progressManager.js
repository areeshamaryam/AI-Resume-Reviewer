const clients = new Map();

export const addClient = (userId, res) => {
  clients.set(userId, res);
};

export const removeClient = (userId) => {
  clients.delete(userId);
};

export const sendProgress = (userId, message, progress) => {
  const client = clients.get(userId);

  if (!client) return;

  client.write(
    `data: ${JSON.stringify({
      message,
      progress,
    })}\n\n`,
  );
};
