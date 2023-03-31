import userData from '../../data/users/userData.json';
export const mockUsers = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(userData));
};
