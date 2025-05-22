type Data = {
  nombre?: string;
  email?: string;
};

const state = {
  data: {} as Data,
  listener: [] as Function[], //los callbacks
  getState() {
    return this.data;
  },
  setState(newState: Data) {
    //modifica this.data (el state) e invoca los callbacks
    this.data = newState;
    this.listener.forEach((callback) => callback(newState));
  }, //,
  suscribe(callback: Function) {
    this.listener.push(callback);
    // recibe callbacks para ser avisados posteriormente
  },
};
export { state };
