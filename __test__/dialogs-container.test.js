import React from "react";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { DialogsContainer, DialogsProvider } from "../src";

Enzyme.configure({ adapter: new Adapter() });

const TestComponent = (props) => {
  const { className } = props;

  return <div className={`dialog ${className}`}>dialog</div>;
};

describe("<DialogsProvider />", () => {
  let wrapper = shallow(<div />);

  beforeEach(() => {
    wrapper = shallow(
      <DialogsProvider>
        <div>
          <DialogsContainer />
        </div>
      </DialogsProvider>
    );
  });

  it("Adding dialogs", () => {
    const {
      value: { pushDialog },
    } = wrapper.props();

    pushDialog(TestComponent, { className: "dialog1" });
    pushDialog(<TestComponent className="dialog2" />);

    const dialogs = wrapper.render();

    expect(dialogs.find(".dialog").length).toBe(2);
    expect(dialogs.find(".dialog1").length).toBe(1);
    expect(dialogs.find(".dialog2").length).toBe(1);
    expect(dialogs.find(".dialog3").length).toBe(0);
  });

  it("Remove dialog", () => {
    const {
      value: { pushDialog, closeDialogByID },
    } = wrapper.props();

    pushDialog(TestComponent, { className: "dialog1" });
    const dialogId = pushDialog(TestComponent, { className: "dialog2" });
    pushDialog(TestComponent, { className: "dialog3" });

    closeDialogByID(dialogId);

    const dialogs = wrapper.render();

    expect(typeof dialogId).toBe("number");
    expect(dialogs.find(".dialog2").length).toBe(0);
    expect(dialogs.find(".dialog1").length).toBe(1);
    expect(dialogs.find(".dialog3").length).toBe(1);
    expect(dialogs.find(".dialog").length).toBe(2);
  });
});
