import { _decorator, Component, Enum, Node } from 'cc';
import { PlantType, PlantStatue } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('Plant')
export class Plant extends Component {
    @property({type: Enum(PlantType)}) public plantType: PlantType = PlantType.SunFlower;

    planeState: PlantStatue = PlantStatue.Disable;
    start() {

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
}

