import {Component} from 'angular2/core';
interface Language {
  id: number;
  name: string;
}
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>Select Language</h2>
    <div class="form-group">
      <select  class="form-control" id="drop-down" (change)="onSelect()">
        <option *ngFor="#language of languages"
           value={{language.name}}>
           {{language.name}}
        </option>
      </select>
    </div>
    <div *ngIf="selectedLanguage">
      <h2>{{selectedLanguage.name}} details!</h2>
      <div><label>id: </label>{{selectedLanguage.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="selectedLanguage.name" placeholder="name"/>
      </div>
    </div>
  `,
  styles: [`
    .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}
    .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }
    .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}
    .heroes .badge {
      font-size: small;
      color: white;
      padding: 0.1em 0.7em;
      background-color: #369;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -1px;
    }
    .selected { background-color: #EEE; color: #369; }
  `]
})
export class AppComponent {
  public title = 'Gator Code';
  public languages = LANGUAGES;
  public selectedLanguage: Language;
  onSelect(language: Language) { 
    console.log("This was called :) ")
    console.log("Value selected is " + document.getElementById("drop-down").value)
    this.selectedLanguage = language; 
  }
}
var LANGUAGES: Language[] = [
  { "id": 11, "name": "JAVA" },
  { "id": 12, "name": "C++" },
  { "id": 13, "name": "C" },
  { "id": 14, "name": "NodeJs" },
  { "id": 15, "name": "Php" }
];