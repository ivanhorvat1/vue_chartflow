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
        <div class="drag-drawflow" draggable="true" v-on:dragstart="drag($event)" data-node="menu">
          <!-- <i class="fab fa-menu"></i> -->
          <span>Menu</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="message"
        >
          <!-- <i class="fab fa-slack"></i> -->
          <span>Message</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="sharefile"
        >
          <span>Share File</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="location"
        >
          <span>Location</span>
        </div>
        <div class="drag-drawflow" draggable="true" v-on:dragstart="drag($event)" data-node="agent">
          <span>Agent</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="clientstore"
        >
          <span>Client Store</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="clientbranch"
        >
          <span>Client Branch</span>
        </div>
        <!-- <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="github"
        >
          <i class="fab fa-github"></i>
          <span> Github Star</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="telegram"
        >
          <i class="fab fa-telegram"></i>
          <span> Telegram send message</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="aws"
        >
          <i class="fab fa-aws"></i>
          <span> AWS</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="log"
        >
          <i class="fas fa-file-signature"></i>
          <span> File Log</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="google"
        >
          <i class="fab fa-google-drive"></i>
          <span> Google Drive save</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="email"
        >
          <i class="fas fa-at"></i>
          <span> Email send</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="template"
        >
          <i class="fas fa-code"></i>
          <span> Template</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="multiple"
        >
          <i class="fas fa-code-branch"></i>
          <span> Multiple inputs/outputs</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="personalized"
        >
          <i class="fas fa-fill"></i>
          <span> Personalized</span>
        </div>
        <div
          class="drag-drawflow"
          draggable="true"
          v-on:dragstart="drag($event)"
          data-node="dbclick"
        >
          <i class="fas fa-mouse"></i>
          <span> DBClick!</span>
        </div>-->
      </div>
      <div class="col-right">
        <div class="menu">
          <ul>
            <li onclick="editor.changeModule('Home'); changeModule(event);" class="selected">Home</li>
            <!-- <li onclick="editor.changeModule('Other'); changeModule(event);">
              Other Module
            </li>-->
          </ul>
        </div>
        <div id="drawflow" ref="myId" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)">
          <!-- <div class="btn-export" v-onclick="Swal.fire({ title: 'Export',
        html: '<pre><code>'+JSON.stringify(editor.export(), null,4)+'</code></pre>'
          })">Export</div>-->
          <div class="btn-clear" onclick="editor.clearModuleSelected()">Clear</div>
          <!-- <div class="btn-lock">
            <i
              id="lock"
              class="fas fa-lock"
              onclick="editor.editor_mode='fixed'; changeMode('lock');"
            ></i>
            <i
              id="unlock"
              class="fas fa-lock-open"
              onclick="editor.editor_mode='edit'; changeMode('unlock');"
              style="display:none;"
            ></i>
          </div>-->
          <!-- <div class="bar-zoom">
            <i class="fas fa-search-minus" v-on:click="zoom_out"></i>
            <i class="fas fa-search" v-on:click="zoom_reset"></i>
            <i class="fas fa-search-plus" v-on:click="zoom_in"></i>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import Drawflow from "drawflow";

export default {
  name: "DrawFlow",
  data() {
    return {
      mobile_item_selec: "",
      mobile_last_move: null,
      editor: null,
    };
  },
  mounted() {
    var id = this.$refs["myId"];
    this.editor = new Drawflow(id);
    // this.editor = new Drawflow(id, Vue);
    this.editor.reroute = true;
    this.editor.reroute_fix_curvature = true;
    this.editor.force_first_input = false;

    let data = this.getData();
    this.editor.drawflow = data;
    //  this.editor.editor_mode = 'fixed';
    this.editor.start();

    // var html = document.createElement("div");
    // html.innerHTML =  "ivan";
    // this.editor.registerNode('myNode', html);
    // this.editor.addNode('newNode', 0, 1, 150, 300, 'newNode', this.editor.drawflow, 'myNode', true);
    // var exportdata = this.editor.export();
    // this.editor.import(exportdata);

    // editor.on('connectionCreated', function(connection) {
    //   console.log('Connection created');
    //   console.log(connection);
    // })

    // this.editor.on('nodeSelected', function(id) {
    //   console.log("Node selected " + id);
    // })
  },
  methods: {
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
                  '\n    <div>\n      <div class="title-box">👏 Welcome!!</div>\n      <div class="box">\n        <p>Simple flow library <b>demo</b>\n        <a href="https://github.com/jerosoler/Drawflow" target="_blank">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n        <p>Multiple input / outputs<br>\n           Data sync nodes<br>\n           Import / export<br>\n           Modules support<br>\n           Simple use<br>\n           Type: Fixed or Edit<br>\n           Events: view console<br>\n           Pure Javascript<br>\n        </p>\n        <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n      </div>\n    </div>\n    ',
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
                  '\n          <div>\n            <div class="title-box">Message</div>\n          </div>\n          ',
                typenode: false,
                inputs: {
                  input_1: { connections: [{ node: "7", input: "output_1" }] },
                },
                outputs: {},
                pos_x: 1028,
                pos_y: 87,
              },
              "7": {
                id: 7,
                name: "menu",
                data: {},
                class: "menu",
                html:
                  '\n        <div>\n          <div class="title-box">Menu</div>\n        </div>\n        ',
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
                pos_y: 87,
              },
            },
          },
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
          var menu = `
        <div>
          <div class="title-box">Menu</div>
        </div>
        `;
          this.editor.addNode("menu", 0, 1, pos_x, pos_y, "menu", {}, menu);
          break;
        case "message":
          var message = `
          <div>
            <div class="title-box">Message</div>
          </div>
          `;
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
          var sharefile = `
          <div>
            <div class="title-box">Share File</div>
          </div>
          `;
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
          var location = `
          <div>
            <div class="title-box">Location</div>
          </div>
          `;
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
          var agent = `
          <div>
            <div class="title-box">Agent</div>
          </div>
          `;
          this.editor.addNode(
            "agent",
            2,
            2,
            pos_x,
            pos_y,
            "agent",
            {},
            agent
          );
          break;
        case "clientstore":
          var clientstore = `
          <div>
            <div class="title-box">Client Store</div>
          </div>
          `;
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
          var clientbranch = `
          <div>
            <div class="title-box">Client Branch</div>
          </div>
          `;
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
    zoom_in() {
      this.editor.zoom_in();
    },
    zoom_out() {
      this.editor.zoom_out();
    },
    zoom_reset() {
      this.editor.zoom_reset();
    },
  },
};
</script>
<style scoped>
/* @import ".././assets/css/beautiful.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap"); */
</style>
