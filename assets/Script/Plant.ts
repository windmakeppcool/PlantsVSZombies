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

    produceSun(num: number) {
        console.log(`produce sun is ${num}`);
    }
}

