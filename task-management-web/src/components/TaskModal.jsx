import React, { Component } from 'react';

class TaskModal extends Component {
    state = { 
        visible: this.props.visible
     }
    render() { 

        return ( 
            <div>
                <div>
                    {this.props.children}
                </div>
            </div>
         );
    }
}
 
export default TaskModal;