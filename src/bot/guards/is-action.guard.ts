import { Context } from 'telegraf';

// Если входящий запрос вызывает Action, а не команду - вернёт true в ином случае вернёт false
export const isAction = (ctx: Context): boolean => {
  if (ctx.message) {
    return false;
  }

  return true;
};
