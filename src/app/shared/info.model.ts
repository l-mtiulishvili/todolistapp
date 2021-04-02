export class Info {
    id: number;
    title: string;
    content: string;
    done: boolean;
    /*
    public constructor(init?: Partial<Info>){
        Object.assign(this, init);
    }
    */
    public constructor(id: number, title: string, content: string, done: boolean) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.done = done;
    }
}
