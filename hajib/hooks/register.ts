import type { Register } from 'claude-code'

import { classify } from './hajib'

export const register: Register = on => {
  on('tool.check', async ($, e, next) => {
    const found = classify(e.tool, e.input)

    if (found === null) {
      return next(e)
    }

    if (found.verdict === 'deny') {
      $.ui.toast('L-Hajib: l-bab msdoud, ma-kaynch douz 🛑')

      return { decision: 'deny', reason: found.reason }
    }

    const base = await next(e)

    if (base.decision === 'deny') {
      return base
    }

    $.ui.toast('L-Hajib: tsenna chwiya, khassni rayek ✋')

    return { ...base, decision: 'ask', reason: found.reason }
  })
}
