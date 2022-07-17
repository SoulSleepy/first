import React, { ChangeEvent } from 'react';
import style from'./ProfileInfo.module.css';

type PropsType = {
    status: string,
    updateUserStatus: (newStatus: string) => void
}
type StateType = {
    editMode: boolean,
    status: string
}

class ProfileStatusClass extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }
    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: event.currentTarget.value
        });
    }
    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode && 
                    <div>
                        <span onDoubleClick={this.activateEditMode} >{this.props.status || 'Your status'}</span>
                    </div>
                }
                {this.state.editMode && 
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatusClass;