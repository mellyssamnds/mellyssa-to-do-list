import { v4 as uuidv4} from 'uuid';

export class Task {
    id: string;
    title: string;
    description: string;
    status: `OPENED` | `CLOSED`;

    constructor(title: string, description: string) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.status = `OPENED`;
    }
}