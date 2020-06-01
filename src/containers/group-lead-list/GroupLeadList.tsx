import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getGroupLeadList} from "../../shared/services/group/group.service";
import {IGroupLead} from "../../shared/services/group/group.models";
import {Link} from "react-router-dom";
import styled from "styled-components";

function GroupLeadList() {
    // TODO: LISTAR OS GCS DE CADA LIDER
    const [leadGroupList, setLeadGroupList] = useState<IGroupLead[] | undefined>(undefined);

    useEffect(() => {
        initGroupLeadList();
    }, []);

    const initGroupLeadList = async () => {
        const list: IGroupLead[] = await getGroupLeadList();
        setLeadGroupList(list)
    };

    return (
        <div>
            <Title>Líderes</Title>
            <ul>
                {
                    leadGroupList && leadGroupList.map((list: IGroupLead, index: number) =>
                        <li key={index}>
                            <p><Link to={`lider/${list.alias}`}>{list.nome}</Link> - {list.phone}</p>
                        </li>
                    )
                }
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupLeadList);