// Create comonent manager

import { IComponent } from "./IComponent";

export class ComponentMgr {
    private static instance: ComponentMgr = new ComponentMgr();
    static getInstance() { return this.instance; }

    private components: IComponent[] = [];
    private constructor() {

    }

    // Add component
    AddComponent(component: IComponent) {
        this.components.push(component);
        // console.log(this.components);

    }

    // Remove component
    RemoveComponent(component: IComponent) {
        this.components.splice(this.components.indexOf(component), 1);

    }

} 
