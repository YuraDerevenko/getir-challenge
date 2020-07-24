import { wrap } from '../../../middlewares'

import getAll from './getAll'

export const getAllHandler = wrap(getAll)
