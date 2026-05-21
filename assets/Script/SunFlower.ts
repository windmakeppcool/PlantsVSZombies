import { _decorator, animation, Component, find, instantiate, Node, Prefab } from 'cc';
import { Plant } from './Plant';
import { Sun } from './Sun';
const { ccclass, property } = _decorator;

@ccclass('SunFlower')
export class SunFlower extends Plant{
    @property(Number) produceTimer: number = 0;
    @property(Prefab) sunPrefab: Prefab = null!;
    
    private anim: animation.AnimationController = null! ;
    private delayTime: number = 0;
    

    protected onLoad(): void {
        this.anim = this.getComponent(animation.AnimationController)!;
    }

    produceSun(num: number) {
        console.log(`produce sun is ${num}`);
        let sunNode = instantiate(this.sunPrefab);
        sunNode.parent = find("Canvas/ForeGround");
        sunNode.setPosition(this.node.position);
        sunNode.getComponent(Sun)?.jumpTo();
    }

    enableUpdate(deltaTime: number): void {
        super.enableUpdate(deltaTime);
        this.delayTime += deltaTime;
        if (this.delayTime >= this.produceTimer) {
            this.anim.setValue('isGrowing', true);
            this.delayTime = 0;
        }
    }


}

