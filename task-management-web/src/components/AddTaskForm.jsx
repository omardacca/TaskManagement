import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { withRouter} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { addTimeTask, addSeverityTask } from '../repos/TimeTaskRepo';
import '../css/AddTask.css'
import TaskTypes from '../CONSTS/enums/TaskTypes';
import TimeTask from '../models/TimeTask';
import SeverityTask from '../models/SeverityTask';
import TaskSeverityEnum from '../CONSTS/enums/TaskSeverityEnum'

class AddTaskForm extends Component {
    state = { 
        taskType: TaskTypes.TimeTask,
        data: {
            timeTaskObject: new TimeTask({}),
            severityTaskObject: new SeverityTask({}),
        }
     }
     
     cloneTaskBasedOnType() {
         switch(this.state.taskType) {
             case TaskTypes.TimeTask:
                return new TimeTask(this.state.data.timeTaskObject);
            case TaskTypes.SeverityTask:
                return new SeverityTask(this.state.data.severityTaskObject);
            default: 
                return null;
         }
     }
     
     updateTaskObjectState(value) {
         const newDataState = {...this.state.data};
        switch(this.state.taskType) {
            case TaskTypes.TimeTask:
                newDataState.timeTaskObject = value;
                break;
           case TaskTypes.SeverityTask:
                newDataState.severityTaskObject = value;
                break;
            default: 
                return null;
            }

            this.setState({ ...this.state.data, data: newDataState});
     }

     transformTimeTaskObject() {
        return {
            Title: this.state.data.timeTaskObject.title,
            Description: this.state.data.timeTaskObject.description,
            StartDate: this.state.data.timeTaskObject.startDate,
            EndDate: this.state.data.timeTaskObject.endDate,
         };
     }

     transformSeverityTaskObject() {
        return {
            Title: this.state.data.severityTaskObject.title,
            Description: this.state.data.severityTaskObject.description,
            Severity: this.state.data.severityTaskObject.severity,
         };
     }

     TransformTaskObject(taskObject) {
        switch(this.state.taskType) {
            case TaskTypes.TimeTask:
                return this.transformTimeTaskObject(taskObject)
           case TaskTypes.SeverityTask:
                return this.transformSeverityTaskObject(taskObject);
           default: 
               return null;
        }
     }
     
     async addTaskBasedOnType(taskObjectToPost) {
        switch(this.state.taskType) {
            case TaskTypes.TimeTask:
                return await addTimeTask(taskObjectToPost);
           case TaskTypes.SeverityTask:
               return await addSeverityTask(taskObjectToPost);
           default: 
               return null;
        }
     }
     
     async saveTask() {
         const taskObject = this.cloneTaskBasedOnType();
         if(!taskObject) { return null; }
         
         taskObject.validate();
         this.updateTaskObjectState(taskObject);
         
         if(!taskObject.validation.isValid) { return; }
         
        const taskObjectToPost = this.TransformTaskObject(taskObject);
        
        /*const res = */await this.addTaskBasedOnType(taskObjectToPost);

        // call response validator 
        this.props.history.push('/tasks');
     }


     handleFieldChange = (field, value) => {
         const clonedObj = this.cloneTaskBasedOnType();
         clonedObj[field] = value;
         this.updateTaskObjectState(clonedObj);
     }

