import { _decorator, Component, Input, randomRange, tween, UITransform, Vec3 } from 'cc';
import { SunManager } from './Manager/SunManager';
const { ccclass, property } = _decorator;

@ccclass('Sun')
export class Sun extends Component {
    @property(Number) point: number = 0;
    protected onLoad(): void {
        this.node.on(Input.EventType.MOUSE_DOWN, this.onClick, this);
    }

    protected onDestroy(): void {
        this.node.off(Input.EventType.MOUSE_DOWN, this.onClick, this);
    }

    onClick() {
        console.log("click sun");
        SunManager.Instance.addSunPoint(this.point); 
        // sunPointLabel世界坐标系下
        let sunPointWordPos = SunManager.Instance.sunPointLbael.getComponent(UITransform)!.convertToWorldSpaceAR(new Vec3(0, 0, 0));
        // 将目标目标节点的世界坐标转化为当前节点的父节点坐标
        let targetLocalPos = this.node.parent!.getComponent(UITransform)!.convertToNodeSpaceAR(sunPointWordPos);
    
        tween(this.node)
            .to(1, { position: targetLocalPos })
            .call(() => {
                this.node.destroy();
            })
            .start();
    }

    jumpTo() {
        // 获取当前节点开始的位置
        let startPos = this.node.position;
        // 获取中间点位置
        let midPos = startPos.clone().add(new Vec3(0, randomRange(20, 71), 0))
        // 获取目标点位置
        let endPos = startPos.clone().add(new Vec3(randomRange(-70, 70), 0, 0))
        tween(this.node)
            .to(0.5, { position: midPos }, { easing: 'sineOut' })
            .to(0.5, { position: endPos }, { easing: 'sineIn' })
            .start();
    }
}

