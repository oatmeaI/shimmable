const shims = require("./shims");

Object.keys(shims).forEach((shimKey) => {
    global[shimKey] = shims[shimKey];
});

