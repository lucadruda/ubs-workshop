import { DefaultButton, mergeStyleSets } from "@fluentui/react";
import React, { useRef, useState } from "react";
import { StepElem, useSteps } from "./common";
import Deploy from "./steps/Deploy";
import Upload from "./steps/Upload";
import DeploymentProvider from "./deploymentContext";
import Configure from "./steps/Configure";
import Central from "./steps/Central";
import Site from "./steps/Site";

const styles = {
  wizardBody: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: 'center',
    flexDirection: 'column'
  },
  footer: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10
  },
  arrow: {
    alignItems: "center",
    display: "flex",
    width: 100,
    justifyContent: "space-evenly",
  },
  icon: {
    cursor: "pointer",
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyConten: 'center',
    textAlign: 'center',
    alignItems: 'center',
    overflowY: 'auto',
    height: '90%',
    justifyContent: 'center'
  }
};

const classNames = mergeStyleSets(styles);

const App = React.memo(() => {
  return (
    <DeploymentProvider>
      <Wizard />
    </DeploymentProvider>
  );
});

export function Wizard() {
  const [current, next, previous] = useSteps(0);
  const [nextEnabled, setNextEnabled] = useState(false);
  const totalSteps = 5;

  const compRef = [
    useRef<StepElem>(null),
    useRef<StepElem>(null),
    useRef<StepElem>(null),
    useRef<StepElem>(null),
    useRef<StepElem>(null),
  ];

  const renderComponent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Deploy ref={compRef[0]} enableNext={() => setNextEnabled(true)} />
        );
      case 1:
        return (
          <Upload ref={compRef[1]} enableNext={() => setNextEnabled(true)} />
        );
      case 2:
        return (
          <Configure ref={compRef[2]} enableNext={() => setNextEnabled(true)} />
        );
      case 3:
        return (
          <Central ref={compRef[3]} enableNext={() => setNextEnabled(true)} />
        );
      case 4:
        return (
          <Site ref={compRef[4]} enableNext={() => setNextEnabled(true)} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={classNames.wizardBody}>
      <div className={classNames.content}>
        {renderComponent(current)}
      </div>
      <div className={classNames.footer}>
        <DefaultButton
          primary
          text="Previous"
          iconProps={{ iconName: "Back" }}
          onClick={previous}
          style={current === 0 ? { visibility: "hidden" } : {}}
        />
        <DefaultButton
          primary
          text="Next"
          iconProps={{ iconName: "Forward" }}
          disabled={current === totalSteps - 1 || !nextEnabled}
          onClick={() => {
            compRef[current].current?.process();
            next();
            setNextEnabled(false);
          }}
        />
      </div>
    </div>
  );
}

export default App;
