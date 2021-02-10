import { NODE_ENV } from "../constants/env";
/**
 * Run a provided callback function if the server is not being tested
 *
 * @param {Function} callback A function that runs if 'NODE_ENV' is not equal to "test"
 * @returns {any} The output of 'callback()' if the server is not testing, otherwise returns 'null'
 */
const ifNotTesting = (callback: () => unknown) =>
	NODE_ENV === "test" ? null : callback();

export default ifNotTesting;
