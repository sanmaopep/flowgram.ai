import { runFreeLayoutTest } from '../__mocks__/run-free-layout-test';
import { freeLayout1 } from '../__mocks__/free-layout-specs';

runFreeLayoutTest('Variable Free Layout transform empty', freeLayout1, {
  // 模拟清空作用域
  transformCovers: () => [],
  transformDeps: () => [],
});
