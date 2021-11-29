import * as assert from "assert";
import { getFocusedLog } from "..";

import inputJson = require("./input.json");
import outputJson = require("./output.json");

describe('vulnerability checker', function () {
    it('should correctly output the highest vulnerabilities', () => {
        const focusedLog = getFocusedLog(inputJson as any);
        assert.deepStrictEqual(focusedLog, outputJson);
    });
});