     render() { 
        return ( 
            <React.Fragment>
            <div>
                <div className="form-group">
                    <input className="form-check form-check-inline" type="radio" name="timeTask" id="timeTask" value={TaskTypes.TimeTask} onClick={() => this.setState({taskType: TaskTypes.TimeTask })} readOnly checked={this.state.taskType === TaskTypes.TimeTask} />
                    <label className="form-check-label" htmlFor="timeTask">
                        Time Task
                    </label>
                </div>
                <div className="form-group">
                    <input className="form-check form-check-inline" type="radio" name="severityTask" id="severityTask" value={TaskTypes.SeverityTask} onClick={() => this.setState({taskType: TaskTypes.SeverityTask })} readOnly  checked={this.state.taskType === TaskTypes.SeverityTask} />
                    <label className="form-check-label" htmlFor="severityTask">
                        Severity Task
                    </label>
                </div>
                <form>
                    { 
                        this.state.taskType === TaskTypes.TimeTask && 
                        <React.Fragment>
                            <div className="form-group">
                                <label htmlFor="title">
                                    Title
                                </label>
                                <input id="title" value={this.state.data.timeTaskObject.title} onChange={(e) => {this.handleFieldChange('title', e.currentTarget.value)}} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false} />
                                {this.state.data.timeTaskObject.validation.errors.title && <div className="alert alert-danger">{this.state.data.timeTaskObject.validation.errors.title}</div>}
                            </div>
                    
                            <div className="form-group">
                                <label htmlFor="description">
                                    Description
                                </label>
                                <input id="description" value={this.state.data.timeTaskObject.description} onChange={(e) => {this.handleFieldChange('description', e.currentTarget.value)}} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false}/>
                                {this.state.data.timeTaskObject.validation.errors.description && <div className="alert alert-danger">{this.state.data.timeTaskObject.validation.errors.description}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">
                                    Start Date: 
                                </label>
                                <DatePicker                                
                                    disabled={this.state.isFormLocked ? true : false}
                                    className="form-control"
                                    id="startDate"
                                    selected={this.state.data.timeTaskObject.startDate} 
                                    onChange={(date) => {this.handleFieldChange('startDate', date)}}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                {this.state.data.timeTaskObject.validation.errors.startDate && <div className="alert alert-danger">{this.state.data.timeTaskObject.validation.errors.startDate}</div>}
                            </div>

                            <div className="form-group">
                            <label htmlFor="endDate">
                                End Date: 
                            </label>
                            <DatePicker
                                disabled={this.state.isFormLocked ? true : false}
                                className="form-control"
                                id="endDate"
                                selected={this.state.data.timeTaskObject.endDate}    
                                onChange={(date) => {this.handleFieldChange('endDate', date)}}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            { this.state.data.timeTaskObject.validation.errors.endDate && <div className="alert alert-danger">{this.state.data.timeTaskObject.validation.errors.endDate}</div>}
                        </div>
                        </React.Fragment>
                    }

                    {
                        this.state.taskType === TaskTypes.SeverityTask && 
                        <React.Fragment>
                            <div className="form-group">
                                <label htmlFor="title">
                                    Title
                                </label>
                                <input id="title" value={this.state.data.severityTaskObject.title} onChange={(e) => {this.handleFieldChange('title', e.currentTarget.value)}} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false} />
                                {this.state.data.severityTaskObject.validation.errors.title && <div className="alert alert-danger">{this.state.data.severityTaskObject.validation.errors.title}</div>}
                            </div>
                
                            <div className="form-group">
                                <label htmlFor="description">
                                    Description
                                </label>
                                <input id="description" value={this.state.data.severityTaskObject.description} onChange={(e) => {this.handleFieldChange('description', e.currentTarget.value)}} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false}/>
                                {this.state.data.severityTaskObject.validation.errors.description && <div className="alert alert-danger">{this.state.data.severityTaskObject.validation.errors.description}</div>}
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.data.severityTaskObject.severity > -1 ?
                                        TaskSeverityEnum[this.state.data.severityTaskObject.severity] : "Severity"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    { Object.keys(TaskSeverityEnum).map((key) => {
                                        return <Dropdown.Item key={key} onClick={() => {this.handleFieldChange('severity', parseInt(key))}}>{TaskSeverityEnum[key]}</Dropdown.Item>
                                    }) }
                                </Dropdown.Menu>
                            </Dropdown>
                        {this.state.data.severityTaskObject.validation.errors.severity && <div className="alert alert-danger">{this.state.data.severityTaskObject.validation.errors.severity}</div>}
                        </React.Fragment>
                    }
                </form>
                
                <button type="button" className="btn btn-primary submitButton" onClick={()=>this.saveTask()}>Save Task</button>
                
            </div>
            </React.Fragment>
         );
    }
}
 
export default withRouter(AddTaskForm);