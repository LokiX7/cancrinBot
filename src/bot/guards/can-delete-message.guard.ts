import { Context } from 'telegraf';

export const CanDeleteMessage = (ctx: Context): boolean => {
  if (ctx.message?.message_id) {
    return true;
  }

  return false;
};
