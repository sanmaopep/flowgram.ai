import { createRoot } from 'react-dom/client';
import { Tabs, TabPane } from '@douyinfe/semi-ui';

import { FixedEditor, FreeEditor } from './components';
import './index.css';

const App = () => (
  <div className="demo-container">
    <Tabs type="card" lazyRender>
      <TabPane tab="FixedEditor" itemKey="fixed">
        <FixedEditor />
      </TabPane>
      <TabPane tab="FreeEditor" itemKey="free">
        <FreeEditor />
      </TabPane>
    </Tabs>
  </div>
);

const app = createRoot(document.getElementById('root')!);

app.render(<App />);
