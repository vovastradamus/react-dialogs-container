# react-dialogs-container

Lightweight hooks-ready library for managing dialogs in React applications.

## Installation

```bash
npm i react-dialogs-container
```

## Setup

1. Wrap your application with `DialogsProvider`
2. Add `DialogsContainer` component inside the provider

## Quick Start

```jsx
import {
  DialogsContainer,
  DialogsProvider,
  useDialogsContainer,
} from "react-dialogs-container";

const App = () => {
  const { pushDialog } = useDialogsContainer();

  const handleOpenModal = () => {
    pushDialog(ModalComponent, { title: "My Dialog" });
  };

  return (
    <button onClick={handleOpenModal}>
      Open Dialog
    </button>
  );
};

const Root = () => (
  <DialogsProvider>
    <App />
    <DialogsContainer />
  </DialogsProvider>
);
```

## Usage Examples

### Basic Example with Component

```jsx
import { useDialogsContainer } from "react-dialogs-container";

const MyDialog = ({ closeDialog, message }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={closeDialog}>Close</button>
      </div>
    </div>
  );
};

const App = () => {
  const { pushDialog } = useDialogsContainer();

  return (
    <button onClick={() => pushDialog(MyDialog, { message: "Hello!" })}>
      Open Dialog
    </button>
  );
};
```

### Using React Element

```jsx
import React from "react";
import { useDialogsContainer } from "react-dialogs-container";

const App = () => {
  const { pushDialog } = useDialogsContainer();

  const handleClick = () => {
    pushDialog(
      React.createElement(MyDialog, { message: "Dialog from element" }),
    );
  };

  return <button onClick={handleClick}>Open</button>;
};
```

### Closing Dialog from Inside

```jsx
import { useDialog } from "react-dialogs-container";

const MyDialog = ({ title }) => {
  const { closeDialog } = useDialog();

  return (
    <div className="modal">
      <h2>{title}</h2>
      <button onClick={closeDialog}>Close</button>
    </div>
  );
};
```

### Using Close Function

```jsx
const App = () => {
  const { pushDialog } = useDialogsContainer();

  const handleOpen = () => {
    const closeDialog = pushDialog(MyDialog, { title: "Dialog" });

    // Close dialog programmatically
    setTimeout(() => {
      closeDialog();
    }, 3000);
  };

  return <button onClick={handleOpen}>Open with Auto-Close</button>;
};
```

### Temporary Dialogs with Auto-Close

```jsx
import { useDialogs } from "react-dialogs-container";

const App = () => {
  const { pushTempDialog } = useDialogs();

  const handleOpen = () => {
    // Dialog will automatically close when component unmounts
    pushTempDialog(MyDialog, { title: "Temporary Dialog" });
  };

  return <button onClick={handleOpen}>Open Temporary Dialog</button>;
};
```

## API

### Components

#### `DialogsProvider`

Context provider for managing dialogs. Should wrap your application.

**Props:**

- `children: ReactNode` - child elements

#### `DialogsContainer`

Component for rendering all active dialogs. Should be placed inside
`DialogsProvider`.

### Hooks

#### `useDialogsContainer` (alias for `useDialogs`)

Main hook for managing dialogs.

**Returns:**

- `pushDialog(component, props?): CloseDialogFn` - opens a new dialog
  - `component: ComponentType<DialogProps> | ReactElement` - component or React
    element
  - `props?: Record<string, any>` - props for the component
  - Returns a function to close the dialog
- `closeDialogByID(dialogID: number): void` - closes dialog by ID
- `pushTempDialog(component, props?): CloseDialogFn` - opens a temporary dialog
  (automatically closes when component unmounts)

#### `useDialogs`

Alternative name for `useDialogsContainer`. Provides the same methods.

#### `useDialog`

Hook for accessing dialog methods from inside a dialog component.

**Returns:**

- `closeDialog(): void` - function to close the current dialog

### Types

```typescript
interface DialogProps {
  closeDialog: () => void;
  [key: string]: any;
}

type CloseDialogFn = () => void;

interface DialogItem {
  component: ComponentType<DialogProps> | ReactElement;
  props: Record<string, any>;
  dialogID: number;
}
```

## Requirements

- React >= 16
- ReactDOM >= 16

## Example on CodeSandbox

[![Edit Example usage of react-dialogs-container](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/example-usage-of-react-dialogs-container-7d3l1?fontsize=14&hidenavigation=1&theme=dark)

## License

MIT
