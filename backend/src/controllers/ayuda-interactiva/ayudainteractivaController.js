export const createHelpController = service => ({ list: async (_req,res) => res.json(await service.list()) });
