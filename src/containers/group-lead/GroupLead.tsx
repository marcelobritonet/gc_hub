import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getGroupLeadList} from "./group-lead.service";
import {IGroupLead} from "./group-lead.models";

function GroupLead() {
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
            <h2>Líderes</h2>
            <ul>
                {
                    leadGroupList && leadGroupList.map((list: IGroupLead, index: number) =>
                        <li key={index}>
                            <p>{list.nome}</p>
                            <p>{list.telefone}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupLead);