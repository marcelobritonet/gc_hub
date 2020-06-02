import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {IGroup, IGroupLead} from "../../shared/services/group/group.models";
import {getGroupList} from "../../shared/services/group/group.service";
import styled from "styled-components";
import {Link} from "react-router-dom";

function GroupList() {
    // TODO: LISTAR OS LIDERES DE CADA GC
    // TODO: MONTAR A DATA DO ENCONTRO
    // TODO: ORDENAR POR DATA DE ENCONTRO
    // TODO: ORDENAR POR "PROXIMO ENCONTRO"
    // TODO: FILTRAR POR "groupName"
    const [groupList, setGroupList] = useState<IGroup[] | undefined>();

    useEffect(() => {
        initGroupList();
    }, []);

    const initGroupList = async () => {
        const list: IGroup[] = await getGroupList();
        setGroupList(list)
    };

    return (
        <Wrapper>
            <PageTitle>Grupos de Crescimento</PageTitle>
            <List>
                {
                    groupList && groupList.map((list: IGroup, index: number) =>
                        <Group key={index}>
                            <Title>{list.name} | {list.groupName}</Title>
                            <Reunion>{ list.reunion }</Reunion>
                            <Address>{list.address} <br/>{ list.complement }</Address>
                            <Leads>
                                { list.groupLeads.map((lead: IGroupLead, index: number) =>
                                    <Lead key={index}>
                                        <Link to={`lider/${lead.alias}`}>{lead.nome}</Link> - {lead.phone}
                                    </Lead>
                                )}
                            </Leads>

                        </Group>
                    )
                }
            </List>`
        </Wrapper>

    )
}

const Wrapper = styled.div``;

const PageTitle = styled.h2``;

const List = styled.ul``;

const Group = styled.li``;

const Title = styled.h3``;

const Address = styled.p``;

const Leads = styled.ul``;

const Lead = styled.li``;

const Reunion = styled.span``;

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
        //clickButton
    }, dispatch);

const mapStateToProps = (store: any) => ({
    // newValue: store.clickState.newValue
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
