define(['argue2', 'chai'], function(arguejs2, chai) {

    'use strict';

    // chai-expect
    var expect = chai.expect;

    // Tests...
    describe("internal type utilities", function() {

        var arguejs2_internals = arguejs2.__export_internals__();

        describe("formatText", function() {

            it("is a function", function() {

                expect(arguejs2_internals.$.formatText).to.be.a("function");
            });

            describe("construct some texts", function() {

                var testCases = [ {name: null,                  isName: false },

                                  {name: undefined,             isName: false },

                                  {name: "",                    isName: false },

                                  {name: "$",                   isName: true },
                                  {name: "$$",                  isName: true },
                                  {name: "$_",                  isName: true },
                                  {name: "$_a",                 isName: true },
                                  {name: "$a",                  isName: true },
                                  {name: "$9",                  isName: true },
                                  {name: "$92",                 isName: true },
                                  {name: "$9.2",                isName: false },
                                  {name: "$hello$world$",       isName: true },
                                  {name: "$helloworld",         isName: true },
                                  {name: "$helloworld9",        isName: true },

                                  {name: "_",                   isName: true },
                                  {name: "__",                  isName: true },
                                  {name: "_$",                  isName: true },
                                  {name: "_a",                  isName: true },
                                  {name: "_9",                  isName: true },
                                  {name: "_92",                 isName: true },
                                  {name: "_9.2",                isName: false },
                                  {name: "_hello_world_",       isName: true },
                                  {name: "_hello_world_$",      isName: true },
                                  {name: "_helloworld9",        isName: true },
                                  {name: "h1e2l3l4o5",          isName: true },

                                  {name: "a",                   isName: true },
                                  {name: "a1",                  isName: true },
                                  {name: "a14",                 isName: true },
                                  {name: "a1.4",                isName: false },
                                  {name: "hello",               isName: true },

                                  {name: "1",                   isName: false },
                                  {name: "17",                  isName: false },
                                  {name: "17.9",                isName: false },

                                  {name: "%",                   isName: false },
                                  {name: "%helloworld",         isName: false },

                                  {name: "#",                   isName: false },
                                  {name: "#helloworld",         isName: false },

                                  {name: "@",                   isName: false },
                                  {name: "@helloworld",         isName: false },

                                  {name: "()",                  isName: false },
                                  {name: "(helloworld)",        isName: false },

                                  {name: "{}",                  isName: false },
                                  {name: "{helloworld}",        isName: false },

                                  {name: "[]",                  isName: false },
                                  {name: "[helloworld]",        isName: false }
                                ];

                function generateTestFunction(_testCase) {
                    return function() {
                        var result = arguejs2_internals.$.validateParameterName(_testCase.name);
                        expect(result).to.equal(_testCase.isName);
                    };
                }

                for (var testCaseIdx = 0; testCaseIdx < testCases.length; ++testCaseIdx) {
                    var testCase = testCases[testCaseIdx];
                    var testCaseDescriptionText =
                        "expect " + (((testCase.name === null) || (testCase.name === undefined)) ? testCase.name : "\""+testCase.name+"\"") +
                        " to be recognized as " + (testCase.isName ? "a valid" : "an invalid") + " name";
                    it(testCaseDescriptionText, generateTestFunction(testCase));
                }
            });
        });
    });
});
