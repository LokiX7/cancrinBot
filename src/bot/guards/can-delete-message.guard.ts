import { Context } from 'telegraf';

// Если можно удалить сообщение - вернёт true в ином случае вернёт false
export const CanDeleteMessage = (ctx: Context): boolean => {
  if (ctx.message?.message_id) {
    return true;
  }

  return false;
};
