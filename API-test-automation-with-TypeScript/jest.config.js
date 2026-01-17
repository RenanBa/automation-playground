const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  reporters: [
    "default",
    ["jest-junit",
      {
        outputDirectory: "./reports",
        outputName: "junit.xml",
      }
    ]
  ],
  transform: {
    ...tsJestTransformCfg,
  },
};