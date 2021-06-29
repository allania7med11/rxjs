import { Observable } from "rxjs";
let id = 0;
var observable = Observable.create((observer: any) => {
  let repeat = setInterval(() => {
    id++;
    console.log(`Item ${id}`);
    observer.next(`Item ${id}`);
    if (id > 9) {
      observer.complete();
      clearInterval(repeat);
    }
  }, 1000);
});
observable.subscribe(
  (x: any) => logItem(x),
  (error: any) => logItem("Error: " + error),
  () => logItem("Completed")
);
function logItem(val: any) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("list").appendChild(node);
}
