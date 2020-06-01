import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom"
import {IGroupLead} from "../../shared/services/group/group.models";
import {getLead} from "../../shared/services/group/group.service";

function GroupLead() {
    const [lead, setLead] = useState<IGroupLead>()
    const { alias } = useParams();

    useEffect(()=> {
        alias && initGroupLeadList(alias);
    }, [])

    const initGroupLeadList = async (alias: string) => {
        const lead: IGroupLead | undefined = await getLead(alias);
        setLead(lead);
    };

    return <div>
        { lead &&
            <ul>
                <li>
                    <p>{lead.nome} - {lead.phone}</p>
                </li>
            </ul>
        }
        <Link to="/lideres">Voltar</Link>
    </div>
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
        //clickButton
    }, dispatch);

const mapStateToProps = (store: any) => ({
    // newValue: store.clickState.newValue
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupLead);