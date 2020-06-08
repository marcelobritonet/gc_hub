import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SwitchRoute from "./shared/components/switch-route/SwitchRoute";
import Navigation from "./shared/components/navigation/Navigation";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
    // TODO CONVERTER EM PWA
  return (
      <Router>
        <div>
            <CssBaseline />
            <Navigation/>
            <SwitchRoute />
        </div>
      </Router>
  );
}
const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
      // clickButton
    }, dispatch);

const mapStateToProps = (store: any) => ({
  // newValue: store.clickState.newValue
});

export default connect(mapStateToProps, mapDispatchToProps)(App);