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
// [[>>> make module available in node.js and the web (AMD - RequireJS)]]
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

/* ARGUEJS_PRODUCTION_READY
 *
 * Should unnecessary tests in the library be removed because the library will alway be used correctly? true/false
 *
 * True: Removes all test in the library that are not necessary if the library is always used correctly. That means:
 * - getArguments(...) is called with the right number of arguments
 * - getArguments(...) is called with arguments of the correct type
 * - if getArguments(...) is called with a function specification then that function specification has a valid structure (is an array contining zero or more objects - the parameter specifications)
 * - if getArguments(...) is called with a function specification containing parameter specifications then that parameter specifications have a correct structure and satisfy all rules (for instance
 *   parenthesizeTail is only allowed for the tail parameter of a variadic function)
 *
 * for production   : set ARGUEJS_PRODUCTION_READY to true
 * for development  : do not define ARGUEJS_PRODUCTION_READY or set value to false
 * for minification : set ARGUEJS_PRODUCTION_READY to true; special note for minification with UglifyJS: add --define "ARGUEJS_PRODUCTION_READY=true" to command line options
 * for unittesting  : do not define ARGUEJS_PRODUCTION_READY or set value to false if all unit test should run. set ARGUEJS_PRODUCTION_READY to true if all tests that are compatible with removed
 *                    tests inside the library should run. In that case all tests that tests specific errors which are not detected by the library anymore (because these tests in the library are
 *                    removed now) are deactivated in unit tests.
 */
// /** const */ var ARGUEJS_PRODUCTION_READY = false;

/* ARGUEJS_EXPORT_INTERNALS
 *
 * Exporting internals for debugging and testing? true/false @see ArgueJS.__export_internals__
 *
 * for production   : do not define ARGUEJS_EXPORT_INTERNALS or set value to false
 * for development  : do not define ARGUEJS_EXPORT_INTERNALS or set value to false
 * for minification : do not define ARGUEJS_EXPORT_INTERNALS or set value to false; special note for minification with UglifyJS: add --define "ARGUEJS_EXPORT_INTERNALS=false" to command line options
 * for unittesting  : unit tests of this library require "ARGUEJS_EXPORT_INTERNALS = true" because some tests test internal functionality of that library or need internal functions/variables to work
 */
// /** const */ var ARGUEJS_EXPORT_INTERNALS = false;

