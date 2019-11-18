'use strict'
var internal = {};


module.exports = internal.Formula = class {
    constructor(id, localId, name, text, Variables) {
        this.id = id;
        this.localId = localId;
        this.name = name;
        this.text = text;
        this.Variables = Variables;
    }

}

/*
constructor
 */