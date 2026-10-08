export const bar = (percent: number, width = 12): string => {
  const p = Math.max(0, Math.min(100, Math.round(percent)))
  const filled = Math.round((p / 100) * width)

  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

// 0 = fargha, 1 = kat3mar, 2 = kadi3, 3 = tfid
export const level = (percent: number): 0 | 1 | 2 | 3 =>
  percent >= 95 ? 3 : percent >= 80 ? 2 : percent >= 50 ? 1 : 0

export const message = (percent: number): string =>
  [
    'Zlafa mazal khawya, khddem 3la khatrek',
    'Zlafa bdat kat3mer, walakin kolchi mazal mzyan',
    'Zlafa 9rbat t3mer, red l-bal w fkker f /compact',
    'Safi, ghadi tfid! Dir /compact daba serbi',
  ][level(percent)]!

export const line = (percent: number): string =>
  `🥣 [${bar(percent)}] ${Math.round(percent)}%  ${message(percent)}`
