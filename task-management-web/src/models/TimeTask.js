import TaskBase from './TaskBase';

export default class TimeTask extends TaskBase {
    constructor(TaskObject) {
        super(TaskObject);

        this.startDate = TaskObject.startDate || new Date();
        this.endDate = TaskObject.endDate || new Date();
    }

    validate() {
        super.validate();
        const startTime = this.startDate ? this.startDate.getTime() : null;
        const endTime = this.endDate ? this.endDate.getTime() : null;

        if(!startTime || isNaN(startTime)) {
            this.validation.isValid = false;
            this.validation.errors.startDate = "Invalid start date";
        } 
        
        if(!endTime || isNaN(endTime)) {
            this.validation.isValid = false;
            this.validation.errors.endDate = "Invalid end date";
        }

        if(this.startDate && this.endDate && startTime && endTime && (endTime < startTime)) {
            this.validation.isValid = false;
            this.validation.errors.startDate = "Start date must be less than end date";
            this.validation.errors.endDate = "End date must be higher than start date";
        }
    }
}