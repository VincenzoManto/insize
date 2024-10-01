# Insize

Welcome to **Insize**! 🎉

insize is a library designed to estimate the memory space occupied by runtime variables. It's like having a tape measure for your code!

![Build Status](https://img.shields.io/github/actions/workflow/status/VincenzoManto/insize/build.yml?branch=main)
![Tests](https://img.shields.io/github/actions/workflow/status/VincenzoManto/insize/test.yml?branch=main)
![Coverage](https://img.shields.io/codecov/c/github/VincenzoManto/insize)
![Downloads](https://img.shields.io/npm/dw/insize)
![License](https://img.shields.io/npm/l/insize)

## Why Insize?

Ever wondered how much memory your variables are hogging? Insize helps you:
- Estimate memory usage of variables.
- Optimize your code by identifying memory-heavy variables.
- Debug memory leaks by keeping an eye on variable sizes.
- Test and profile your applications more effectively.

## Installation

You can install Insize via npm:

```bash
npm install insize
```

## Usage

Here's a quick example to get you started:

```javascript
const insize = require('insize');

let myVariable = { name: "John", age: 30 };
console.log(`Memory size: ${insize(myVariable)} bytes`);
```

Insize exports data in different bytes' multiples. The default value is `b`, measuring in bytes.

```javascript
insize(myVariable, 'kb'); // 204
insize(myVariable, 'Mb'); // 0.204
insize(myVariable, 'Gb'); // 0.000204
```

This library can be easily imported and used in typescript too.

```typescript
import insize from insize;

let myVariable = { name: "John", age: 30 };
console.log(`Memory size: ${insize(myVariable)} bytes`);
```

## Features

- **Easy to use**: Simple API to get memory sizes.
- **Lightweight**: Minimal overhead to your application.
- **Versatile**: Works with various data types.

## Use Cases

If you are wondering when and where it could be useful, these are real cases we used Insize for.

- **Testing**: Ensure your tests don't consume excessive memory.
- **Optimization**: Identify and optimize memory-heavy variables.
- **Debugging**: Track down memory leaks by monitoring variable sizes.
- **Profiling**: Profile your application's memory usage in different scenarios.

## Testing 

To run tests, you can use the following command:

```bash
npm test
```

Make sure you have all the necessary dependencies installed by running:

```bash
npm install
```

Test cases are generated using [Insightest](https://insightest.app) and exploit Jest. You can find the test files in the `tests` directory. To add new tests, create a new file with the `.test.js` extension in the `tests` directory.

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests.

Please, follow the Code of Conduct attached.

## License

This project is licensed under the MIT License.

---

Happy measuring! 📏
