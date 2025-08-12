# InjectMaterial Component

A material component wrapper with dependency injection support for implementing dynamic component replacement mechanisms.

## Features

- 🔧 **Dependency Injection**: Support dynamic component replacement via FlowRendererRegistry
- 🔄 **Smart Fallback**: Automatically use default component when no custom component is registered
- 🎯 **Type Safety**: Full TypeScript type inference support
- 📦 **Zero Configuration**: Works out of the box without additional setup

## Usage

### 1. Create Injectable Material Component

```tsx
import { createInjectMaterial } from '@flowgram.ai/form-materials';
import { VariableSelector } from './VariableSelector';

// Create injectable material wrapper component
const InjectVariableSelector = createInjectMaterial(VariableSelector);

// Now you can use it like a regular component
function MyComponent() {
  return <InjectVariableSelector value={value} onChange={handleChange} />;
}
```

### 2. Register Custom Components

Configure custom renderer in `use-editor-props.tsx`:

```tsx
import { useEditorProps } from '@flowgram.ai/editor';
import { YourCustomVariableSelector } from './YourCustomVariableSelector';
import { VariableSelector } from '@flowgram.ai/form-materials';

function useCustomEditorProps() {
  const editorProps = useEditorProps({
    materials: {
      components: {
        // Use component's renderKey or component name as key
        [VariableSelector.renderKey]: YourCustomVariableSelector,
        [TypeSelector.renderKey]: YourCustomTypeSelector,
      }
    }
  });

  return editorProps;
}
```

### 3. Use Custom renderKey

If your component requires a specific renderKey:

```tsx
const InjectCustomComponent = createInjectMaterial(MyComponent, {
  renderKey: 'my-custom-key'
});

// When registering
{
  materials: {
    components: {
      'my-custom-key': MyCustomRenderer
    }
  }
}
```

## Sequence Diagram

Complete component registration and rendering sequence diagram:

```mermaid
sequenceDiagram
    participant App as Application
    participant Editor as use-editor-props
    participant Registry as FlowRendererRegistry
    participant Inject as InjectMaterial
    participant Default as Default Component
    participant Custom as Custom Component

    Note over App,Custom: Component Registration Phase
    App->>Editor: Call use-editor-props()
    Editor->>Editor: Configure materials.components
    Editor->>Registry: Register component to FlowRendererRegistry
    Registry->>Registry: Store mapping relationship
    Registry-->>App: Registration complete

    Note over App,Custom: Component Rendering Phase
    App->>Inject: Render InjectMaterial component
    Inject->>Registry: Query renderer (getRendererComponent)

    alt Custom renderer exists
        Registry-->>Inject: Return custom React component
        Inject->>Custom: Render with custom component
        Custom-->>App: Render custom UI
    else No custom renderer
        Registry-->>Inject: Return null or type mismatch
        Inject->>Default: Render with default component
        Default-->>App: Render default UI
    end
```

## Render Key Priority

Component render key determination follows this priority order:

1. `params.renderKey` (second parameter of createInjectMaterial)
2. `Component.renderKey` (component's own renderKey property)
3. `Component.name` (component's display name)
4. Empty string (final fallback)

## Type Definition

```typescript
interface CreateInjectMaterialOptions {
  renderKey?: string;
}

function createInjectMaterial<Props>(
  Component: React.FC<Props> & { renderKey?: string },
  params?: CreateInjectMaterialOptions
): React.FC<Props>
```
