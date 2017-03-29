/**
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * Typescript Math Toolkit: Minimal implementation of a binary tree node.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
(function (COLOR_ENUM) {
    COLOR_ENUM[COLOR_ENUM["RED"] = 0] = "RED";
    COLOR_ENUM[COLOR_ENUM["BLACK"] = 1] = "BLACK";
    COLOR_ENUM[COLOR_ENUM["NONE"] = 2] = "NONE";
})(exports.COLOR_ENUM || (exports.COLOR_ENUM = {}));
var COLOR_ENUM = exports.COLOR_ENUM;
var TSMT$BTreeNode = (function () {
    /**
     * Construct a new TSMT$BTreeNode
     *
     * @param d: T (optional) Node data of the appropriate type.
     *
     * @return Nothing Note that a direct reference to the data is stored internally
     */
    function TSMT$BTreeNode(d) {
        if (d != undefined && d != null)
            this._data = d;
        this.id = "";
        this._parent = null;
        this._children = Array.apply(null, Array(2)); // fixed-length array of two elements
        this._children[0] = null;
        this._children[1] = null;
        this._balance = 0;
        this._color = COLOR_ENUM.NONE;
    }
    Object.defineProperty(TSMT$BTreeNode.prototype, "data", {
        /**
         * Access node data
         *
         * @return T A copy of the node's data (if the data is anything more complex than a simple Object, it should implement a clone method)
         */
        get: function () {
            if (typeof this._data == "number")
                return this._data;
            else if (typeof this._data == "string")
                return (' ' + this._data).slice(1);
            else if (typeof this._data == "object")
                return JSON.parse(JSON.stringify(this._data));
            else if (this._data['clone'] != null)
                return this._data['clone']();
            return null;
        },
        /**
         * Assign data to this node
         *
         * @param value: T node data
         *
         * @return nothing
         */
        set: function (value) {
            if (value == null || value == undefined)
                return;
            if (typeof value == "number")
                this._data = value;
            else if (typeof value == "string")
                this._data = (' ' + value).slice(1);
            else if (typeof value == "object")
                this._data = JSON.parse(JSON.stringify(value));
            else if (value['clone'] != null)
                this._data = value['clone']();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$BTreeNode.prototype, "balance", {
        /**
         * Access the node balance
         *
         * @return number Node balance with negative for left-heavy, zero for even balance, and positive for right-heavy
         */
        get: function () {
            return this._balance;
        },
        /**
         * Assign a balance value to this node
         *
         * @param value: number Height value which must be integral (the floor of the input is assigned to the internal value)
         */
        set: function (value) {
            this._balance = (!isNaN(value) && isFinite(value)) ? Math.floor(value) : this._balance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$BTreeNode.prototype, "parent", {
        /**
         * Access a direct reference to this node's parent
         *
         * @return TSMT$BTreeNode<T> Direct reference to this node's parent
         */
        get: function () {
            return this._parent;
        },
        /**
         * Assign this node's parent
         *
         * @param node: TSMT$BTreeNode<T> Reference to this node's new parent
         *
         * @return nothing The new parent reference is set provided the input is valid; it is allowable to set the reference to null
         */
        set: function (node) {
            if ((node != undefined && node instanceof TSMT$BTreeNode) || node == null)
                this._parent = node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$BTreeNode.prototype, "left", {
        /**
         * Access a direct reference to this node's left child
         *
         * @return TSMT$BTreeNode<T> Direct reference to this node's left child
         */
        get: function () {
            return this._children[0];
        },
        /**
         * Assign this node's left child
         *
         * @param node: TSMT$BTreeNode<T> Reference to this node's new left child
         *
         * @return nothing The new left-child reference is set provided the input is valid; it is allowable to set the reference to null
         */
        set: function (node) {
            if ((node != undefined && node instanceof TSMT$BTreeNode) || node == null) {
                this._children[0] = node;
                if (node != null)
                    node.parent = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$BTreeNode.prototype, "right", {
        /**
         * Access a direct reference to this node's right child
         *
         * @return TSMT$BTreeNode<T> Direct reference to this node's right child
         */
        get: function () {
            return this._children[1];
        },
        /**
         * Assign this node's right child
         *
         * @param node: TSMT$BTreeNode<T> Reference to this node's new right child
         *
         * @return nothing The new right-child reference is set provided the input is valid; it is allowable to set the reference to null
         */
        set: function (node) {
            if ((node != undefined && node instanceof TSMT$BTreeNode) || node == null) {
                this._children[1] = node;
                if (node != null)
                    node.parent = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$BTreeNode.prototype, "value", {
        /**
         * Return the numerical value of this node
         *
         * @return number A numerical measure of this node's value.  The current implementation is suitable for numeric data; this method is usually overridden for other
         * types of nodes and the value may be derived from node data.
         */
        get: function () {
            if (this._data != null && this._data != undefined) {
                if (typeof this._data == "number")
                    return this._data;
            }
            // the node has no value if data is undefined
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$BTreeNode.prototype, "hasLeft", {
        /**
         * Does this node have a left child?
         *
         * @return boolean True if a left child exists
         */
        get: function () {
            return this._children[0] != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$BTreeNode.prototype, "hasRight", {
        /**
         * Does this node have a right child?
         *
         * @return boolean True if a left child exists
         */
        get: function () {
            return this._children[1] != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Access a child node based on its order
     *
     * @param index: number Index that must be zero (left child) or one (right child)
     */
    TSMT$BTreeNode.prototype.getChild = function (index) {
        if (index == 0)
            return this._children[0];
        else if (index == 1)
            return this._children[1];
        else
            return null;
    };
    /**
     * Assign a child node based on its order
     *
     * @param index: number Index that must be zero (left child) or one (right child)
     *
     * @param node: TSMT$BTreeNode<T> Node to be set as a child (null is allowable)
     */
    TSMT$BTreeNode.prototype.setChild = function (index, node) {
        if (index == 0 || index == 1) {
            this._children[index] = node;
            if (node != null)
                node.parent = this;
        }
    };
    /**
     * Compare two binary tree nodes, generally for the purpose of determining a traversal direction
     *
     * @param node: T Reference to an input node for comparison
     *
     * @return number 0 if the current node value is less than the input node value and 1 otherwise, which doubles as a search direction
     */
    TSMT$BTreeNode.prototype.compare = function (node) {
        if (node == undefined || node == null)
            return NaN;
        return this.value < node.value ? 0 : 1;
    };
    /**
     * Compare two binary tree nodes for less than, equal to, or greater than in value
     *
     * @param node: T Reference to an input node for comparison
     *
     * @return number -1 if the current node value is less than the input node, 0 if equal, and and 1 if greater; note that nodes with numerical values
     * may be require and approx-equal comparison which could be implemented in a future version.
     */
    TSMT$BTreeNode.prototype.compareTo = function (node) {
        if (node == undefined || node == null)
            return NaN;
        return this.value < node.value ? -1 : this.value == node.value ? 0 : 1;
    };
    /**
     * Clone this node
     */
    TSMT$BTreeNode.prototype.clone = function () {
        var node = new TSMT$BTreeNode();
        node.id = this.id;
        node.left = this.left;
        node.right = this.right;
        node.parent = this._parent;
        node.balance = this._balance;
        node.data = this._data;
        return node;
    };
    return TSMT$BTreeNode;
}());
exports.TSMT$BTreeNode = TSMT$BTreeNode;
