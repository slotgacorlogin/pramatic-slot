'use babel';

import PramaticSlotView from './pramatic-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  pramaticSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pramaticSlotView = new PramaticSlotView(state.pramaticSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pramaticSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pramatic-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pramaticSlotView.destroy();
  },

  serialize() {
    return {
      pramaticSlotViewState: this.pramaticSlotView.serialize()
    };
  },

  toggle() {
    console.log('PramaticSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
