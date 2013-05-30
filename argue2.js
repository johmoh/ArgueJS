/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, quotmark:double, smarttabs:true, strict:true, trailing:true, undef:true, unused:true, maxparams:10, maxdepth:10, maxstatements:200, browser:true, devel:false */
/*global define:true,require:true,module:true,ARGUEJS_PRODUCTION_READY:false,ARGUEJS_EXPORT_INTERNALS:true*/

/* The MIT License (MIT)
 *
 * Copyright (c) 2013 Martin Lühring (https://github.com/johmoh)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/** @license MIT (http://opensource.org/licenses/MIT) */

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>> make module available in node.js and the web (AMD - RequireJS) >>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define(function () {

    "use strict";

    // initialize and return module
    return (function (module_exports_factory) {
        return module_exports_factory();
    }(function () {
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// <<< make module available in node.js and the web (AMD - RequireJS) <<<
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    /* ARGUEJS_PRODUCTION_READY
     *
     * Should unnecessary tests in the library be removed because the library will alway be used correctly? true/false
     *
     * True: Removes all test in the library that are not necessary if the library is always used correctly. That means:
     * - getArguments(...) is called with the right number of arguments
     * - getArguments(...) is called with arguments of the correct type
     * - if getArguments(...) is called with a function specification then that function specification has a valid
     *   structure (is an array contining zero or more objects - the parameter specifications)
     * - if getArguments(...) is called with a function specification containing parameter specifications then that
     *   parameter specifications have a correct structure and satisfy all rules (for instance
     *   parenthesizeTail is only allowed for the tail parameter of a variadic function)
     *
     * for production   : set ARGUEJS_PRODUCTION_READY to true
     * for development  : do not define ARGUEJS_PRODUCTION_READY or set value to false
     * for minimization : set ARGUEJS_PRODUCTION_READY to true; special note for minimization with UglifyJS: add
     *                    --define "ARGUEJS_PRODUCTION_READY=true" to command line options
     * for unit testing : do not define ARGUEJS_PRODUCTION_READY or set value to false.
     */
    // /** @const */ var ARGUEJS_PRODUCTION_READY = false;

    /* ARGUEJS_EXPORT_INTERNALS
     *
     * Exporting internals for debugging and testing? true/false @see ArgueJS.__export_internals__
     *
     * for production   : do not define ARGUEJS_EXPORT_INTERNALS or set value to false
     * for development  : do not define ARGUEJS_EXPORT_INTERNALS or set value to false
     * for minimization : do not define ARGUEJS_EXPORT_INTERNALS or set value to false; special note for minimization
     *                    with UglifyJS: add --define "ARGUEJS_EXPORT_INTERNALS=false" to command line options
     * for unittesting  : unit tests of this library require "ARGUEJS_EXPORT_INTERNALS = true" because some tests test
     *                    internal functionality of that library or need internal functions/variables to work
     */
    // /** @const */ var ARGUEJS_EXPORT_INTERNALS = false;

    /**
     * Module ArgueJS
     *
     * @module  module-arguejs
     */

    /* ###############################################################################################
     *
     * Some constant configuration values for this module.
     *
     * These configuration values are private to this module.
     *
     * ###############################################################################################
     */

    /** @const */ var DEFAULT_VALUE_FOR_ALLOWNULL        = false;
    /** @const */ var DEFAULT_VALUE_FOR_ALLOWUNDEFINED   = false;
    /** @const */ var DEFAULT_VALUE_FOR_PARENTHESIZETAIL = true;

    /* ###############################################################################################
     *
     * Error texts
     *
     * These texts are private to this module.
     *
     * ###############################################################################################
     */

    /** @const */ var ERR_BADCALL_PREFIX                                        = "bad call: ";
    /** @const */ var ERR_BADCALL_InvalidTypeOfArgument                         = ERR_BADCALL_PREFIX + "type of \"{1}\" is invalid.";
    /** @const */ var ERR_BADCALL_NoArguments                                   = ERR_BADCALL_PREFIX + "no arguments. function call is not compatible with function specification.";
    /** @const */ var ERR_BADCALL_TooManyArguments                              = ERR_BADCALL_PREFIX + "too many arguments. function call is not compatible with function specification.";
    /** @const */ var ERR_BADCALL_InvalidTypeOfParameter                        = ERR_BADCALL_PREFIX + "parameter specification #{1} is not an object structure.";

    /** @const */ var ERR_ARGUEJS_PREFIX                                        = "parameter specification \"{1}\": ";
    /** @const */ var ERR_ARGUEJS_DefaultValueHasIncompatibleType               = ERR_ARGUEJS_PREFIX + "default value is not compatible to parameter type";
    /** @const */ var ERR_ARGUEJS_InvalidTypeOfValue                            = ERR_ARGUEJS_PREFIX + "value of \"{2}\" has incorrect type (must be {3})";
    /** @const */ var ERR_ARGUEJS_InvalidValue                                  = ERR_ARGUEJS_PREFIX + "\"{2}\" is invalid.";
    /** @const */ var ERR_ARGUEJS_MissingTypeSpecification                      = ERR_ARGUEJS_PREFIX + "type specification is missing.";
    /** @const */ var ERR_ARGUEJS_ParameterAlreadyDefined                       = ERR_ARGUEJS_PREFIX + "parameter with same name already defined (conflicting position in function specification: #{2})";
    /** @const */ var ERR_ARGUEJS_ParameterSpecificationWithoutName             = "parameter specification: parameter #{1} has no name";
    /** @const */ var ERR_ARGUEJS_ParameterWithTooManyElements                  = ERR_ARGUEJS_PREFIX + "specification contains more than one element.";
    /** @const */ var ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction         = ERR_ARGUEJS_PREFIX + "\"{2}\" is {3} allowed for the tail-parameter in a variadic function";
    /** @const */ var ERR_ARGUEJS_TailParameterMustBeLastPastparameter          = "in a variadic function the tail-parameter must be the last parameter in the function specification.";
    /** @const */ var ERR_ARGUEJS_TypeSpecificationHasTooManyElements           = ERR_ARGUEJS_PREFIX + "type specification has too many elements.";
    /** @const */ var ERR_ARGUEJS_UnknownTypeSpecificationOption                = ERR_ARGUEJS_PREFIX + "type specification contains unknown option \"{2}\".";

    /** @const */ var ERR_ARGUEJS_GetParameters_PREFIX                          = "Incompatible function call: ";
    /** @const */ var ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue  = ERR_ARGUEJS_GetParameters_PREFIX + "mandatory argument \"{1}\" has no value.";
    /** @const */ var ERR_ARGUEJS_GetParameters_TooManyArguments                = ERR_ARGUEJS_GetParameters_PREFIX + "too many arguments. {1}";

    /* ###############################################################################################
     *
     * Utility functions for handling types
     *
     * These functions are private to the module.
     *
     * ###############################################################################################
     */

    /**
     * Tests, if a value is a Boolean.
     *
     * @for       module-arguejs
     * @function  isBoolean
     * @private
     * @static
     *
     * @param  {*}  _value  The value to test.
     *
     * @return {boolean}  True, if the value is a Boolean. False, otherwise.
     */
    function isBoolean(_value) {
        return (typeof(_value) === "boolean");
    }

    /**
     * Tests, if a value is a Array.
     *
     * @for       module-arguejs
     * @function  isArray
     * @private
     * @static
     *
     * @param  {*}  _value  The value to test.
     *
     * @return {boolean}  True, if the value is a Array. False, otherwise.
     */
    function isArray(_value) {
        return (_value instanceof Array);
    }

    /**
     * Tests, if a value is a Function.
     *
     * @for       module-arguejs
     * @function  isFunction
     * @private
     * @static
     *
     * @param  {*}  _value  The value to test.
     *
     * @return {boolean}  True, if the value is a Function. False, otherwise.
     */
    function isFunction(_value) {
        return (typeof(_value) === "function");
    }

    /**
     * Tests, if a value is a Object.
     *
     * @for       module-arguejs
     * @function  isObject
     * @private
     * @static
     *
     * @param  {*}  _value  The value to test.
     *
     * @return {boolean}  True, if the value is a Object. False, otherwise.
     */
    function isObject(_value) {
        return (_value instanceof Object);
    }

    /**
     * Tests, if a value is an Arguments-object.
     *
     * @for       module-arguejs
     * @function  isArguments
     * @private
     * @static
     *
     * @param  {*}  _value  The value to test.
     *
     * @return {boolean}  True, if the value is an Arguments object. False, otherwise.
     */
    var isArguments = (function() {
        var argumentsDetectionText = Object.prototype.toString.call(arguments);
        return function (_value) {
            return (Object.prototype.toString.call(_value) === argumentsDetectionText);
        };
    }());

    /**
     * Tests, if a value is a "Type". This function summarizes logic for detecting, if a value is a type. In JavaScript
     * does not exist anything like a "Type"-type. So, some logic is needed to distinguish between a type and a
     * value/object/function.
     *
     * @for       module-arguejs
     * @function  isType
     * @private
     * @static
     *
     * @param  {*}  _value  The value to test.
     *
     * @return {boolean}  True, if the value is a "Type". False, otherwise.
     */
    function isType(_value) {
        return isFunction(_value); // @TODO: maybe that can be improved.
    }

    /**
     * Returns the type of a value.
     *
     * @for       module-arguejs
     * @function  getType
     * @private
     * @static
     *
     * @param  {*}  _value  A value.
     *
     * @return {Type}  The type of _value. It is not a string representation. It is the type. For "text" it returns
     *                 String, and so on...
     *
     * @example
     *
     * var a = 17;
     * var b = getType(a);
     * var c = b(20);
     *
     * console.log(a); // OUTPUT: 17
     * console.log(b); // OUTPUT: [Function: Number]
     * console.log(c); // OUTPUT: 20
     */
    var getType = function(_value) {
        if (_value === undefined) { return undefined; }
        if (_value === null)      { return null; }
        return _value.constructor;
    };

    /* ###############################################################################################
     *
     * Utility functions for generating error messages
     *
     * These functions are private to the module.
     *
     * ###############################################################################################
     */

    /**
     * Formats a string and returns the result.
     *
     * This is a variadic function. Placeholders are delivered as normal arguments after the _formatString argument. In
     * the _formatString occurrences of "{X}" - where "X" is a number beginning with 1 - are replaced by the argument
     * at position "X".
     *
     * @for       module-arguejs
     * @function  formatText
     * @private
     * @static
     *
     * @param {string}  _formatString  Format string containing placeholders.
     * @param {...*=}   _replacements  Optional: Arguments: Arguments to use in this variadic function. These arguments
     *                                 are used to fill in placeholder in the format string.
     *
     * @return {string}  Resulting, formatted text.
     *
     * @example
     *
     * var text = formatText("{1}{3}, {2} {1}", "!!!", "folks", " hi");  // text = "!!! hi, folks !!!"
     */
    function formatText(_formatString) {
        var result = _formatString;
        if (result) {
            var argumentsLength = arguments.length;
            for (var idx = 1; idx < argumentsLength; ++idx) {
                var replacement = arguments[idx];
                result = result.replace(new RegExp("\\{"+idx+"\\}", "g"), replacement);
            }
        }
        return result;
    }

    /* ###############################################################################################
     *
     * Utility functions for validating data
     *
     * These functions are private to the module.
     *
     * ###############################################################################################
     */

    /**
     * Validates a parameter name.
     *
     * @for       module-arguejs
     * @function  validateParameterName
     * @private
     * @static
     *
     * @param {string}  _parameterName  Name of a parameter.
     *
     * @return {boolean}  True, if the
     */
    var validateParameterName = (function() {
        var regExp = /^[_a-z$]{1}[_a-z0-9$]*$/i;
        return function (_parameterName) {
            return (_parameterName ? regExp.test(_parameterName) : false);
        };
    }());

    /**
     * Tests, if a value is compatible to a type and some options and if the value can be used as an argument value.
     *
     * @for       module-arguejs
     * @function  isCompatibleArgumentValue
     * @private
     * @static
     *
     * @param {*}        _value      A value
     * @param {!Object}  _parameter  A parameter specification object
     *
     * @return {boolean}  True, if the _valuee is compatible to the type specification of a paramter. False, otherwise.
     */
    function isCompatibleArgumentValue(_value, _parameter) {
        if (_parameter.type  === ArgueJS.TAIL)    { return true; } // any value is compatible as non-default value for the tail-parameter of a variadic function
        if (_value === undefined)                 { return (_parameter.allowUndefined === true); } // value "undefined" is compatible if "undefined" is allowed
        if (_value === null)                      { return (_parameter.allowNull === true); } // value "null" is compatible if "null" is allowed
        if (_parameter.type  === ArgueJS.ANYTYPE) { return true; } // any value is compatible with ANYTYPE
        return (getType(_value) === _parameter.type) || (_value instanceof _parameter.type);
    }

    /**
     * Tests, if a value is compatible to a type and some options and if the value can be used as a default value.
     *
     * @for       module-arguejs
     * @function  isCompatibleDefaultValue
     * @private
     * @static
     *
     * @param {*}        _value      A value
     * @param {!Object}  _parameter  A parameter specification object
     *
     * @return {boolean}  True, if the _valuee is compatible to the type specification of a paramter. False, otherwise.
     */
    function isCompatibleDefaultValue(_value, _parameter) {
        if (_parameter.type  === ArgueJS.TAIL)    { return isArray(_value); } // any value is compatible as non-default value for the tail-parameter of a variadic function
        if (_value === undefined)                 { return (_parameter.allowUndefined === true); } // value "undefined" is compatible if "undefined" is allowed
        if (_value === null)                      { return (_parameter.allowNull === true); } // value "null" is compatible if "null" is allowed
        if (_parameter.type  === ArgueJS.ANYTYPE) { return true; } // any value is compatible with ANYTYPE
        return (getType(_value) === _parameter.type) || (_value instanceof _parameter.type);
    }

    /* ###############################################################################################
     *
     * Functions just to reduce code complexity in getArguments(...)
     *
     * These functions are private to the module.
     *
     * ###############################################################################################
     */

    /**
     * Tests if a parameter type specification is for a simple mandatory parameter.
     *
     * @for       module-arguejs
     * @function  isSimpleMandatoryTypeSpecification
     * @private
     * @static
     *
     * @param {function}  _typeSpecification  A type
     *
     * @return {boolean}  True, if _typeSpecification is a simple mandatory type specification. False, otherwise.
     *
     * @example:
     *
     * {message: String}
     */
    function isSimpleMandatoryTypeSpecification(_typeSpecification) {
        return isFunction(_typeSpecification);
    }

    /**
     * Tests if a parameter type specification is for a simple optional parameter.
     *
     * @for       module-arguejs
     * @function  isSimpleOptionalTypeSpecification
     * @private
     * @static
     *
     * @param {Array}  _typeSpecification  A type
     *
     * @return {boolean}  True, if _typeSpecification is a simple optional type specification. False, otherwise.
     *
     * @example:
     *
     * {message: [String]}
     */
    function isSimpleOptionalTypeSpecification(_typeSpecification) {
        return isArray(_typeSpecification);
    }

    /**
     * Tests if a parameter type specification is a complex a complex type specification.
     *
     * @for       module-arguejs
     * @function  isSimpleOptionalTypeSpecification
     * @private
     * @static
     *
     * @param {!Object}  _typeSpecification  A type
     *
     * @return {boolean}  True, if _typeSpecification is a complex type specification. False, otherwise.
     *
     * @example:
     *
     * {message: {type: [String], defaultValue: "nothing to say"}}
     */
    function isComplexTypeSpecification(_typeSpecification) {
        return (getType(_typeSpecification) === Object);
    }

    /**
     * Makes sure that some important attributes exist in a parameter. That is imporant for getArguments(...) because
     * that function relies on the fact that these attributes exist and their value is a default value if not
     * specified otherwise.
     *
     * That attributes are:
     * - "parenthesizeTail" if the type of the parameter is ArgueJS.TAIL
     * - "allowNull" if the type of the parameter is not ArgueJS.TAIL
     * - "allowUndefined" if the type of the parameter is not ArgueJS.TAIL
     *
     * @for       module-arguejs
     * @function  ensureSomeParameterDefaultValues
     * @private
     * @static
     *
     * @param {!Object}  _parameter  A parameter object
     *
     * @return {void}
     */
    function ensureSomeParameterDefaultValues(_parameter) {
        if (_parameter.type === ArgueJS.TAIL) {
            if (_parameter.parenthesizeTail === undefined) {
                _parameter.parenthesizeTail = DEFAULT_VALUE_FOR_PARENTHESIZETAIL;
            }
        }
        else {
            if (_parameter.allowNull === undefined) {
                _parameter.allowNull = DEFAULT_VALUE_FOR_ALLOWNULL;
            }
            if (_parameter.allowUndefined === undefined) {
                _parameter.allowUndefined = DEFAULT_VALUE_FOR_ALLOWUNDEFINED;
            }
        }
    }

    /**
     * Creates a new parameter object from a simple mandatory parameter type specification.
     *
     * @for       module-arguejs
     * @function  createSimpleMandatoryParameter
     * @private
     * @static
     *
     * @param {number}    _idx                The index (position) of the parameter in a function specification
     * @param {string}    _name               The name of the parameter
     * @param {Function}  _typeSpecification  The parameter type specification
     *
     * @return {Object}  The created parameter object
     */
    function createSimpleMandatoryParameter(_idx, _name, _typeSpecification) {
        var parameter = {
            idx:        _idx,
            name:       _name,
            isOptional: false,
            type:       _typeSpecification
        };
        ensureSomeParameterDefaultValues(parameter);
        return parameter;
    }

    /**
     * Creates a new parameter object from a simple optional parameter type specification.
     *
     * @for       module-arguejs
     * @function  createSimpleOptionalParameter
     * @private
     * @static
     *
     * @param {number}  _idx                The index (position) of the parameter in a function specification
     * @param {string}  _name               The name of the parameter
     * @param {Array}   _typeSpecification  The parameter type specification
     *
     * @return {Object}  The created parameter object
     */
    function createSimpleOptionalParameter(_idx, _name, _typeSpecification) {
        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
            if (_typeSpecification.length < 1) { throw new Error(formatText(ERR_ARGUEJS_MissingTypeSpecification, _name)); }
        }

        var parameter = {
            idx:        _idx,
            name:       _name,
            isOptional: true,
            type:       _typeSpecification[0]
        };
        if (_typeSpecification.length >= 2) {
            if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                if (_typeSpecification.length > 2) { throw new Error(formatText(ERR_ARGUEJS_TypeSpecificationHasTooManyElements, _name)); }
            }

            parameter.hasDefaultValue = true;
            parameter.defaultValue    = _typeSpecification[1];
        }
        else {

            parameter.hasDefaultValue = false;
        }
        ensureSomeParameterDefaultValues(parameter);
        return parameter;
    }

    /**
     * Creates a new parameter object from a complex parameter type specification.
     *
     * @for       module-arguejs
     * @function  createComplexParameter
     * @private
     * @static
     *
     * @param {number}   _idx                The index (position) of the parameter in a function specification
     * @param {string}   _name               The name of the parameter
     * @param {!Object}  _typeSpecification  The parameter type specification
     *
     * @return {Object}  The created parameter object
     */
    function createComplexParameter(_idx, _name, _typeSpecification) {
        var parameter = {
            idx:    _idx,
            name:   _name
        };
        for (var key in _typeSpecification) {
            if (_typeSpecification.hasOwnProperty(key)) {
                switch(key) {
                    case("type"):
                        if (isSimpleOptionalTypeSpecification(_typeSpecification.type)) {
                            if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                                if (_typeSpecification.type.length < 1) { throw new Error(formatText(ERR_ARGUEJS_MissingTypeSpecification, _name)); }
                                if (_typeSpecification.type.length > 2) { throw new Error(formatText(ERR_ARGUEJS_TypeSpecificationHasTooManyElements, _name)); }
                            }
                            parameter.isOptional = true;
                            parameter.type       = _typeSpecification.type[0];
                        }
                        else {
                            parameter.isOptional = false;
                            parameter.type       = _typeSpecification.type;
                        }
                        break;
                    case("defaultValue"):
                        parameter.hasDefaultValue = true;
                        parameter.isOptional      = true; // by specifying a default value a parameter is optional; otherwise it would not make any sense to specify a default value
                        parameter.defaultValue    = _typeSpecification[key];
                        break;
                    case("allowUndefined"):
                        parameter.allowUndefined  = _typeSpecification[key];
                        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                            if (!isBoolean(parameter.allowUndefined)) { throw new Error(formatText(ERR_ARGUEJS_InvalidTypeOfValue, _name, "allowUndefined", "boolean")); }
                        }
                        break;
                    case("allowNull"):
                        parameter.allowNull = _typeSpecification[key];
                        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                            if (!isBoolean(parameter.allowNull)) { throw new Error(formatText(ERR_ARGUEJS_InvalidTypeOfValue, _name, "allowNull", "boolean")); }
                        }
                        break;
                    case("parenthesizeTail"):
                        parameter.parenthesizeTail = _typeSpecification[key];
                        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                            if (!isBoolean(parameter.parenthesizeTail)) { throw new Error(formatText(ERR_ARGUEJS_InvalidTypeOfValue, _name, "parenthesizeTail", "boolean")); }
                        }
                        break;
                    default:
                        throw new Error(formatText(ERR_ARGUEJS_UnknownTypeSpecificationOption, _name, key));
                }
            }
        }
        ensureSomeParameterDefaultValues(parameter);
        return parameter;
    }

    /**
     * Creates a new parameter object from a parameter specification.
     *
     * @for       module-arguejs
     * @function  createParameter
     * @private
     * @static
     *
     * @param {number}   _idx                     The index (position) of the parameter in a function specification
     * @param {!Object}  _parameterSpecification  A parameter specification object
     *
     * @return {Object}  The created parameter object
     */
    function createParameter(_idx, _parameterSpecification) {
        var parameter;
        for(var name in _parameterSpecification) {
            if (_parameterSpecification.hasOwnProperty(name)) {

                if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                    // check that not more than one element is in the object because the object (to be exact: the first
                    // element in the object) defines the parameter completely
                    if (parameter !== undefined) { throw new Error(formatText(ERR_ARGUEJS_ParameterWithTooManyElements, parameter.name)); }
                }

                var typeSpecification = _parameterSpecification[name];
                if (isSimpleMandatoryTypeSpecification(typeSpecification)) {
                    parameter = createSimpleMandatoryParameter(_idx, name, typeSpecification);
                    if ((typeof(ARGUEJS_PRODUCTION_READY) === "boolean") && ARGUEJS_PRODUCTION_READY) {
                        break;
                    }
                }
                else if (isSimpleOptionalTypeSpecification(typeSpecification)) {
                    parameter = createSimpleOptionalParameter(_idx, name, typeSpecification);
                    if ((typeof(ARGUEJS_PRODUCTION_READY) === "boolean") && ARGUEJS_PRODUCTION_READY) {
                        break;
                    }
                }
                else if (isComplexTypeSpecification(typeSpecification)) {
                    parameter = createComplexParameter(_idx, name, typeSpecification);
                    if ((typeof(ARGUEJS_PRODUCTION_READY) === "boolean") && ARGUEJS_PRODUCTION_READY) {
                        break;
                    }
                }
                else {
                    // it is a type or a value - whatever... we do not accept the parameter type specification
                    // examples: 17, "hello", false, undefined, null
                    throw new Error(formatText(ERR_ARGUEJS_InvalidValue, name, "type"));
                }
            }
        }
        return parameter;
    }

    /**
     * Validates a parameter object. If this function returns normally then the parameter object is valid. Otherwise,
     * this function throws an exception.
     *
     * @for       module-arguejs
     * @function  validateParameter
     * @private
     * @static
     *
     * @param {!Object}  _parameter     A parameter object
     * @param {number}   _parameterNum  The number of parameter specifications in a function specification. That
     *                                 information is used to test, if the tail parameter in a variadic function is
     *                                 the last parameter in the function specification.
     *
     * @return {void}
     */
    function validateParameter(_parameter, _parameterNum) {

        // function is not needed if ARGUEJS_PRODUCTION_READY===TRUE
        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {

            // validate parameter name
            if (!_parameter.name) { throw new Error(formatText(ERR_ARGUEJS_ParameterSpecificationWithoutName, _parameter.idx)); }
            if (!validateParameterName(_parameter.name)) { throw new Error(formatText(ERR_ARGUEJS_InvalidValue, _parameter.name, "name")); }

            // validate type
            if (!isType(_parameter.type)) { throw new Error(formatText(ERR_ARGUEJS_InvalidValue, _parameter.name, "type")); }

            // validate: special checks for variadic or non-variadic functions
            if (_parameter.type !== ArgueJS.TAIL) {

                // "parenthesizeTail" can only be used for the tail-parameter in a variadic function
                if (_parameter.parenthesizeTail !== undefined) { throw new Error(formatText(ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction, _parameter.name, "parenthesizeTail", "only")); }
            }
            else {

                // "allowUndefined" cannot be used for the tail-parameter in a variadic function
                if (_parameter.allowUndefined !== undefined) { throw new Error(formatText(ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction, _parameter.name, "allowUndefined", "not")); }

                // "allowNull" cannot be used for the tail-parameter in a variadic function
                if (_parameter.allowNull !== undefined) { throw new Error(formatText(ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction, _parameter.name, "allowNull", "not")); }

                // we found the tail-parameter of a variadic function. that parameter must be the last parameter in
                // the function specification, because that parameter consumes all remaining values
                if (_parameter.idx !== (_parameterNum-1)) { throw new Error(ERR_ARGUEJS_TailParameterMustBeLastPastparameter); }
            }
        }
    }

    /**
     * Returns the default value. If _defaultValue is a function but _type is not Function and not ArgueJS.ANYTYPE then
     * the function is called and the returned value is the default value. In any other case _defaultValue is
     * returned.
     *
     * @for       module-arguejs
     * @function  getDefaultValue
     * @private
     * @static
     *
     * @param {!Object}  _parameter  A parameter object
     *
     * @return {*}  The default value to use for a parameter
     */
    function getDefaultValue(_parameter) {
        var value;
        if (isFunction(_parameter.defaultValue) &&
           (_parameter.type !== Function) &&
           (_parameter.type !== ArgueJS.ANYTYPE)
        ) {
            value = _parameter.defaultValue();
        } else {
            value = _parameter.defaultValue;
        }
        if (!isCompatibleDefaultValue(value, _parameter)) { throw new Error(formatText(ERR_ARGUEJS_DefaultValueHasIncompatibleType, _parameter.name)); }
        return value;
    }

    /* ###############################################################################################
     *
     * Class: ArgueJS
     *
     * This class is public and gets exported.
     *
     * ###############################################################################################
     */

    /**
     * Constructor of class ArgueJS. At the moment it does not make any sense to create an object from that class.
     *
     * This class is exported by the module.
     *
     * @for    module-arguejs
     * @class  ArgueJS
     * @constructor
     * @private
     * @static
     */
    function ArgueJS() {
    }

    /**
     * Constructor of class ANYTYPE. That type is used to mark a parameter as "any type execpt undefined and null
     * allowed".
     *
     * ANYTYPE is a special type for marking an parameter type as "any type". That means any type is allowed for that
     * parameter - but of course, "undefined" and "null" are not allowed. If you want to specify an parameter that
     * accepts values of any type and "undefined" and "null" you can do that. In such a case speficy
     * "allowUndefind: true" and "allowNull: true" in the specification of the parameter.
     *
     * @example
     * var arguejs = require('arguejs');
     *
     * function example() {
     *     var specification = [{canBeAnyTypeOrUndefinedOrNull: {type: arguejs.ANYTYPE, allowUndefined: true, allowNull: true}}];
     *     var _args = arguejs.getArguments(specification, arguments);
     *     return _args.canBeAnyTypeOrUndefinedOrNull;
     * }
     *
     * example(17);
     * example("Hello world!");
     * example(true);
     * example(/^[a-z]*$/i);
     * example(new MyClass());
     *
     * @for    ArgueJS
     * @class  ANYTYPE
     * @constructor
     * @public
     * @expose
     * @static
     * @final
     */
    ArgueJS.ANYTYPE = function() {};

    /**
     * Constructor of class TAIL. That type is used to mark a parameter as "containing all remaining arguments of a
     * variadic function".
     *
     * TAIL is a special type for marking an parameter as "array of remaining arguments". TAIL is used to specify an
     * parameter containing all remaining arguments in a variadic function.
     *
     * @example
     * var arguejs = require('arguejs');
     *
     * function example() {
     *     var specification = [{obligatoryValue: Number}, {myTail: arguejs.TAIL}];
     *     var _args = arguejs.getArguments(specification, arguments);
     *     console.log("number=" + _args.Number);
     *     console.log("tail is " + (_args.myTail === undefined ? "undefined" : "defined and contains "+_args.myTail));
     * }
     *
     * example(17); // myTail is undefined
     * example(1, "Hello world!"); // myTail = ["Hello world!"]
     * example(39, 3, 1, 5, new MyClass(), true, [27,9,3,1]); // myTail = [3, 1, 5, new MyClass(), true, [27,9,3,1]]
     *
     * @for    ArgueJS
     * @class  TAIL
     * @constructor
     * @public
     * @expose
     * @static
     * @final
     */
    ArgueJS.TAIL = function() {};

    /**
     * Gets all arguments based on a programmatic function specification an a list of argument values.
     *
     * @for     ArgueJS
     * @method  getArguments
     * @public
     * @expose
     * @static
     *
     * @param {!Array=}            [_functionSpecification]  Optional: Programmatic function specification.
     * @param {!Array|!Arguments}  _arguments                Concrete Argument values of a function call.
     *
     * @return {Object}  Returns a new object containing all arguments.
     */
    ArgueJS.getArguments = function(_functionSpecification, _arguments) {
        // validate input parameters because this function is part of the public interface
        if (arguments.length === 1) {
            if (!isArguments(arguments[0]) && !isArray(arguments[0])) { throw new Error(formatText(ERR_BADCALL_InvalidTypeOfArgument, "_arguments")); }
            if (!arguments[0] || arguments[0].length > 0) { throw new Error(formatText(ERR_ARGUEJS_GetParameters_TooManyArguments, "no parameters defined but arguments given")); }
            return {}; // EARLY EXIT: no function specification given (means: no arguments allowed) and no arguments given -> _arguments validated!
        }
        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
            if (arguments.length !== 2) { throw new Error(arguments.length < 1 ? ERR_BADCALL_NoArguments : ERR_BADCALL_TooManyArguments); }
            if (!isArray(_functionSpecification)) { throw new Error(formatText(ERR_BADCALL_InvalidTypeOfArgument, "_functionSpecification")); }
            if (!isArguments(_arguments) && !isArray(_arguments)) { throw new Error(formatText(ERR_BADCALL_InvalidTypeOfArgument, "_arguments")); }
        }

        // process all parameters
        var resultingArguments      = {};                            // the resulting list with arguments.
        var processedParameterNames = {};                            // dictionary containing all parameter names which are already processed. that dictionary is used to verify that every parameter name is used only once in a parameter specification.
        var parameterNum            = _functionSpecification.length; // the number of function specifications contained in _functionSpecification.
        var argumentNum             = _arguments.length;             // the number of arguments contained in _arguments.
        var argumentIdx             = 0;                             // an index variable beginning with 0 containing the position of the current argument in _arguments.
        var argumentValue           = _arguments[argumentIdx];       // the current argument value. as long as (argumentIdx < argumentNum) is true argumentValue contains the current argument value. that is always the value in _arguments at position argumentIdx.
        for (var parameterIdx = 0; parameterIdx < parameterNum; ++parameterIdx) {

            var parameterSpecification = _functionSpecification[parameterIdx];
            if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                if (getType(parameterSpecification) !== Object) { throw new Error(formatText(ERR_BADCALL_InvalidTypeOfParameter, parameterIdx)); }
            }

            var parameter = createParameter(parameterIdx, parameterSpecification);
            if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                validateParameter(parameter, parameterNum);

                // ATTENTION! THIS TWO LINES ARE REALLY EXPENSIVE!
                // @TODO: find a better solution to detect if a parameter name is not unique
                if (processedParameterNames.hasOwnProperty(parameter.name)) { throw new Error(formatText(ERR_ARGUEJS_ParameterAlreadyDefined, parameter.name, parameterIdx)); }
                processedParameterNames[parameter.name] = parameter;
            }

            // are there remaining arguments?
            if (argumentIdx < argumentNum) {

                // yes, there is at least one argument that was not consumed
                // ATTENTION! if there is at least one argument that is unprocessed (and that is the case here) then
                //            the value of the current argument to process is already stored in argumentValue!

                // is the current argument value compatible to the current parameter specification?
                if (isCompatibleArgumentValue(argumentValue, parameter)) {

                    if (parameter.type !== ArgueJS.TAIL) {

                        // no, it is not the tail parameter of a variadic function

                        // store the argument value in the resulting argument list
                        resultingArguments[parameter.name] = argumentValue;

                        // advance to the next argument value if it exists
                        ++argumentIdx;
                        if (argumentIdx < argumentNum) {
                            argumentValue = _arguments[argumentIdx];
                        }
                    }
                    else {

                        // yes, it is the tail parameter of a variadic function

                        // if the current argument is the last argument and that argument is an array and that array
                        // should not be enclosed in a new array (parenthesizeTail:false) then use that array as tail
                        // argument of the variadic function. in any other case a new array is build containing the
                        // current argument and all remaining arguments (if any exist)
                        if (argumentIdx !== (argumentNum-1)) { // is the current argument not the last argument? are there more remaining arguments?
                            resultingArguments[parameter.name] = Array.prototype.slice.call(_arguments, argumentIdx);
                        }
                        else if (!isArray(argumentValue) || parameter.parenthesizeTail) {
                            resultingArguments[parameter.name] = [argumentValue];
                        }
                        else {
                            resultingArguments[parameter.name] = argumentValue;
                        }
                        argumentIdx = argumentNum; // ATTENTION! it is important to set argumentIdx to argumentNum. That means "all arguments are processed - there are no remaining arguments left". Without that line you will get an "too many arguments" exception.
                        break;
                    }

                    // because the current parameter specification is processed we advance to the next parameter
                    // specification
                    // ATTENTION! it is important that jump directly to the next parameter specification. a detailed
                    //            explanation is in the next comment below.
                    continue;
                }
            }

            // the current argument is not compatible with the current paramter OR all arguments have already been
            // processed and we are now iterating through the remaining parameters. however...
            //
            // the current parameter specification must be a parameter specification for an optional argument. if that
            // is not the case we found a parameter specification of a mandatory parameter without an compatible
            // argument and throw an exception ("mandatory parameter without value"). but if the current parameter
            // specification is for an optional parameter then we assign that parameter its default value if a default
            // value is defined.
            if (!parameter.isOptional) { throw new Error(formatText(ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue, parameter.name)); }
            if (parameter.hasDefaultValue) {
                resultingArguments[parameter.name] = getDefaultValue(parameter);
            }
        }

        // all parameter specifications were processed. are there still remaining arguments?
        if (argumentIdx < argumentNum) { throw new Error(formatText(ERR_ARGUEJS_GetParameters_TooManyArguments, "there are arguments left but all parameters are processed.")); }

        // FINISHED!
        return resultingArguments;
    };

    /*
     * THIS FUNCTION EXPORTS INTERNAL INFORMATION ABOUT THE LIBRARY. THAT IS USEFUL FOR TESTING THE LIBRARY. TESTING ALL
     * PARTS OF THE LIBRARY IS THE ONLY INTENTION FOR THIS FUNCTION.
     *
     * DO NOT USE THAT FUNCTION TO ACCESS INTERNAL STUFF. CHANGES IN THE SPECIFICATION OF THIS FUNCTION ARE NOT REPORTED
     * AND MAY OCCUR AT ANY TIME WITHOUT ANY WARNING! THESE CHANGES ARE NO BUGS AND WILL NOT GET THREATED AS BUGS!
     */
    if ((typeof(ARGUEJS_EXPORT_INTERNALS) === "boolean") && ARGUEJS_EXPORT_INTERNALS) {
        /**
         * THIS FUNCTION EXPORTS INTERNAL INFORMATION ABOUT THE LIBRARY. THAT IS USEFUL FOR TESTING THE LIBRARY. TESTING ALL
         * PARTS OF THE LIBRARY IS THE ONLY INTENTION FOR THIS FUNCTION.
         *
         * DO NOT USE THAT FUNCTION TO ACCESS INTERNAL STUFF. CHANGES IN THE SPECIFICATION OF THIS FUNCTION ARE NOT REPORTED
         * AND MAY OCCUR AT ANY TIME WITHOUT ANY WARNING! THESE CHANGES ARE NO BUGS AND WILL NOT GET THREATED AS BUGS!
         *
         * @for     ArgueJS
         * @method  __export_internals__
         * @expose
         */
        ArgueJS.__export_internals__ = function(_arguejs) {
            if ((typeof(_arguejs) !== "undefined") && !(_arguejs instanceof ArgueJS)) { throw new Error(ERR_BADCALL_PREFIX + "_arguejs type mismatch"); }

            // build the object with internal information
            var __internals__ = {

                // config
                config: {
                    ARGUEJS_PRODUCTION_READY : ((typeof(ARGUEJS_PRODUCTION_READY) === "boolean") && ARGUEJS_PRODUCTION_READY)
                },

                // global privates
                $ : {

                    // Some constant configuration values for this module.
                    defaults : {
                        DEFAULT_VALUE_FOR_ALLOWNULL         : DEFAULT_VALUE_FOR_ALLOWNULL,
                        DEFAULT_VALUE_FOR_ALLOWUNDEFINED    : DEFAULT_VALUE_FOR_ALLOWUNDEFINED,
                        DEFAULT_VALUE_FOR_PARENTHESIZETAIL  : DEFAULT_VALUE_FOR_PARENTHESIZETAIL
                    },

                    // Error texts
                    errorTexts : {
                        ERR_BADCALL_PREFIX                                        : ERR_BADCALL_PREFIX,
                        ERR_BADCALL_InvalidTypeOfArgument                         : ERR_BADCALL_InvalidTypeOfArgument,
                        ERR_BADCALL_NoArguments                                   : ERR_BADCALL_NoArguments,
                        ERR_BADCALL_TooManyArguments                              : ERR_BADCALL_TooManyArguments,
                        ERR_BADCALL_InvalidTypeOfParameter                        : ERR_BADCALL_InvalidTypeOfParameter,

                        ERR_ARGUEJS_PREFIX                                        : ERR_ARGUEJS_PREFIX,
                        ERR_ARGUEJS_DefaultValueHasIncompatibleType               : ERR_ARGUEJS_DefaultValueHasIncompatibleType,
                        ERR_ARGUEJS_InvalidTypeOfValue                            : ERR_ARGUEJS_InvalidTypeOfValue,
                        ERR_ARGUEJS_InvalidValue                                  : ERR_ARGUEJS_InvalidValue,
                        ERR_ARGUEJS_MissingTypeSpecification                      : ERR_ARGUEJS_MissingTypeSpecification,
                        ERR_ARGUEJS_ParameterAlreadyDefined                       : ERR_ARGUEJS_ParameterAlreadyDefined,
                        ERR_ARGUEJS_ParameterSpecificationWithoutName             : ERR_ARGUEJS_ParameterSpecificationWithoutName,
                        ERR_ARGUEJS_ParameterWithTooManyElements                  : ERR_ARGUEJS_ParameterWithTooManyElements,
                        ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction         : ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction,
                        ERR_ARGUEJS_TailParameterMustBeLastPastparameter          : ERR_ARGUEJS_TailParameterMustBeLastPastparameter,
                        ERR_ARGUEJS_TypeSpecificationHasTooManyElements           : ERR_ARGUEJS_TypeSpecificationHasTooManyElements,
                        ERR_ARGUEJS_UnknownTypeSpecificationOption                : ERR_ARGUEJS_UnknownTypeSpecificationOption,

                        ERR_ARGUEJS_GetParameters_PREFIX                          : ERR_ARGUEJS_GetParameters_PREFIX,
                        ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue  : ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue,
                        ERR_ARGUEJS_GetParameters_TooManyArguments                : ERR_ARGUEJS_GetParameters_TooManyArguments,

                        asRegExp : {
                            // object gets filled after building __internals___ by iterating all error texts and creating regular expressions
                            // that way it is ensured that for all error texts a corresponding regular expression exits.
                            // the regular expressions have the same name as the corresponding error text.
                        }
                    },

                    // Utility functions for handling types
                    isBoolean                           : isBoolean,
                    isArray                             : isArray,
                    isFunction                          : isFunction,
                    isObject                            : isObject,
                    isArguments                         : isArguments,
                    isType                              : isType,
                    getType                             : getType,

                    // Utility functions for generating error messages
                    formatText                          : formatText,

                    // Utility functions for validating data
                    validateParameterName               : validateParameterName,
                    isCompatibleArgumentValue           : isCompatibleArgumentValue,
                    isCompatibleDefaultValue            : isCompatibleDefaultValue,

                    // Functions just to reduce code complexity in getArguments(...)
                    isSimpleMandatoryTypeSpecification  : isSimpleMandatoryTypeSpecification,
                    isSimpleOptionalTypeSpecification   : isSimpleOptionalTypeSpecification,
                    isComplexTypeSpecification          : isComplexTypeSpecification,

                    ensureSomeParameterDefaultValues    : ensureSomeParameterDefaultValues,

                    createSimpleMandatoryParameter      : createSimpleMandatoryParameter,
                    createSimpleOptionalParameter       : createSimpleOptionalParameter,
                    createComplexParameter              : createComplexParameter,
                    createParameter                     : createParameter,

                    validateParameter                   : validateParameter,

                    getDefaultValue                     : getDefaultValue
                },

                // Class: ArgueJS
                ArgueJS: {
                    /* nothing to export at the moment */
                },

                // current object _arguejs
                _arguejs: _arguejs ? undefined : {
                    /* nothing to export at the moment */
                }
            };

            // convert all error texts to regular expressions
            var replaceAllDotsRegExp            = (/\./g);
            var replaceAllOpeningBracketsRegExp = (/\(/g);
            var replaceAllClosingBracketsRegExp = (/\)/g);
            var errorTextConversionRegExp       = (/\{[1-9][0-9]?\}/g);
            var errorTexts = __internals__.$.errorTexts;
            for (var errorTextId in errorTexts) {
                if (errorTexts.hasOwnProperty(errorTextId) && (errorTextId !== "asRegExp")) {
                    errorTexts.asRegExp[errorTextId] = new RegExp(
                            "^" +
                            errorTexts[errorTextId].
                                replace(replaceAllDotsRegExp, "\\.").
                                replace(replaceAllOpeningBracketsRegExp, "\\(").
                                replace(replaceAllClosingBracketsRegExp, "\\)").
                                replace(errorTextConversionRegExp, ".*") +
                            "$"
                        );
                }
            }

            // FINISHED!
            return __internals__;
        };
    }

    /* ###############################################################################################
     *
     *  FINISH MODULE EXPORT DEFINITION
     *
     * ###############################################################################################
     */

    /**
     * @exports {ArgueJS}  Export the class.
     */
    return ArgueJS;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>> make module available in node.js and the web (AMD - RequireJS) >>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    }));
});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// <<< make module available in node.js and the web (AMD - RequireJS) <<<
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
