const path = require('path');
const { addPath } = require('app-module-path');

module.exports.init = () => {
    const repositoryRoot = path.join(__dirname, './../../');

    addPath(repositoryRoot);
};
