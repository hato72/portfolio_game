import { k } from "./kaboomCtx";

export function displayDialogue(text, onDisplayEnd,name,ismain) {
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
  
    dialogueUI.style.display = "block";
    let index = 0;
    let currentText = "";
    const intervalRef = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        dialogue.innerHTML = currentText;
        index++;
        return;
      }
  
      clearInterval(intervalRef);
    }, 1);
  
    const closeBtn = document.getElementById("close");
  
    function onCloseBtnClick() {
      onDisplayEnd();
      dialogueUI.style.display = "none";
      dialogue.innerHTML = "";
      clearInterval(intervalRef);
      closeBtn.removeEventListener("click", onCloseBtnClick);
    }
  
    closeBtn.addEventListener("click", onCloseBtnClick);
  
    addEventListener("keypress", (key) => {
      if (key.code === "Enter") {
        closeBtn.click();
      }
    });


    //moveボタン
    const moveButton = document.getElementById("move");

    if(name === "ladder"){
      moveButton.disabled = null;
    }else{
      moveButton.disabled = "disabled";
    }

    function onMoveButtonClick(){
      onDisplayEnd();
      //画面移動の関数をおく
      if(ismain){
        k.go("under");
      }else{
        k.go("main");
      }
      //k.go("under");
      
      
      dialogueUI.style.display = "none";
      dialogue.innerHTML = "";
      clearInterval(intervalRef);
      moveButton.removeEventListener("click",onMoveButtonClick);
    }

    moveButton.addEventListener("click",onMoveButtonClick);

    addEventListener("keypress", (key) => {
      if (key.code === "Enter") {
        moveButton.click();
      }
    });
  }
  
  export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
      k.camScale(k.vec2(1));
    } else {
      k.camScale(k.vec2(1.5));
    }
  }