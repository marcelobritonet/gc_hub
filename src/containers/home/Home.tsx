import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Título</h1>
            <Link to="/meugrupo">Conhecer meu GC</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);