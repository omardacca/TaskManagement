import TaskBase from './TaskBase';
import TaskSeverityEnum from '../CONSTS/enums/TaskSeverityEnum';

export default class SeverityTask extends TaskBase {
    constructor(TaskObject) {
        super(TaskObject);

        this.severity = TaskObject.severity || -1;
    }

    validate() {
        if(!this.severity || 
            (typeof this.severity === "string" && +this.severity === -1) ||
            this.severity === -1) {
                this.validation.isValid = false;
                this.validation.errors.severity = "Invalid severity1";
        } else if(typeof this.severity === "number" &&
                (TaskSeverityEnum[this.severity] === undefined || TaskSeverityEnum[this.severity] === null)) {
                    this.validation.isValid = false;
                    this.validation.errors.severity = "Invalid severity";
        }
        
    }
}