# Typescript Math Toolkit AVL Tree

This is the alpha release of the Typescript Math Toolkit binary tree library, the central component of which is a self-balancing AVL Tree.  A lightweight (classic) binary tree with limited methods is also included, primarily to measure imbalance of a classic tree for certain data sets.  A small set of tree utilities is also provided in this release.

The purpose of this release is to make an early version of the source code available to Typescript developers for testing and feedback on the current API.

Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Typescript: 2.0.0

Version: 1.0


## Installation

Installation involves all the usual suspects

  - npm and gulp installed globally
  - Clone the repository
  - npm install
  - get coffee (this is the most important step)


### Building and running the tests

1. gulp compile

2. gulp test

The test suite is in Mocha/Chai and specs reside in the _test_ folder. 


### TSMT$BTreeNode<T>

Nodes in any Typescript Math Toolkit binary tree are instances of _TSMT$BTreeNode<T>_.  Nodes contain internal data which may be assigned pre- or post-construction.  Nodes have an optional (string) _id_ property which is assigned externally to the node.  Node data should be convertable into a numerical measure, which is represented as the node's value.  By convention, the left child's value is less than the right child's value.

Binary tree nodes in the Typescript Math Toolkit may be referenced by traditional _left_ and _right_ accessors as well as zero-based node index.  In the latter scheme, an index of zero corresponds to the left child and an index of 1 corresponds to the right child.  This approach allows tree operations to be merged into single methods that handle two cases based on a direction index.

Node data is not optional and is used to compute a node's numerical value for comparison purposes.  My only use cases for binary trees inside the Typescript Math Toolkit are for numerical data, although the architecture supports any data from strings to Typescript classes.  In order to use a _TSMT$BTreeNode<T>_ instance with data other than numeric, it is necessary to extend the class and override the _value_ acessor.  Insert the necessary evaluation to return a numeerical measure from your node's data.  I will likely provide a more general set of evaluations for other data types in a subsequent release.

Node data is currently immutable.  Copies are made of simple primitives and Objects.  For more complex data, use a Typescript class that implements a _clone()_ method.  This facility of the _TSMT$BTreeNode<T>_ class has not yet been tested.  

Node references, however, are not currently immutable.  Accessing or mutating a child/parent sets a direct reference.  This is currently done for performance reasons and is subject to future change based on usaage feedback.

The list of public methods for the _TSMT$BTreeNode<T>_ class is as follows:

```
get data(): any
get balance(): number
get parent(): TSMT$BTreeNode<T>
get left(): TSMT$BTreeNode<T>
get right(): TSMT$BTreeNode<T>
get value(): number
get hasLeft(): boolean
get hasRight(): boolean
set data(value: any)
set parent(node: TSMT$BTreeNode<T>)
set left(node: TSMT$BTreeNode<T>)
set right(node: TSMT$BTreeNode<T>)
set balance(value: number)
getChild(index: number): TSMT$BTreeNode<T>
setChild(index: number, node: TSMT$BTreeNode<T>): void
compare(node: TSMT$BTreeNode<T>): number
compareTo(node: TSMT$BTreeNode<T>): number
clone(): TSMT$BTreeNode<T>
```

Note that the node _compare_ method is returns a traversal or rotation direction (0 or 1) while the _compareTo_ method returns -1 if one node's value is less than the other, 0 for equal, and 1 for greater than.

Peruse the _SMT$BTreeNode<T>_ documentation and _avltree.spects.ts_ file for more information.


### TSMT$BTreeUtils<T>

Tree utilities are not tied to any one particular tree implementation and many methods take a _TSMT$BTreeNode<T>_ as an input, so they may be applied to subtrees.  The current set of public methods includes:


```
nodeHeight(node: TSMT$BTreeNode<T>): number
nodeDepth(node: TSMT$BTreeNode<T>): number
inorder(node: TSMT$BTreeNode<T>): Array<TSMT$BTreeNode<T>>
preorder(node: TSMT$BTreeNode<T>): Array<TSMT$BTreeNode<T>>
postorder(node: TSMT$BTreeNode<T>): Array<TSMT$BTreeNode<T>>
BFS(node: TSMT$BTreeNode<T>): Array<TSMT$BTreeNode<T>>
toIds(path: Array<TSMT$BTreeNode<T>>): Array<string>
toValues(path: Array<TSMT$BTreeNode<T>>): Array<number>
```


