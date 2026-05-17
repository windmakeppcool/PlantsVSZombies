import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { Plant } from '../Plant';
import { PlantType } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('MouseManager')
export class MouseManager extends Component {
    private static _instance: MouseManager | null = null;
    @property([Plant]) public plantPrefabArray: Plant[] = [];
    
    private currentPlant: Plant = null!;
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
    }

    addPoint(plantType: PlantType) {
        let plantPrefab = this.getPlantPrefab(plantType);
        if (plantPrefab === null) {
            console.log("要种植的植物预制体不存在");
            return;
        }
        this.currentPlant = instantiate(plantPrefab);
    }

    getPlantPrefab(plantType: PlantType): Plant | null {
        for (const plant of this.plantPrefabArray) {
            if (plant.plantType === plantType) {
                return plant;
            }
        }
        return null;
    }
}

