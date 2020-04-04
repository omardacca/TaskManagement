import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getAllTimeTasks } from '../repos/TimeTaskRepo';
import ModalTaskForm from './ModalTaskForm';
import '../css/Tasks.css';

class Tasks extends Component {
    state = { 
        timeTasks: [],
        show: false,
        modalContentObject: null,
        lockForm: true,
    }

    async componentDidMount() {
        const res = await getAllTimeTasks();
        if(res && res.data) {
            this.setState({timeTasks: res.data });
        }
    }
    
    render() { 
        const setShow = (show) => this.setState({ show })
        const handleDelete = () => setShow(false);
        const handleShow = (taskObject) => {
            setShow(true);
            this.setState({ modalContentObject: taskObject })
        };

        return ( 
            <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.timeTasks.map(task => (
                    <tr class="table-row" onClick={() => handleShow(task)}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.startDate}</td>
                        <td>{task.endDate}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

            <>
            <Modal show={this.state.show} onHide={handleDelete}>
                <Modal.Header closeButton>
                <Modal.Title>Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalTaskForm lockForm={this.state.lockForm} formData={this.state.modalContentObject} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
            </div>
         );
    }
}
 
export default Tasks;