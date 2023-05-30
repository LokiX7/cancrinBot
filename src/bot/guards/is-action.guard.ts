import { Context } from 'telegraf';

export const isAction = (ctx: Context): boolean => {
  if (ctx.message) {
    return false;
  }

  return true;
};
