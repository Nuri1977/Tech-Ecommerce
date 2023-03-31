export const mockError = (req, res, ctx) => {
  return res(ctx.status(500));
};
