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
          <span>{{menuElementTitle}}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="message"
        >
          <!-- <i class="fab fa-slack"></i> -->
          <span>{{messageElementTitle}}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="sharefile"
        >
          <span>{{shareFileElementTitle}}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="location"
        >
          <span>{{locationElementTitle}}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="agent"
        >
          <span>{{agentElementTitle}}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="clientstore"
        >
          <span>{{clientStoreElementTitle}}</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          @dblclick="changeElementName($event)"
          data-node="clientbranch"
        >
          <span>{{clientBranchElementTitle}}</span>
        </div>
        <!-- <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="github"
        >
          <i class="fab fa-github"></i>
          <span> Github Star</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="telegram"
        >
          <i class="fab fa-telegram"></i>
          <span> Telegram send message</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="aws"
        >
          <i class="fab fa-aws"></i>
          <span> AWS</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="log"
        >
          <i class="fas fa-file-signature"></i>
          <span> File Log</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="google"
        >
          <i class="fab fa-google-drive"></i>
          <span> Google Drive save</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="email"
        >
          <i class="fas fa-at"></i>
          <span> Email send</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="template"
        >
          <i class="fas fa-code"></i>
          <span> Template</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="multiple"
        >
          <i class="fas fa-code-branch"></i>
          <span> Multiple inputs/outputs</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="personalized"
        >
          <i class="fas fa-fill"></i>
          <span> Personalized</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          @dragstart="drag($event)"
          data-node="dbclick"
        >
          <i class="fas fa-mouse"></i>
          <span> DBClick!</span>
        </div>-->
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
import Drawflow from "drawflow";
// import axios from "axios";

