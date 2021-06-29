import { Subject } from "rxjs";
let id = 0;
var subject = new Subject();;
let repeat = setInterval(() => {
  id++;
  console.log(`Item ${id}`);
  subject.next(`Item ${id}`);
  if (id > 9) {
    subject.complete();
    clearInterval(repeat);
  }
}, 1000);
let subscription1 = subject.subscribe(
  (x: any) => {
    console.log("subscription1", x, 1);
    logItem(x, 1);
  },
  (error: any) => logItem("Error: " + error, 1),
  () => logItem("Completed", 1)
);
let subscription2 = subject.subscribe(
  (x: any) => {
    console.log("subscription2", x, 2);
    logItem(x, 2);
  },
  (error: any) => logItem("Error: " + error, 2),
  () => logItem("Completed", 2)
);
document.getElementById("unsubscribeBtn1").addEventListener("click", () => {
  subscription1.unsubscribe();
});

document.getElementById("unsubscribeBtn2").addEventListener("click", () => {
  subscription2.unsubscribe();
});
function logItem(val: any, column: any) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById(`list${column}`).appendChild(node);
}