define(function(require) {

    "use strict";

    // initialize and return module
    return function(module_exports_factory){
        return module_exports_factory(
            /* put some static configuration values here */
        );
    }(

    function(
        /* define variables for some static configuration values here */
    ) {
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// [[<<< make module available in node.js and the web (AMD - RequireJS)]]
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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

    /** const */ var DEFAULT_OPTION_VALUE_ALLOWNULL                     = false;
    /** const */ var DEFAULT_OPTION_VALUE_ALLOWUNDEFINED                = false;
    /** const */ var DEFAULT_OPTION_VALUE_PARAMETERPARENTHESIZETAIL     = true;

    /* ###############################################################################################
     *
     * Error texts
     *
     * These texts are private to this module.
     *
     * ###############################################################################################
     */

    /** const */ var ERR_BADCALL_PREFIX                                         = "bad call: ";
    /** const */ var ERR_BADCALL_InvalidTypeOfArgument                          = ERR_BADCALL_PREFIX + "type of \"{1}\" is invalid.";
    /** const */ var ERR_BADCALL_NoArguments                                    = ERR_BADCALL_PREFIX + "no arguments. function call is not compatible with function specification.";
    /** const */ var ERR_BADCALL_TooManyArguments                               = ERR_BADCALL_PREFIX + "too many arguments. function call is not compatible with function specification.";
    /** const */ var ERR_BADCALL_InvalidTypeOfParameter                         = ERR_BADCALL_PREFIX + "parameter specification #{1} is not an object structure.";

    /** const */ var ERR_ARGUEJS_PREFIX                                         = "parameter specification \"{1}\": ";
    /** const */ var ERR_ARGUEJS_DefaultValueHasIncompatibleType                = ERR_ARGUEJS_PREFIX + "default value is not compatible to parameter type";
    /** const */ var ERR_ARGUEJS_InvalidTypeOfValue                             = ERR_ARGUEJS_PREFIX + "value of \"{2}\" has incorrect type (must be {3})";
    /** const */ var ERR_ARGUEJS_InvalidValue                                   = ERR_ARGUEJS_PREFIX + "\"{2}\" is invalid.";
    /** const */ var ERR_ARGUEJS_MissingTypeSpecification                       = ERR_ARGUEJS_PREFIX + "type specification is missing.";
    /** const */ var ERR_ARGUEJS_ParameterAlreadyDefined                        = ERR_ARGUEJS_PREFIX + "parameter with same name already defined (conflicting position in function specification: #{2})";
    /** const */ var ERR_ARGUEJS_ParameterSpecificationWithoutName              = "parameter specification: parameter #{1} has no name";
    /** const */ var ERR_ARGUEJS_ParameterWithTooManyElements                   = ERR_ARGUEJS_PREFIX + "specification contains more than one element.";
    /** const */ var ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction          = ERR_ARGUEJS_PREFIX + "\"{2}\" is {3} allowed for the tail-parameter in a variadic function";
    /** const */ var ERR_ARGUEJS_TailParameterMustBeLastPastparameter           = "in a variadic function the tail-parameter must be the last parameter in the function specification.";
    /** const */ var ERR_ARGUEJS_TypeSpecificationHasTooManyElements            = ERR_ARGUEJS_PREFIX + "type specification has too many elements.";
    /** const */ var ERR_ARGUEJS_UnknownTypeSpecificationOption                 = ERR_ARGUEJS_PREFIX + "type specification contains unknown option \"{2}\".";

    /** const */ var ERR_ARGUEJS_GetParameters_PREFIX                           = "Incompatible function call: ";
    /** const */ var ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue   = ERR_ARGUEJS_GetParameters_PREFIX + "mandatory argument \"{1}\" has no value.";
    /** const */ var ERR_ARGUEJS_GetParameters_TooManyArguments                 = ERR_ARGUEJS_GetParameters_PREFIX + "too many arguments. {1}";

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
     *
     * @param  {*}  _value  The value to test.
     *
     * @return {boolean}  True, if the value is a Boolean. False, otherwise.
     */
    function isBoolean(_value) {
        return (typeof(_value) === 'boolean');
    }

    /**
     * Tests, if a value is a Array.
     *
     * @for       module-arguejs
     * @function  isArray
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
     *
     * @param  {*}  _value  The value to test.
     *
     * @return {boolean}  True, if the value is a Function. False, otherwise.
     */
    function isFunction(_value) {
        return (typeof(_value) === 'function');
    }

    /**
     * Tests, if a value is a Object.
     *
     * @for       module-arguejs
     * @function  isObject
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
     *
     * @param  {*}  _value  The value to test.
     *
     * @return {boolean}  True, if the value is an Arguments object. False, otherwise.
     */
    var isArguments = function() {
        var argumentsDetectionText = Object.prototype.toString.call(arguments);
        return function(_value) {
            return (Object.prototype.toString.call(_value) === argumentsDetectionText);
        };
    }();

    /**
     * Tests, if a value is a "Type". This function summarizes logic for detecting, if a value is a type. In JavaScript does not exist anything like a "Type"-type.
     * So, some logic is needed to distinguish between a value/object/function and a type.
     *
     * @for       module-arguejs
     * @function  isType
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
     *
     * @param  {*}  _value  A value.
     *
     * @return {Type}  The type of _value. It is not a string representation. It is the type. For "text" it returns String, and so on...
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
     * This is a variadic function. Placeholders are delivered as normal arguments after the _formatString argument. In the _formatString occurrences of "{X}" - where "X" is
     * a number beginning with 1 - are replaced by the argument at position "X".
     *
     * @for       module-arguejs
     * @function  formatText
     *
     * @param {string}  _formatString  Format string containing placeholders.
     * @param {...*}    _replacements  Optional: Arguments: Arguments to use in this variadic function. These arguments are used to fill in placeholder in the format string.
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
     *
     * @param {string}  _parameterName  Name of a parameter.
     *
     * @return {boolean}  True, if the
     */
    var validateParameterName = function() {
        var regExp = /^[_a-z$]{1}[_a-z0-9$]*$/i;
        return function(_parameterName) {
            return (_parameterName ? regExp.test(_parameterName) : false);
        };
    }();

    /**
     * Tests, if a value is compatible to a type and some options and if the value can be used as a default value or as a normal argument value.
     *
     * @for       module-arguejs
     * @function  isCompatibleValue
     *
     * @param  {*}        _value           A value.
     * @param  {Type}     _type            A type the value should be compatible with.
     * @param  {boolean}  _allowUndefined  True, if an undefined value can be treated compatible. False, otherwise.
     * @param  {boolean}  _allowNull       True, if a null value can be treated compatible. False, otherwise.
     * @param  {boolean}  _asDefaultValue  True, if the test is for testing a default value. False, otherwise. The reason for this parameter is simple: A value of any type
     *                                     can be part of the tail-parameter of a variadic function. But that parameter is an array. So only an array can be a default parameter.
     *
     * @return {boolean}  True, if a value is compatible to a type and some options. False, otherwise.
     */
    function isCompatibleValue(_value, _type, _allowUndefined, _allowNull, _asDefaultValue) {
        if (_asDefaultValue) {

            if (_type  === ArgueJS.TAIL) { return isArray(_value); } // only an array is compatible as default value for the tail-parameter of a variadic function
            if (_value === undefined)    { return (_allowUndefined === true); } // value "undefined" is compatible if "undefined" is allowed
            if (_value === null)         { return (_allowNull === true); } // value "null" is compatible if "null" is allowed

        } else {

            if (_type  === ArgueJS.TAIL) { return true; } // any value is compatible as non-default value for the tail-parameter of a variadic function
            if (_value === undefined)    { return (_allowUndefined === true); } // value "undefined" is compatible if "undefined" is allowed
            if (_value === null)         { return (_allowNull === true); } // value "null" is compatible if "null" is allowed
        }
        if (_type  === ArgueJS.ANYTYPE) { return true; } // any value is compatible with ANYTYPE
        return (getType(_value) === _type) || (_value instanceof _type);
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
     * @static
     */
    function ArgueJS() {
    }

    /**
     * Constructor of class ANYTYPE. That type is used to mark a parameter as "any type execpt undefined and null allowed".
     *
     * ANYTYPE is a special type for marking an parameter type as "any type". That means any type is allowed for that parameter - but of course, "undefined" and "null" are not allowed.
     * If you want to specify an parameter that accepts values of any type and "undefined" and "null" you can do that. In such a case speficy "allowUndefind: true" and "allowNull: true"
     * in the specification of the parameter.
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
     * @static
     * @final
     */
    ArgueJS.ANYTYPE = function() {};

    /**
     * Constructor of class TAIL. That type is used to mark a parameter as "containing all remaining arguments of a variadic function".
     *
     * TAIL is a special type for marking an parameter as "array of remaining arguments". TAIL is used to specify an parameter containing all remaining arguments in a variadic function.
     *
     * @example
     * var arguejs = require('arguejs');
     *
     * function example() {
     *     var specification = [{obligatoryValue: Number}, {myTail: arguejs.TAIL}];
     *     var _args = arguejs.getArguments(specification, arguments);
     *     console.log("number=" + _args.Number);
     *     console.log("tail is " + (_args.myTail === undefined ? "undefined" : "defined and contains " + _args.myTail));
     * }
     *
     * example(17); // myTail is undefined
     * example(1, "Hallo world!"); // myTail = ["Hello world!"]
     * example(39, 3, 1, 5, new MyClass(), false, true, [27,9,3,1]); // myTail = [3, 1, 5, new MyClass(), false, true, [27,9,3,1]]
     *
     * @for    ArgueJS
     * @class  TAIL
     * @constructor
     * @static
     * @final
     */
    ArgueJS.TAIL = function() {};

    /**
     * Gets all arguments based on a programmatic function specification an a list of argument values.
     *
     * @for     ArgueJS
     * @method  getArguments
     * @static
     *
     * @param {Array}            [_functionSpecification]  Optional: Programmatic function specification.
     * @param {Array|Arguments}  _arguments                Concrete Argument values of a function call.
     *
     * @return {Object}  Returns a new object containing all arguments.
     */
    ArgueJS.getArguments = function(_functionSpecification, _arguments) {
        // checks and maps input parameters because this function is part of the public interface
        if (arguments.length === 1) {
            _arguments = arguments[0];
            if (!_arguments || _arguments.length > 0) { throw new Error(formatText(ERR_ARGUEJS_GetParameters_TooManyArguments, "no parameters defined but arguments given")); }
            return {}; // EARLY EXIT: no function specification given (means: no arguments allowed) and no arguments given -> _arguments validated!
        }
        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
            if (arguments.length != 2) { throw new Error(arguments.length < 1 ? ERR_BADCALL_NoArguments : ERR_BADCALL_TooManyArguments); }
            if (!isArray(_functionSpecification)) { throw new Error(formatText(ERR_BADCALL_InvalidTypeOfArgument, "_functionSpecification")); }
            if (!isArguments(_arguments) && !isArray(_arguments)) { throw new Error(formatText(ERR_BADCALL_InvalidTypeOfArgument, "_arguments")); }
        }

        // safe some parameter
        var parameterNum = _functionSpecification.length;

        // the resulting list with arguments
        var resultingArguments = {};
        var processedParameterNames = {};

        // process all parameters
        var parameterName;              // the name of the parameter. that is the name of the property in the resulting list of argument values
        var parameterType;              // the type of the parameter
        var parameterIsOptional;        // undefined|false means "non-optional parameter"; true means "optional parameter"
        var parameterHasDefaultValue;   // undefined|false means "has no default value"; true means "has default value"
        var parameterDefaultValue;      // if parameterHasDefaultValue is true then the value of that variable is the default value - whatever that value is (undefined, null, a string, a function, an object, ...)
        var parameterAllowUndefined;    // undefined means "default behavior or option forbidden (because parameter is tail-parameter)"; false means "explicitly not allowed"; true means "explicit allowed"
        var parameterAllowNull;         // undefined means "default behavior or option forbidden (because parameter is tail-parameter)"; false means "explicitly not allowed"; true means "explicit allowed"
        var parameterParenthesizeTail;  // undefined means "default behavior or option forbidden (because parameter is no tail-parameter)"; false means "explicitly do no parenthesize"; true means "explicitly do no parenthesize"

        var argumentNum   = _arguments.length;
        var argumentIdx   = 0;
        var argumentValue = _arguments[argumentIdx];
        for (var parameterIdx = 0; parameterIdx < parameterNum; ++parameterIdx) {

            // get current parameter info
            var parameterSpecification = _functionSpecification[parameterIdx];
            if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                if (getType(parameterSpecification) !== Object) { throw new Error(formatText(ERR_BADCALL_InvalidTypeOfParameter, parameterIdx)); }
            }

            // get parameter specification
            parameterName             = undefined;  // the name of the parameter. that is the name of the property in the resulting list of argument values
            parameterType             = undefined;  // the type of the parameter
            parameterIsOptional       = undefined;  // undefined|false means "non-optional parameter"; true means "optional parameter"
            parameterHasDefaultValue  = undefined;  // undefined|false means "has no default value"; true means "has default value"
            parameterDefaultValue     = undefined;  // if parameterHasDefaultValue is true then the value of that variable is the default value - whatever that value is (undefined, null, a string, a function, an object, ...)
            parameterAllowUndefined   = undefined;  // undefined means "default behavior or option forbidden (because parameter is tail-parameter)"; false means "explicitly not allowed"; true means "explicit allowed"
            parameterAllowNull        = undefined;  // undefined means "default behavior or option forbidden (because parameter is tail-parameter)"; false means "explicitly not allowed"; true means "explicit allowed"
            parameterParenthesizeTail = undefined;  // undefined means "default behavior or option forbidden (because parameter is no tail-parameter)"; false means "explicitly do no parenthesize"; true means "explicitly do no parenthesize"
            for(var parameterId in parameterSpecification) {
                if (parameterSpecification.hasOwnProperty(parameterId)) {

                    // check that not more than one element is in the object because the object (to be exact: the first element in the object) defines the parameter completely
                    if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                        if (parameterName) { throw new Error(formatText(ERR_ARGUEJS_ParameterWithTooManyElements, parameterName)); }
                    }

                    // get parameter name
                    parameterName = parameterId;
                    if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                        if (!validateParameterName(parameterName)) { throw new Error(formatText(ERR_ARGUEJS_InvalidValue, parameterName, "name")); }
                    }

                    // get data of type specification
                    var parameterTypeData = parameterSpecification[parameterId];

                    // get parameter type specification from simple mandatory parameter specification (examples: {message: String})
                    if (isFunction(parameterTypeData)) {

                        parameterIsOptional = false;
                        parameterType       = parameterTypeData;
                    }

                    // get parameter type specification from simple optional parameter specification (examples: {message: [String]}, {myValue: [Number, 17]})
                    else if (isArray(parameterTypeData)) {

                        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                            if (parameterTypeData.length < 1) { throw new Error(formatText(ERR_ARGUEJS_MissingTypeSpecification, parameterName)); }
                        }
                        parameterIsOptional = true;
                        parameterType       = parameterTypeData[0];

                        if (parameterTypeData.length >= 2) {
                            if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                                if (parameterTypeData.length > 2) { throw new Error(formatText(ERR_ARGUEJS_TypeSpecificationHasTooManyElements, parameterName)); }
                            }
                            parameterHasDefaultValue = true;
                            parameterDefaultValue    = parameterTypeData[1];
                        }
                    }

                    // get parameter type specification from complex parameter specification (examples: { message: {type: [String], defaultValue: "Hallo Welt!", allowUndefined: false, allowNull: false}})
                    else if (isObject(parameterTypeData)) { // @TODO: This test should be improved because of types Array, Date, RegExp, Function - these are definitve not the kind of objects we want

                        for (var key in parameterTypeData) {
                            if (parameterTypeData.hasOwnProperty(key)) {
                                switch(key) {
                                    case("type"):
                                        if (isArray(parameterTypeData.type)) {
                                            if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                                                if (parameterTypeData.type.length < 1) { throw new Error(formatText(ERR_ARGUEJS_MissingTypeSpecification, parameterName)); }
                                                if (parameterTypeData.type.length > 2) { throw new Error(formatText(ERR_ARGUEJS_TypeSpecificationHasTooManyElements, parameterName)); }
                                            }
                                            parameterIsOptional = true;
                                            parameterType       = parameterTypeData.type[0];
                                        }
                                        else {
                                            parameterIsOptional = false;
                                            parameterType       = parameterTypeData.type;
                                        }
                                        break;
                                    case("defaultValue"):
                                        parameterHasDefaultValue = true;
                                        parameterIsOptional      = true; // by specifying a default value a parameter is optional; otherwise it would not make any sense to specify a default value
                                        parameterDefaultValue    = parameterTypeData[key];
                                        break;
                                    case("allowUndefined"):
                                        parameterAllowUndefined  = parameterTypeData[key];
                                        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                                            if (!isBoolean(parameterAllowUndefined)) { throw new Error(formatText(ERR_ARGUEJS_InvalidTypeOfValue, parameterName, "allowUndefined", "boolean")); }
                                        }
                                        break;
                                    case("allowNull"):
                                        parameterAllowNull = parameterTypeData[key];
                                        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                                            if (!isBoolean(parameterAllowNull)) { throw new Error(formatText(ERR_ARGUEJS_InvalidTypeOfValue, parameterName, "allowNull", "boolean")); }
                                        }
                                        break;
                                    case("parenthesizeTail"):
                                        parameterParenthesizeTail = parameterTypeData[key];
                                        if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                                            if (!isBoolean(parameterParenthesizeTail)) { throw new Error(formatText(ERR_ARGUEJS_InvalidTypeOfValue, parameterName, "parenthesizeTail", "boolean")); }
                                        }
                                        break;
                                    default:
                                        throw new Error(formatText(ERR_ARGUEJS_UnknownTypeSpecificationOption, parameterName, key));
                                }
                            }
                        }
                    }
                    else {

                        // it is a type or a value; however we do not accept the parameter type specification (examples: 17, "hello", false, undefined, null)
                        throw new Error(formatText(ERR_ARGUEJS_InvalidValue, parameterName, "type"));
                    }
                }
            }

            // validate parameter name
            if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                if (!parameterName) { throw new Error(formatText(ERR_ARGUEJS_ParameterSpecificationWithoutName, parameterIdx)); }

                if (processedParameterNames.hasOwnProperty(parameterName)) { throw new Error(formatText(ERR_ARGUEJS_ParameterAlreadyDefined, parameterName, parameterIdx)); } // ATTENTION! THIS TWO LINES ARE REALLY EXPENSIVE! @TODO: find a better solution to detect if a parameterName is not unique
                processedParameterNames[parameterName] = true;                                                                                                                // ATTENTION! THIS TWO LINES ARE REALLY EXPENSIVE! @TODO: find a better solution to detect if a parameterName is not unique
            }

            // validate type
            if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                if (!isType(parameterType)) { throw new Error(formatText(ERR_ARGUEJS_InvalidValue, parameterName, "type")); }
            }

            // validate: special checks for variadic or non-variadic functions
            if (parameterType !== ArgueJS.TAIL) {

                // "parenthesizeTail" can only be used for the tail-parameter in a variadic function
                if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {
                    if (parameterParenthesizeTail !== undefined) { throw new Error(formatText(ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction, parameterName, "parenthesizeTail", "only")); }
                }

                // set default values for allowUndefined and allowNull, if options are undefined
                if (parameterAllowUndefined === undefined) { parameterAllowUndefined = DEFAULT_OPTION_VALUE_ALLOWUNDEFINED; }
                if (parameterAllowNull      === undefined) { parameterAllowNull      = DEFAULT_OPTION_VALUE_ALLOWNULL; }
            }
            else {

                if ((typeof(ARGUEJS_PRODUCTION_READY) !== "boolean") || !ARGUEJS_PRODUCTION_READY) {

                    // "allowUndefined" cannot be used for the tail-parameter in a variadic function
                    if (parameterAllowUndefined !== undefined) { throw new Error(formatText(ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction, parameterName, "allowUndefined", "not")); }

                    // "allowNull" cannot be used for the tail-parameter in a variadic function
                    if (parameterAllowNull !== undefined) { throw new Error(formatText(ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction, parameterName, "allowNull", "not")); }

                    // we found the tail-parameter of a variadic function. that parameter must be the last parameter in the function specification, because that parameter consumes all remaining values
                    if (parameterIdx != (parameterNum-1)) { throw new Error(ERR_ARGUEJS_TailParameterMustBeLastPastparameter); }
                }

                // set default value for parenthesizeTail, if option is undefined
                if (parameterParenthesizeTail === undefined) { parameterParenthesizeTail = DEFAULT_OPTION_VALUE_PARAMETERPARENTHESIZETAIL; }
            }

            // are there remaining arguments?
            if (argumentIdx < argumentNum) {

                // yes, there is at least one argument that was not consumed.
                // ATTENTION! if there is at least one argument that is unprocessed (and that is the case here) then the value of the current argument to process is already stored in argumentValue!

                // is the current argument value compatible to the current parameter specification?
                if (isCompatibleValue(argumentValue, parameterType, parameterAllowUndefined, parameterAllowNull, false)) {

                    if (parameterType === ArgueJS.TAIL) {

                        // is the current argument not the last one? are there more remaining arguments?
                        if (++argumentIdx < argumentNum) {

                            // add a copy of remaining argument values (including the current argument value) to the list of resulting argument values
                            var tail = [argumentValue];
                            do {
                                tail[tail.length] = _arguments[argumentIdx];
                            } while(++argumentIdx < argumentNum);
                            resultingArguments[parameterName] = tail;
                        }
                        else  if (!isArray(argumentValue) || parameterParenthesizeTail) {

                            // build a new array for the tail-argument and add that array to the list of resulting argument values
                            resultingArguments[parameterName] = [argumentValue];
                        }
                        else {

                            // the current argument value is the last argument value and it is an array. but we should not parenthesize (nesting) that array in a new array. so the current array argument is the value (array) for the tail-argument.
                            resultingArguments[parameterName] = argumentValue;
                        }

                        // finish the loop
                        // here we could also do an "return resultingArguments" but I am a friend of "one function one exit point" - except for early exits, exceptions and simple switch-case-like mapping functions
                        argumentIdx = argumentNum;
                        break;
                    }
                    else {

                        // store the argument value in the resulting argument list
                        resultingArguments[parameterName] = argumentValue;

                        // advance to the next argument value if it exists
                        ++argumentIdx;
                        if (argumentIdx < argumentNum) {
                            argumentValue = _arguments[argumentIdx];
                        }
                    }

                    // because the current parameter specification is processed we advance to the next parameter specification
                    continue;
                }
            }

            // no, all arguments are already processed. no arguments are remaing otherwise we would never reach this line of code

            // if the current parameter is not optional then there were too less arguments given in the function call
            if (!parameterIsOptional) { throw new Error(formatText(ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue, parameterName)); }

            // the parameter is optional. does the parameter specification define a default value?
            if (parameterHasDefaultValue) {

                // that is the value we will add later to the list of resulting arguments
                var defaultValue;

                // get the default value
                if ((parameterType === Function) || (parameterType === ArgueJS.ANYTYPE) || !isFunction(parameterDefaultValue)) {

                    // the default value of the parameter is no function OR the default value is a function and the type of the parameter is "Function" too
                    // in both cases we can directy try to use that value directly
                    defaultValue = parameterDefaultValue;
                }
                else {

                    // the default value of the parameter is a function but the type of the parameter is not "Function"
                    // then we the function specified in the default value to get the true default value for that parameter
                    defaultValue = parameterDefaultValue();
                }

                // now we have a default value - whatever that default values is. but that default value has to be compatible "as a default value" with the type of the parameter
                if (!isCompatibleValue(defaultValue, parameterType, parameterAllowUndefined, parameterAllowNull, true)) { throw new Error(formatText(ERR_ARGUEJS_DefaultValueHasIncompatibleType, parameterName)); }

                // store the default value into the list of resulting arguments
                resultingArguments[parameterName] = defaultValue;
            }
        }

        // all parameter specifications were processed. are there still remaining arguments?
        if (argumentIdx < argumentNum) { throw new Error(formatText(ERR_ARGUEJS_GetParameters_TooManyArguments, "there are arguments left but all parameters are processed.")); }

        // FINISHED!
        return resultingArguments;
    };

    /**
     * THIS FUNCTION EXPORTS INTERNAL INFORMATION ABOUT THE LIBRARY. THAT IS USEFUL FOR TESTING THE LIBRARY. TESTING ALL PARTS OF THE LIBRARY IS THE ONLY INTENTION FOR THIS FUNCTION.
     *
     * DO NOT USE THAT FUNCTION TO ACCESS SOME TO ACCESS INTERNAL STUFF. CHANGES IN THE SPECIFICATION OF THIS FUNTION ARE NOT REPORTED AND MAY OCCUR AT ANY TIME WITHOUT ANY WARNING!
     * THESE CHANGES ARE NO BUGS AND WILL NOT GET THREATED AS BUGS. THESE CHANGES ARE PART OF IMPROVING THE FUNCTIONAL TESTS OF THIS LIBRARY!
     *
     * @for     ArgueJS
     * @method  __export_internals__
     */
    if ((typeof(ARGUEJS_EXPORT_INTERNALS) === "boolean") && ARGUEJS_EXPORT_INTERNALS)
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
                    DEFAULT_OPTION_VALUE_ALLOWNULL                 : DEFAULT_OPTION_VALUE_ALLOWNULL,
                    DEFAULT_OPTION_VALUE_ALLOWUNDEFINED            : DEFAULT_OPTION_VALUE_ALLOWUNDEFINED,
                    DEFAULT_OPTION_VALUE_PARAMETERPARENTHESIZETAIL : DEFAULT_OPTION_VALUE_PARAMETERPARENTHESIZETAIL
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
                isBoolean               : isBoolean,
                isArray                 : isArray,
                isFunction              : isFunction,
                isObject                : isObject,
                isArguments             : isArguments,
                isType                  : isType,
                getType                 : getType,

                // Utility functions for generating error messages
                formatText              : formatText,

                // Utility functions for validating data
                validateParameterName   : validateParameterName,
                isCompatibleValue       : isCompatibleValue
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
// [[>>> make module available in node.js and the web (AMD - RequireJS)]]
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    });
});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// [[<<< make module available in node.js and the web (AMD - RequireJS)]]
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
