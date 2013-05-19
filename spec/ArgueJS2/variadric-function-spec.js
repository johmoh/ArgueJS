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
        describe(arguejs2Name + ": support for variadic functions (parameters with type TAIL):", function() {

            // >>> A HACK... JUST FOR INTERNET EXPLORER. REASON: MOCHA USES RECURSION TO HEAVY. BUT THEY DO NOT WANT TO FIX THAT IN MOCHA.
            beforeEach(function(done){
                setTimeout(done, 0);
            });
            // <<< A HACK... JUST FOR INTERNET EXPLORER. REASON: MOCHA USES RECURSION TO HEAVY. BUT THEY DO NOT WANT TO FIX THAT IN MOCHA.

            var arguejs2_internals = arguejs2.__export_internals__();

            it("is a type", function() {

                // This check relies that the function is(Type) works correctly. So, if this tests fails, please check at first, if tests validates correct behavior of isType(...).
                var value = arguejs2_internals.$.isType(arguejs2.TAIL);
                expect(value).to.equal(true);
            });

            // @TODO: add more tests
        });
    }
});
