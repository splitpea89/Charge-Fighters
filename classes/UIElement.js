// ABSTRACT
class UIElement {
  constructor() {
    if(this.constructor === UIElement) {
      throw new TypeError("UIElement cannot be instantiated directly");
    }
    
    if(this.update == undefined) {
      throw new TypeError("Children of UIElement must implement update()");
    }
    
    if(this.drawElement == undefined) {
      throw new TypeError("Children of UIElement must implement drawElement()");
    }
  }
}