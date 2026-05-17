import { _decorator, Component, Enum, Node, Sprite } from 'cc';
import { SunManager } from './Manager/SunManager';
import { MouseManager } from './Manager/MouseManager';
import { CardState, PlantType } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    private cardState: CardState = CardState.Cooling; // 卡牌状态
    @property({type: Enum(PlantType)}) public plantType: PlantType = PlantType.None;

    @property(Node) public cardLight: Node = null!;
    @property(Node) public cardGary: Node = null!;
    @property(Sprite) public cardMask: Sprite = null!;
    @property(Number) public cdTime: number = 2; //冷却时间
    @property({type: Number, tooltip: "卡牌需要阳光"}) public needSunPoint: number = 50; // 需要阳光

    private cdTimer: number = 0; //卡牌冷却计时器
    
    start() {
        this.cdTimer = this.cdTime;
    }

    update(deltaTime: number) {
        switch (this.cardState) {
            case CardState.Cooling:
                this.CoolingUpdate(deltaTime);
                break;
            case CardState.WaitingSun:
                 this.WaitingSunUpdate();
                break;
            case CardState.Ready:
                this.ReadyUpdate();
                break;
        }
    }

    onClick() {
        if (this.needSunPoint > SunManager.Instance.SunPoint) {
            return;
        }
        // 消耗阳光
        MouseManager.Instance.addPoint(this.plantType);
        SunManager.Instance.subSunPoint(this.needSunPoint);
        this.transferToCooling();
    }

    private CoolingUpdate(dt: number) {
        this.cdTimer -= dt;
        this.cardMask.fillRange = -(this.cdTimer / this.cdTime);
        if (this.cdTimer <= 0) {
            this.transferToWaitingSun();
        }
    }

    private WaitingSunUpdate() {
        if (this.needSunPoint <= SunManager.Instance.SunPoint) {
            this.transferToReady();
        }
    }

    private ReadyUpdate() {
        if (this.needSunPoint > SunManager.Instance.SunPoint) {
            this.transferToWaitingSun();
        }
    }

    transferToWaitingSun() {
        this.cardState = CardState.WaitingSun;
        this.cardLight.active = false;
        this.cardGary.active = true;
        this.cardMask.node.active = false;
    }

    transferToReady() {
        this.cardState = CardState.Ready;
        this.cardLight.active = true;
        this.cardGary.active = false;
        this.cardMask.node.active = false;
    }

    transferToCooling() {
        this.cardState = CardState.Cooling;
        this.cardLight.active = false;
        this.cardGary.active = true;
        this.cardMask.node.active = true;
        this.cdTimer = this.cdTime;
    }
}




