import { ChangeDetectionStrategy, Component, OnInit, computed, signal, untracked } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";


@Component({
    selector: 'app-signal',
    standalone: true,
    imports: [NzButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
       <h1>Giá trị củ của biến {{counter()}}</h1>
       <h1>10x Giá trị counter: {{ derivedCounter()}}</h1>
       <button nz-button nzType="primary" (click)="increment()">Click</button>

       <hr>
       <h2> list value: {{ list() }}</h2>
       <h2> Object : {{ object().id }}: {{object().title}}</h2>
       
    `
})

export class DemoSignalComponent {
    constructor() {
        this.list().push("Mot lanh nua");
    }
    list = signal([
        "Hello",
        "World",
        "NaNp"
    ]);
    object = signal({
        id: 1,
        title: "Angular For Beginners"
    });



    increment() {
        this.counter.update(counter => counter +1);
        this.list().push("pham pham");
        this.object().title = 'new Title';
    }

    counter = signal(0);

    derivedCounter = computed(()=> {
        return this.counter() * 10;
    })


}