// index.js
const _ = require('lodash'); // Optional: For type checking

/**
 * Estimates the memory size of a JavaScript value in bytes or kilobytes.
 * @param {any} value - The value to estimate.
 * @param {string} [unit='bytes'] - The unit of measurement ('b' or 'kb' or 'Mb' or 'Gb').
 * @returns {number} - The size of the value in the specified unit.
 */
function insize(value, unit = 'b') {
    const bytes = calculateSize(value);
    
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
 * Estimates the memory size of a JavaScript value in bytes.
 * @param {*} obj - The value to estimate.
 * @returns {number} - The size of the value in bytes.
 */
function calculateSize(obj) {
    const seenObjects = new WeakSet(); // Track seen objects to handle circular references
    return objectSizer(obj, seenObjects);
}

/**
 * Recursively estimates the memory size of a JavaScript object in bytes.
 * @param {*} obj - The value to estimate.
 * @param {*} seenObjects - The set of objects that have been seen.
 * @returns {number} - The size of the value in bytes.
 */
function objectSizer(obj, seenObjects) {
    if (obj === null || obj === undefined) {
        return 0; // Null or undefined values have no size
    }

    let bytes = 0;

    if (typeof obj === 'boolean') {
        bytes += 4; // Booleans are typically 4 bytes
    } else if (typeof obj === 'number') {
        bytes += 8; // Numbers are typically 8 bytes
    } else if (typeof obj === 'string') {
        bytes += Buffer.byteLength(obj, 'utf-8'); // Exact size of string
    } else if (typeof obj === 'symbol') {
        bytes += Symbol.keyFor(obj)?.length || 0; // Symbol's size depends on its description
    } else if (typeof obj === 'function') {
        // Functions are objects but their size in memory is not accessible; count the reference
        bytes += 64; // Assume a function is 64 bytes overhead
    } else if (typeof obj === 'object') {
        if (seenObjects.has(obj)) {
            return 0; // Avoid circular references
        }
        seenObjects.add(obj);

        if (obj instanceof Map || obj instanceof Set) {
            // Account for key-value pairs in a map
            obj.forEach((value, key) => {
                bytes += objectSizer(key, seenObjects); // Key sizes
                bytes += objectSizer(value, seenObjects); // Value sizes
            });
        } if (obj instanceof Date) {
            bytes += 64; // Dates are typically 8 bytes
        } else if (Array.isArray(obj)) {
            // Account for array elements
            for (let i = 0; i < obj.length; i++) {
                bytes += objectSizer(obj[i], seenObjects);
            }
        } else {
            // Account for plain objects and special cases
            const keys = Reflect.ownKeys(obj); // Include symbol keys and private fields

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                bytes += objectSizer(key, seenObjects); // Key sizes
                bytes += objectSizer(obj[key], seenObjects); // Value sizes
            }
        }
    }

    return bytes;
}

module.exports = insize;
