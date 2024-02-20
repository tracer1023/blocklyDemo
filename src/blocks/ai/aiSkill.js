import {
  javascriptGenerator as JavaScript,
  Order as JavaScriptOrder,
} from "blockly/javascript";
import {
  Order as PythonOrder,
  pythonGenerator as Python,
} from "blockly/python";
// import { wlp5PythonGenerator as Python } from "@/overwrites/generator/wlp5PythonGenerator";
import main_icon_skill from "@/assets/images/toolbox/main_icon_skill.png";
import { useVirtualStore } from "@/store/modules/virtual";
import { ROBOT_MODE_WLP5 } from "@/config/robotType";

// <--机器翻译machine_translation-->
// 1.将中文{你好}翻译成英文
Blockly.Blocks["translate_chinese_to_other"] = {
  init() {
    this.jsonInit({
      type: "translate_chinese_to_other",
      message0: "%1 将中文 %2 翻译成英文",
      args0: [
        {
          type: "field_image",
          src: main_icon_skill,
          width: 15,
          height: 15,
          alt: "*",
          flipRtl: true,
        },
        {
          type: "input_value",
          name: "WORD",
          // "check": "String"
        },
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: "#FFA72C",
      tooltip: "",
      helpUrl: "",
    });
  },
};
JavaScript.forBlock["translate_chinese_to_other"] = function (
  block,
  generator
) {
  const word = generator.valueToCode(block, "WORD", JavaScriptOrder.ATOMIC);
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  return `await robot.translate('cn', 'en', ${word} );\n`;
};
Python.forBlock["translate_chinese_to_other"] = function (block, generator) {
  const word = generator.valueToCode(block, "WORD", PythonOrder.ATOMIC);
  return `Robot.translate("cn", "en", ${word})\n`;
};

// 2.将英文{hello}翻译成中文
Blockly.Blocks["translate_other_to_chinese"] = {
  init() {
    this.jsonInit({
      type: "translate_other_to_chinese",
      message0: "%1 将英文 %2 翻译成中文",
      args0: [
        {
          type: "field_image",
          src: main_icon_skill,
          width: 15,
          height: 15,
          alt: "*",
          flipRtl: true,
        },
        {
          type: "input_value",
          name: "WORD",
          // "check": "String"
        },
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: "#FFA72C",
      tooltip: "",
      helpUrl: "",
    });
  },
};
JavaScript.forBlock["translate_other_to_chinese"] = function (
  block,
  generator
) {
  const word = generator.valueToCode(block, "WORD", JavaScriptOrder.ATOMIC);
  return `await robot.translate('en', 'cn', ${word} );\n`;
};
Python.forBlock["translate_other_to_chinese"] = function (block, generator) {
  const word = generator.valueToCode(block, "WORD", PythonOrder.ATOMIC);
  return `Robot.translate("en", "cn", ${word});\n`;
};

// 3.翻译结果
Blockly.Blocks["var_translate_result"] = {
  init() {
    this.jsonInit({
      type: "var_translate_result",
      message0: "翻译结果",
      output: "String",
      colour: "#FFA72C",
      tooltip: "",
      helpUrl: "",
    });
  },
};
JavaScript.forBlock["var_translate_result"] = function (block) {
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  return ["await robot.valueOfTranslateResult()", JavaScriptOrder.ATOMIC];
};
Python.forBlock["var_translate_result"] = function (block) {
  return ["Robot.valueOfTranslateResult()", PythonOrder.ATOMIC];
};

// 4 显示原文/译文持续（小飞）
export const show_trans_time = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "show_trans_time",
        message0: "%1  显示原文/译文持续 %2 秒",
        args0: [
          {
            type: "field_image",
            src: main_icon_skill,
            width: 15,
            height: 15,
            alt: "*",
          },
          {
            type: "input_value",
            name: "TIME",
            check: "Number",
            min: 1,
            max: 100,
          },
        ],
        inputsInline: true,
        colour: "#FFA72C",
        previousStatement: null,
        nextStatement: null,
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
JavaScript.forBlock["show_trans_time"] = function (block, generator) {
  const time = generator.valueToCode(block, "TIME", JavaScriptOrder.ATOMIC);
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  return `await robot.showTranslateResult(${time});\n`;
};

// <--语音转写模块-->
// 5.将听到的语言转写
export const voice_change_string = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "voice_change_string",
        message0: "%1 将听到的 %2 转写",
        args0: [
          {
            type: "field_image",
            src: main_icon_skill,
            width: 15,
            height: 15,
            alt: "*",
            flipRtl: false,
          },
          {
            type: "field_dropdown2",
            name: "LANGUAGE",
            options: [
              ["普通话", "mandarin"],
              ["英语", "en_us"],
              ["四川话", "lmz"],
              ["粤语", "cantonese"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
JavaScript.forBlock["voice_change_string"] = function (block) {
  const language = block.getFieldValue("LANGUAGE");
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  return `await robot.speechTransfer('${language}');\n`;
};
Python.forBlock["voice_change_string"] = function (block) {
  const language = block.getFieldValue("LANGUAGE");
  return `Robot.speechTransfer("${language}")\n`;
};

// 6.转写结果
export const var_transfer_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_transfer_result",
        message0: "转写结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
JavaScript.forBlock["var_transfer_result"] = function (block) {
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  return ["await robot.valueOfSpeechTransfer()", JavaScriptOrder.ATOMIC];
};
Python.forBlock["var_transfer_result"] = function (block) {
  return ["Robot.valueOfSpeechTransfer()", PythonOrder.ATOMIC];
};

const startCognize = "%1 启动 %2 识别";
// 启动印刷文字识别（小飞）
export const start_cognize_time = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "start_cognize_time",
        message0: startCognize,
        args0: [
          {
            type: "field_image",
            src: main_icon_skill,
            width: 15,
            height: 15,
            alt: "*",
          },
          {
            type: "field_dropdown2",
            name: "WORD",
            options: [
              ["印刷文字", "text"],
              ["印刷数字", "number"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
JavaScript.forBlock["start_cognize_time"] = function (block) {
  const word = block.getFieldValue("WORD");
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  console.log("start_cognize_time");
  return `await robot.textOrNumberRecognize('${word}');\n`;
};
Python.forBlock["start_cognize_time"] = function (block) {
  const word = block.getFieldValue("WORD");
  return `Robot.textOrNumberRecognize("${word}")\n`;
};

// 启动手写文字识别（小飞）
export const start_hand_cognize_time = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "start_hand_cognize_time",
        message0: startCognize,
        args0: [
          {
            type: "field_image",
            src: main_icon_skill,
            width: 15,
            height: 15,
            alt: "*",
          },
          {
            type: "field_dropdown2",
            name: "WORD",
            options: [
              ["手写文字", "text"],
              ["手写数字", "number"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
JavaScript.forBlock["start_hand_cognize_time"] = function (block) {
  const word = block.getFieldValue("WORD");
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  return `await robot.handTextOrNumberRecognize('${word}');\n`;
};
Python.forBlock["start_hand_cognize_time"] = function (block) {
  const word = block.getFieldValue("WORD");
  return `Robot.handTextOrNumberRecognize("${word}")\n`;
};

// <--文字识别模块-->character_recognition
// 1.印刷文字识别结果
export const var_en_recognize_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_en_recognize_result",
        message0: "印刷文字识别结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
JavaScript.forBlock["var_en_recognize_result"] = function (block) {
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  console.log("var_en_recognize_result");
  return ["await robot.valueOfTextRecognitionResult()", JavaScriptOrder.ATOMIC];
};
Python.forBlock["var_en_recognize_result"] = function (block) {
  return ["Robot.valueOfTextRecognitionResult()", PythonOrder.ATOMIC];
};

// 2.印刷数字识别结果
export const var_number_recognize_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_number_recognize_result",
        message0: "印刷数字识别结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
JavaScript.forBlock["var_number_recognize_result"] = function (block) {
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  return [
    "await robot.valueOfNumberRecognitionResult()",
    JavaScriptOrder.ATOMIC,
  ];
};
Python.forBlock["var_number_recognize_result"] = function (block) {
  return ["Robot.valueOfNumberRecognitionResult()", PythonOrder.ATOMIC];
};

// 3.手写文字识别结果
export const var_hand_en_recognize_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_hand_en_recognize_result",
        message0: "手写文字识别结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
JavaScript.forBlock["var_hand_en_recognize_result"] = function (block) {
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  return [
    "await robot.valueOfHandTextRecognitionResult()",
    JavaScriptOrder.ATOMIC,
  ];
};
Python.forBlock["var_hand_en_recognize_result"] = function (block) {
  return ["Robot.valueOfHandTextRecognitionResult()", PythonOrder.ATOMIC];
};

// 4.手写数字识别结果
export const var_hand_number_recognize_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_hand_number_recognize_result",
        message0: "手写数字识别结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
JavaScript.forBlock["var_hand_number_recognize_result"] = function (block) {
  const virtualStore = useVirtualStore();
  virtualStore.addCheckDom(block.type);
  return [
    "await robot.valueOfHandNumberRecognitionResult()",
    JavaScriptOrder.ATOMIC,
  ];
};
Python.forBlock["var_hand_number_recognize_result"] = function (block) {
  return ["Robot.valueOfHandNumberRecognitionResult()", PythonOrder.ATOMIC];
};

export const startRecognizedMsg = "%1 %2 启动 %3 识别";
// {端口}启动{印刷文字}识别--未来派5
export const wlp_start_cognize_time = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "wlp_start_cognize_time",
        message0: startRecognizedMsg,
        args0: [
          {
            type: "field_image",
            src: main_icon_skill,
            width: 15,
            height: 15,
            alt: "*",
            flipRtl: false,
          },
          {
            type: "field_port",
            name: "PORT",
            value: "8",
            robotType: ROBOT_MODE_WLP5,
            disabledPorts: ["1", "2", "3", "4", "5", "6", "7"],
            options() {
              return [["端口8", "8"]];
            },
          },
          {
            type: "field_dropdown2",
            name: "WORD",
            options: [
              ["印刷文字", "text"],
              ["印刷数字", "number"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["wlp_start_cognize_time"] = function (block) {
  const port = block.getFieldValue("PORT");
  const word = block.getFieldValue("WORD");
  return `Robot.wlpTextOrNumberRecognize("${word}","${port}")\n`;
};

// {端口}启动{手写文字}识别--未来派5
export const wlp_start_hand_cognize_time = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "wlp_start_hand_cognize_time",
        message0: startRecognizedMsg,
        args0: [
          {
            type: "field_image",
            src: main_icon_skill,
            width: 15,
            height: 15,
            alt: "*",
            flipRtl: false,
          },
          {
            type: "field_port",
            name: "PORT",
            value: "8",
            robotType: ROBOT_MODE_WLP5,
            disabledPorts: ["1", "2", "3", "4", "5", "6", "7"],
            options() {
              return [["端口8", "8"]];
            },
          },
          {
            type: "field_dropdown2",
            name: "WORD",
            options: [
              ["手写文字", "text"],
              ["手写数字", "number"],
            ],
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["wlp_start_hand_cognize_time"] = function (block) {
  const port = block.getFieldValue("PORT");
  const word = block.getFieldValue("WORD");
  return `Robot.wlpHandTextOrNumberRecognize("${word}","${port}")\n`;
};

// 15.车型识别结果
export const var_car_recognize_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_car_recognize_result",
        message0: "车型识别结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["var_car_recognize_result"] = function (block) {
  return ['Robot.valueOfObjectRecognition("car")', PythonOrder.ATOMIC];
};

// 16.动物识别结果
export const var_animal_recognize_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_animal_recognize_result",
        message0: "动物识别结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["var_animal_recognize_result"] = function (block) {
  return ['Robot.valueOfObjectRecognition("animal")', PythonOrder.ATOMIC];
};

// 17.植物识别结果
export const var_plant_recognize_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_plant_recognize_result",
        message0: "植物识别结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["var_plant_recognize_result"] = function (block) {
  return ['Robot.valueOfObjectRecognition("plant")', PythonOrder.ATOMIC];
};

// 17.菜品识别结果
export const var_dishes_recognize_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_dishes_recognize_result",
        message0: "菜品识别结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["var_dishes_recognize_result"] = function (block) {
  return ['Robot.valueOfObjectRecognition("dish")', PythonOrder.ATOMIC];
};

// 18.果蔬识别结果
export const var_fruit_recognize_result = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_fruit_recognize_result",
        message0: "果蔬识别结果",
        output: "String",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["var_fruit_recognize_result"] = function (block) {
  return ['Robot.valueOfObjectRecognition("fruit")', PythonOrder.ATOMIC];
};

// 18.识别置信度
export const var_car_recognize_confiden_level = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "var_car_recognize_confiden_level",
        message0: "识别置信度",
        output: "Number",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["var_car_recognize_confiden_level"] = function (block) {
  return ["Robot.valueOfObjectRecognitionConfidence()", PythonOrder.ATOMIC];
};

// 1.{端口}启动场景识别scene_recognition——小飞8号
export const start_scene_recognition = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "start_scene_recognition",
        message0: "%1 启动场景识别",
        args0: [
          {
            type: "field_image",
            src: main_icon_skill,
            width: 15,
            height: 15,
            alt: "*",
            flipRtl: false,
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["start_scene_recognition"] = function (block) {
  return `Robot.sceneRecognition()\n`;
};

// 1.{端口}启动场景识别scene_recognition——未来派
export const wlp_start_scene_recognition = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "wlp_start_scene_recognition",
        message0: "%1 %2 启动场景识别",
        args0: [
          {
            type: "field_image",
            src: main_icon_skill,
            width: 15,
            height: 15,
            alt: "*",
            flipRtl: false,
          },
          {
            type: "field_port",
            name: "PORT",
            value: "8",
            robotType: ROBOT_MODE_WLP5,
            disabledPorts: ["1", "2", "3", "4", "5", "6", "7"],
            options() {
              return [["端口8", "8"]];
            },
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["wlp_start_scene_recognition"] = function (block) {
  const port = block.getFieldValue("PORT");
  return `Robot.wlpSceneRecognition("${port}")\n`;
};

// 1.场景识别为{XX}
export const match_scene_recognition = {
  Blocks: {
    init() {
      this.jsonInit({
        type: "match_scene_recognition",
        message0: "场景识别为 %1",
        args0: [
          {
            type: "field_dropdown2",
            name: "BODY",
            options: [
              ["卧室 客厅", "0"],
              ["教室", "1"],
              ["餐厅(公共)", "2"],
              ["草地 田地 花园", "3"],
              ["沙漠", "4"],
              ["办公室 会议室", "5"],
              ["酒吧 KTV 舞厅", "6"],
              ["室内运动场", "7"],
              ["商场", "8"],
              ["山峰", "9"],
              ["湖 池塘 海洋", "10"],
              ["森林", "11"],
              ["街道", "12"],
              ["室外运动场", "13"],
              ["海滩 沙滩", "14"],
              ["泳池", "15"],
              ["游乐场", "16"],
              ["车内 船上 飞机上", "19"],
              ["礼堂 演出厅", "20"],
              ["广场 空地", "21"],
              ["播音室", "23"],
              ["房屋 建筑", "24"],
              ["医院", "25"],
              ["网吧 游戏厅 棋牌室", "26"],
              ["雕塑 石碑 牌坊", "27"],
              ["宿舍", "28"],
              ["化妆室 理发店", "29"],
              ["健身房", "30"],
              ["机场", "31"],
              ["火车站", "32"],
              ["汽车站", "33"],
              ["市场 集市", "34"],
              ["图书馆 书店", "35"],
              ["公路", "36"],
              ["古建筑", "37"],
              ["厨房", "38"],
              ["餐厅(家里)", "39"],
              ["洗手间", "40"],
              ["浴室 洗澡间", "41"],
              ["停车场", "42"],
            ],
          },
        ],
        inputsInline: true,
        output: "Boolean",
        colour: "#FFA72C",
        tooltip: "",
        helpUrl: "",
      });
    },
  },
};
Python.forBlock["match_scene_recognition"] = function (block) {
  const scenceOptions = [
    ["卧室 客厅", "0"],
    ["教室", "1"],
    ["餐厅(公共)", "2"],
    ["草地 田地 花园", "3"],
    ["沙漠", "4"],
    ["办公室 会议室", "5"],
    ["酒吧 KTV 舞厅", "6"],
    ["室内运动场", "7"],
    ["商场", "8"],
    ["山峰", "9"],
    ["湖 池塘 海洋", "10"],
    ["森林", "11"],
    ["街道", "12"],
    ["室外运动场", "13"],
    ["海滩 沙滩", "14"],
    ["泳池", "15"],
    ["游乐场", "16"],
    ["车内 船上 飞机上", "19"],
    ["礼堂 演出厅", "20"],
    ["广场 空地", "21"],
    ["播音室", "23"],
    ["房屋 建筑", "24"],
    ["医院", "25"],
    ["网吧 游戏厅 棋牌室", "26"],
    ["雕塑 石碑 牌坊", "27"],
    ["宿舍", "28"],
    ["化妆室 理发店", "29"],
    ["健身房", "30"],
    ["机场", "31"],
    ["火车站", "32"],
    ["汽车站", "33"],
    ["市场 集市", "34"],
    ["图书馆 书店", "35"],
    ["公路", "36"],
    ["古建筑", "37"],
    ["厨房", "38"],
    ["餐厅(家里)", "39"],
    ["洗手间", "40"],
    ["浴室 洗澡间", "41"],
    ["停车场", "42"],
  ];
  const body = block.getFieldValue("BODY");
  function searchValue(body) {
    for (let i = 0; i < scenceOptions.length; i++) {
      if (scenceOptions[i][1] === body) {
        return scenceOptions[i][0];
      }
    }
  }
  return [
    `Robot.sceneRecognitionResultNew("${searchValue(body)}")`,
    PythonOrder.ATOMIC,
  ];
};
