import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {IGroup} from "./group-list.models";
import {getGroupList} from "./group-list.service";

function GroupList() {
    const [groupList, setGroupList] = useState<IGroup[] | undefined>(undefined);

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
                            <p>{list.nome}</p>
                            <p>{list.endereco}</p>
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