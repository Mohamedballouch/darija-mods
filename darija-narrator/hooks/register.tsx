import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Line } from '../types'
import { done, failed, narrate, started } from './darija'

import { ALERT, TERRACOTTA, fringe } from './zrabi'

const lines = atom({ plugin: 'darija-narrator', key: 'lines' } as const, [] as Line[])
const isHidden = atom({ plugin: 'darija-narrator', key: 'isHidden' } as const, false)

const KEEP = 3

function push($: EngineInterface, line: Line) {
  return update($, lines, all => [...all, line].slice(-KEEP))
}

export const register: Register = on => {
  let startedAt = 0
  let tools = 0

  on('prompt.submit', async ($, e, next) => {
    startedAt = await $.clock.now()
    tools = 0
    await push($, { text: started(e.text), isError: false })

    return next(e)
  })

  on('tool.call', async ($, e, next) => {
    tools += 1
    const text = narrate(e.tool, e as Record<string, unknown>)
    $.ui.status(text)
    await push($, { text, isError: false })

    const ran = await next(e)

    if (ran.deny === undefined && ran.isError === true) {
      const bad = failed(e.tool)
      $.ui.toast(bad)
      await push($, { text: bad, isError: true })
    }

    return ran
  })

  on('turn.complete', async ($, e, next) => {
    const seconds = Math.round(((await $.clock.now()) - startedAt) / 1000)
    $.ui.status(undefined)
    await push($, { text: done(seconds, tools), isError: false })

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const all = await read($, lines)

    if (e.props.hasSurvey || all.length === 0 || (await read($, isHidden))) {
      return next(e)
    }

    const { Box, Button, Text } = $.ui.resolve(e)
    const width = e.props.bodyColumns - 2

    return (
      <Box flexDirection="column">
        <Text color={TERRACOTTA}>{fringe(width)}</Text>
        <Box flexDirection="column" paddingX={2}>
          {all.map((l, i) => (
            <Text key={`l${i}`} color={l.isError ? ALERT : undefined} dimColor={!l.isError && i < all.length - 1}>
              {l.text}
            </Text>
          ))}
        </Box>
        <Box>
          <Text color={TERRACOTTA}>{fringe(width - 10, 2)} </Text>
          <Button key="hide" label="Khbbi" onPress={() => update($, isHidden, () => true)} />
        </Box>
      </Box>
    )
  })
}
