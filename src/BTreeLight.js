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
 * Typescript Math Toolkit: Lightweight (insert-only) binary tree.  This version computes balance factors on insertion, so it can be used to see how well or poorly
 * a classic binary tree is balanced for a particular situation.  It is largely provided for experimental and information-gathering applications.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
var BTreeNode_1 = require('./BTreeNode');
var TSMT$BTreeLight = (function () {
    /**
     * Construct a new TSMT$BTreeLight<T>
     *
     * @return nothing A new tree is created of the specified type
     */
    function TSMT$BTreeLight() {
        this._root = null;
        this._size = 0;
    }
    Object.defineProperty(TSMT$BTreeLight.prototype, "size", {
        /**
         * Access the size or number of nodes in the TSMT$AVLTree
         *
         * @return number - Total number of nodes in the AVLTree
         */
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$BTreeLight.prototype, "root", {
        /**
         * Access the root node in the TSMT$AVLTree
         *
         * @return number - Total number of nodes in the AVLTree
         */
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Insert a node into the tree
     *
     * @param node: TSMT$BTreenode<T> Reference to node to be inserted
     *
     * @return nothing
     */
    TSMT$BTreeLight.prototype.insert = function (node) {
        if (node != null && node != undefined) {
            if (this._root == null) {
                this._root = node;
                this._size = 1;
            }
            else {
                var n = this._root;
                var finished = false;
                var parent_1;
                var dir = void 0;
                while (!finished) {
                    if (n === node)
                        finished = true;
                    else {
                        parent_1 = n;
                        dir = node.compare(n);
                        n = n.getChild(dir);
                        // insert or continue to traverse?
                        if (n == null) {
                            node.parent = parent_1;
                            parent_1.setChild(dir, node);
                            this.__adjustBalancePostInsert(node, dir);
                            finished = true;
                            this._size++;
                        }
                    }
                } // end traversal
            }
        }
    };
    // post-insertion balance update
    TSMT$BTreeLight.prototype.__adjustBalancePostInsert = function (root, dir) {
        var parent = root.parent;
        if (parent == null)
            return;
        // walk back up to root of tree
        var node;
        var add = dir == 0 ? -1 : 1;
        while (parent != null) {
            parent.balance = parent.balance + add;
            node = parent;
            if (parent.balance == 0)
                parent = null; // remainder of tree should be okay
            else {
                parent = parent.parent;
                if (parent != null)
                    add = parent.left === node ? -1 : 1;
            }
        }
    };
    /**
     * Create a new tree from a sequential list of values
     *
     * @param values: Array<T> Array of raw values
     *
     * @return nothing
     */
    TSMT$BTreeLight.prototype.fromArray = function (values) {
        if (values != null && values != undefined && values.length && values.length > 0) {
            this.clear();
            var len = values.length;
            var i = void 0;
            var n = void 0;
            for (i = 0; i < len; ++i) {
                n = new BTreeNode_1.TSMT$BTreeNode(values[i]);
                n.id = this._size.toString();
                this.insert(n);
            }
        }
    };
    /**
     * Clear the current tree
     *
     * @return nothing The tree is cleared (all node references are nulled, the tree root is nulled, and tree size set to zero)
     */
    TSMT$BTreeLight.prototype.clear = function () {
        if (this._size > 0) {
            this.__clear(this._root);
            this._size = 0;
            this._root = null;
        }
    };
    TSMT$BTreeLight.prototype.__clear = function (node) {
        if (node != null) {
            this.__clear(node.left);
            this.__clear(node.right);
            node = null;
        }
    };
    return TSMT$BTreeLight;
}());
exports.TSMT$BTreeLight = TSMT$BTreeLight;
