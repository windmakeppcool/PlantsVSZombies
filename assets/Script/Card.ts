import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    private cardState: CardState = CardState.Coolding;

    start() {

    }

    update(deltaTime: number) {
        switch (this.cardState) {
            case CardState.Coolding:
                CooldingUpdate();
                break;
            case CardState.WaitingSun:
                 WaitingSunUpdate();
                break;
            case CardState.Ready:
                ReadyUpdate();
                break;
        }
    }
}


export enum CardState {
    Coolding,   //冷却中
    WaitingSun, // 等待阳光
    Ready       // 可种植
}


function CooldingUpdate() {

}

function WaitingSunUpdate() {

}

function ReadyUpdate() {
    
}