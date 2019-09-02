// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { IDataConnector } from '@jupyterlab/coreutils';

import { BoxPanel } from '@phosphor/widgets';

import { ReadonlyJSONValue, UUID } from '@phosphor/coreutils';

import { IDisposable } from '@phosphor/disposable';

import { DebuggerSidebar } from './sidebar';
import { INotebookTracker } from '@jupyterlab/notebook';
import { CodeCell } from '@jupyterlab/cells';
import { IEditorTracker } from '@jupyterlab/fileeditor';

export class Debugger extends BoxPanel {
  constructor(options: Debugger.IOptions) {
    super({ direction: 'left-to-right' });
    this.notebook = options.notebook;
    this.model = new Debugger.Model(options);
    this.sidebar = new DebuggerSidebar(this.model);
    this.title.label = 'Debugger';

    this.addClass('jp-Debugger');
    this.addWidget(this.sidebar);
  }

  readonly model: Debugger.Model;

  readonly sidebar: DebuggerSidebar;

  editor: IEditorTracker;
  notebook: INotebookTracker;
  previousCell: CodeCell;

  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this.model.dispose();
    super.dispose();
  }
}

/**
 * A namespace for `Debugger` statics.
 */
export namespace Debugger {
  export interface IOptions {
    connector?: IDataConnector<ReadonlyJSONValue>;
    notebook?: INotebookTracker;
    editor?: IEditorTracker;
    id?: string;
  }

  export class Model implements IDisposable {
    constructor(options: Debugger.Model.IOptions) {
      this.connector = options.connector || null;
      this.id = options.id || UUID.uuid4();
      this._notebook = options.notebook;
      void this._populate();
    }

    readonly connector: IDataConnector<ReadonlyJSONValue> | null;

    readonly id: string;

    get isDisposed(): boolean {
      return this._isDisposed;
    }

    get notebook() {
      return this._notebook;
    }

    dispose(): void {
      this._isDisposed = true;
    }

    private async _populate(): Promise<void> {
      const { connector } = this;

      if (!connector) {
        return;
      }
    }

    private _isDisposed = false;
    private _notebook: INotebookTracker;
  }

  export namespace Model {
    export interface IOptions extends Debugger.IOptions {}
  }
}
