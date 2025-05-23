import { RANGE_SYNC_EXCLUDE_ATTR } from './consts';

/**
 * Check if the active element is in the editor host.
 * TODO(@mirone): this is a trade-off, we need to use separate awareness store for every store to make sure the selection is isolated.
 *
 * @param editorHost - The editor host element.
 * @returns Whether the active element is in the editor host.
 */
export function isActiveInEditor(editorHost: HTMLElement) {
  const currentActiveElement = document.activeElement;
  if (!currentActiveElement) return false;
  // The input or textarea in the widget should be ignored.
  if (currentActiveElement.closest(`[${RANGE_SYNC_EXCLUDE_ATTR}="true"]`))
    return false;
  const currentEditorHost = currentActiveElement?.closest('editor-host');
  if (!currentEditorHost) return false;
  return currentEditorHost === editorHost;
}
