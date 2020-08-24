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
          <span>{{ menuElementTitle }}</span>
          <span
            style="position:absolute; width:30px; margin-left:80px; font-size:14px; text-align:center; cursor:pointer; background-color: red;"
            @click="changeNumberNodeElement()"
            ><b>O</b></span
          >
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
            >
              Home
            </li>
            <!-- <li v-on:click="editor.changeModule('Other'); changeModule1($event);">Other Module</li> -->
          </ul>
        </div>
        <div
          id="drawflow"
          ref="myId"
          @drop="drop($event)"
          @dragover="allowDrop($event)"
        >
          <!-- <div class="btn-export" v-onclick="Swal.fire({ title: 'Export',
        html: '<pre><code>'+JSON.stringify(editor.export(), null,4)+'</code></pre>'
          })">Export</div>-->
          <div class="btn-clear" @click="editor.clearModuleSelected()">
            Clear
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import DataService from "../DataService";
import MenuTitle from "../MenuTitle";
import Drawflow from "drawflow";
// import axios from "axios";

export default {
  name: "DrawFlow",
  data() {
    return {
      mobile_item_selec: "",
      mobile_last_move: null,
      editor: null,
      data: [],
      ex: null,
      menuElementTitle: null,
      menuElementInputNoNodes: 0,
      menuElementOutputNoNodes: 2,
      messageElementTitle: null,
      shareFileElementTitle: null,
      locationElementTitle: null,
      agentElementTitle: null,
      clientStoreElementTitle: null,
      clientBranchElementTitle: null,
    };
  },
  mounted() {
    var id = this.$refs["myId"];
    this.editor = new Drawflow(id);
    this.data = this.getData(this.editor);
    this.getElementsNames();
    // this.editor = new Drawflow(id, Vue);
    // this.editor.reroute = true;
    // this.editor.reroute_fix_curvature = true;
    // this.editor.force_first_input = false;

    // this.data = this.getData();
    // this.editor.drawflow = this.data;
    //  this.editor.editor_mode = 'fixed';
    // this.editor.start();

    // var html = document.createElement("div");
    // html.innerHTML =  "ivan";
    // this.editor.registerNode('myNode', html);
    // this.editor.addNode('newNode', 0, 1, 150, 300, 'newNode', this.editor.drawflow, 'myNode', true);
    this.saveData(this.editor);
    // console.log(datadb);

    // var exportdata = this.editor.export();
    // this.editor.import(exportdata);
    // this.editor.on("nodeSelected", function () {
    //   console.log("Node selected " );
    // });
  },
  methods: {
    async getElementsNames() {
      let sidebarTitles = await MenuTitle.getData();

      this.menuElementTitle = sidebarTitles[0].menuElementTitle;
      this.messageElementTitle = sidebarTitles[0].messageElementTitle;
      this.shareFileElementTitle = sidebarTitles[0].shareFileElementTitle;
      this.locationElementTitle = sidebarTitles[0].locationElementTitle;
      this.agentElementTitle = sidebarTitles[0].agentElementTitle;
      this.clientStoreElementTitle = sidebarTitles[0].clientStoreElementTitle;
      this.clientBranchElementTitle = sidebarTitles[0].clientBranchElementTitle;
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
    changeNumberNodeElement() {
      var input = prompt(
        "Please enter number of input nodes of Element",
        this.menuElementInputNoNodes
      );
      var output = prompt(
        "Please enter number of output nodes of Element",
        this.menuElementOutputNoNodes
      );

      if (input != null && input != "") {
        this.menuElementInputNoNodes = input;
      }

      if (output != null && output != "") {
        this.menuElementOutputNoNodes = output;
      }

      this.data = this.getData();
      this.editor.import(this.data);
    },
    saveData(editor) {
      // let vm = this;

      editor.on("nodeSelected", function() {});
      // console.log(exportdata);
      editor.on("nodeCreated", function() {});

      editor.on("nodeRemoved", function() {});

      editor.on("nodeMoved", function() {
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

      editor.on("connectionCreated", function() {});

      editor.on("connectionRemoved", function() {});
    },
    async getData(editor) {
      let dbData = await DataService.getData();

      editor.reroute = true;
      editor.reroute_fix_curvature = true;
      editor.force_first_input = false;

      editor.drawflow = dbData[0];
      editor.start();
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
            '<div><div class="title-box">' +
            this.menuElementTitle +
            '</div><div class="box">Ger Vars<textarea df-template></textarea>Output template</div></div>';
          this.editor.addNode(
            "menu",
            this.menuElementInputNoNodes,
            this.menuElementOutputNoNodes,
            pos_x,
            pos_y,
            "men",
            { template: "Write your template" },
            menu
          );
          break;
        case "message":
          var message =
            `<div><div class="title-box">` +
            this.messageElementTitle +
            `</div><div class="box">Ger Vars<textarea df-template></textarea>Output template</div></div>`;
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
            `</div><div class="box">Ger Vars<textarea df-template></textarea>Output template</div></div>`;
          this.editor.addNode(
            "sharefile",
            1,
            1,
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
            `</div><div class="box">Ger Vars<textarea df-template></textarea>Output template</div></div>`;
          this.editor.addNode(
            "location",
            2,
            2,
            pos_x,
            pos_y,
            "location",
            { template: "Write your template" },
            location
          );
          break;
        case "agent":
          var agent =
            `<div><div class="title-box">` +
            this.agentElementTitle +
            `</div><div class="box">Ger Vars<textarea df-template></textarea>Output template</div></div>`;
          this.editor.addNode(
            "agent",
            2,
            2,
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
            `</div><div class="box">Ger Vars<textarea df-template></textarea>Output template</div></div>`;
          this.editor.addNode(
            "clientstore",
            2,
            2,
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
            `</div><div class="box">Ger Vars<textarea df-template></textarea>Output template</div></div>`;
          this.editor.addNode(
            "clientbranch",
            2,
            2,
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
/* @import ".././assets/css/beautiful.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap"); */
</style>