export default {
  name: "DrawFlow",
  data() {
    return {
      mobile_item_selec: "",
      mobile_last_move: null,
      editor: null,
      data: null,
      ex: null,
      menuElementTitle: null,
      messageElementTitle: null,
      shareFileElementTitle: null,
      locationElementTitle: null,
      agentElementTitle: null,
      clientStoreElementTitle: null,
      clientBranchElementTitle: null,
    };
  },
  mounted() {
    this.getElementsNames();
    var id = this.$refs["myId"];
    this.editor = new Drawflow(id);
    // this.editor = new Drawflow(id, Vue);
    this.editor.reroute = true;
    this.editor.reroute_fix_curvature = true;
    this.editor.force_first_input = false;

    this.data = this.getData();
    this.editor.drawflow = this.data;
    //  this.editor.editor_mode = 'fixed';
    this.editor.start();

    // var html = document.createElement("div");
    // html.innerHTML =  "ivan";
    // this.editor.registerNode('myNode', html);
    // this.editor.addNode('newNode', 0, 1, 150, 300, 'newNode', this.editor.drawflow, 'myNode', true);
    this.exportData(this.editor);
    // console.log(datadb);

    // var exportdata = this.editor.export();
    // this.editor.import(exportdata);
    // this.editor.on("nodeSelected", function () {
    //   console.log("Node selected " );
    // });
  },
  methods: {
    getElementsNames() {
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

      if (name != null || name != "") {
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
    exportData(editor) {
      // let vm = this;

      editor.on("nodeSelected", function () {});
      // console.log(exportdata);
      editor.on("nodeCreated", function () {});

      editor.on("nodeRemoved", function () {});

      editor.on("nodeMoved", function () {
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
        // var exportdata = editor.export();
        // vm.ex = exportdata;
        // console.log(exportdata);
        // return exportdata;
      });

      editor.on("connectionCreated", function () {});

      editor.on("connectionRemoved", function () {});
    },
    getData() {
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
                  '\n    <div>\n      <div class="title-box">👏 Welcome!!</div>\n      <div class="box">\n        <p>Simple flow library <b>demo</b>\n        <a href="https://github.com/jerosoler/Drawflow" target="_blank">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n        <p>Multiple input / outputs<br>\n           Data sync nodes<br>\n           Import / export<br>\n           Modules support<br>\n           Simple use<br>\n           Type: Fixed or Edit<br>\n           Events: view console<br>\n           Pure Javascript<br>\n        </p>\n        <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        💠 dbl click on left sidebar element  == chagne name<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n      </div>\n    </div>\n    ',
                typenode: false,
                inputs: {},
                outputs: {},
                pos_x: 50,
                pos_y: 50,
              },
              "2": {
                id: 2,
                name: "message",
                data: {},
                class: "message",
                html:
                  '\n          <div>\n            <div class="title-box">' +
                  this.messageElementTitle +
                  "</div>\n          </div>\n          ",
                typenode: false,
                inputs: {
                  input_1: {
                    connections: [
                      { node: "7", input: "output_1" },
                      { node: "3", input: "output_1" },
                    ],
                  },
                },
                outputs: {},
                pos_x: 700,
                pos_y: 87,
              },
              "7": {
                id: 7,
                name: "menu",
                data: {},
                class: "menu",
                html:
                  '\n        <div>\n          <div class="title-box">' +
                  this.menuElementTitle +
                  "</div>\n        </div>\n        ",
                typenode: false,
                inputs: {},
                outputs: {
                  output_1: {
                    connections: [
                      { node: "2", output: "input_1" },
                      { node: "3", output: "input_1" },
                      { node: "11", output: "input_1" },
                    ],
                  },
                },
                pos_x: 347,
                pos_y: 100,
              },
              "3": {
                id: 3,
                name: "location",
                data: {},
                class: "location",
                html:
                  '\n        <div>\n          <div class="title-box">' +
                  this.locationElementTitle +
                  "</div>\n        </div>\n        ",
                typenode: false,
                inputs: {},
                outputs: {
                  output_1: {
                    connections: [
                      { node: "2", output: "input_1" },
                      { node: "11", output: "input_1" },
                    ],
                  },
                },
                pos_x: 347,
                pos_y: 200,
              },
            },
          },
          // Other: {
          //   data: {
          //     "7": {
          //       id: 7,
          //       name: "menu",
          //       data: {},
          //       class: "menu",
          //       html:
          //         '\n        <div>\n          <div class="title-box">Menu</div>\n        </div>\n        ',
          //       typenode: false,
          //       inputs: {},
          //       outputs: {
          //         output_1: {
          //           connections: [
          //             { node: "2", output: "input_1" },
          //             { node: "3", output: "input_1" },
          //             { node: "11", output: "input_1" },
          //           ],
          //         },
          //       },
          //       pos_x: 347,
          //       pos_y: 87,
          //     },
          //   }
          // }
        },
      };
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
            "<div>" +
            '<div class="title-box">' +
            this.menuElementTitle +
            "</div>" +
            "</div>";
          this.editor.addNode("menu", 0, 1, pos_x, pos_y, "menu", {}, menu);
          break;
        case "message":
          var message =
            "<div>" +
            '<div class="title-box">' +
            this.messageElementTitle +
            "</div>" +
            "</div>";
          this.editor.addNode(
            "message",
            1,
            0,
            pos_x,
            pos_y,
            "message",
            {},
            message
          );
          break;
        case "sharefile":
          var sharefile =
            "<div>" +
            '<div class="title-box">' +
            this.shareFileElementTitle +
            "</div>" +
            "</div>";
          this.editor.addNode(
            "sharefile",
            1,
            1,
            pos_x,
            pos_y,
            "sharefile",
            {},
            sharefile
          );
          break;
        case "location":
          var location =
            "<div>" +
            '<div class="title-box">' +
            this.locationElementTitle +
            "</div>" +
            "</div>";
          this.editor.addNode(
            "location",
            2,
            2,
            pos_x,
            pos_y,
            "location",
            {},
            location
          );
          break;
        case "agent":
          var agent =
            "<div>" +
            '<div class="title-box">' +
            this.agentElementTitle +
            "</div>" +
            "</div>";
          this.editor.addNode("agent", 2, 2, pos_x, pos_y, "agent", {}, agent);
          break;
        case "clientstore":
          var clientstore =
            "<div>" +
            '<div class="title-box">' +
            this.clientStoreElementTitle +
            "</div>" +
            "</div>";
          this.editor.addNode(
            "clientstore",
            2,
            2,
            pos_x,
            pos_y,
            "clientstore",
            {},
            clientstore
          );
          break;
        case "clientbranch":
          var clientbranch =
            "<div>" +
            '<div class="title-box">' +
            this.clientBranchElementTitle +
            "</div>" +
            "</div>";
          this.editor.addNode(
            "clientbranch",
            2,
            2,
            pos_x,
            pos_y,
            "clientbranch",
            {},
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
/* @import ".././assets/css/beautiful.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap"); */
</style>
