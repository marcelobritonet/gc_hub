import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styled from "styled-components";

function Home() {
    return (
        <div>
            <Title>Grupos de Crescimento Lagoinha Barra</Title>
            <Link to="/meugrupo">Quero conhecer o meu GC</Link>
        </div>
    )
}

const Title = styled.h2`
`;

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
        //clickButton
    }, dispatch);

const mapStateToProps = (store: any) => ({
    // newValue: store.clickState.newValue
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);