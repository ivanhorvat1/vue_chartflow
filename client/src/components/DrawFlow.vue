<template>
  <div>
    <header>
      <h2>Drawflow</h2>
      <!-- <div class="github-link">
        <a href="https://github.com/jerosoler/Drawflow" target="_blank">
          <i class="fab fa-github fa-3x"></i>
        </a>
      </div>-->
    </header>
    <modal
      name="menuModal"
      resizable
      :adaptive="true"
      :minWidth="700"
      :minHeight="500"
      draggable=".modal-window-header"
    >
      <div
        class="modal-window-header"
        style="background-color: grey; color:white; cursor:move; height:30px; text-align:center; padding-top:10px"
      >Settings<div @click="hide" style="cursor:pointer; width:5px; text-align:right; font-size:30px; margin-top: -27px; margin-left: 670px">x</div></div>
      <div style="padding:20px">
        <p>Message</p>
        <textarea style="width:100%; height:100px; resize: none;"></textarea>
        <button style="background-color:green; margin-bottom: 10px" @click="add(outputs.length)">
          <vue-fontawesome icon="plus" color="white"></vue-fontawesome>
        </button>
        <table>
          <tr>
            <th>No.</th>
            <th>key words</th>
            <th>connection</th>
            <th v-show="outputs.length > 1">button</th>
          </tr>
          <tr v-for="(input, k) in outputs" :key="k">
            <td>
              <span>{{ k+1 }}</span>
            </td>
            <td>
              <input type="text" class="form-control" v-model="input.title" />
            </td>
            <td>
              <span v-if="showSpan">
                <select style="width:100%">
                  <option value="none">none</option>
                  <option
                    v-for="(name, id) in menuElementDropdown"
                    :key="id"
                    :value="name"
                  >{{ name }}</option>
                </select>
              </span>
            </td>
            <td v-show="k || (!k && outputs.length > 1)">
              <span>
                <button style="margin-left:10px" @click="remove(k)">
                  <vue-fontawesome icon="minus" color="red"></vue-fontawesome>
                </button>
                <!-- <button
                  style="margin-left:10px; background-color:green"
                  @click="add(k)"
                  v-show="k == outputs.length - 1"
                >
                  <vue-fontawesome icon="plus" color="white"></vue-fontawesome>
                </button>-->
              </span>
            </td>
          </tr>
        </table>
      </div>
    </modal>
    <div class="wrapper">
      <div class="col">
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="menu"
          @dblclick="changeElementName($event)"
        >
          <!-- <i class="fab fa-menu"></i> -->
          <span>{{ menuElementTitle }}</span>
          <!-- <div
            style="position:absolute;cursor:pointer;margin-top:-35px;margin-left:120px"
            @click="showModal()"
          >
            <div
              style="width: 25px;height: 3px;background-color: white;margin: 3px 0;"
            ></div>
            <div
              style="width: 25px;height: 3px;background-color: white;margin: 3px 0;"
            ></div>
            <div
              style="width: 25px;height: 3px;background-color: white;margin: 3px 0;"
            ></div>
          </div>-->
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="message"
        >
          <!-- <i class="fab fa-slack"></i> -->
          <span>{{ messageElementTitle }}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="sharefile"
        >
          <span>{{ shareFileElementTitle }}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="location"
        >
          <span>{{ locationElementTitle }}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="agent"
        >
          <span>{{ agentElementTitle }}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="clientstore"
        >
          <span>{{ clientStoreElementTitle }}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="clientbranch"
        >
          <span>{{ clientBranchElementTitle }}</span>
        </div>
      </div>
      <div class="col-right">
        <div class="menu">
          <ul>
            <li
              @click="
                editor.changeModule('Home');
                changeModule($event);
              "
              class="selected"
            >Home</li>
            <!-- <li v-on:click="editor.changeModule('Other'); changeModule1($event);">Other Module</li> -->
          </ul>
        </div>
        <div id="drawflow" ref="myId" @drop="drop($event)" @dragover="allowDrop($event)">
          <!-- <div class="btn-export" v-onclick="Swal.fire({ title: 'Export',
        html: '<pre><code>'+JSON.stringify(editor.export(), null,4)+'</code></pre>'
          })">Export</div>-->
          <div class="btn-clear" @click="editor.clearModuleSelected()">Clear</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// import DataService from "../DataService";
// import MenuTitle from "../MenuTitle";
import Drawflow from "drawflow";
// import $ from "jquery";
// import axios from "axios";

