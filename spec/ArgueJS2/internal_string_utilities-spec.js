define(['argue2', 'argue2.testable.min', 'chai'], function(arguejs2_original, arguejs2_minified, chai) {

    'use strict';

    // chai-expect
    var expect = chai.expect;

    // Tests...
    var argue2Variants = [  {name: "ArgueJS version 2 (original)",  implementation: arguejs2_original},
                            {name: "ArgueJS version 2 (minified)",  implementation: arguejs2_minified}
                        ];
    for (var argue2VariantIdx = 0; argue2VariantIdx < argue2Variants.length; ++argue2VariantIdx) {

        runTestsForVariant(argue2Variants[argue2VariantIdx].name, argue2Variants[argue2VariantIdx].implementation);
    }

    function runTestsForVariant(arguejs2Name, arguejs2) {
        describe(arguejs2Name + ": internal string utilities:", function() {

            var arguejs2_internals = arguejs2.__export_internals__();

            describe("formatText:", function() {

                it("is a function", function() {

                    expect(arguejs2_internals.$.formatText).to.be.a("function");
                });

                var testCases = [   {formatString: null,                              replacements: null,                             expectedText: null },
                                    {formatString: null,                              replacements: undefined,                        expectedText: null },
                                    {formatString: null,                              replacements: [],                               expectedText: null },
                                    {formatString: null,                              replacements: [1],                              expectedText: null },
                                    {formatString: null,                              replacements: [true],                           expectedText: null },
                                    {formatString: null,                              replacements: ["hello"],                        expectedText: null },
                                    {formatString: null,                              replacements: ["hello", "world"],               expectedText: null },

                                    {formatString: undefined,                         replacements: null,                             expectedText: undefined },
                                    {formatString: undefined,                         replacements: undefined,                        expectedText: undefined },
                                    {formatString: undefined,                         replacements: [],                               expectedText: undefined },
                                    {formatString: undefined,                         replacements: [1],                              expectedText: undefined },
                                    {formatString: undefined,                         replacements: [true],                           expectedText: undefined },
                                    {formatString: undefined,                         replacements: ["hello"],                        expectedText: undefined },
                                    {formatString: undefined,                         replacements: ["hello", "world"],               expectedText: undefined },

                                    {formatString: "",                                replacements: null,                             expectedText: "" },
                                    {formatString: "",                                replacements: undefined,                        expectedText: "" },
                                    {formatString: "",                                replacements: [],                               expectedText: "" },
                                    {formatString: "",                                replacements: [1],                              expectedText: "" },
                                    {formatString: "",                                replacements: [true],                           expectedText: "" },
                                    {formatString: "",                                replacements: ["hello"],                        expectedText: "" },
                                    {formatString: "",                                replacements: ["hello", "world"],               expectedText: "" },

                                    {formatString: "{1}",                             replacements: null,                             expectedText: "null" },
                                    {formatString: "{1}",                             replacements: undefined,                        expectedText: "undefined" },
                                    {formatString: "{1}",                             replacements: [],                               expectedText: "{1}" },
                                    {formatString: "{1}",                             replacements: [1],                              expectedText: "1" },
                                    {formatString: "{1}",                             replacements: [true],                           expectedText: "true" },
                                    {formatString: "{1}",                             replacements: ["hello"],                        expectedText: "hello" },
                                    {formatString: "{1}",                             replacements: ["hello", "world"],               expectedText: "hello" },

                                    {formatString: "{1}{2}",                          replacements: null,                             expectedText: "null{2}" },
                                    {formatString: "{1}{2}",                          replacements: undefined,                        expectedText: "undefined{2}" },
                                    {formatString: "{1}{2}",                          replacements: [],                               expectedText: "{1}{2}" },
                                    {formatString: "{1}{2}",                          replacements: [1],                              expectedText: "1{2}" },
                                    {formatString: "{1}{2}",                          replacements: [true],                           expectedText: "true{2}" },
                                    {formatString: "{1}{2}",                          replacements: ["hello"],                        expectedText: "hello{2}" },
                                    {formatString: "{1}{2}",                          replacements: ["hello", "world"],               expectedText: "helloworld" },

                                    {formatString: "{1} {2}",                         replacements: null,                             expectedText: "null {2}" },
                                    {formatString: "{1} {2}",                         replacements: undefined,                        expectedText: "undefined {2}" },
                                    {formatString: "{1} {2}",                         replacements: [],                               expectedText: "{1} {2}" },
                                    {formatString: "{1} {2}",                         replacements: [1],                              expectedText: "1 {2}" },
                                    {formatString: "{1} {2}",                         replacements: [true],                           expectedText: "true {2}" },
                                    {formatString: "{1} {2}",                         replacements: ["hello"],                        expectedText: "hello {2}" },
                                    {formatString: "{1} {2}",                         replacements: ["hello", "world"],               expectedText: "hello world" },

                                    {formatString: "{2}{1}",                          replacements: null,                             expectedText: "{2}null" },
                                    {formatString: "{2}{1}",                          replacements: undefined,                        expectedText: "{2}undefined" },
                                    {formatString: "{2}{1}",                          replacements: [],                               expectedText: "{2}{1}" },
                                    {formatString: "{2}{1}",                          replacements: [1],                              expectedText: "{2}1" },
                                    {formatString: "{2}{1}",                          replacements: [true],                           expectedText: "{2}true" },
                                    {formatString: "{2}{1}",                          replacements: ["hello"],                        expectedText: "{2}hello" },
                                    {formatString: "{2}{1}",                          replacements: ["hello", "world"],               expectedText: "worldhello" },

                                    {formatString: "{2} {1}",                         replacements: null,                             expectedText: "{2} null" },
                                    {formatString: "{2} {1}",                         replacements: undefined,                        expectedText: "{2} undefined" },
                                    {formatString: "{2} {1}",                         replacements: [],                               expectedText: "{2} {1}" },
                                    {formatString: "{2} {1}",                         replacements: [1],                              expectedText: "{2} 1" },
                                    {formatString: "{2} {1}",                         replacements: [true],                           expectedText: "{2} true" },
                                    {formatString: "{2} {1}",                         replacements: ["hello"],                        expectedText: "{2} hello" },
                                    {formatString: "{2} {1}",                         replacements: ["hello", "world"],               expectedText: "world hello" },

                                    {formatString: "{2} {1}",                         replacements: ["hello {2}", "world"],           expectedText: "world hello world" },
                                    {formatString: "{1}{8}{3}{6}{5}{4}{7}{2}{9}",     replacements: [9,8,7,6,5,4,3,2,1],              expectedText: "927456381" }
                                ];

                function generateTestFunction(_testCase) {
                    return function() {
                        var result;
                        var r = _testCase.replacements;
                        if (!r) {
                            result = arguejs2_internals.$.formatText(_testCase.formatString, _testCase.replacements);
                        }
                        else {
                            switch(r.length) {
                                case(0):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString);
                                    break;
                                case(1):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString, r[0]);
                                    break;
                                case(2):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString, r[0], r[1]);
                                    break;
                                case(3):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString, r[0], r[1], r[2]);
                                    break;
                                case(4):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString, r[0], r[1], r[2], r[3]);
                                    break;
                                case(5):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString, r[0], r[1], r[2], r[3], r[4]);
                                    break;
                                case(6):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString, r[0], r[1], r[2], r[3], r[4], r[5]);
                                    break;
                                case(7):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString, r[0], r[1], r[2], r[3], r[4], r[5], r[6]);
                                    break;
                                case(8):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
                                    break;
                                case(9):
                                    result = arguejs2_internals.$.formatText(_testCase.formatString, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8]);
                                    break;
                                default:
                                    throw new Error("test case has too many replacements");
                            }
                        }

                        expect(result).to.equal(_testCase.expectedText);
                    };
                }

                for (var testCaseIdx = 0; testCaseIdx < testCases.length; ++testCaseIdx) {
                    var testCase = testCases[testCaseIdx];
                    var testCaseDescriptionText =
                        "if " + (testCase.formatString ? "\"" + testCase.formatString + "\"" : testCase.formatString) +
                        " is used with replacements " + JSON.stringify(testCase.replacements) +
                        " the result should be " + (testCase.expectedText ? "\"" + testCase.expectedText + "\"" : testCase.expectedText);
                    it(testCaseDescriptionText, generateTestFunction(testCase));
                }
            });
        });
    }
});
