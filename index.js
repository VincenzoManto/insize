// index.js
const _ = require('lodash'); // Optional: For type checking

/**
 * Estimates the memory size of a JavaScript value in bytes or kilobytes.
 * @param {any} value - The value to estimate.
 * @param {string} [unit='bytes'] - The unit of measurement ('b' or 'kb' or 'Mb' or 'Gb').
 * @returns {number} - The size of the value in the specified unit.
 */
function insize(value, unit = 'b') {
    const bytes = getRoughSize(value);
    
    if (unit === 'kb') {
        return bytes / 1024;
    } else if (unit === 'Mb') {
        return bytes / 1024 / 1024;
    } else if (unit === 'Gb') {
        return bytes / 1024 / 1024 / 1024;
    }
    
    return bytes; // Default is bytes
}

/**
 * Helper function to estimate the size in bytes.
 * @param {any} value - The value to estimate.
 * @param {Set} [seen=new Set()] - A set to track seen objects (for circular references).
 * @returns {number} - Estimated size in bytes.
 */
function getRoughSize(value, seen = new Set()) {
    if (value === null || value === undefined) {
        return 0;
    }

    // Handle primitive types
    const type = typeof value;
    let bytes = 0;

    switch (type) {
        case 'boolean':
            bytes += 4;
            break;
        case 'number':
            bytes += 8;
            break;
        case 'string':
            bytes += value.length * 2; // Assuming 2 bytes per character
            break;
        case 'symbol':
            bytes += 20; // Approximate size
            break;
        case 'function':
            bytes += value.toString().length * 2;
            break;
        case 'object':
            if (seen.has(value)) {
                return 0; // Circular reference detected, skip
            }
            seen.add(value);

            if (Array.isArray(value)) {
                value.forEach(item => {
                    bytes += getRoughSize(item, seen);
                });
            } else if (_.isDate(value)) {
                bytes += 24;
            } else if (_.isRegExp(value)) {
                bytes += value.toString().length * 2;
            } else if (_.isMap(value)) {
                value.forEach((val, key) => {
                    bytes += getRoughSize(key, seen);
                    bytes += getRoughSize(val, seen);
                });
            } else if (_.isSet(value)) {
                value.forEach(val => {
                    bytes += getRoughSize(val, seen);
                });
            } else if (Buffer.isBuffer(value)) {
                bytes += value.length;
            } else {
                // Plain object
                for (const key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        bytes += getRoughSize(key, seen);
                        bytes += getRoughSize(value[key], seen);
                    }
                }
            }
            break;
        default:
            break;
    }

    return bytes;
}

module.exports = insize;
