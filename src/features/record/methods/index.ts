import { wrap } from '@/middlewares'

import getAll from '@/features/record/methods/getAll'

export const getAllHandler = wrap(getAll)
