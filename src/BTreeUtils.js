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
var TSMT$BTreeUtils = (function () {
    function TSMT$BTreeUtils() {
        // empty
    }
    /**
     * Return height of the input node
     *
     * @param node TSMT$BTreeNode<T>
     *
     * @return number Node height or number of nodes in the longest path from the input node to a leaf node (inclusive); a singleton node has a height of 1.  A height
     * of zero indicates the input node was null
     */
    TSMT$BTreeUtils.prototype.nodeHeight = function (node) {
        if (node != null) {
            // recursively calculate height
            return Math.max(this.nodeHeight(node.left), this.nodeHeight(node.right)) + 1;
        }
        return 0;
    };
    /**
     * Return depth of the input node
     *
     * @param node TSMT$BTreeNode<T>
     *
     * @return number Node depth or the number of nodes from the tree root to the specified node (inclusive).  A singleton node has a depth of 1.
     */
    TSMT$BTreeUtils.prototype.nodeDepth = function (node) {
        // recursively calculate depth
        if (node == null)
            return 0;
        else if (node.parent == null)
            return 1;
        else
            return 1 + this.nodeDepth(node.parent);
    };
    /**
     * Perform an inorder traversal, starting at the input node, and return the node path in an array
     *
     * @param node: TSMT$BTreeNode<T> Reference to starting node
     *
     * @return Array<TSMT$BTreeNode<T>> Inorder path (if starting at the root of a tree, this returns nodes in sorted ascending value order)
     */
    TSMT$BTreeUtils.prototype.inorder = function (node) {
        this._path = new Array();
        this.__inorderTraversal(node);
        return this._path.slice();
    };
    /**
     * Perform an preorder traversal, starting at the input node, and return the node path in an array
     *
     * @param node: TSMT$BTreeNode<T> Reference to starting node
     *
     * @return Array<TSMT$BTreeNode<T>> Preorder path
     */
    TSMT$BTreeUtils.prototype.preorder = function (node) {
        this._path = new Array();
        this.__preorderTraversal(node);
        return this._path.slice();
    };
    /**
     * Perform an postorder traversal, starting at the input node, and return the node path in an array
     *
     * @param node: TSMT$BTreeNode<T> Reference to starting node
     *
     * @return Array<TSMT$BTreeNode<T>> Postorder path
     */
    TSMT$BTreeUtils.prototype.postorder = function (node) {
        this._path = new Array();
        this.__postorderTraversal(node);
        return this._path.slice();
    };
    /**
     * Perform a breadth-first or level traversal, starting at the input node, and return the node path in an array
     *
     * @param node: TSMT$BTreeNode<T> Reference to starting node
     *
     * @return Array<TSMT$BTreeNode<T>> breadth-first path
     */
    TSMT$BTreeUtils.prototype.BFS = function (node) {
        if (node == undefined || node == null)
            return [];
        this._path = new Array();
        var list = new Array();
        list.push(node);
        var n;
        while (list.length > 0) {
            n = list.shift();
            this._path.push(n);
            if (n.left != null)
                list.push(n.left);
            if (n.right != null)
                list.push(n.right);
        }
        return this._path.slice();
    };
    /**
     * Return an array of node ids, given an input array of nodes in a path
     *
     * @param path: Array<TSMT$BTreeNode<T> Node path
     *
     * @return Array<string> Node path expressed as an array of id's
     */
    TSMT$BTreeUtils.prototype.toIds = function (path) {
        var id = new Array();
        path.forEach(function (node, index) { id.push(node.id); });
        return id;
    };
    /**
     * Return an array of node values, given an input array of nodes in a path
     *
     * @param path: Array<TSMT$BTreeNode<T> Node path
     *
     * @return Array<string> Node path expressed as an array of id's
     */
    TSMT$BTreeUtils.prototype.toValues = function (path) {
        var id = new Array();
        path.forEach(function (node, index) { id.push(node.value); });
        return id;
    };
    TSMT$BTreeUtils.prototype.__inorderTraversal = function (node) {
        if (node == null)
            return;
        // inorder is left(bottom-up), root, right(bottom-up)
        this.__inorderTraversal(node.left);
        this._path.push(node);
        this.__inorderTraversal(node.right);
    };
    TSMT$BTreeUtils.prototype.__preorderTraversal = function (node) {
        if (node == null)
            return;
        // preorder is root, left(top-down), right(top-down)
        this._path.push(node);
        this.__preorderTraversal(node.left);
        this.__preorderTraversal(node.right);
    };
    TSMT$BTreeUtils.prototype.__postorderTraversal = function (node) {
        if (node == null)
            return;
        // postorder is left(bottom-up), right(bottom-up), root
        this.__postorderTraversal(node.left);
        this.__postorderTraversal(node.right);
        this._path.push(node);
    };
    return TSMT$BTreeUtils;
}());
exports.TSMT$BTreeUtils = TSMT$BTreeUtils;
