// TODO(@forehalo):
//   Because of the `@affine/server` package can't import directly from workspace packages,
//   this is a temprory solution to get the block suite data(title, description) from given yjs binary or yjs doc.
//   The logic is mainly copied from
//     - packages/frontend/core/src/modules/docs-search/worker/in-worker.ts
//     - packages/frontend/core/src/components/page-list/use-block-suite-page-preview.ts
//   and it's better to be provided by blocksuite

import { Array, Doc, Map } from 'yjs';

export interface PageDocContent {
  title: string;
  summary: string;
}

export interface WorkspaceDocContent {
  name: string;
  avatarKey: string;
}

type KnownFlavour =
  | 'affine:page'
  | 'affine:note'
  | 'affine:surface'
  | 'affine:paragraph'
  | 'affine:list'
  | 'affine:code'
  | 'affine:image'
  | 'affine:attachment'
  | 'affine:transcription'
  | 'affine:callout'
  | 'affine:table';

export function parseWorkspaceDoc(doc: Doc): WorkspaceDocContent | null {
  // not a workspace doc
  if (!doc.share.has('meta')) {
    return null;
  }

  const meta = doc.getMap('meta');

  return {
    name: meta.get('name') as string,
    avatarKey: meta.get('avatar') as string,
  };
}

export interface ParsePageOptions {
  maxSummaryLength: number;
}

export function parsePageDoc(
  doc: Doc,
  opts: ParsePageOptions = { maxSummaryLength: 150 }
): PageDocContent | null {
  // not a page doc
  if (!doc.share.has('blocks')) {
    return null;
  }

  const blocks = doc.getMap<Map<any>>('blocks');

  if (!blocks.size) {
    return null;
  }

  const content: PageDocContent = {
    title: '',
    summary: '',
  };

  let summaryLenNeeded = opts.maxSummaryLength;

  let root: Map<any> | null = null;
  for (const block of blocks.values()) {
    const flavour = block.get('sys:flavour') as KnownFlavour;
    if (flavour === 'affine:page') {
      content.title = block.get('prop:title') as string;
      root = block;
    }
  }

  if (!root) {
    return null;
  }

  const queue: string[] = [root.get('sys:id')];

  function pushChildren(block: Map<any>) {
    const children = block.get('sys:children') as Array<string> | undefined;
    if (children?.length) {
      for (let i = children.length - 1; i >= 0; i--) {
        queue.push(children.get(i));
      }
    }
  }

  while (queue.length) {
    const blockId = queue.pop();
    const block = blockId ? blocks.get(blockId) : null;
    if (!block) {
      break;
    }

    const flavour = block.get('sys:flavour') as KnownFlavour;

    switch (flavour) {
      case 'affine:page':
      case 'affine:note': {
        pushChildren(block);
        break;
      }
      case 'affine:attachment':
      case 'affine:transcription':
      case 'affine:callout': {
        // only extract text in full content mode
        if (summaryLenNeeded === -1) {
          pushChildren(block);
        }
        break;
      }
      case 'affine:table': {
        // only extract text in full content mode
        if (summaryLenNeeded === -1) {
          const contents: string[] = [...block.keys()]
            .map(key => {
              if (key.startsWith('prop:cells.') && key.endsWith('.text')) {
                return block.get(key)?.toString() ?? '';
              }
              return '';
            })
            .filter(Boolean);
          content.summary += contents.join('|');
        }
        break;
      }
      case 'affine:paragraph':
      case 'affine:list':
      case 'affine:code': {
        pushChildren(block);
        const text = block.get('prop:text');
        if (!text) {
          continue;
        }

        if (summaryLenNeeded === -1) {
          content.summary += text.toString();
        } else if (summaryLenNeeded > 0) {
          content.summary += text.toString();
          summaryLenNeeded -= text.length;
        } else {
          break;
        }
      }
    }
  }

  return content;
}
