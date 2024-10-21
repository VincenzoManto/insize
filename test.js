const assert = require('assert');
const insize = require('./index');

// test.test.js

const testObjects = [
    {
        description: 'Primitive types',
        object: {
            boolean: true,
            number: 123.456,
            string: 'Hello, World!',
            symbol: Symbol('sym'),
            func: function () { return 'test'; },
            undefined: undefined,
            null: null
        },
        value: 100
    },
    {
        description: 'Complex object with nested structures',
        object: {
            name: "Sample Object",
            age: 30,
            attributes: {
                height: 180,
                weight: 75
            },
            hobbies: ['reading', 'gaming'],
            createdAt: new Date(),
            pattern: /abc/g,
            map: new Map([['key1', 'value1'], ['key2', 'value2']]),
            set: new Set([1, 2, 3]),
            buffer: Buffer.from('Hello Buffer')
        },
        value: 100
    },
    {
        description: 'Object with circular references',
        object: (() => {
            const obj = { name: "Circular" };
            obj.self = obj;
            return obj;
        })(),
        value: 100
    },
    {
        description: 'Buffer object',
        object: Buffer.from('This is a buffer'),
        value: 100
    },
    {
        description: 'Array with mixed types',
        object: [1, 'two', { three: 3 }, [4, 5], new Set([6, 7])],
        value: 100
    }, 
    {
        description: 'Array with circular references',
        object: (() => {
            const arr = [1, 2, 3];
            arr.push(arr);
            return arr;
        })(),
        value: 100
    }, 
    {
        description: 'Map object',
        object: new Map([['key1', 'value1'], ['key2', 'value2']]),
        value: 160
    },
    {
        description: 'Complex object with symbols',
        object: {
            name: "Sample Object",
            age: 30,
            date: new Date(),
            attributes: {
                height: 180,
                weight: 75
            },
            hobbies: ['reading', 'gaming'],
            [Symbol('id')]: '123',
        },
        value: 350
    }
];

describe('insize function tests', () => {
    testObjects.forEach(({ description, object, value }) => {
        it(`should correctly calculate the size for ${description}`, () => {
            const sizeInBytes = insize(object);
            const sizeInKB = insize(object, 'kb');
            assert.strictEqual(sizeInBytes, value, `Size in bytes for ${description} is incorrect`);
            assert.strictEqual(sizeInKB, value / 1024, `Size in KB for ${description} is incorrect`);
        });
    });
});