import { type DocMeta } from '@blocksuite/store';
import { isEqual } from 'lodash-es';
import { distinctUntilChanged, Observable } from 'rxjs';

import { Store } from '../../../framework';
import type { WorkspaceLocalState, WorkspaceService } from '../../workspace';
import type { DocMode } from '../entities/record';

export class DocsStore extends Store {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly localState: WorkspaceLocalState
  ) {
    super();
  }

  getBlockSuiteDoc(id: string) {
    return this.workspaceService.workspace.docCollection.getDoc(id);
  }

  watchDocIds() {
    return new Observable<string[]>(subscriber => {
      const emit = () => {
        subscriber.next(
          this.workspaceService.workspace.docCollection.meta.docMetas.map(
            v => v.id
          )
        );
      };

      emit();

      const dispose =
        this.workspaceService.workspace.docCollection.meta.docMetaUpdated.on(
          emit
        ).dispose;
      return () => {
        dispose();
      };
    }).pipe(distinctUntilChanged((p, c) => isEqual(p, c)));
  }

  watchDocMeta(id: string) {
    let meta: DocMeta | null = null;
    return new Observable<Partial<DocMeta>>(subscriber => {
      const emit = () => {
        if (meta === null) {
          // getDocMeta is heavy, so we cache the doc meta reference
          meta =
            this.workspaceService.workspace.docCollection.meta.getDocMeta(id) ||
            null;
        }
        subscriber.next({ ...meta });
      };

      emit();

      const dispose =
        this.workspaceService.workspace.docCollection.meta.docMetaUpdated.on(
          emit
        ).dispose;
      return () => {
        dispose();
      };
    }).pipe(distinctUntilChanged((p, c) => isEqual(p, c)));
  }

  watchDocListReady() {
    return this.workspaceService.workspace.engine.rootDocState$
      .map(state => !state.syncing)
      .asObservable();
  }

  setDocMeta(id: string, meta: Partial<DocMeta>) {
    this.workspaceService.workspace.docCollection.setDocMeta(id, meta);
  }

  setDocModeSetting(id: string, mode: DocMode) {
    this.localState.set(`page:${id}:mode`, mode);
  }

  watchDocModeSetting(id: string) {
    return this.localState.watch<DocMode>(`page:${id}:mode`);
  }
}
