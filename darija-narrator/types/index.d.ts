export type Line = { text: string; isError: boolean }

declare module 'claude-code' {
  interface PluginState {
    'darija-narrator': { lines: Line[]; isHidden: boolean }
  }
}
