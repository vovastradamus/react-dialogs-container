import React, { act } from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, Root } from "react-dom/client";
import { DialogsContainer, DialogsProvider, useDialogs, DialogProps } from "../src";
import { DialogsContext } from "../src/dialog.contexts";
import { DialogItem, PropsWithDialogProps } from "../src/dialog.types";

type TestComponentProps = PropsWithDialogProps<{
  className?: string;
}>

const TestComponent: React.FC<TestComponentProps> = ({ className, closeDialog }) => {
  return <div className={`dialog ${className}`}>
    <div>dialog</div>
    <button onClick={closeDialog}>Close</button>
  </div>;
};

const TestWrapper: React.FC<{
  onMount: (helpers: {
    pushDialog: ReturnType<typeof useDialogs>["pushDialog"];
    closeDialogByID: ReturnType<typeof useDialogs>["closeDialogByID"];
    getDialogs: () => DialogItem[];
  }) => void;
}> = ({ onMount }) => {
  const { pushDialog, closeDialogByID } = useDialogs();
  const { dialogs } = React.useContext(DialogsContext);

  React.useEffect(() => {
    onMount({ pushDialog, closeDialogByID, getDialogs: () => dialogs });
  }, [pushDialog, closeDialogByID, dialogs, onMount]);

  return null;
};

const waitFor = (fn: () => void, timeout = 1000) => {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now();
    const check = () => {
      try {
        fn();
        resolve();
      } catch (error) {
        if (Date.now() - startTime > timeout) {
          reject(error);
        } else {
          setTimeout(check, 10);
        }
      }
    };
    check();
  });
};

describe("<DialogsProvider />", () => {
  let container: HTMLDivElement;
  let root: Root;
  let pushDialog: ReturnType<typeof useDialogs>["pushDialog"];
  let closeDialogByID: ReturnType<typeof useDialogs>["closeDialogByID"];
  let getDialogs: () => DialogItem[];

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    pushDialog = () => () => { };
    closeDialogByID = () => { };
    getDialogs = () => [];

    let resolveInit: () => void;
    const initPromise = new Promise<void>((resolve) => {
      resolveInit = resolve;
    });

    const handleMount = (helpers: {
      pushDialog: typeof pushDialog;
      closeDialogByID: typeof closeDialogByID;
      getDialogs: typeof getDialogs;
    }) => {
      pushDialog = helpers.pushDialog;
      closeDialogByID = helpers.closeDialogByID;
      getDialogs = helpers.getDialogs;
      resolveInit();
    };

    act(() => {
      root.render(
        <DialogsProvider>
          <DialogsContainer />
          <TestWrapper onMount={handleMount} />
        </DialogsProvider>
      );
    });

    await initPromise;
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
  });

  it("Adding dialogs", async () => {
    act(() => {
      pushDialog(TestComponent, { className: "dialog1" });
      pushDialog(<TestComponent className="dialog2" />);
    });

    await waitFor(() => {
      const dialogs = container.querySelectorAll(".dialog");
      expect(dialogs.length).toBe(2);
    });

    const dialogs = container.querySelectorAll(".dialog");
    expect(dialogs.length).toBe(2);
    expect(container.querySelector(".dialog1")).not.toBeNull();
    expect(container.querySelector(".dialog2")).not.toBeNull();
    expect(container.querySelector(".dialog3")).toBeNull();
  });


  it("Close dialog by cb", async () => {
    act(() => {
      const closeDialog = pushDialog(TestComponent, { className: "dialog1" });
      pushDialog(<TestComponent className="dialog2" />);

      closeDialog()
    });

    await waitFor(() => {
      const dialogs = container.querySelectorAll(".dialog");
      expect(dialogs.length).toBe(1);
    });

    const dialogs = container.querySelectorAll(".dialog");
    expect(dialogs.length).toBe(1);
    expect(container.querySelector(".dialog1")).toBeNull();
    expect(container.querySelector(".dialog2")).not.toBeNull();
    expect(container.querySelector(".dialog3")).toBeNull();
  });

  it("Remove dialog", async () => {
    act(() => {
      pushDialog(TestComponent as any, { className: "dialog1" });
      pushDialog(TestComponent as any, { className: "dialog2" });
      pushDialog(TestComponent as any, { className: "dialog3" });
    });

    await waitFor(() => {
      const dialogs = container.querySelectorAll(".dialog");
      expect(dialogs.length).toBe(3);
    });

    let dialogsList = getDialogs();
    let dialogId: number | undefined;

    await waitFor(() => {
      dialogsList = getDialogs();
      expect(dialogsList.length).toBe(3);
      dialogId = dialogsList[1]?.dialogID;
      expect(typeof dialogId).toBe("number");
    });

    expect(dialogId).toBeDefined();
    act(() => {
      closeDialogByID(dialogId!);
    });

    await waitFor(() => {
      const dialogs = container.querySelectorAll(".dialog");
      expect(dialogs.length).toBe(2);
      expect(container.querySelector(".dialog2")).toBeNull();
    });

    expect(container.querySelector(".dialog1")).not.toBeNull();
    expect(container.querySelector(".dialog3")).not.toBeNull();
    const dialogs = container.querySelectorAll(".dialog");
    expect(dialogs.length).toBe(2);
  });
});
