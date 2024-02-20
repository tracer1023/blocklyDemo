<script setup>
import { ref } from "vue";
import BlocklyComponent from "@/components/BlocklyComponent.vue";
import "@/blocks/stocks";
import { myTheme } from "@/blocks/myTheme.js";
import { javascriptGenerator } from "blockly/javascript";

const foo = ref();
const code = ref();

const showCode = () =>
  (code.value = javascriptGenerator.workspaceToCode(foo.value.workspace));
</script>

<template>
  <BlocklyComponent id="blockly2" ref="foo">
    <category name="Logic" colour="%{BKY_LOGIC_HUE}">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
    </category>
    <category name="Loops" colour="%{BKY_LOOPS_HUE}">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
      </block>
      <block type="controls_whileUntil"></block>
    </category>
    <category name="Math" colour="%{BKY_MATH_HUE}">
      <block type="math_number">
        <field name="NUM">123</field>
      </block>
      <block type="math_arithmetic"></block>
      <block type="math_single"></block>
    </category>
    <category name="Text" colour="%{BKY_TEXTS_HUE}">
      <block type="text"></block>
      <block type="text_length"></block>
      <block type="text_print"></block>
    </category>
    <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
    </category>
    <category name="Stocks" colour="%{BKY_LOOPS_HUE}">
      <block type="stock_buy_simple"></block>
      <block type="stock_buy_prog"></block>
      <block type="stock_fetch_price"></block>
    </category>
  </BlocklyComponent>
</template>

<style>
#blockly2 {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
