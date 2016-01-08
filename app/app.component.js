System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AppComponent, LANGUAGES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Gator Code';
                    this.languages = LANGUAGES;
                }
                AppComponent.prototype.onSelect = function (language) {
                    console.log("This was called :) ");
                    console.log("Value selected is " + document.getElementById("drop-down").value);
                    this.selectedLanguage = language;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <h1>{{title}}</h1>\n    <h2>Select Language</h2>\n    <div class=\"form-group\">\n      <select  class=\"form-control\" id=\"drop-down\" (change)=\"onSelect()\">\n        <option *ngFor=\"#language of languages\"\n           value={{language.name}}>\n           {{language.name}}\n        </option>\n      </select>\n    </div>\n    <div *ngIf=\"selectedLanguage\">\n      <h2>{{selectedLanguage.name}} details!</h2>\n      <div><label>id: </label>{{selectedLanguage.id}}</div>\n      <div>\n        <label>name: </label>\n        <input [(ngModel)]=\"selectedLanguage.name\" placeholder=\"name\"/>\n      </div>\n    </div>\n  ",
                        styles: ["\n    .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}\n    .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }\n    .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}\n    .heroes .badge {\n      font-size: small;\n      color: white;\n      padding: 0.1em 0.7em;\n      background-color: #369;\n      line-height: 1em;\n      position: relative;\n      left: -1px;\n      top: -1px;\n    }\n    .selected { background-color: #EEE; color: #369; }\n  "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
            LANGUAGES = [
                { "id": 11, "name": "JAVA" },
                { "id": 12, "name": "C++" },
                { "id": 13, "name": "C" },
                { "id": 14, "name": "NodeJs" },
                { "id": 15, "name": "Php" }
            ];
        }
    }
});
//# sourceMappingURL=app.component.js.map