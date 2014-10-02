// functions from D. Crockford's "Java. the Good Parts"
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
};

Function.method('curry', function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

Function.method('new', function () {
// Create a new object that inherits from the
// constructor's prototype.
    var that = Object.create(this.prototype);
// Invoke the constructor, binding –this- to
// the new object.
    var other = this.apply(that, arguments);
// If its return value isn't an object,
// substitute the new object.
    return (typeof other === 'object' && other) || that;
});

Function.method('inherits', function (Parent) {
    this.prototype = new Parent(  );
    return this;
});
