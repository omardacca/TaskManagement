
import axios from 'axios';


const apiEndpoint = "https://localhost:44341/api/";

axios.defaults.baseURL = 'http://myurl';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export async function getAllTimeTasks() {
    const res = await axios.get(apiEndpoint + 'timetask');
    console.log(res);
    return res;
}

export async function addTimeTask(taskObject) {
    const res = await axios.post(apiEndpoint + 'timetask', taskObject);
    console.log(`addTimeTask, ${JSON.stringify(res)} `);
}

export async function deleteTimeTask(taskId) {
    const res = await axios.delete(apiEndpoint + `timetask/${taskId}`);
    console.log(`deleteTimeTask, ${JSON.stringify(res)}`);
}