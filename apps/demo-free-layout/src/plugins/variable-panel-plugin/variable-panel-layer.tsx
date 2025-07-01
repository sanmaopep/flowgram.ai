import { domUtils, injectable, Layer } from '@flowgram.ai/free-layout-editor';

import { VariablePanel } from './components/variable-panel';

@injectable()
export class VariablePanelLayer extends Layer {
  onReady(): void {
    // Fix variable panel in the right of canvas
    this.config.onDataChange(() => {
      const { scrollX, scrollY } = this.config.config;
      domUtils.setStyle(this.node, {
        position: 'absolute',
        right: 25 - scrollX,
        top: scrollY + 25,
      });
    });
  }

  render(): JSX.Element {
    return <VariablePanel />;
  }
}
