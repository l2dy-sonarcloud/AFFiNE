import { BaseTool } from '@blocksuite/block-std/gfx';

import type { NavigatorMode } from './frame-manager';

type PresentToolOption = {
  mode?: NavigatorMode;
};

export class PresentTool extends BaseTool<PresentToolOption> {
  static override toolName: string = 'frameNavigator';
}

declare module '@blocksuite/block-std/gfx' {
  interface GfxToolsMap {
    frameNavigator: PresentTool;
  }

  interface GfxToolsOption {
    frameNavigator: PresentToolOption;
  }
}
