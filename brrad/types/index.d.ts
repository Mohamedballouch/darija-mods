export type Elapsed = number | null

declare module 'claude-code' {
  interface PluginState {
    brrad: { elapsed: Elapsed; isHidden: boolean }
  }
}
