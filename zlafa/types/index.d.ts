export type Percent = number | null

declare module 'claude-code' {
  interface PluginState {
    zlafa: { percent: Percent; level: number; isHidden: boolean }
  }
}
