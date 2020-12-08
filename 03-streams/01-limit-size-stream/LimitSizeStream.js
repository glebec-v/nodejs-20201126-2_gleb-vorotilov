const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');
const buffer = require('buffer').Buffer;

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.encoding = options.encoding;
  }

  _transform(chunk, encoding, callback) {
    let error, data;
    try {
      // if ('buffer' === typeof chunk) {
      //   length = chunk.byteLength;
      // } else {
      //   length = buffer.from(chunk, encoding).byteLength;
      // }

      const length = buffer.from(chunk, this.encoding).byteLength;
      //const length2 = chunk.byteLength;
      const length3 = buffer.byteLength(chunk, this.encoding);

      console.log(`limit=${this.limit} encoding=${this.encoding} length1=${length} length3=${length3}`);
      if (length > this.limit) {
        console.log('throw');
        throw new LimitExceededError;
      }
      data = chunk;
    } catch (e) {
      error = e;
    }

    console.log(error, JSON.stringify(data));
    callback(error, data);
  }

  _final(callback) {
    callback();
  }
}

// LimitSizeStream.on('error', err => {
//   throw new LimitExceededError;
// });

module.exports = LimitSizeStream;
