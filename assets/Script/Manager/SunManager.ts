import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SunManager')
export class SunManager extends Component {
    private static _instance: SunManager = null;
    @property(Number) private sunPoint: number = 0;
    @property(Label) private sunPointLbael: Label = null!;

    public static get Instance(): SunManager {
        return this._instance;
    }

    public get SunPoint(): number {
        return this.sunPoint;
    }
    
    protected onLoad(): void {
        if (SunManager._instance === null) {
            SunManager._instance = this;
        } else {
            console.log("SunManager is already exists");
            this.node.destroy();
            return;
        }
    }

    protected start(): void {
        this.updateSunPointLabel();
    }

    private updateSunPointLabel() {
        this.sunPointLbael.string = this.sunPoint.toString();
    }

    public subSunPoint(point: number) {
        this.sunPoint -= point;
        if (this.sunPoint <=0 ) {
            this.sunPoint = 0;
        }
        this.updateSunPointLabel();
    }

}

