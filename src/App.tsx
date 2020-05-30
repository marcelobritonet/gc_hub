import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SwitchRoute from "./shared/components/switch-route/SwitchRoute";
import Navigation from "./shared/components/navigation/Navigation";

function App() {
  return (
      <Router>
        <div>
          <Title>Hub GC</Title>
          <Navigation/>
          <SwitchRoute />
        </div>
      </Router>
  );
}

const Title = styled.div`
    font-size: 20px
`;

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
      // clickButton
    }, dispatch);

const mapStateToProps = (store: any) => ({
  // newValue: store.clickState.newValue
});

export default connect(mapStateToProps, mapDispatchToProps)(App);