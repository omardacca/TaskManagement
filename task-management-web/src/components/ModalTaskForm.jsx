import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Dropdown } from 'react-bootstrap';
import { deleteTimeTask, deleteSeverityTask, updateTimeTask, updateSeverityTask } from '../repos/TimeTaskRepo'
import { withRouter } from 'react-router-dom';
import TimeTask from '../models/TimeTask';
import SeverityTask from '../models/SeverityTask';
import TaskSeverityEnum from '../CONSTS/enums/TaskSeverityEnum'
import '../css/ModalTaskForm.css';

class ModalTaskForm extends Component {
    state = { 
        data: {
            timeTaskObject: new TimeTask(this.props.formData),
            severityTaskObject: new SeverityTask(this.props.formData),
        },
        taskType: 'timeTask',
        isFormLocked: true,
     }

     cloneTaskBasedOnType() {
         switch(this.state.taskType) {
             case 'timeTask':
                return new TimeTask(this.state.data.timeTaskObject);
             case 'severityTask':
               return new SeverityTask(this.state.data.severityTaskObject);
           default: 
               return null;
        }
    }
    
    updateTaskObjectState(value) {
        const newDataState = {...this.state.data};
       switch(this.state.taskType) {
            case 'timeTask':
               newDataState.timeTaskObject = value;
               break;
            case 'severityTask':
               newDataState.severityTaskObject = value;
               break;
           default: 
               return null;
           }

           console.log(`rrrrr ${JSON.stringify(newDataState)}`);

           this.setState({data: newDataState});
    }

    transformTimeTaskObject() {
       return {
           Id: this.state.data.timeTaskObject.id,
           Title: this.state.data.timeTaskObject.title,
           Description: this.state.data.timeTaskObject.description,
           StartDate: this.state.data.timeTaskObject.startDate,
           EndDate: this.state.data.timeTaskObject.endDate,
        };
    }

    transformSeverityTaskObject() {
       return {
           Id: this.state.data.timeTaskObject.id,
           Title: this.state.data.severityTaskObject.title,
           Description: this.state.data.severityTaskObject.description,
           Severity: this.state.data.severityTaskObject.severity,
        };
    }

    TransformTaskObject(taskObject) {
       switch(this.state.taskType) {
            case 'timeTask':
               return this.transformTimeTaskObject(taskObject)
            case 'severityTask':
               return this.transformSeverityTaskObject(taskObject);
          default: 
              return null;
       }
    }
    
    updateTaskBasedOnType(taskObjectToPost) {
        if(this.state.taskType === 'timeTask') {
            updateTimeTask(taskObjectToPost.Id, taskObjectToPost);
        } else if(this.state.taskType === 'severityTask') {
            updateSeverityTask(taskObjectToPost.Id, taskObjectToPost);
        }
    }

    async saveTask() {
        const taskObject = this.cloneTaskBasedOnType();
        if(!taskObject) { return null; }
        
        taskObject.validate();
        this.updateTaskObjectState(taskObject);
        
        if(!taskObject.validation.isValid) { return; }
        
       const taskObjectToPost = this.TransformTaskObject(taskObject);
       
       /*const res = */await this.updateTaskBasedOnType(taskObjectToPost);

       // call response validator 
       this.props.history.push('/tasks');
    }

    switchLock = () => this.setState({ isFormLocked: !this.state.isFormLocked})

    componentDidMount() {
        this.setState({ taskType: this.props.formData.severity > -1 ? 'severityTask' : 'timeTask' })
        const clonedDataState = {...this.state.data};
        if(this.state.taskType === 'timeTask') {
            clonedDataState.timeTaskObject = new TimeTask(this.props.formData);
        } else {
            clonedDataState.severityTaskObject = new SeverityTask(this.props.formData);
        }
        this.setState({ data: clonedDataState });
    }

    handleDelete = async () => {
        if(this.state.taskType === 'timeTask') {
            await deleteTimeTask(this.state.data.id);
        } else {
            await deleteSeverityTask(this.state.data.id);
        }

        this.props.history.push('/');
    }

    handleFieldChange = (field, value) => {
        const clonedObj = this.cloneTaskBasedOnType();
        console.log(`cloned: ${JSON.stringify(clonedObj)}`)
        clonedObj[field] = value;
        this.updateTaskObjectState(clonedObj);
    }
    
    render() { 
        return ( 
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">
                            Title
                        </label>
                        <input ref={this.title} id="title" value={this.state.taskType === 'taskType' ? this.state.data.timeTaskObject.title : this.state.data.severityTaskObject.title} type="text" onChange={(e) => {this.handleFieldChange('title', e.currentTarget.value)}} className="form-control" disabled={this.state.isFormLocked ? true : false} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">
                            Description
                        </label>
                        <input ref={this.description} id="description" value={this.state.taskType === 'taskType' ? this.state.data.timeTaskObject.description : this.state.data.severityTaskObject.description} type="text" onChange={(e) => {this.handleFieldChange('description', e.currentTarget.value)}} className="form-control" disabled={this.state.isFormLocked ? true : false}/>
                    </div>
                    
                    {
                        this.state.taskType === 'timeTask' &&
                        <React.Fragment>
                            <div className="form-group">
                                <label htmlFor="startDate">
                                    Start Date: 
                                </label>
                                <DatePicker
                                    ref={this.startDate}
                                    disabled={this.state.isFormLocked ? true : false}
                                    className="form-control"
                                    id="startDate"
                                    selected={this.state.data.timeTaskObject.startDate || this.state.data.severityTaskObject.startDate} 
                                    onChange={(date) => {this.handleFieldChange('startDate', date)}}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate">
                                    End Date: 
                                </label>
                                <DatePicker
                                    ref={this.endDate}
                                    disabled={this.state.isFormLocked ? true : false}
                                    className="form-control"
                                    id="endDate"
                                    selected={this.state.data.timeTaskObject.endDate || this.state.data.severityTaskObject.endDate} 
                                    onChange={(date) => {this.handleFieldChange('endDate', date)}}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                            </div>
                    </React.Fragment>
                    }
                    <div>    
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.taskType === 'severityTask' && this.state.data.severity > 0 ?
                                TaskSeverityEnum[this.state.data.severity] : "Severity"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            { Object.keys(TaskSeverityEnum).map((key) => {
                                return <Dropdown.Item key={key} onClick={() => {this.handleFieldChange('severity', parseInt(key))}}>{TaskSeverityEnum[key]}</Dropdown.Item>
                            }) }
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                </form>

                <div className="buttons-group">
                    <button type="button" className="btn btn-success" onClick={()=>this.switchLock()}>Edit</button>
                    <button type="button" className="btn btn-primary middle" disabled={this.state.isFormLocked ? true : false} onClick={()=>{this.saveTask()}}>Save</button>
                    <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                </div>

            </div>
         );
    }
}
 
export default withRouter(ModalTaskForm);