
import axios from 'axios';


const apiEndpoint = "https://localhost:44341/api/";

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export async function getAllTasks() {
    const res = await axios.get(apiEndpoint + 'tasks');
    console.log(res);
    return res;
}

export async function getAllTimeTasks() {
    const res = await axios.get(apiEndpoint + 'timetask');
    console.log(res);
    return res;
}

export async function addTimeTask(taskObject) {
    const res = await axios.post(`${apiEndpoint}timetask`, taskObject);
    console.log(`addTimeTask, ${JSON.stringify(res)} `);
}

export async function addSeverityTask(taskObject) {
    console.log(`req: ${JSON.stringify(taskObject)}`)
    const res = await axios.post(`${apiEndpoint}severitytask`, taskObject);
    console.log(`addSeverityTask, ${JSON.stringify(res)} `);
}

export async function deleteTimeTask(taskId) {
    const res = await axios.delete(apiEndpoint + `timetask/${taskId}`);
    console.log(`deleteTimeTask, ${JSON.stringify(res)}`);
}

export async function deleteSeverityTask(taskId) {
    const res = await axios.delete(apiEndpoint + `severitytask/${taskId}`);
    console.log(`deleteSeverityTask, ${JSON.stringify(res)}`);
}

export async function updateTimeTask(taskId, updatedObject) {
    const res = await axios.patch(apiEndpoint + `timetask/${taskId}`, updatedObject);
    console.log(`updateTimeTask, ${JSON.stringify(res)}`);
}

export async function updateSeverityTask(taskId, updatedObject) {
    const res = await axios.patch(apiEndpoint + `severitytask/${taskId}`, updatedObject);
    console.log(`updateSeverityTask, ${JSON.stringify(res)}`);
}



