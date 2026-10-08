import { expect, test } from 'claude-code/testing'

import { fringe } from './zrabi'

test('a fringe alternates hollow and solid diamonds', () => {
  expect(fringe(9)).toBe('◇─◆─◇─◆─◇')
  expect(fringe(5, 2)).toBe('◆─◇─◆')
})

test('a fringe never ends on a bare line and never overflows', () => {
  expect(fringe(8)).toBe('◇─◆─◇─◆')
  expect(fringe(40).length).toBeLessThanOrEqual(40)
  expect(fringe(0)).toBe('')
  expect(fringe(-3)).toBe('')
})
