import { EmbedSyncedDocBlockSchema } from '@blocksuite/affine-model';
import { BlockViewExtension, FlavourExtension } from '@blocksuite/std';
import type { ExtensionType } from '@blocksuite/store';
import { literal } from 'lit/static-html.js';

import { EmbedSyncedDocBlockAdapterExtensions } from './adapters/extension';
import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { HeightInitializationExtension } from './init-height-extension';

const flavour = EmbedSyncedDocBlockSchema.model.flavour;

export const EmbedSyncedDocBlockSpec: ExtensionType[] = [
  FlavourExtension(flavour),
  BlockViewExtension(flavour, model => {
    return model.parent?.flavour === 'affine:surface'
      ? literal`affine-embed-edgeless-synced-doc-block`
      : literal`affine-embed-synced-doc-block`;
  }),
  EmbedSyncedDocBlockAdapterExtensions,
  createBuiltinToolbarConfigExtension(flavour),
].flat();

export const EmbedSyncedDocViewExtensions: ExtensionType[] = [
  FlavourExtension(flavour),
  BlockViewExtension(flavour, model => {
    return model.parent?.flavour === 'affine:surface'
      ? literal`affine-embed-edgeless-synced-doc-block`
      : literal`affine-embed-synced-doc-block`;
  }),
  createBuiltinToolbarConfigExtension(flavour),
  HeightInitializationExtension,
].flat();
