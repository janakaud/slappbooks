import React from 'react';
import View from 'react-flexbox';
import {Intent, Position, Toaster, Button} from '@blueprintjs/core';
import transactionService from '../../../services/TransactionService';

/**
 *  This represents a @ViewEntityComponent. Entity details can be viewed in this tab mode. It has been designed to be used
 *  with the @ModifierView
 *  @author Malith Jayaweera
 */
class ViewEntityComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entityObjects : this.props.entityObjects,
            defaultCurrency : '',
            entityType: '',
            entityName: ''
        }
    }

    handleEntityChange = (e) => {
        let entityName = e.target.value;
        this.props.entityObjects.forEach(entity => {
            if(entity.entityName === entityName) {
                this.setState({
                    defaultCurrency: entity.defaultCurrency,
                    entityType: entity.entityType,
                    entityName: entity.entityName
                })
            }
        })
    };

    deleteEntity = () => {
        transactionService.deleteEntity(this.state.entityName);
        OurToaster.show({message: "Entity Deleted Successfully!"});
    };

    entityListSelect() {
        let entityList = [];
        let i=0;
        this.props.entityObjects.forEach(entity => {
            entityList.push(<option value={entity.entityName} key={i++}>{entity.entityName}</option>)
        });
        return entityList;
    }

    render() {
        return(
            <div>
            <View auto style={{
                flexDirection: 'row-inverse',
                padding: 0.2,
                alignItems: 'stretch',
                justifyContent: 'left'
            }}>
                <View column width="110px">
                    <label className="pt-label pt-inline"  htmlFor={"entity"}>
                        Entity
                        <div className="pt-select">
                            <select defaultValue={this.state.entity} onChange={e => this.handleEntityChange(e)} name={"entity"} >
                                {this.entityListSelect()}
                            </select>
                        </div>
                    </label>
                </View>
                <View column width="420px">
                    <label className="pt-label pt-inline" htmlFor="type">
                        Entity Type
                        <div className="pt-input" name={"type"}>
                            <input type={"text"} value={this.state.entityType} className={"pt-button"} disabled={true}></input>
                        </div>
                    </label>
                </View>
                <View column>
                    <label className="pt-label pt-inline" htmlFor="currency">
                        Default Currency
                        <div className="pt-input" name={"currency"}>
                            <input type={"text"} value={this.state.defaultCurrency} className={"pt-button"} disabled={true}></input>
                        </div>
                    </label>
                </View>
                <View column width={"30px"}>
                    <Button iconName="pt-icon-delete" className={"pt-small pt-intent-danger"} onClick={this.deleteEntity} text="Delete" />
                </View>
            </View>
        </div>);
    }

}

export default ViewEntityComponent;

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.PRIMARY
});