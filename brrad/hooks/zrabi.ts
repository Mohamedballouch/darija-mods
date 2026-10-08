// Zrabi (الزربية): the diamond fringe of a Berber rug, in terracotta.

export const TERRACOTTA = '#B5452A'
export const ALERT = '#E5534B'

const UNIT = '◇─◆─'

// A fringe `width` cells wide that starts and ends on a diamond; `offset` 2 starts on ◆.
export const fringe = (width: number, offset = 0): string => {
  let s = ''

  for (let i = 0; i < Math.max(0, width); i++) {
    s += UNIT[(i + offset) % UNIT.length]
  }

  return s.endsWith('─') ? s.slice(0, -1) : s
}
