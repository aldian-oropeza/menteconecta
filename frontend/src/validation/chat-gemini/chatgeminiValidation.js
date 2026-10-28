export const MAX_MESSAGE_LENGTH=2000;
export const validMessage=text=>Boolean(text.trim())&&text.length<=MAX_MESSAGE_LENGTH;
