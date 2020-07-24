export enum CODES {
  SUCCESS,
  SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST
}

export const DEFAULT_MESSAGES = {
  [CODES.SUCCESS]: 'Success',
  [CODES.SERVER_ERROR]: 'Internal Server Error',
  [CODES.NOT_FOUND]: 'Page not found',
  [CODES.BAD_REQUEST]: 'Bad request'
}
