import { _decorator, Component, EventMouse, Node } from 'cc';
import { MouseManager } from './MouseManager';
const { ccclass, property } = _decorator;

@ccclass('Cell')
export class Cell extends Component {
    public currentPlant: Node | null = null;
    protected onLoad(): void {
        this.node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    onMouseDown(event: EventMouse) {
        MouseManager.Instance.onCellClick(this);
    }

    onMouseMove(event: EventMouse) {
        MouseManager.Instance.followCursor(event);
    }

    addPlant(plant: Node): boolean {
        if (this.currentPlant != null) return false;
        this.currentPlant = plant;
        this.currentPlant.setPosition(this.node.position);
        return true;
    }
}

