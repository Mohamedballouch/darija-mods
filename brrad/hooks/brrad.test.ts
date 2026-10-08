import { expect, test } from 'claude-code/testing'

import { back, band, clock, isSlow, nudge, stepAt, tally } from './brrad'

test('nudges at 90s, 4m, 8m and 15m by default', () => {
  expect([0, 89, 90, 239, 241, 480, 900, 5000].map(s => stepAt(s, 90))).toEqual([-1, -1, 0, 0, 1, 2, 3, 3])
  expect(nudge(0)).toContain('brrad d atay')
})

test('a custom first threshold scales the rest', () => {
  expect(stepAt(180, 180)).toBe(0)
  expect(stepAt(179, 180)).toBe(-1)
})

test('spots slow commands and leaves quick ones', () => {
  for (const c of ['npm install', 'pnpm i', 'docker build .', 'cargo build --release', 'pytest -q', 'make']) {
    expect(isSlow(c)).toBe(true)
  }

  for (const c of ['ls', 'git status', 'npm run lint', 'make test.o && echo hi']) {
    expect(isSlow(c)).toBe(false)
  }
})

test('band, clock and come-back lines', () => {
  expect(clock(272)).toBe('4:32')
  expect(band(30)).toContain('🫖 0:30')
  expect(band(700)).toContain('☕')
  expect(back(30, false)).toContain('Rje3')
  expect(back(700, false)).toContain('brd')
  expect(back(30, true)).toContain('mochkil')
})

test('tea tally', () => {
  expect(tally(1)).toContain('1 kas')
  expect(tally(3)).toContain('3 d l-kissan')
  expect(tally(6)).toContain('bzzaf')
})
