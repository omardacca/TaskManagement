import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Dropdown } from 'react-bootstrap';
import { addTimeTask } from '../repos/TimeTaskRepo';
import '../css/AddTask.css'

class AddTaskForm extends Component {
    state = { 
        taskType: "timeTask",
        data: {
            title: null,
            description: null,
            startDate: null,
            endDate: null,
            severity: 0,
        },
        errors: {
        }
     }

     validate = () => {
         const errors = {}
         
         const { data } = this.state;
         if(!data.title || data.title.trim() === "") {
             errors.title = "Title is required"; 
         }
         
         if(!data.description || data.description.trim() === "") {
            errors.description = "Description is required"; 
        }

        if(data.endDate <= data.startDate) {
            errors.startDate = "Start date must be < End date"
            errors.endDate = "End date must be > Start date"
        }

        return Object.keys(errors).length === 0 ? null : errors;
     }
     
     async saveTask() {

         const errors = this.validate();
         this.setState({ errors: errors || {} });

         if(errors) return;

         const taskObjectToPost = {
            Title: this.state.data.title,
            Description: this.state.data.description,
         }
         if(this.state.taskType === 'taskType') {
            taskObjectToPost.StartDate = this.state.data.startDate;
            taskObjectToPost.EndDate = this.state.data.endDate;
         } else {
            taskObjectToPost.Severity = this.state.data.severity;
         }

         await addTimeTask(taskObjectToPost);
     }


     handleTitleChange = e => {
         const obj = { ...this.state.data };
         obj.title = e.currentTarget.value;
         this.setState({data: obj});
     }

     handleDescriptionChange = e => {
        const obj = { ...this.state.data };
        obj.description = e.currentTarget.value;
        this.setState({data: obj});
    }

    handleStartDateChange = date => {
        const obj = { ...this.state.data };
        obj.startDate = date;
        this.setState({data: obj});
    }

    handleEndDateChange = date => {
        const obj = { ...this.state.data };
        obj.endDate = date;
        this.setState({data: obj});
    }

    
     


     render() { 
        return ( 
            <React.Fragment>
            <div>
                <div className="form-group">
                    <input class="form-check form-check-inline" type="radio" name="timeTask" id="timeTask" value="timeTask" onClick={() => this.setState({taskType: 'timeTask' })} checked={this.state.taskType === "timeTask"} />
                    <label class="form-check-label" for="timeTask">
                        Time Task
                    </label>
                </div>
                <div class={this.state.taskType === 'timeTask' ? 'show' : 'hide' }>
                    <form>
                        <div className="form-group">
                            <input class="form-check form-check-inline" type="radio" name="severityTask" id="severityTask" value="severityTask" onClick={() => this.setState({taskType: 'severityTask' })}  checked={this.state.taskType === "severityTask"} />
                            <label class="form-check-label" for="severityTask">
                                Severity Task
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">
                                Title
                            </label>
                            <input id="title" value={this.state.data.title} onChange={this.handleTitleChange} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false} />
                            {this.state.errors.title && <div className="alert alert-danger">{this.state.errors.title}</div>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="description">
                                Description
                            </label>
                            <input id="description" value={this.state.data.description} onChange={this.handleDescriptionChange} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false}/>
                            {this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="startDate">
                                Start Date: 
                            </label>
                            <DatePicker                                
                                disabled={this.state.isFormLocked ? true : false}
                                className="form-control"
                                id="startDate"
                                selected={this.state.data.startDate ? this.state.data.startDate : new Date()} 
                                onChange={(date) => {this.handleStartDateChange(date)}}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            {this.state.errors.startDate && <div className="alert alert-danger">{this.state.errors.startDate}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="endDate">
                                End Date: 
                            </label>
                            <DatePicker
                                disabled={this.state.isFormLocked ? true : false}
                                className="form-control"
                                id="endDate"
                                selected={this.state.data.endDate ? this.state.data.endDate : new Date()}    
                                onChange={(date) => {this.handleEndDateChange(date)}}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            { this.state.errors.endDate && <div className="alert alert-danger">{this.state.errors.endDate}</div>}
                        </div>
                    </form>
                </div>


                <div class={this.state.taskType === 'severityTask' ? 'show' : 'hide' }>
                    <form>
                        <div className="form-group">
                            <input class="form-check form-check-inline" type="radio" name="severityTask" id="severityTask" value="severityTask" onClick={() => this.setState({taskType: 'severityTask' })}  checked={this.state.taskType === "severityTask"} />
                            <label class="form-check-label" for="severityTask">
                                Severity
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">
                                Title
                            </label>
                            <input id="title" value={this.state.data.title} onChange={this.handleTitleChange} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false} />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="description">
                                Description
                            </label>
                            <input id="description" value={this.state.data.description} onChange={this.handleDescriptionChange} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false}/>
                        </div>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Severity
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {this.setState({ data: {...this.state.data, severity: 0 }})}}>Low</Dropdown.Item>
                                <Dropdown.Item onClick={() => {this.setState({ data: {...this.state.data, severity: 1 }})}}>Medium</Dropdown.Item>
                                <Dropdown.Item onClick={() => {this.setState({ data: {...this.state.data, severity: 2 }})}}>High</Dropdown.Item>
                                <Dropdown.Item onClick={() => {this.setState({ data: {...this.state.data, severity: 3 }})}}>Red</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </form>
                </div>
                
                <button type="button" class="btn btn-primary submitButton" disabled={ Object.keys(this.state.errors.length === 0) ? false : true } onClick={()=>this.saveTask()}>Save Task</button>
                
            </div>
            </React.Fragment>
         );
    }
}
 
export default AddTaskForm;