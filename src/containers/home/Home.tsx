import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <h2>Grupo de Crescimento</h2>
            <p>Seja bem vindo. Conheça o seu Grupo de Conhecimento personalizado pra você.</p>
            <Link to="/meugrupo">Quero conhecer agora</Link>
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