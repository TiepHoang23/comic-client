//IComponent

import { Component, Injectable } from "@angular/core";
import { ComponentMgr } from "./ComponentMgr";
@Injectable()
export abstract class IComponent {

    constructor() {
        ComponentMgr.getInstance().AddComponent(this);
    }
    RegisterEvent() {

    }

    ngOnDestroy() {

        ComponentMgr.getInstance().RemoveComponent(this);
    }


}