import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function Home() {
    return (
        <div>Home</div>
    )
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
        //clickButton
    }, dispatch);

const mapStateToProps = (store: any) => ({
    // newValue: store.clickState.newValue
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);