### TSMT$IBTree<T>

This is an interface that specifies the minimal functionality that should be implemented by any TSMT binary tree.  It is not currently used, however, it is likely to be used in a more general set of tree utilities in the future.


### TSMT$BTreeLight<T>

This is a very lightweight implementation (insertion only) of a classic binary tree, except that it computes and stores balance factors on insert.  I personally use it to study the degree of imbalance caused by various datasets.  It is not now or will it ever be considered useful for production.  This class is provided for research purposes only.


### TSMT$AVLTree<T> 

The AVL Tree is currently the core offering of the binary tree library.  A red-black tree is on the bubble for release 1.0 of the Typescript Math Toolkit, however, the AVL Tree is ideal for the libraries I have planned for the toolkit.  I need a general tree well before a red-black tree.

The tree is self-balancing and supports insert by node, insertion by array of values and deletion by node.  Nodes placed into the tree are not currently immutable for performance reasons.  While this should pose no problems if maintaining external references to nodes post-insert, it may be an issue post-delete if you intend to use those node references.  Best practice with the current release is to insert and delete by value, not by direct node reference. 

I'm a general fan of 'what happens in the tree stays in the tree.'  If you wish to reference a node after a tree operation, use the _find_ method (search by value).  Then, reference the returned node.  This approach can be rigidly enforced by forcing all node data entered into the tree to be immutable (at the slight expense of cloning all inserted nodes and nodes returned by accessors).  

The current alpha is optimized for performance, but I am open to suggestions.

The list of current public methods is as follows:


```
get size(): number
get root(): TSMT$BTreeNode<T>
fromArray(values: Array<T>): void
clear()
insertByValue(value: T, id: string): void
insert(node: TSMT$BTreeNode<T>): void
deleteByValue(value: T): void
delete(node: TSMT$BTreeNode<T>): void
getMin(root?: TSMT$BTreeNode<T>): TSMT$BTreeNode<T>
getMax(root?: TSMT$BTreeNode<T>): TSMT$BTreeNode<T>
find(x: T, root?: TSMT$BTreeNode<T>): TSMT$BTreeNode<T>
singleRotation(node: TSMT$BTreeNode<T>, dir: number): TSMT$BTreeNode<T>
doubleRotation(node: TSMT$BTreeNode<T>, dir: number): TSMT$BTreeNode<T>
```

Single and double rotations apply to two cases in one method and each case is diferentiated by a direction index (0 or 1).  They are currently exposed as public methods of the AVL Tree for purposes of easier testing. 


### Usage

One usage of the AVL Tree is to create and add nodes.  As of the alpha release, the tree has only been tested on numeric node types.


```
let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    
two.id   = "2";
one.id   = "1";
three.id = "3";
four.id  = "4";

tree.insert(two)
tree.insert(one);
tree.insert(four);
tree.insert(three);

let node: TSMT$BTreeNode<number> = tree.find(3);
```

While possible, this approach is generally not recommended as it encourages external references to nodes in the tree.

It is also possible (and more common) to initialize the tree from an array of values


```
let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

tree.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
 
let root: TSMT$BTreeNode<number> = tree.root;
```

In this case, node id's are assigned based on the order in which the node is inserted, i.e, "0", "1", ...

To work with one node at at time, use the by-value insert and delete methods.


```
let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

tree.insertByValue(3, "3");
tree.insertByValue(20, "20");
tree.insertByValue(17, "17");
tree.insertByValue(4, "4");
tree.insertByValue(1, "1");

let root: TSMT$BTreeNode<number> = tree.root;
let left: TSMT$BTreeNode<number> = root.left;
let right: TSMT$BTreeNode<number> = root.right;
```

```
let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

tree.fromArray([10, 8, 18, 17, 20, 24, 15]);

tree.deleteByValue(10);
tree.deleteByValue(20);
```


Refer to the specs in the test folder for more usage examples.


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <http://algorithmist.net>

