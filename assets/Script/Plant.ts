import { _decorator, animation, Animation, Component, Enum, Node } from 'cc';
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
                this.enableUpdate(deltaTime);
                break;
        }
    }

    disableUpdate() {

    }

    enableUpdate(deltaTime: number) {
        
    }

    transferToDisable() {
        this.planeState = PlantStatue.Disable;
        const anim = this.getComponent(animation.AnimationController);
        if (anim) {
            anim.enabled = false;
        }
    }

    transferToEnable() {
        this.planeState = PlantStatue.Enable;
        const anim = this.getComponent(animation.AnimationController);
        if (anim) {
            anim.enabled = true;
        }
    }


}

