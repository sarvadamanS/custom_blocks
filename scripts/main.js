(function () {
  let currentButton;
  //Intial Condtions for display window
  function innitDisplay() {
    modalWindowMain.style.display = "none";
    modalHeadingMain.textContent = "default";
  }
  function renderModal(event) {
    // Code for rendering modal
    loadWorkspace(event.target);
    let code = Blockly.JavaScript.workspaceToCode(
      Blockly.common.getMainWorkspace()
    );
    console.log(code);
    // console.log(code);
    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  function save(button) {
    // Code for saving the state
    innitDisplay();
    button.blocklySave = Blockly.serialization.workspaces.save(
      Blockly.common.getMainWorkspace()
    );
  }
  function loadWorkspace(button) {
    const workspace = Blockly.common.getMainWorkspace();
    if (button.blocklySave) {
      Blockly.serialization.workspaces.load(button.blocklySave, workspace);
    }
  }

  function handleSave() {
    document.body.setAttribute("mode", "edit");
    save(currentButton);
  }

  function enableEditMode() {
    document.body.setAttribute("mode", "edit");
    document.querySelectorAll(".button").forEach((btn) => {
      btn.removeEventListener("click", renderModal);
      btn.addEventListener("click", enableBlocklyMode);
    });
  }

  function enableMakerMode() {
    document.body.setAttribute("mode", "maker");
    document.querySelectorAll(".button").forEach((btn) => {
      btn.addEventListener("click", renderModal);
      btn.removeEventListener("click", enableBlocklyMode);
    });
  }

  function enableBlocklyMode(e) {
    document.body.setAttribute("mode", "blockly");
    currentButton = e.target;
    loadWorkspace(currentButton);
  }

  document.querySelector("#edit").addEventListener("click", enableEditMode);
  document.querySelector("#done").addEventListener("click", enableMakerMode);
  document.querySelector("#save").addEventListener("click", handleSave);

  enableMakerMode();
  const toolbox = {
    kind: "flyoutToolbox",
    contents: [
      {
        kind: "block",
        type: "create_modal",
      },
      {
        kind: "block",
        type: "set_heading",
      },
      {
        kind: "block",
        type: "set_heading_color",
      },
      {
        kind: "block",
        type: "set_heading_bar_color",
      },
      {
        kind: "block",
        type: "random_color",
      },
      {
        kind: "block",
        type: "set_modal_text_content",
      },
      {
        kind: "block",
        type: "set_color_modal_body",
      },
      {
        kind: "block",
        type: "align_close_button",
      },
      {
        kind: "block",
        type: "set_modal_height_width",
      },
    ],
  };
  Blockly.inject("blocklyDiv", {
    toolbox: toolbox,
    scrollbars: false,
    maxInstances: {
      create_modal: 1,
      set_modal_height_width: 1,
      set_modal_text_content: 1,
      set_color_modal_body: 1,
      align_close_button: 1,
      set_heading_bar_color: 1,
      set_heading: 1,
      set_heading_color: 1,
    },
    toolboxPosition: "end",
    horizontalLayout: true,
  });
  // console.log();
})();
