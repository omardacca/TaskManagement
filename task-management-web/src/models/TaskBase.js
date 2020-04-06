
export default class TaskBase {
    constructor(TaskObject) {
        this.id = TaskObject.id;
        this.title = TaskObject.title || '';
        this.description = TaskObject.description || '';
        
        this.validation = {
            isValid: true,
            errors: { } // i.e: { title: "Title is required", .... })
        }
    }

    validate() {
        if(!this.title || typeof this.title !== "string") {
            this.validation.isValid = false;
            this.validation.errors.title = "Title is required";
        }

        if(!this.description || typeof this.description !== "string") {
            this.validation.isValid = false;
            this.validation.errors.description = "Description is required";
        }
    }

}