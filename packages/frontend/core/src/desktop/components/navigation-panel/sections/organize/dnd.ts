import type { DropTargetOptions } from '@affine/component';
import { isOrganizeSupportType } from '@affine/core/modules/organize/constants';
import type { AffineDNDData } from '@affine/core/types/dnd';

import type { NavigationPanelTreeNodeDropEffect } from '../../tree';

export const organizeChildrenDropEffect: NavigationPanelTreeNodeDropEffect =
  data => {
    if (
      data.treeInstruction?.type === 'reorder-above' ||
      data.treeInstruction?.type === 'reorder-below'
    ) {
      if (data.source.data.entity?.type === 'folder') {
        return 'move';
      }
    } else {
      return; // not supported
    }
    return;
  };

export const organizeEmptyDropEffect: NavigationPanelTreeNodeDropEffect =
  data => {
    const sourceType = data.source.data.entity?.type;
    if (sourceType && isOrganizeSupportType(sourceType)) {
      return 'link';
    }
    return;
  };

/**
 * Check whether the data can be dropped on the empty state of the organize section
 */
export const organizeEmptyRootCanDrop: DropTargetOptions<AffineDNDData>['canDrop'] =
  data => {
    const type = data.source.data.entity?.type;
    return !!type && isOrganizeSupportType(type);
  };
