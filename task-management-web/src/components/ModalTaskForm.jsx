import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { deleteTimeTask } from '../repos/TimeTaskRepo'
import '../css/ModalTaskForm.css';

class ModalTaskForm extends Component {
    state = { 
        data: {
            id: 0,
            title: null,
            description: null,
            startDate: new Date(),
            endDate: new Date(),
        },
        isFormLocked: true,
     }

    switchLock = () => this.setState({ isFormLocked: !this.state.isFormLocked})

    componentDidMount() {
        this.setState({ data: this.props.formData });
    }

    handleDelete = async () => {
        await deleteTimeTask(this.state.data.id);
    }
    
    render() { 
        return ( 
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">
                            Title
                        </label>
                        <input ref={this.title} id="title" value={this.state.data.title} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">
                            Description
                        </label>
                        <input ref={this.description} id="description" value={this.state.data.description} type="text" className="form-control" disabled={this.state.isFormLocked ? true : false}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="startDate">
                            Start Date: 
                        </label>
                        <DatePicker
                            ref={this.startDate}
                            disabled={this.state.isFormLocked ? true : false}
                            className="form-control"
                            id="startDate"
                            selected={this.state.data.startDate ? new Date(this.state.data.startDate) : new Date()} 
                            onChange={date => this.setState({ data: {...this.state.data, startDate: date || (new Date())}})}
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
                            selected={this.state.data.endtDate ? new Date(this.state.data.endtDate) : new Date()} 
                            onChange={date => this.setState({ data: {...this.state.data, endDate: date || (new Date())}})}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            />
                    </div>
                </form>

                <button type="button" class="btn btn-success" onClick={()=>this.switchLock()}>Edit</button>
                <button type="button" class="btn btn-danger middle" onClick={this.handleDelete}>Delete</button>
                <button type="button" class="btn btn-primary" onClick={()=>this.switchLock()}>Save</button>

            </div>
         );
    }
}
 
export default ModalTaskForm;