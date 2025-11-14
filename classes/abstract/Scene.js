// ABSTRACT
class Scene {
  constructor() {
    if(this.constructor === Scene) {
      throw new TypeError("Scene cannot be instantiated directly");
    }
    
    if(this.init === undefined) {
      throw new TypeError('Classes extending the abstract class "Scene" must contain "init()"');
    }
    
    if(this.runLoop === undefined) {
      throw new TypeError('Classes extending the abstract class "Scene" must contain "runLoop()"');
    }
  } 
}