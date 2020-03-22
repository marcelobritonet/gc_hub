import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function GroupList() {
    return (
        <div>ListaGrupos</div>
    )
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
        //clickButton
    }, dispatch);

const mapStateToProps = (store: any) => ({
    // newValue: store.clickState.newValue
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);