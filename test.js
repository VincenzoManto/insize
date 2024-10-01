// test.js
const sizer = require('./index');

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
        }
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
        }
    },
    {
        description: 'Object with circular references',
        object: (() => {
            const obj = { name: "Circular" };
            obj.self = obj;
            return obj;
        })()
    },
    {
        description: 'Buffer object',
        object: Buffer.from('This is a buffer')
    },
    {
        description: 'Array with mixed types',
        object: [1, 'two', { three: 3 }, [4, 5], new Set([6, 7])]
    }
];

testObjects.forEach(({ description, object }) => {
    console.log(`\n${description}:`);
    console.log('Size in bytes:', sizer(object));
    console.log('Size in KB:', sizer(object, 'kb'));
});
