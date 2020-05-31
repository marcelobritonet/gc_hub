import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import FindDestination from "../../shared/components/find-destination/FindDestination";

function MyGroup() {
    return (
        <div>
            <h2>Meu Grupo</h2>
            <FindDestination/>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
        //clickButton
    }, dispatch);

const mapStateToProps = (store: any) => ({
    // newValue: store.clickState.newValue
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGroup);