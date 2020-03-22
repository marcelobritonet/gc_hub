import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getGroupLeadList, IGroupeLead} from './group-list.service';

function GroupList() {
    const [leadGroupList, setLeadGroupList] = useState<IGroupeLead[] | undefined>(undefined);

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        const list: IGroupeLead[] = await getGroupLeadList();
        setLeadGroupList(list)
    };

    return (
        <div>
            <h2>Líderes</h2>
            <ul>
                {
                    leadGroupList && leadGroupList.map((list: IGroupeLead, index: number) =>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);