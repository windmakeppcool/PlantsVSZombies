import { _decorator, Animation, Component, Enum, Node } from 'cc';
import { PlantType, PlantStatue } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('Plant')
export class Plant extends Component {
    @property({type: Enum(PlantType)}) public plantType: PlantType = PlantType.SunFlower;

    planeState: PlantStatue = PlantStatue.Disable;
    start() {
        this.transferToDisable();
    }

    update(deltaTime: number) {
        switch (this.planeState) {
            case PlantStatue.Disable:
                this.disableUpdate();
                break;
            case PlantStatue.Enable:
                this.enableUpdate();
                break;
        }
    }

    disableUpdate() {

    }

    enableUpdate() {
        
    }

    transferToDisable() {
        this.planeState = PlantStatue.Disable;
        const anim = this.getComponent(Animation);
        if (anim) {
            anim.enabled = false;
        }
    }
}

