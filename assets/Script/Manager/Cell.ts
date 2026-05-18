import { _decorator, Component, EventMouse, Node } from 'cc';
import { MouseManager } from './MouseManager';
const { ccclass, property } = _decorator;

@ccclass('Cell')
export class Cell extends Component {
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
}

