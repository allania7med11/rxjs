import { Subject } from "rxjs";
let id1 = 0;
let id2 = 0;
var subject1 = new Subject();
var subject2 = new Subject();
let repeat1 = setInterval(() => {
  id1++;
  console.log(`Item ${id1}`);
  subject1.next(`Item ${id1}`);
  if (id1 > 9) {
    subject1.complete();
    clearInterval(repeat1);
  }
}, 1000);
let repeat2 = setInterval(() => {
  id2++;
  console.log(`Item ${id2}`);
  subject2.next(`Item ${id2}`);
  if (id2 > 5) {
    subject2.complete();
    clearInterval(repeat2);
  }
}, 2000);
let subscription1 = subject1.subscribe(
  (x: any) => {
    console.log("subscription1", x, 1);
    logItem(x, 1);
  },
  (error: any) => logItem("Error: " + error, 1),
  () => logItem("Completed", 1)
);
let subscription2 = subject2.subscribe(
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
