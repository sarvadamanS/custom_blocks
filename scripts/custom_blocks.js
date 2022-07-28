const modalWindowMain = document.querySelector(".modal-window");
const modalHeadingMain = document.querySelector(".modal_heading_text");
const closeModalSpan = document.querySelector(".close--modal");
const modalContent = document.querySelector(".modal-content");
const instructionBtn = document.querySelector(".instructions");
const instructionContent = document.querySelector(".instruction-content");
let modalID = "";
let randomID = "";
//helper functions
//first block must be Create modal
const checkIfModalExist = function (block) {
  const findRootBlock = block.getRootBlock();
  return modalID === findRootBlock.id;
};
const checkIfRandomExist = function (block) {
  const findChildBlock = block.getChildren();
  const randomIsChild = findChildBlock.find((el) => el?.id === randomID);
  return randomID === randomIsChild?.id;
};
const randomColor = function () {
  return `rgb(${[1, 2, 3].map((x) => (Math.random() * 256) | 0)})`;
};
const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
document.querySelector("body").addEventListener("click", function (e) {
  const clicked = e.target.closest(".close--modal");
  if (!clicked) return;

  modalWindowMain.style.display = "none";
});
instructionBtn.addEventListener("click", function () {
  console.log("btn");
  instructionContent.classList.toggle("instruction-content-hidden");
});

//Custom block definitions
Blockly.common.defineBlocksWithJsonArray([
  {
    type: "create_modal",
    message0: "Create a Modal window",
    nextStatement: null,
    colour: 290,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "set_heading",
    message0: "Set Heading (char limit=40)%1 %2 %3",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_input",
        name: "modal_heading_name",
        text: "Write heading name here",
      },
      {
        type: "input_value",
        name: "heading_name",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "set_heading_color",
    message0: "Set heading color %1 %2 %3",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_colour",
        name: "setColor",
        colour: "#ff0000",
      },
      {
        type: "input_value",
        name: "setColorValue",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "random_color",
    message0: "Random",
    output: null,
    colour: 70,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "set_heading_bar_color",
    message0: "Set heading bar color %1 %2 %3",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_colour",
        name: "setheading",
        colour: "#ff0000",
      },
      {
        type: "input_value",
        name: "NAME",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "align_close_button",
    message0: "Align close button %1 %2 %3",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_dropdown",
        name: "NAME",
        options: [
          ["Left", "left"],
          ["Right", "right"],
        ],
      },
      {
        type: "input_value",
        name: "NAME",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "set_color_modal_body",
    message0: "Set color of Modal window %1 %2 %3",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_colour",
        name: "NAME",
        colour: "#ff0000",
      },
      {
        type: "input_value",
        name: "setColorModalBody",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "set_modal_text_content",
    message0: "Set text content of Modal (char limit=150)  %1 %2 %3",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_input",
        name: "modalBodyTextContent",
        text: "default",
      },
      {
        type: "input_value",
        name: "setColorModalBody",
        align: "CENTRE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "set_modal_height_width",
    message0: "Set Height & Width of Modal :number b/w(200-550) %1 %2 %3 %4",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_input",
        name: "Height",
        text: "default",
      },
      {
        type: "field_input",
        name: "Width",
        text: "default",
      },
      {
        type: "input_value",
        name: "setColorModalBody",
        align: "CENTRE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "",
    helpUrl: "",
  },
]);

//Code translaters
Blockly.JavaScript["create_modal"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  modalID = block.id;

  let code = "modalWindowMain.style.display = 'block'\n";
  return code;
};
Blockly.JavaScript["random_color"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  randomID = block.id;
  console.log(randomID);
  var code = "...";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript["set_heading_bar_color"] = function (block) {
  var colour_setheading = block.getFieldValue("setheading");
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    "NAME",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  if (!checkIfModalExist(block)) return "\n";
  if (checkIfRandomExist(block)) {
    return `modalWindowMain.style.backgroundColor='${randomColor()}'\n`;
  }
  let code = `modalWindowMain.style.backgroundColor='${colour_setheading}'\n`;
  return code;
};

Blockly.JavaScript["set_heading"] = function (block) {
  let text_modal_heading_name = block.getFieldValue("modal_heading_name");
  let value_heading_name = Blockly.JavaScript.valueToCode(
    block,
    "heading_name",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  if (text_modal_heading_name.length > 40) {
    alert("Text string too long!");
    return "\n";
  }
  if (!checkIfModalExist(block)) return "\n";
  let code = `modalHeadingMain.textContent='${text_modal_heading_name}'\n`;
  return code;
};
Blockly.JavaScript["set_heading_color"] = function (block) {
  let colour_setcolor = block.getFieldValue("setColor");
  let value_setcolorvalue = Blockly.JavaScript.valueToCode(
    block,
    "setColorValue",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  if (!checkIfModalExist(block)) return "\n";
  if (checkIfRandomExist(block)) {
    return `modalHeadingMain.style.color='${randomColor()}'\n`;
  }
  let code = `modalHeadingMain.style.color='${colour_setcolor}'\n`;
  return code;
};
Blockly.JavaScript["set_color_modal_body"] = function (block) {
  var colour_name = block.getFieldValue("NAME");
  var value_setcolormodalbody = Blockly.JavaScript.valueToCode(
    block,
    "setColorModalBody",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  if (!checkIfModalExist(block)) return "\n";
  if (checkIfRandomExist(block)) {
    return `modalContent.style.backgroundColor='${randomColor()}'\n`;
  }
  let code = `modalContent.style.backgroundColor='${colour_name}'\n`;
  return code;
};
Blockly.JavaScript["set_modal_text_content"] = function (block) {
  var text_modalbodytextcontent = block.getFieldValue("modalBodyTextContent");
  var value_setcolormodalbody = Blockly.JavaScript.valueToCode(
    block,
    "setColorModalBody",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  if (text_modalbodytextcontent.length > 150) {
    alert("Text string too long!");
    return "\n";
  }
  if (!checkIfModalExist(block)) return "\n";
  let code = `modalContent.textContent='${text_modalbodytextcontent}'\n`;
  return code;
};
Blockly.JavaScript["set_modal_height_width"] = function (block) {
  var text_height = block.getFieldValue("Height");
  var text_width = block.getFieldValue("Width");
  var value_setcolormodalbody = Blockly.JavaScript.valueToCode(
    block,
    "setColorModalBody",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  if (!checkIfModalExist(block)) return "\n";
  if (checkIfRandomExist(block)) {
    let code = `modalWindowMain.style.height='${getRandomInt(200, 550)}px'\n`;
    code += `modalWindowMain.style.width='${getRandomInt(200, 550)}px'\n`;
    return code;
  }
  if (
    text_height >= 200 &&
    text_height <= 550 &&
    text_width >= 200 &&
    text_width <= 550
  ) {
    let code = `modalWindowMain.style.height='${text_height}px'\n`;
    code += `modalWindowMain.style.width='${text_width}px'\n`;
    return code;
  } else {
    alert("Invalid Inputs");
    return "\n";
  }
};
Blockly.JavaScript["align_close_button"] = function (block) {
  var dropdown_name = block.getFieldValue("NAME");
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    "NAME",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  if (!checkIfModalExist(block)) return "\n";

  let code = `closeModalSpan.style.float="${dropdown_name}"\n`;
  return code;
};