export default {
  name: "DrawFlow",
  data() {
    return {
      outputs: [
        {
          title: "",
        },
      ],
      mobile_item_selec: "",
      mobile_last_move: null,
      editor: null,
      data: [],
      menuElementDropdown: [],
      ex: null,
      menuElementTitle: null,
      changedMenuTextareaInput: "",
      menuElementInputNoNodes: 1,
      menuElementOutputNoNodes: 1,
      messageElementTitle: null,
      shareFileElementTitle: null,
      locationElementTitle: null,
      agentElementTitle: null,
      clientStoreElementTitle: null,
      clientBranchElementTitle: null,
      showSpan: false,
      // counterAddedMenu: 0
    };
  },
  mounted() {
    this.getElementsNames();
    var id = this.$refs["myId"];
    this.editor = new Drawflow(id);
    // this.editor = new Drawflow(id, Vue);
    // this.editor.reroute = true;
    // this.editor.reroute_fix_curvature = true;
    // this.editor.force_first_input = false;

    this.data = this.getData();
    this.editor.drawflow = this.data;
    //  this.editor.editor_mode = 'fixed';
    this.editor.start();

    // var html = document.createElement("div");
    // html.innerHTML =  "ivan";
    // this.editor.registerNode('myNode', html);
    // this.editor.addNode('newNode', 0, 1, 150, 300, 'newNode', this.editor.drawflow, 'myNode', true);
    this.saveData(this.editor);
    // console.log(datadb);

    // var exportdata = this.editor.export();
    // this.editor.import(exportdata);
    this.giveElementClick();
    this.getMenuElementDropdown(this.data.drawflow.Home.data);
  },
  methods: {
    giveElementClick() {
      let vm = this;
      // document.getElementById("menuElement").onclick = function() {
      //   vm.showModal("menuModal");
      // };
      const targets = document.getElementsByClassName("menuElement");
      for (var i = 0; i < targets.length; i++) {
        targets[i].addEventListener("click", function () {
          vm.showModal("menuModal");
        });
      }
    },
    getMenuElementDropdown(data) {
      if (typeof data != "string") {
        for (var element in data) {
          if (data[element].name != "menu") {
            if (this.menuElementDropdown.indexOf(data[element].name) === -1)
              this.menuElementDropdown.push(data[element].name);
          }
        }
      } else {
        if (this.menuElementDropdown.indexOf(data) === -1 && data != "menu")
          this.menuElementDropdown.push(data);
      }
    },
    add() {
      this.outputs.push({
        title: "",
      });

      this.menuElementOutputNoNodes = this.outputs.length;
      // console.log(this.outputs);
    },
    remove(index) {
      this.outputs.splice(index, 1);
      this.menuElementOutputNoNodes = this.outputs.length;
    },
    show(modal) {
      this.$modal.show(modal);
    },
    hide() {
      this.$modal.hide("menuModal");
    },
    changedMenuTextarea() {
      console.log(this.changedMenuTextareaInput);
    },
    getElementsNames() {
      // let sidebarTitles = await MenuTitle.getData();

      // this.menuElementTitle = sidebarTitles[0].menuElementTitle;
      // this.messageElementTitle = sidebarTitles[0].messageElementTitle;
      // this.shareFileElementTitle = sidebarTitles[0].shareFileElementTitle;
      // this.locationElementTitle = sidebarTitles[0].locationElementTitle;
      // this.agentElementTitle = sidebarTitles[0].agentElementTitle;
      // this.clientStoreElementTitle = sidebarTitles[0].clientStoreElementTitle;
      // this.clientBranchElementTitle = sidebarTitles[0].clientBranchElementTitle;

      this.menuElementTitle = "Menu";
      this.messageElementTitle = "Message";
      this.shareFileElementTitle = "Share File";
      this.locationElementTitle = "Location";
      this.agentElementTitle = "Agent";
      this.clientStoreElementTitle = "Client Store";
      this.clientBranchElementTitle = "Client Branch";
    },
    changeElementName(ev) {
      var name = prompt("Please enter name for element");
      let node = ev.target.getAttribute("data-node");

      if (name != null && name != "") {
        switch (node) {
          case "menu":
            this.menuElementTitle = name;
            break;
          case "message":
            this.messageElementTitle = name;
            break;
          case "sharefile":
            this.shareFileElementTitle = name;
            break;
          case "location":
            this.locationElementTitle = name;
            break;
          case "agent":
            this.agentElementTitle = name;
            break;
          case "clientstore":
            this.clientStoreElementTitle = name;
            break;
          case "clientbranch":
            this.clientBranchElementTitle = name;
            break;

          default:
        }

        this.data = this.getData();
        this.editor.import(this.data);
      }
    },
    showModal(modal) {
      this.showSpan = true;
      this.show(modal);
    },
    saveData(editor) {
      // let vm = this;

      editor.on("nodeSelected", function () {});

      // console.log(exportdata);
      editor.on("nodeCreated", function () {});

      editor.on("nodeRemoved", function () {});

      editor.on("nodeMoved", function () {
        // vm.showModal()
        // axios
        // .get("api/action_drink_fetch_separate", {
        //   // timeout: 60 * 4 * 1000,
        //   params: {
        //       shop: 'shop',
        //       sort: 'a'
        //   }
        // })
        // .then((res) => {
        //   this.data = res;
        //   console.log(res);
        // });
      });

      editor.on("connectionCreated", function (connection) {
        console.log("Connection created");
        console.log(connection);
      });

      editor.on("connectionRemoved", function () {});
    },
    menuOutputs() {
      
      // for (var [key, value] of Object.entries(this.outputs)) {
      //   key = parseInt(key)+1;
      //   let string = "output_"+key;
      //   // console.log(key,value.title,string);

      //   string = {
      //     connections: [{ node: "2", output: "input_1" }],
      //   }

      //   console.log(value,string)

      //   // var outputsMenu = {};
      //   // outputsMenu.push({
      //   //   string: "",
      //   // });
      // }

      return {
        output_1: {
          connections: [{ node: "2", output: "input_1" }],
        },
        output_2: {
          connections: [{ node: "3", output: "input_1" }],
        },
        output_3: {
          connections: [{ node: "4", output: "input_1" }],
        },
      };
    },
    getData() {
      // let dbData = await DataService.getData();
      // this.data = dbData[0];

      return {
        drawflow: {
          Home: {
            data: {
              "1": {
                id: 1,
                name: "welcome",
                data: {},
                class: "welcome",
                html:
                  '\n<div>\n<div class="title-box">👏 Welcome!!</div>\n      <div class="box">\n<p><b><u>Shortkeys:</u></b></p>\n<p>🎹 <b>Delete</b> for remove selected<br>\n💠 <b>Mouse Left Click</b> == Move<br>\n💠 <b>Mouse double Click on leftsidebar element</b> == change name<br>\n💠 <b>Mouse Click on red square in element</b> == change number of input and output nodes<br>\n❌ Mouse Right == Delete Option<br>\n🔍 Ctrl + Wheel == Zoom<br>\n...</p>\n</div>\n</div>\n',
                typenode: false,
                inputs: {},
                outputs: {
                  output_1: {
                    connections: [{ node: "7", output: "input_1" }],
                  },
                },
                pos_x: 50,
                pos_y: 50,
              },
              "7": {
                id: 7,
                name: "menu",
                data: { template: "Write your template" },
                class: "men",
                html:
                  '<div><div class="title-box">' +
                  this.menuElementTitle +
                  '</div><div class="menuElement" style="position:absolute;cursor:pointer;margin-top:-35px;margin-left:160px"><div style="width: 25px;height: 3px;background-color: black;margin: 3px 0;"></div><div style="width: 25px;height: 3px;background-color: black;margin: 3px 0;"></div><div style="width: 25px;height: 3px;background-color: black;margin: 3px 0;"></div></div><div class="menu-box">e<br><br>t<br><br>o</div></div>',
                typenode: false,
                inputs: {
                  input_1: {
                    connections: [{ node: "1", input: "output_1" }],
                  },
                },
                outputs: this.menuOutputs(),
                pos_x: 347,
                pos_y: 150,
              },
              "2": {
                id: 2,
                name: "message",
                data: { template: "Write your template" },
                class: "message",
                html:
                  '\n<div>\n<div class="title-box">' +
                  this.messageElementTitle +
                  '</div><div class="box">\n</div>',
                typenode: false,
                inputs: {
                  input_1: {
                    connections: [{ node: "7", input: "output_1" }],
                  },
                },
                outputs: {},
                pos_x: 700,
                pos_y: 150,
              },
              "3": {
                id: 3,
                name: "location",
                data: { template: "Write your template" },
                class: "location",
                html:
                  '\n<div>\n<div class="title-box">' +
                  this.locationElementTitle +
                  '</div><div class="box">\n</div>',
                typenode: false,
                inputs: {
                  input_1: {
                    connections: [{ node: "7", input: "output_2" }],
                  },
                },
                outputs: {},
                pos_x: 700,
                pos_y: 250,
              },
              "4": {
                id: 4,
                name: "sharefile",
                data: {},
                class: "sharefile",
                html:
                  '\n<div>\n<div class="title-box">' +
                  this.shareFileElementTitle +
                  '</div><div class="box">\n</div>',
                typenode: false,
                inputs: {
                  input_1: {
                    connections: [{ node: "7", input: "output_3" }],
                  },
                },
                outputs: {},
                pos_x: 700,
                pos_y: 350,
              },
            },
          },
        },
      };
      // };
      // this.data = dbData;

      //   var id = this.$refs["myId"];
      //   this.editor = new Drawflow(id);
      //   // this.data = this.getData(this.editor);

      //   this.editor.reroute = true;
      //   this.editor.reroute_fix_curvature = true;
      //   this.editor.force_first_input = false;

      //   this.editor.drawflow = dbData;
      //   this.editor.start();

      //   this.saveData(this.editor);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drag(ev) {
      if (ev.type === "touchstart") {
        this.mobile_item_selec = ev.target
          .closest(".drag-drawflow")
          .getAttribute("data-node");
      } else {
        ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
      }
    },
    drop(ev) {
      if (ev.type === "touchend") {
        var parentdrawflow = document
          .elementFromPoint(
            this.mobile_last_move.touches[0].clientX,
            this.mobile_last_move.touches[0].clientY
          )
          .closest("#drawflow");
        if (parentdrawflow != null) {
          this.addNodeToDrawFlow(
            this.mobile_item_selec,
            this.mobile_last_move.touches[0].clientX,
            this.mobile_last_move.touches[0].clientY
          );
        }
        this.mobile_item_selec = "";
      } else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("node");
        this.addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }
    },
    addNodeToDrawFlow(name, pos_x, pos_y) {
      if (this.editor.editor_mode === "fixed") {
        return false;
      }

      this.getMenuElementDropdown(name);
      //   console.log(this.editor);
      pos_x =
        pos_x *
          (this.editor.precanvas.clientWidth /
            (this.editor.precanvas.clientWidth * this.editor.zoom)) -
        this.editor.precanvas.getBoundingClientRect().x *
          (this.editor.precanvas.clientWidth /
            (this.editor.precanvas.clientWidth * this.editor.zoom));
      pos_y =
        pos_y *
          (this.editor.precanvas.clientHeight /
            (this.editor.precanvas.clientHeight * this.editor.zoom)) -
        this.editor.precanvas.getBoundingClientRect().y *
          (this.editor.precanvas.clientHeight /
            (this.editor.precanvas.clientHeight * this.editor.zoom));

      switch (name) {
        case "menu":
          var menu =
            '<div><div class="title-box">' +
            this.menuElementTitle +
            '</div><div class="menuElement" style="position:absolute;cursor:pointer;margin-top:-35px;margin-left:160px"><div style="width: 25px;height: 3px;background-color: black;margin: 3px 0;"></div><div style="width: 25px;height: 3px;background-color: black;margin: 3px 0;"></div><div style="width: 25px;height: 3px;background-color: black;margin: 3px 0;"></div></div><div class="menu-box">e<br><br>t<br><br>o</div></div>';
          this.editor.addNode(
            "menu",
            this.menuElementInputNoNodes,
            this.menuElementOutputNoNodes,
            pos_x,
            pos_y,
            "men",
            {},
            menu
          );
          break;
        case "message":
          var message =
            `<div><div class="title-box">` +
            this.messageElementTitle +
            `</div>`;
          this.editor.addNode(
            "message",
            1,
            0,
            pos_x,
            pos_y,
            "message",
            { template: "Write your template" },
            message
          );
          break;
        case "sharefile":
          var sharefile =
            `<div><div class="title-box">` +
            this.shareFileElementTitle +
            `</div>`;
          this.editor.addNode(
            "sharefile",
            1,
            0,
            pos_x,
            pos_y,
            "sharefile",
            { template: "Write your template" },
            sharefile
          );
          break;
        case "location":
          var location =
            `<div><div class="title-box">` +
            this.locationElementTitle +
            `</div>`;
          this.editor.addNode(
            "location",
            1,
            0,
            pos_x,
            pos_y,
            "location",
            { template: "Write your template" },
            location
          );
          break;
        case "agent":
          var agent =
            `<div><div class="title-box">` + this.agentElementTitle + `</div>`;
          this.editor.addNode(
            "agent",
            1,
            0,
            pos_x,
            pos_y,
            "agent",
            { template: "Write your template" },
            agent
          );
          break;
        case "clientstore":
          var clientstore =
            `<div><div class="title-box">` +
            this.clientStoreElementTitle +
            `</div>`;
          this.editor.addNode(
            "clientstore",
            1,
            0,
            pos_x,
            pos_y,
            "clientstore",
            { template: "Write your template" },
            clientstore
          );
          break;
        case "clientbranch":
          var clientbranch =
            `<div><div class="title-box">` +
            this.clientBranchElementTitle +
            `</div>`;
          this.editor.addNode(
            "clientbranch",
            1,
            0,
            pos_x,
            pos_y,
            "clientbranch",
            { template: "Write your template" },
            clientbranch
          );
          break;

        default:
      }

      // var exportdata = this.editor.export();
      // console.log(exportdata);
    },
    changeModule(event) {
      var all = document.querySelectorAll(".menu ul li");
      for (var i = 0; i < all.length; i++) {
        all[i].classList.remove("selected");
      }
      event.target.classList.add("selected");
    },
  },
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
