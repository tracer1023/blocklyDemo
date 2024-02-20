<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import Blockly from "blockly";

const props = defineProps(["options"]);
const blocklyToolbox = ref();
const blocklyDiv = ref();
const workspace = shallowRef();

const options = {
  ...props.options,
  media: "media/",
  grid: {
    spacing: 25,
    length: 3,
    colour: "#ccc",
    snap: true,
  },
  sounds: true,
  trashcan: true,
  //   renderer: "aiedu_renderer",
  zoom: {
    controls: false,
    wheel: false,
    startScale: 1.0,
    maxScale: 5,
    minScale: 0.7,
    scaleSpeed: 1.2,
    pinch: true, //
  },
};
defineExpose({ workspace });

onMounted(() => {
  //   const options = props.options || {};
  if (!options.toolbox) {
    options.toolbox = blocklyToolbox.value;
  }
  workspace.value = Blockly.inject(blocklyDiv.value, options);
});
</script>

<template>
  <div>
    <div class="blocklyDiv" ref="blocklyDiv"></div>
    <xml ref="blocklyToolbox" style="display: none">
      <slot></slot>
    </xml>
  </div>
</template>

<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
