import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {IGroup, IGroupLead} from "../../shared/services/group/group.models";
import {getGroupList} from "../../shared/services/group/group.service";

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
        <div>
            <h2>Grupos de Crescimento</h2>
            <ul>
                {
                    groupList && groupList.map((list: IGroup, index: number) =>
                        <li key={index}>
                            <p>{list.name} - {list.groupName}</p>
                            <p>{list.address}</p>
                            <p>{ list.complement }</p>
                            { list.teamLead.map((lead: IGroupLead, index: number) =>
                                <p key={index}>{ lead.alias } / { lead.nome } / { lead.phone }</p>
                            )}
                            <p>{ list.data }</p>
                        </li>
                    )
                }
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
