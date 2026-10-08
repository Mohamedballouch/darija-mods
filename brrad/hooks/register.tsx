import { atom, read, update } from 'claude-code'
import type { Register, Timer } from 'claude-code'

import { back, band, heads, isSlow, nudge, stepAt, tally } from './brrad'

import { TERRACOTTA, fringe } from './zrabi'

const elapsed = atom({ plugin: 'brrad', key: 'elapsed' } as const, null as number | null)
const isHidden = atom({ plugin: 'brrad', key: 'isHidden' } as const, false)

const TICK_MS = 5000

export const register: Register = (on, options) => {
  const first = Math.max(15, Number(options.firstNudgeSeconds ?? 90))
  const isQuiet = options.quiet === true

  let startedAt = 0
  let step = -1
  let agents = 0
  let timer: Timer | undefined

  on('prompt.submit', async ($, e, next) => {
    timer?.cancel()
    startedAt = await $.clock.now()
    step = -1
    agents = 0
    await update($, elapsed, () => null)
    await update($, isHidden, () => false)

    timer = $.clock.every(TICK_MS, async () => {
      const seconds = ((await $.clock.now()) - startedAt) / 1000
      const due = stepAt(seconds, first)

      if (due > step) {
        step = due

        if (!isQuiet) {
          $.ui.toast(nudge(due), { timeoutMs: 8000 })
        }
      }

      if (step >= 0 && !isQuiet) {
        await update($, elapsed, () => seconds)
      }
    })

    return next(e)
  })

  on('tool.call', async ($, e, next) => {
    const isEarly = step < 0
    const isBuild = e.tool === 'Bash' && isSlow(String(e.command ?? ''))

    if (e.tool === 'Agent') {
      agents += 1
    }

    if (isEarly && (isBuild || agents >= 2)) {
      step = 0

      if (!isQuiet) {
        $.ui.toast(isBuild ? heads.build : heads.agents, { timeoutMs: 8000 })
      }
    }

    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    timer?.cancel()
    timer = undefined

    const seconds = ((await $.clock.now()) - startedAt) / 1000
    const wasBreak = step >= 0 || seconds >= first
    await update($, elapsed, () => null)

    if (wasBreak && !e.isAborted) {
      const day = new Date(await $.clock.now()).toISOString().slice(0, 10)
      const cups = Number((await $.store.get(`cups:${day}`)) ?? 0) + 1
      await $.store.set(`cups:${day}`, cups)

      const isError = e.reason === 'error' || e.reason === 'refusal'
      $.ui.toast(`${back(seconds, isError)}  ·  ${tally(cups)}`, { timeoutMs: 10000 })
    }

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const seconds = await read($, elapsed)

    if (e.props.hasSurvey || seconds === null || (await read($, isHidden))) {
      return next(e)
    }

    const { Box, Button, Text } = $.ui.resolve(e)
    const width = e.props.bodyColumns - 2

    return (
      <Box flexDirection="column">
        <Text color={TERRACOTTA}>{fringe(width)}</Text>
        <Box flexDirection="column" paddingX={2}>
          <Text bold>{band(seconds)}</Text>
          {step >= 0 ? <Text dimColor>{nudge(step)}</Text> : null}
        </Box>
        <Box>
          <Text color={TERRACOTTA}>{fringe(width - 10, 2)} </Text>
          <Button key="hide" label="Khbbi" onPress={() => update($, isHidden, () => true)} />
        </Box>
      </Box>
    )
  })
}
