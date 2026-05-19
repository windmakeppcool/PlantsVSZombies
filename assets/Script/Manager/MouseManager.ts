import { _decorator, Component, EventMouse, find, Input, input, instantiate, Node, Prefab, Vec3 } from 'cc';
import { Plant } from '../Plant';
import { PlantType } from '../Enum';
import { Cell } from './Cell';
const { ccclass, property } = _decorator;

@ccclass('MouseManager')
export class MouseManager extends Component {
    private static _instance: MouseManager | null = null;
    @property([Prefab]) public plantPrefabArray: Prefab[] = [];
    
    private currentPlant: Node | null = null!;
    public static get Instance(): MouseManager {
        return this._instance!;
    }
    
    protected onLoad(): void {
        if (MouseManager._instance === null) {
            MouseManager._instance = this;
        } else {
            console.log("MouseManager is already exists");
            this.node.destroy();
            return;
        }

        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    onCellClick(cell: Cell) {
        if (this.currentPlant === null) return;
        let isSuccess = cell.addPlant(this.currentPlant);
        if (isSuccess)
            this.currentPlant = null;
    }
    
    onMouseMove(event: EventMouse) {
        this.followCursor(event);
    }

    followCursor(event: EventMouse) {
        let mousePos = event.getUILocation();
        let worldPos = new Vec3(mousePos.x, mousePos.y, 0);
        if (this.currentPlant !== null)
            this.currentPlant.setWorldPosition(worldPos);
    }

    addPoint(plantType: PlantType, event: EventMouse): boolean{
        if (this.currentPlant !== null)
            return false;
        let plantPrefab = this.getPlantPrefab(plantType);
        if (plantPrefab === null) {
            console.log("要种植的植物预制体不存在");
            return false;
        }
        this.currentPlant = plantPrefab;
        this.currentPlant.parent = find("Canvas/Game");
        this.followCursor(event);
        return true;
    }

    getPlantPrefab(plantType: PlantType): Node {
        for (const plantPrefab of this.plantPrefabArray) {
            let plantNode = instantiate(plantPrefab);
            if (plantNode.getComponent(Plant)?.plantType === plantType) {
                return plantNode;
            } else {
                plantNode.destroy();
            }
        }
        return;
    }
}

