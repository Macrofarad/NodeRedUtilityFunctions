[
    {
        "id": "6f31217d8b97b3a6",
        "type": "group",
        "z": "037faa062407c6a0",
        "g": "ecfc6941aea8e94f",
        "name": "Utility Functions \\n Note: Do Not Duplicate this node",
        "style": {
            "label": true,
            "stroke": "#ff0000",
            "fill": "#ffffff",
            "color": "#000000",
            "fill-opacity": "1"
        },
        "nodes": [
            "fbf3c9514ff2ec39",
            "0542322df8018058",
            "f0ce25bbf22bac2c",
            "22f9e58e51f8842b",
            "97158500eb2531df"
        ],
        "x": 1134,
        "y": 463,
        "w": 592,
        "h": 138
    },
    {
        "id": "fbf3c9514ff2ec39",
        "type": "function",
        "z": "037faa062407c6a0",
        "g": "6f31217d8b97b3a6",
        "name": "UtilityFunctions",
        "func": "/**********************\n * README\n *  Note that the meat of this node is in the On Start section so that changes are automatically deployed upon node update\n *  I've also provided a handy script in here to update manually upon msg via node context just in case there are any issues\n * **********************/\n\n(function UpdateUtilityScriptsManually(){\n    const ManuallyUpdateFunctions = context.get(\"ContextStorageForThisNode\"); //grabs the functions to update\n    const UtilityScriptContextLocation = context.get(\"UtilityScriptContextLocation\"); //grabs the location to update to\n    global.set(UtilityScriptContextLocation, ManuallyUpdateFunctions); //manually updates the scripts upon msg\n})//Note: Wrapping a function in a paranthesis immediately executes it\n\n\nlet HelpMessage = global.get('utilityFunctions.HelpMessage');\nHelpMessage(\"This message is appearing beause you sent an object to the source function node\")\n\n//let utility = global.get('utilityFunctions');\n//utility.HelpMessage(\"This message is appearing beause you sent an object to the source function node\")\nreturn msg; //this function shouldn't care about messages",
        "outputs": 1,
        "noerr": 0,
        "initialize": "//====================Global Constants==================\n    //Note, these should never be used in the functions themselves, otherwise you're gonna have a bad time\n    const UtilityScriptContextLocation = \"utilityFunctions\";\n    const VersionNumber = \"4.0.3\";\n    const AuthorChain = {//note: authorchain function sees latest as object with index 0 so make sure you always put the newest on the top so no one has to create a sorting function\n        \n        \"2021/09/20\": {\n            \"Author\": \"Jerry Kensler\"\n            , \"Changes\": \"Created Author Chain to work as a change log as well as the scripts to spit out latest/all authors,\" +\n                \"adding in more functions/features as I need them: \"\n                + \"  inArray (note: .includes() is just as valid and preferable in most cases\"\n                \n        },\n        \"2021/09/15\": {\n            \"Author\": \"Jerry Kensler\"\n            ,\"Changes\": \"Created Author Chain to work as a change log as well as the scripts to spit out latest/all authors,\" + \n            \"adding in more functions/features as I need them: \" \n            + \"  isObjectEmpty\"\n            + \"  The Help Object\"\n        },\n        \"2021/09/14\": {\n            \"Author\":\"Jerry Kensler\"\n            ,\"Changes\":\"Found the prior author's script, saw the potential and fleshed it out into this.  Added sleep, replace all, GetFuncName, isNumeric, and many others\"\n        },\n        \"Prior\": {\n            \"Author\": \"Various Internet Forum users\"\n            , \"Changes\": \"Provided the base idea that the subsequent authors based off of\"\n            , \"ReferenceLinks\": \"https://discourse.nodered.org/t/include-functions-file-in-function-node-possible/36981/12\"\n            , \"UsageNotes\": \"Copy the author object, list your changes and any other relavant details.  \\n\" +\n            \"Feel free to use formatting tricks to make it more readable. \\n\" +\n            \"  Also note the GetAuthorChain function and template entry below\"\n        },\n        \"Template\": {\n            \"Author\": \"TemplateName\"//Note: The key field of author is mandatory for the GetAuthorChain(\"latest\") function to work; however, anonymous is a valid name should you choose\n            ,\"Changes\": \"TemplateChange\"\n        }\n    }\n    global.set('UtilityScriptContextLocation',UtilityScriptContextLocation);//for better handling\n    //====================End Global Constants==========\nconst utility = (function () {\n    'use strict';\n    function HelpMessage(dummyText) {\n        node.warn(\"Example Call:\");\n        node.warn(\"let utility = global.get('utilityFunctions', 'file');\");\n        node.warn(\"utility.HelpMessage(argumentsHere) //Note: this function was called with the argument: \"+ '\"' + dummyText +'\"');\n        node.warn(\"To add a new function to this list, add it into the core function node then add it to the return of the parent in the following format\");\n        node.warn(\"HelpMessage: HelpMessage,\");\n    }\n    //###################Single Line Functions#########################################################################################    \n        let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));//example: //await sleep(DelayTimeMS);\n        function StandardWarningMessage(thingThatWasSupposedToBeProvided = \"table name\", replacementValue = \"SystemInfo\") { node.warn(\"Warning No \" + thingThatWasSupposedToBeProvided + \" Provided in \" + StandardWarningMessage.caller.name + \"  \\n Applying dummy value of '\" + replacementValue + \"' for debugging purposes\"); }\n        function replaceAll(str, find, replace) { return str.replace(new RegExp(find, 'g'), replace); }//example Usage: msg.payload = replaceAll(\"127.0.0.1\", \"\\\\.\", \"-\");\n        function GetFuncName() { return GetFuncName.caller.name; }//if (DebugThisFunctionInParticular) {node.warn(\"In function: \" + GetFuncName());}\n        function isNumeric(testValue = \"noData\") { if (typeof (testValue) == \"number\" || typeof (testValue) == \"bigint\") { return true; } else { return false; } }// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof\n        function padZero(number, padSize = 0) { return number.toString().padStart(padSize, 0); }// Returns a number as a string wth a specified number of preceding zeros\n        function isArray(myArray) { return myArray.constructor === Array; }\n        function ReturnFirstPropertyOfObject(TargetObject) { return TargetObject[Object.keys(TargetObject)[0]]; }\n    //###################Bigger Functions################################################################################################\n        function GetAuthorChain(FUNCTIONMODE = \"latest\"){//latest, all\n            if (FUNCTIONMODE == \"latest\") { return (AuthorChain[Object.keys(AuthorChain)[0].Author] || (\"Anonymous\" && node.warn(\"utility Function GetAuthorChain internal error, no author name provided, returning dummy value of Anonymous\"))); } //returns latest author name or a dummy if no latest name is found\n            if (FUNCTIONMODE != \"latest\"){ return AuthorChain; }//if not latest author name, return full chain\n        }    \n        function isObjectEmpty(obj) {\n            for (var key in obj) {\n                if (obj.hasOwnProperty(key))\n                    return false;\n            }\n            return true;\n        }\n    function inArray(needle, haystack) {//note: you can just use [\"your\", \"array\", \"Here\", Variable, 2].includes(\"Value\")\n        var count = haystack.length;\n        for (var i = 0; i < count; i++) {\n            if (haystack[i] === needle) { return true; }\n        }\n        return false;\n    }\n\n        function cloneObject(object) { // recursive function to clone an object. If a non object parameter is passed in, that parameter is returned and no recursion occurs.\n            if (object === null || typeof object !== 'object') {\n                return object;\n            }\n            var newObject = object.constructor(); // give temp the original obj's constructor\n            for (var key in object) {\n                newObject[key] = cloneObject(object[key]);\n            }\n            return newObject;\n        }\n        \n        function concatObject(object_1, object_2) { // add properties of Object 2 to Object 1\n            var properties;\n            for (properties in object_2) {\n                if (object_2.hasOwnProperty(properties) && !object_1[properties]) {\n                    object_1[properties] = object_2[properties];\n                }\n            }\n        }\n\n        function ordinal(number, inclusive = true) {\n            let x = number;\n            if (inclusive) { return number + [\"th\", \"st\", \"nd\", \"rd\"][(x = ~~(x < 0 ? -x : x) % 100) > 10 && x < 14 || (x %= 10) > 3 ? 0 : x];\n            } else { return [\"th\", \"st\", \"nd\", \"rd\"][(x = ~~(x < 0 ? -x : x) % 100) > 10 && x < 14 || (x %= 10) > 3 ? 0 : x]; }\n        } \n\n        function findArrayProperty(key, array, property) {// Set foundProperty to default\n            var foundObject = false;\n            for (var i = 0; i < array.length; i++) {\n                if (array[i][property] === key) {\n                    foundObject = array[i];\n                }\n            }\n            /**\n            * Represents a search through an array of objects.\n            * @function findArrayProperty\n            * @param {Array} array - The array you want to search through\n            * @param {string} [property] - The property name to search\n            * @param {string} key - The key to search for\n            *\n            * Return: The object where the key was found, or 'false' if not found\n            */\n            return foundObject;\n        }\n        \n        function HydraTimeCalculations(FUNCTIONMODE = \"timestamp\") { //timestamp, hydrastart, hydraend, runtime\n            //Decent Reference:  http://stevesnoderedguide.com/working-with-time\n            //Note: nested functions aren't the best practice, but in this case, not nesting would likely cause a scope issue\n            function InjectTimestamp(TIMESTAMPMODE = \"full\"){//full, epoch\n                const currentDate = new Date();\n                const UTCEpochMS = Number(currentDate); //\n                const TimeObject = {\n                    \"rawdate\": currentDate\n                    , \"myyear\": currentDate.getFullYear()\n                    , \"myepoch\": Number(UTCEpochMS)\n                    , \"mymonth\" : currentDate.getMonth()\n                    , \"mydow\" : currentDate.getDay()\n                    , \"myday\" : currentDate.getDate()\n                }           \n                if (TIMESTAMPMODE == \"full\") { return TimeObject;}\n                else if (TIMESTAMPMODE == \"epoch\") { return UTCEpochMS; }\n                else { return TimeObject && node.warn(\"Invalid Option Selected internally in Function InjectTimestamp; defaulting to full object return\"); }\n            }    \n            function SetHydraStartTime(){ //move to a single function that changes based upon string input //start //end //runtime\n                const currentTimestamp = InjectTimestamp(\"epoch\");\n                context.set(\"HydraStartTime\", currentTimestamp);\n            }\n            function SetHydraEndTime() {\n                const currentTimestamp = InjectTimestamp(\"epoch\");\n                context.set(\"HydraEndTime\", currentTimestamp);\n            }\n            function CalculateHydraRuntime(){\n                const HydraStartTime = context.get(\"HydraStartTime\") || ({} && node.warn(\"ERROR: No start time set\"));\n                const HydraEndTime = context.get(\"HydraEndTime\") || ({} && node.warn(\"ERROR: No end time set\"));\n                var HydraRunTime = \"Error\";\n                if (typeof (HydraStartTime) == \"number\" || typeof (HydraStartTime) == \"bigint\") { HydraRunTime = Number(HydraEndTime) - Number(HydraStartTime);\n                } else { HydraRunTime = \"Error\";}\n                context.set(\"HydraRunTime\", HydraRunTime);\n                return HydraRunTime;\n            }\n            function HydraDecisionTree(FUNCTIONMODE = \"timestamp\") {//timestamp, hydrastart, hydraend, runtime\n                if (FUNCTIONMODE == \"timestamp\"){ return InjectTimestamp();}\n                else if (FUNCTIONMODE == \"epoch\") { return InjectTimestamp(\"epoch\"); }\n                else if (FUNCTIONMODE == \"hydrastart\") { return SetHydraStartTime(); }\n                else if (FUNCTIONMODE == \"hydraend\") { return SetHydraEndTime(); }\n                else if (FUNCTIONMODE == \"runtime\") { return CalculateHydraRuntime(); }\n                else { InjectTimestamp() && node.warn(\"Invalid Option Selected externally; defaulting to full object timestamp return\");}\n            }\n            return HydraDecisionTree(FUNCTIONMODE);\n        }\n        function checkObj(SourceObject, TargetProperty) {\n            // declares function checkObj with PARAMETER checkProp\n            // whatever is PASSED in place of checkProp becomes an ARGUMENT of checkObj\n            // for example, checkObj(\"gift\"), \"gift\" is the argument \n            // a parameter is just a placeholder for an argument \n\n            // the if/else statement below is a part of the checkObj function\n            // when you pass an argument in place of checkProp this code runs.\n            //https://forum.freecodecamp.org/t/using-objects-for-lookups-can-you-help-explain-whats-going-on/145039/8\n            var propertyType = typeof (SourceObject[TargetProperty]);\n            if (SourceObject.hasOwnProperty(TargetProperty)) {\n                var inputSanitization = SourceObject[TargetProperty];     \n                return inputSanitization;\n            } else {return \"nodata\";}\n        }\n        \n        \n        function DELETESCRIPTVARIABLES(SCOPE = \"nodata\"){// flow, global, node \n            if (SCOPE==\"flow\"){\n                let keyList = flow.keys();\n                keyList.forEach(function (keyName) {\n                    flow.set(keyName, undefined); //wipe each flow variable \n                });\n            }else if (SCOPE == \"global\") {\n                let keyList = global.keys();\n                keyList.forEach(function (keyName) {\n                    global.set(keyName, undefined); //wipe each flow variable\n                });\n            }else if (SCOPE == \"node\") {\n                let keyList = context.keys();\n                keyList.forEach(function (keyName) {\n                    context.set(keyName, undefined); //wipe each flow variable\n                });\n            }else { SCOPE = \"flow\" && node.warn(\"Warning: No valid scope variable declared, defaulting to scope of Flow\"); }\n        }\n\n\n    \n    return { //this populates the list of functions to be sent through to the utility function list\n        LastUpdate: {\n            \"DateTime\": new Date()\n            , \"VersionNumber\": VersionNumber\n        },\n        ExampleUsage: {\n            \"Basic\": \"let utility = global.get('\" + UtilityScriptContextLocation + \"');\"\n            , \"Basic With Specific Context Store\": \"let UTILITY = global.get('\" + UtilityScriptContextLocation + \"', 'file');\"\n            , \"TemplateFunction\": \"utility.TemplateFunction(ArgumentsHere); //note: if you use something other than UTILITY you'll have to change the calls to refect that\"\n            , \"HelpMessage\":{\n                \"Basic\":\"UTILITY.HelpMessage(argumentsHere);\"\n                ,\"Available Params\": {\n                    \"Arg1\":\"String\"}\n                , \"Returns\": \"A Help Message\"\n                }\n            \n            , \"GetFuncName\": {\n                \"Basic\": \"UTILITY.GetFuncName();\"\n                , \"Available Params\": \"None\"\n                , \"Returns\": \"Name of the function that called it\"\n            }\n            , \"StandardWarningMessage\": {\n                \"Basic\": \"UTILITY.StandardWarningMessage();\"\n                , \"Available Params\": \"thingThatWasSupposedToBeProvided, replacementValue\"\n                , \"Returns\": \"Nothing, outputs a node.warning\"\n            }\n        },\n        GetFuncName: GetFuncName\n        , DELETESCRIPTVARIABLES: DELETESCRIPTVARIABLES\n        , HelpMessage: HelpMessage\n        , GetAuthorChain: GetAuthorChain\n        , ReturnFirstPropertyOfObject: ReturnFirstPropertyOfObject\n        , HydraTimeCalculations: HydraTimeCalculations\n        , StandardWarningMessage: StandardWarningMessage\n        , isObjectEmpty: isObjectEmpty\n        , isNumeric: isNumeric\n        , replaceAll: replaceAll\n        , checkObj: checkObj\n        , sleep: sleep\n        , cloneObject: cloneObject\n        , padZero: padZero\n        , concatObject: concatObject\n        , ordinal: ordinal\n        , isArray: isArray\n        , findArrayProperty: findArrayProperty\n        , inArray: inArray\n        //, inArray: inArray //inArray\n        //, inArray: inArray //inArray\n        //, inArray: inArray //inArray\n        //, inArray: inArray //inArray\n        //, inArray: inArray //inArray\n        //, inArray: inArray //inArray\n        //, inArray: inArray //inArray\n    };\n}());\nconst FunctionsToReturn = utility;\ncontext.set(\"ContextStorageForThisNode\", FunctionsToReturn);//ensures that the node itself will have a reference for manual updates\ncontext.set(\"UtilityScriptContextLocation\", UtilityScriptContextLocation);//ensures that the node itself stores where it's dumping its scripts to\nglobal.set(UtilityScriptContextLocation, FunctionsToReturn);//global.set('utility', utility, 'file'); // the third argument is if you have multiple context stores\nnode.status({ fill: \"green\", shape: \"dot\", text: \"Version \" + VersionNumber});",
        "finalize": "// Code added here will be run when the\n// node is being stopped or re-deployed.\nnode.warn(\"Notice: '\" + node.name + \"' Node has been restarted or stopped\");",
        "libs": [],
        "x": 1460,
        "y": 560,
        "wires": [
            [
                "f0ce25bbf22bac2c"
            ]
        ],
        "icon": "font-awesome/fa-anchor"
    },
    {
        "id": "0542322df8018058",
        "type": "inject",
        "z": "037faa062407c6a0",
        "g": "6f31217d8b97b3a6",
        "name": "Help Message",
        "props": [],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1260,
        "y": 560,
        "wires": [
            [
                "fbf3c9514ff2ec39"
            ]
        ]
    },
    {
        "id": "f0ce25bbf22bac2c",
        "type": "debug",
        "z": "037faa062407c6a0",
        "g": "6f31217d8b97b3a6",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1630,
        "y": 560,
        "wires": []
    },
    {
        "id": "22f9e58e51f8842b",
        "type": "function",
        "z": "037faa062407c6a0",
        "g": "6f31217d8b97b3a6",
        "name": "Secondary Verification of functionality",
        "func": "let utility = global.get('utilityFunctions', 'file');\nutility.HydraTimeCalculations(\"epoch\");\nmsg.payload = \"Utility Function Returned Current Epoch of: \" + utility.HydraTimeCalculations(\"epoch\");\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1470,
        "y": 520,
        "wires": [
            [
                "f0ce25bbf22bac2c"
            ]
        ]
    },
    {
        "id": "97158500eb2531df",
        "type": "inject",
        "z": "037faa062407c6a0",
        "g": "6f31217d8b97b3a6",
        "name": "noData",
        "props": [],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1230,
        "y": 520,
        "wires": [
            [
                "22f9e58e51f8842b"
            ]
        ]
    }
]