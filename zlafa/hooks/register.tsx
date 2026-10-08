import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import { level, line, message } from './zlafa'

import { ALERT, TERRACOTTA, fringe } from './zrabi'

const percent = atom({ plugin: 'zlafa', key: 'percent' } as const, null as number | null)
const lastLevel = atom({ plugin: 'zlafa', key: 'level' } as const, 0)
const isHidden = atom({ plugin: 'zlafa', key: 'isHidden' } as const, false)

async function refresh($: EngineInterface) {
  const { context } = await $.session.usage()

  if (context.percent === undefined) {
    return
  }

  const p = context.percent
  const before = await read($, lastLevel)
  const now = level(p)

  await update($, percent, () => p)
  await update($, lastLevel, () => now)

  if (now > before && now >= 2) {
    $.ui.toast(`🥣 ${message(p)}`)
  }
}

export const register: Register = on => {
  on('tool.call', async ($, e, next) => {
    const ran = await next(e)
    await refresh($).catch(() => undefined)

    return ran
  })

  on('turn.complete', async ($, e, next) => {
    await refresh($).catch(() => undefined)

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const p = await read($, percent)

    if (e.props.hasSurvey || p === null || (await read($, isHidden))) {
      return next(e)
    }

    const { Box, Button, Text } = $.ui.resolve(e)
    const width = e.props.bodyColumns - 2

    return (
      <Box flexDirection="column">
        <Text color={TERRACOTTA}>{fringe(width)}</Text>
        <Box paddingX={2}>
          <Text color={level(p) >= 2 ? ALERT : undefined}>{line(p)}</Text>
        </Box>
        <Box>
          <Text color={TERRACOTTA}>{fringe(width - 10, 2)} </Text>
          <Button key="hide" label="Khbbi" onPress={() => update($, isHidden, () => true)} />
        </Box>
      </Box>
    )
  })
}
