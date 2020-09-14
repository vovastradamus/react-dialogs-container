# react-dialog-container

Library for manage dialogs inside application

## Setup:

- Place DialogsProvider over your application
- Place DialogsContainer inside your application

## Example to use

```js
const App = () => {
  const { pushDialog } = useDialogsContainer();

  return (
    <button onClick={() => pushDialog(ModalComponent, { taste: "So tasty" })}>
      Open Modal
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

## API

### Hooks

**useDialogsContainer**  
_pushDialog(component, props): number_ - push new dialog component, return dialog identificator  
_closeDialogByID(dialogID)_ - close dialog by identificator  
**useDialog** - return methods base on inherited context  
_closeDialog_ - fucntion to close dialog

## Example usage on CodeSandbox

[![Edit Example usage of react-dialogs-container](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/example-usage-of-react-dialogs-container-7d3l1?fontsize=14&hidenavigation=1&theme=dark)
