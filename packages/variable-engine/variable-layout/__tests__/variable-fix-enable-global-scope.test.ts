import { runFixedLayoutTest } from '../__mocks__/run-fixed-layout-test';
import { fixLayout1 } from '../__mocks__/fixed-layout-specs';

runFixedLayoutTest('Variable Fix Layout Enable Global Scope', fixLayout1, {
  enableGlobalScope: true,
});
