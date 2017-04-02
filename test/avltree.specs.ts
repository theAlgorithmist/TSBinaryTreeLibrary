/** Copyright 2016 Jim Armstrong (www.algorithmist.net)
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

// Specs for Typescript Math Toolkit AVL Tree

// test functions/classes
import {TSMT$BTreeNode     } from '../src/BtreeNode';
import {TSMT$BTreeUtils    } from '../src/BTreeUtils';
import {TSMT$BTreeLight    } from '../src/BTreeLight';
import {TSMT$AVLTree       } from '../src/AVLTree';
import {TSMT$NODE_DIRECTION} from '../src/AVLTree';

import * as Chai from 'chai';
const expect = Chai.expect;

// Test Suites
describe('Binary Tree Node Tests: TSMT$BTreeNode<T>', () => {

  const utils: TSMT$BTreeUtils<number> = new TSMT$BTreeUtils<number>();

  it('properly constructs a new binary tree node of type number', () => {
    let node: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>();

    expect(node).to.not.equal(null);
    expect(node.parent).to.equal(null);
    expect(node.hasLeft).to.be.false;
    expect(node.hasRight).to.be.false;
  });

  it('properly constructs a new binary tree node with initial data', () => {
    let node: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(100.0);

    expect(node).to.not.equal(null);
    expect(node.parent).to.equal(null);
    expect(node.value).to.equal(100.0);
    expect(node.hasLeft).to.be.false;
    expect(node.hasRight).to.be.false;
  });

  it('properly accepts balance data', () => {
    let node: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(1.0);

    node.balance = -2.1;
    expect(node.balance).to.equal(-3);
  
    node.balance = 2.5;
    expect(node.balance).to.equal(2);

    node.balance = 0;
    expect(node.balance).to.equal(0);
  });

  it('properly accepts parent and child references', () => {
    let root: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(2.0);
    let left: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(1.0);
    let right: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);

    root.id  = "root";
    left.id  = "L";
    right.id = "R";

    left.parent  = root;
    right.parent = root;

    root.left  = left;
    root.right = right;

    expect(root.hasLeft).to.be.true;
    expect(root.hasRight).to.be.true;
    expect(left.parent.id  == root.id).to.be.true;
    expect(right.parent.id == root.id).to.be.true;
    expect(root.left.id  == left.id).to.be.true;
    expect(root.right.id == right.id).to.be.true;
  });

  it('properly compares two nodes', () => {
    let node1: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(1.0);
    let node2: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let node3: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);

    expect(node1.compare(node2)).to.equal(0);
    expect(node2.compare(node1)).to.equal(1);
    expect(node2.compare(node3)).to.equal(1);
  });
 
  it('properly computes node height #1', () => {
    let tree: TSMT$AVLTree<number>   = new TSMT$AVLTree<number>();
    let root: TSMT$BTreeNode<number> = tree.root;

    expect(utils.nodeHeight(root)).to.equal(0);
    expect(root).to.be.null;
  });

  it('properly computes node height #2', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);

    two.left  = one;
    two.right = four;

    four.left  = three;
    four.right = five;

    expect(utils.nodeHeight(two)).to.equal(3);
    expect(utils.nodeHeight(one)).to.equal(1);
    expect(utils.nodeHeight(four)).to.equal(2);
  });

  it('properly computes node height #3', () => {
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(20.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(17.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);

    twenty.left  = seventeen;
    twenty.right = twentyfour;

    seventeen.left  = ten;
    seventeen.right = eighteen;

    ten.left = eight;

    expect(utils.nodeHeight(twenty)).to.equal(4);
    expect(utils.nodeHeight(seventeen)).to.equal(3);
    expect(utils.nodeHeight(ten)).to.equal(2);
    expect(utils.nodeHeight(twentyfour)).to.equal(1);
    expect(utils.nodeHeight(eighteen)).to.equal(1);
    expect(utils.nodeHeight(eight)).to.equal(1);
    expect(utils.nodeHeight(null)).to.equal(0);
  });

  it('properly computes node depth', () => {
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(20.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(17.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);

    twenty.left  = seventeen;
    twenty.right = twentyfour;

    seventeen.left  = ten;
    seventeen.right = eighteen;

    ten.left = eight;

    expect(utils.nodeDepth(twenty)).to.equal(1);
    expect(utils.nodeDepth(seventeen)).to.equal(2);
    expect(utils.nodeDepth(ten)).to.equal(3);
    expect(utils.nodeDepth(twentyfour)).to.equal(2);
    expect(utils.nodeDepth(eighteen)).to.equal(3);
    expect(utils.nodeDepth(eight)).to.equal(4);
    expect(utils.nodeDepth(null)).to.equal(0);
  });

});

describe('AVL Tree Basic Tests: TSMT$AVLTree<T> and TSMT$BTreeLight<T>', () => {

  it('properly constructs an AVL Tree', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();
    
    expect(tree != null).to.be.true;
    expect(tree.size).to.equal(0);
    expect(tree.root).to.be.null;
  });

  it('properly inserts a single node and assigns root', () => {
    let tree: TSMT$AVLTree<number>   = new TSMT$AVLTree<number>();
    let node: TSMT$BTreeNode<number> = new TSMT$BTreeNode(20.0);

    tree.insert(node);
    expect(tree.size).to.equal(1);

    let root: TSMT$BTreeNode<number> = tree.root;
    expect(root === node).to.be.true;
  });

  it('properly inserts a single root node and single child', () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let node: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(2.0);
    let node1: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    
    tree.insert(node);
    tree.insert(node1);
    expect(tree.size).to.equal(2);
  });

  it('properly inserts a single root node and two children #1', () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(2.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    
    tree.insert(two);
    tree.insert(one);
    tree.insert(three);

    expect(tree.size).to.equal(3);

    let root: TSMT$BTreeNode<number> = tree.root;
    expect(root == two).to.be.true;
    expect(root.hasLeft).to.be.true;
    expect(root.hasRight).to.be.true;
    expect(root.left === one).to.be.true;
    expect(root.right === three).to.be.true;
  });

  it('properly inserts a single root node and two children #2', () => {
    let tree: TSMT$BTreeLight<number> = new TSMT$BTreeLight<number>();
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    
    tree.insert(one);
    tree.insert(two);
    tree.insert(three);

    expect(tree.size).to.equal(3);

    let root: TSMT$BTreeNode<number> = tree.root;
    expect(root == one).to.be.true;
    expect(root.hasLeft).to.be.false;

    let child: TSMT$BTreeNode<number> = root.right;
    expect(child.hasRight).to.be.true;
    expect(child.hasLeft).to.be.false;

    expect(child === two).to.be.true;
    
    child = child.right;
    expect(child.hasRight).to.be.false;
    expect(child.hasLeft).to.be.false;

    expect(child === three).to.be.true;
  });
  
  it('properly inserts a single root node and two children #3', () => {
    let tree: TSMT$BTreeLight<number> = new TSMT$BTreeLight<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(2.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    
    tree.insert(three);
    tree.insert(two);
    tree.insert(one);

    expect(tree.size).to.equal(3);

    let root: TSMT$BTreeNode<number> = tree.root;
    expect(root == three).to.be.true;
    expect(root.hasRight).to.be.false;

    let child: TSMT$BTreeNode<number> = root.left;
    expect(child.hasLeft).to.be.true;
    expect(child.hasRight).to.be.false;

    expect(child === two).to.be.true;
    
    child = child.left;
    expect(child.hasLeft).to.be.false;
    expect(child.hasRight).to.be.false;

    expect(child === one).to.be.true;
  });

  it('properly inserts a single node and two children #4', () => {
    let tree: TSMT$BTreeLight<number>  = new TSMT$BTreeLight<number>();
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(5.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(4.0);
    
    five.id  = "5";
    three.id = "3";
    four.id  = "4";

    tree.insert(five);
    tree.insert(three);
    tree.insert(four);

    expect(tree.root.id).to.equal("5");
    expect(five.left.id).to.equal("3");
    expect(three.right.id).to.equal("4");
  });

  it('properly inserts multiple nodes', () => {
    let tree: TSMT$BTreeLight<number>  = new TSMT$BTreeLight<number>();
    let three: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(3.0);
    let four: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(4.0);
    let five: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(5.0);
    let two: TSMT$BTreeNode<number>    = new TSMT$BTreeNode(2.0);
    let one: TSMT$BTreeNode<number>    = new TSMT$BTreeNode(1.0);
    
    three.id = "3";
    four.id  = "4";
    five.id  = "5";
    two.id   = "2";
    one.id   = "1";

    tree.insert(three);
    tree.insert(four);
    tree.insert(five);
    tree.insert(two);
    tree.insert(one);

    expect(tree.size).to.equal(5);
    expect(tree.root.id).to.equal("3");
    expect(three.right.id).to.equal("4");
    expect(four.right.id).to.equal("5");
    expect(three.left.id).to.equal("2");
    expect(two.left.id).to.equal("1");
  });

  it('basic multi-node insert #2', () => {
    let tree: TSMT$BTreeLight<number>    = new TSMT$BTreeLight<number>();
    let three: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(3.0);
    let twenty: TSMT$BTreeNode<number>    = new TSMT$BTreeNode(20.0);
    let seventeen: TSMT$BTreeNode<number> = new TSMT$BTreeNode(17.0);
    let four: TSMT$BTreeNode<number>      = new TSMT$BTreeNode(4.0);
    let one: TSMT$BTreeNode<number>       = new TSMT$BTreeNode(1.0);
    
    three.id     = "3";
    twenty.id    = "20";
    seventeen.id = "17";
    four.id      = "4";
    one.id       = "1";

    tree.insert(three);
    tree.insert(twenty);
    tree.insert(seventeen);
    tree.insert(four);
    tree.insert(one);

    expect(tree.size).to.equal(5);
    expect(tree.root.id).to.equal(three.id);
    expect(three.right.id).to.equal(twenty.id);
    expect(twenty.left.id).to.equal(seventeen.id);
    expect(seventeen.left.id).to.equal(four.id);
    expect(three.left.id).to.equal(one.id);
  });
});

describe('Light Binary Tree Update Balance On Insert Tests', () => {

  it('one-node insert' , () => {
    let tree: TSMT$BTreeLight<number>    = new TSMT$BTreeLight<number>();
    let node: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(1.0);
  
    node.id  = "node";

    tree.insert(node);
   
    expect(node.balance).to.equal(0);
  });

  it('two-node insert #1' , () => {
    let tree: TSMT$BTreeLight<number> = new TSMT$BTreeLight<number>();
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(2.0);
    
    one.id = "1";
    two.id = "2";

    tree.insert(one);
    tree.insert(two);
   
    expect(one.balance).to.equal(1);
    expect(two.balance).to.equal(0);
  });

  it('two-node insert #2' , () => {
    let tree: TSMT$BTreeLight<number> = new TSMT$BTreeLight<number>();
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(2.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    
    two.id = "2";
    one.id = "1";

    tree.insert(two);
    tree.insert(one);
   
    expect(two.balance).to.equal(-1);
    expect(one.balance).to.equal(0);
  });

  it('three-node insert #1' , () => {
    let tree: TSMT$BTreeLight<number> = new TSMT$BTreeLight<number>();
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(2.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    
    two.id   = "2";
    one.id   = "1";
    three.id = "3";

    tree.insert(two);
    tree.insert(one);
    tree.insert(three);

    expect(two.balance).to.equal(0);
    expect(one.balance).to.equal(0);
    expect(three.balance).to.equal(0);
  });

  it('three-node insert #2' , () => {
    let tree: TSMT$BTreeLight<number> = new TSMT$BTreeLight<number>();
    let node: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(1.0);
    let node1: TSMT$BTreeNode<number> = new TSMT$BTreeNode(2.0);
    let node2: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    
    node.id  = "one";
    node1.id = "two";
    node2.id = "three";

    tree.insert(node);
    tree.insert(node1);
    tree.insert(node2);

    expect(node.balance).to.equal(2);
    expect(node1.balance).to.equal(1);
    expect(node2.balance).to.equal(0);
  });

  it('three-node insert #3' , () => {
    let tree: TSMT$BTreeLight<number> = new TSMT$BTreeLight<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(2.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    
    three.id = "3";
    two.id   = "2";
    one.id   = "1";

    tree.insert(three);
    tree.insert(two);
    tree.insert(one);

    expect(three.balance).to.equal(-2);
    expect(two.balance).to.equal(-1);
    expect(one.balance).to.equal(0);
  });

  it('mult-node test #1' , () => {
    let tree: TSMT$BTreeLight<number>   = new TSMT$BTreeLight<number>();
    let twelve: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(12.0);
    let eight: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(8.0);
    let five: TSMT$BTreeNode<number>    = new TSMT$BTreeNode(5.0);
    let nine: TSMT$BTreeNode<number>    = new TSMT$BTreeNode(9.0);
    let fifteen: TSMT$BTreeNode<number> = new TSMT$BTreeNode(15.0);
    
    twelve.id  = "12";
    eight.id   = "8";
    five.id    = "5";
    nine.id    = "9";
    fifteen.id = "15";

    tree.insert(twelve);
    expect(twelve.balance).to.equal(0);

    tree.insert(eight);
    expect(twelve.balance).to.equal(-1);

    tree.insert(five);
    expect(eight.balance).to.equal(-1);
    expect(twelve.balance).to.equal(-2);

    tree.insert(nine);
    expect(eight.balance).to.equal(0);
    expect(twelve.balance).to.equal(-2);

    tree.insert(fifteen);
    expect(fifteen.balance).to.equal(0);
    expect(twelve.balance).to.equal(-1);
  });

  it('mult-node test #2' , () => {
    let tree: TSMT$BTreeLight<number>  = new TSMT$BTreeLight<number>();
    let twelve: TSMT$BTreeNode<number> = new TSMT$BTreeNode(12.0);
    let eight: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(8.0);
    let five: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(5.0);
    let nine: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(9.0);
    let ten: TSMT$BTreeNode<number>    = new TSMT$BTreeNode(10.0);
    
    twelve.id = "12";
    eight.id  = "8";
    five.id   = "5";
    nine.id   = "9";
    ten.id    = "10";

    tree.insert(twelve);
    expect(twelve.balance).to.equal(0);

    tree.insert(eight);
    expect(twelve.balance).to.equal(-1);

    tree.insert(five);
    expect(eight.balance).to.equal(-1);
    expect(twelve.balance).to.equal(-2);

    tree.insert(nine);
    expect(eight.balance).to.equal(0);
    expect(twelve.balance).to.equal(-2);

    tree.insert(ten);
    expect(ten.balance).to.equal(0);
    expect(nine.balance).to.equal(1);
    expect(eight.balance).to.equal(1);
    expect(twelve.balance).to.equal(-3);
  });

  it('mult-node test #3' , () => {
    let tree: TSMT$BTreeLight<number>     = new TSMT$BTreeLight<number>();
    let twelve: TSMT$BTreeNode<number>    = new TSMT$BTreeNode(12.0);
    let eight: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(8.0);
    let five: TSMT$BTreeNode<number>      = new TSMT$BTreeNode(5.0);
    let nine: TSMT$BTreeNode<number>      = new TSMT$BTreeNode(9.0);
    let twenty: TSMT$BTreeNode<number>    = new TSMT$BTreeNode(20.0);
    let eighteen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(18.0);
    let seventeen: TSMT$BTreeNode<number> = new TSMT$BTreeNode(17.0);

    tree.insert(twelve);
    tree.insert(eight);
    tree.insert(five);
    tree.insert(nine);
    tree.insert(twenty);
    tree.insert(eighteen);
    tree.insert(seventeen);

    expect(seventeen.balance).to.equal(0);
    expect(eighteen.balance).to.equal(-1);
    expect(twenty.balance).to.equal(-2);
    expect(twelve.balance).to.equal(1);
  });
});

describe('AVL Tree Rotation Tests', () => {

  it('properly performs a single left rotation' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    
    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    one.right = two;
    two.right = three;

    let newRoot: TSMT$BTreeNode<number> = tree.singleRotation(one, TSMT$NODE_DIRECTION.LEFT);

    expect(newRoot.id).to.equal(two.id);
    expect(newRoot.hasLeft).to.be.true;
    expect(newRoot.hasRight).to.be.true;
    expect(newRoot.left.id).to.equal(one.id);
    expect(newRoot.right.id).to.equal(three.id);
    expect(one.parent.id).to.equal(two.id);

    expect(newRoot.balance).to.equal(0);
    expect(one.balance).to.equal(0);
    expect(three.balance).to.equal(0);
  });

  it('properly performs a single right rotation', () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(2.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    
    three.id = "3";
    two.id   = "2";
    one.id   = "1";

    three.left = two;
    two.left   = one;

    let newRoot: TSMT$BTreeNode<number>  = tree.singleRotation(three, TSMT$NODE_DIRECTION.RIGHT);

    expect(newRoot.id).to.equal(two.id);
    expect(newRoot.hasLeft).to.be.true;
    expect(newRoot.hasRight).to.be.true;
    expect(newRoot.left.id).to.equal(one.id);
    expect(newRoot.right.id).to.equal(three.id);

    expect(newRoot.balance).to.equal(0);
    expect(one.balance).to.equal(0);
    expect(three.balance).to.equal(0);
  });

  it('3-node double right rotation', () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(5.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(4.0);
    
    five.id  = "5";
    three.id = "3";
    four.id  = "4";

    five.left   = three;
    three.right = four;

    let newRoot: TSMT$BTreeNode<number> = tree.doubleRotation(five, TSMT$NODE_DIRECTION.RIGHT);

    expect(newRoot.id).to.equal(four.id);
    expect(newRoot.hasLeft).to.be.true;
    expect(newRoot.hasRight).to.be.true;
    expect(newRoot.left.id).to.equal(three.id);
    expect(newRoot.right.id).to.equal(five.id);
    expect(newRoot.parent).to.be.null;
    expect(newRoot.left.parent.id).to.equal(newRoot.id);
    expect(newRoot.right.parent.id).to.equal(newRoot.id);
  });

  it('3-node double left rotation', () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(5.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(4.0);
    
    three.id = "3";
    five.id  = "5";
    four.id  = "4";

    three.right = five;
    five.left   = four;

    let newRoot: TSMT$BTreeNode<number> = tree.doubleRotation(three, TSMT$NODE_DIRECTION.LEFT);

    expect(newRoot.id).to.equal(four.id);
    expect(newRoot.hasLeft).to.be.true;
    expect(newRoot.hasRight).to.be.true;
    expect(newRoot.left.id).to.equal(three.id);
    expect(newRoot.right.id).to.equal(five.id);
    expect(newRoot.parent).to.be.null;
    expect(newRoot.left.parent.id).to.equal(newRoot.id);
    expect(newRoot.right.parent.id).to.equal(newRoot.id);
  });

  it('multi-node, single-rotation #1' , () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(20.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(17.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);

    twenty.id     = "20";
    seventeen.id  = "17";
    twentyfour.id = "24";
    eighteen.id   = "18";
    ten.id        = "10";
    eight.id      = "8";

    twenty.left     = seventeen;
    twenty.right    = twentyfour;
    seventeen.right = eighteen;
    seventeen.left  = ten;
    ten.left        = eight;

    let newRoot: TSMT$BTreeNode<number> = tree.singleRotation(twenty, TSMT$NODE_DIRECTION.RIGHT);
   
    expect(newRoot.id).to.equal(seventeen.id);
    expect(newRoot.left.id).to.equal(ten.id);
    expect(newRoot.right.id).to.equal(twenty.id);
    expect(twenty.left.id).to.equal(eighteen.id);
    expect(twenty.right.id).to.equal(twentyfour.id);
    expect(ten.left.id).to.equal(eight.id);
  });

  it('multi-node, single-rotation #2' , () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(20.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(17.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);

    twenty.id     = "20";
    seventeen.id  = "17";
    twentyfour.id = "24";
    eighteen.id   = "18";
    ten.id        = "10";
    eight.id      = "8";

    ten.left       = eight;
    ten.right      = eighteen;
    eighteen.left  = seventeen;
    eighteen.right = twenty;
    twenty.right   = twentyfour;

    let newRoot: TSMT$BTreeNode<number> = tree.singleRotation(ten, TSMT$NODE_DIRECTION.LEFT);
   
    expect(newRoot.id).to.equal(eighteen.id);
    expect(newRoot.left.id).to.equal(ten.id);
    expect(newRoot.right.id).to.equal(twenty.id);
    expect(ten.left.id).to.equal(eight.id);
    expect(ten.right.id).to.equal(seventeen.id);
    expect(twenty.right.id).to.equal(twentyfour.id);
  });

  it('multi-node, double-rotation #1' , () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let twelve: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(12.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode(10.0);
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(20.0);
    let fifteen: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(15.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let thirteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(13.0);

    twelve.id     = "12";
    ten.id        = "10";
    twenty.id     = "20";
    fifteen.id    = "15";
    twentyfour.id = "24";
    thirteen.id   = "13";

    twelve.left = ten;
    twelve.right = twenty;
    twenty.left  = fifteen;
    twenty.right = twentyfour;
    fifteen.left = thirteen;

    let newRoot: TSMT$BTreeNode<number> = tree.doubleRotation(twelve, TSMT$NODE_DIRECTION.LEFT);
    expect(newRoot.id).to.equal(fifteen.id);
    expect(newRoot.left.id).to.equal(twelve.id);
    expect(newRoot.right.id).to.equal(twenty.id);
    expect(twelve.left.id).to.equal(ten.id);
    expect(twelve.right.id).to.equal(thirteen.id);
    expect(twenty.left).to.be.null;
    expect(twenty.right.id).to.equal(twentyfour.id);
  });

  it('multi-node, double-rotation #2' , () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let twelve: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(12.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode(10.0);
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(20.0);
    let fifteen: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(15.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let sixteen: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(16.0);

    twelve.id     = "12";
    ten.id        = "10";
    twenty.id     = "20";
    fifteen.id    = "15";
    twentyfour.id = "24";
    sixteen.id    = "16";

    twelve.left     = ten;
    twelve.right    = twenty;
    twenty.left     = fifteen;
    twenty.right    = twentyfour;
    fifteen.right   = sixteen;

    let newRoot: TSMT$BTreeNode<number> = tree.doubleRotation(twelve, TSMT$NODE_DIRECTION.LEFT);
    expect(newRoot.id).to.equal(fifteen.id);
    expect(newRoot.left.id).to.equal(twelve.id);
    expect(newRoot.right.id).to.equal(twenty.id);
    expect(twelve.left.id).to.equal(ten.id);
    expect(twelve.right).to.be.null;
    expect(twenty.left.id).to.equal(sixteen.id);
    expect(twenty.right.id).to.equal(twentyfour.id);
  });
});

describe('AVL Tree Insert With Rebalance Tests', () => {

  it('no rebalance on one-node insert' , () => {
    let tree: TSMT$AVLTree<number>   = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(1.0);
  
    one.id = "1";

    tree.insert(one);
   
    expect(tree.size).to.equal(1);
    expect(one.balance).to.equal(0);
  });

  it('no rebalance on two-node insert #1' , () => {
    let tree: TSMT$AVLTree<number>  = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);

    one.id = "1";
    two.id = "2";

    tree.insert(one);
    tree.insert(two);

    expect(tree.size).to.equal(2);
    expect(one.balance).to.equal(1);
    expect(two.balance).to.equal(0);
    expect(tree.root.id).to.equal(one.id);
    expect(one.right.id).to.equal(two.id);
  });

  it('no rebalance on two-node insert #2' , () => {
    let tree: TSMT$AVLTree<number>  = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);

    one.id = "1";
    two.id = "2";

    tree.insert(two);
    tree.insert(one);

    expect(tree.size).to.equal(2);
    expect(two.balance).to.equal(-1);
    expect(one.balance).to.equal(0);
    expect(tree.root.id).to.equal(two.id);
    expect(two.left.id).to.equal(one.id);
  });

  it('no rebalance on one node, two-child insert #1' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    tree.insert(two);
    tree.insert(one);
    tree.insert(three);

    expect(tree.size).to.equal(3);
    expect(tree.root.id).to.equal(two.id);
    expect(two.left.id).to.equal(one.id);
    expect(two.right.id).to.equal(three.id);
    expect(two.balance).to.equal(0);
    expect(one.balance).to.equal(0);
    expect(three.balance).to.equal(0);
  });

  it('no rebalance on one node, two-child insert #2' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    tree.insert(two);
    tree.insert(three);
    tree.insert(one);

    expect(tree.size).to.equal(3);
    expect(tree.root.id).to.equal(two.id);
    expect(two.left.id).to.equal(one.id);
    expect(two.right.id).to.equal(three.id);
    expect(two.balance).to.equal(0);
    expect(one.balance).to.equal(0);
    expect(three.balance).to.equal(0);
  });

  it('three-node test #1 (single rotation)' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    tree.insert(three);
    tree.insert(two);
    tree.insert(one);

    expect(tree.size).to.equal(3);
    expect(tree.root.id).to.equal(two.id);
    expect(two.left.id).to.equal(one.id);
    expect(two.right.id).to.equal(three.id);
  });

  it('three-node test #2 (single rotation)' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    tree.insert(one);
    tree.insert(two);
    tree.insert(three);

    expect(tree.size).to.equal(3);
    expect(tree.root.id).to.equal(two.id);
    expect(two.left.id).to.equal(one.id);
    expect(two.right.id).to.equal(three.id);
  });

  it('three-node test #3 (double rotation)' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(5.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);

    five.id  = "5";
    three.id = "3";
    four.id  = "4";

    tree.insert(five);
    tree.insert(three);
    tree.insert(four);

    expect(tree.size).to.equal(3);
    expect(tree.root.id).to.equal(four.id);
    expect(four.left.id).to.equal(three.id);
    expect(four.right.id).to.equal(five.id);
  });

  it('three-node test #4 (double rotation)' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(5.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);

    five.id  = "5";
    three.id = "3";
    four.id  = "4";

    tree.insert(three);
    tree.insert(five);
    tree.insert(four);

    expect(tree.size).to.equal(3);
    expect(tree.root.id).to.equal(four.id);
    expect(four.left.id).to.equal(three.id);
    expect(four.right.id).to.equal(five.id);
  });

  it('multi-node test #1' , () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(20.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(17.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);

    twenty.id     = "20";
    seventeen.id  = "17";
    twentyfour.id = "24";
    eighteen.id   = "18";
    ten.id        = "10";
    eight.id      = "8";

    tree.insert(ten);
    tree.insert(eighteen);
    tree.insert(eight);
    tree.insert(seventeen);
    tree.insert(twenty);
    tree.insert(twentyfour);

    let root: TSMT$BTreeNode<number> = tree.root;
    expect(tree.root.id).to.equal(eighteen.id);
    expect(root.left.id).to.equal(ten.id);
    expect(root.right.id).to.equal(twenty.id);
    expect(ten.left.id).to.equal(eight.id);
    expect(ten.right.id).to.equal(seventeen.id);
    expect(twenty.right.id).to.equal(twentyfour.id);

    expect(root.balance).to.equal(0);
    expect(ten.balance).to.equal(0);
    expect(twenty.balance).to.equal(1);
    expect(eight.balance).to.equal(0);
    expect(seventeen.balance).to.equal(0);
    expect(twentyfour.balance).to.equal(0);
  });

  it('multi-node test #2' , () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(20.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(17.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);

    twenty.id     = "20";
    seventeen.id  = "17";
    twentyfour.id = "24";
    eighteen.id   = "18";
    ten.id        = "10";
    eight.id      = "8";

    tree.insert(twenty);
    tree.insert(seventeen);
    tree.insert(twentyfour);
    tree.insert(eighteen);
    tree.insert(ten);
    tree.insert(eight);

    let root: TSMT$BTreeNode<number> = tree.root;
    expect(root.id).to.equal(seventeen.id);
    expect(root.left.id).to.equal(ten.id);
    expect(root.right.id).to.equal(twenty.id);
    expect(ten.left.id).to.equal(eight.id);
    expect(twenty.left.id).to.equal(eighteen.id);
    expect(twenty.right.id).to.equal(twentyfour.id);

    expect(seventeen.balance).to.equal(0);
    expect(ten.balance).to.equal(-1);
    expect(twenty.balance).to.equal(0);
    expect(eight.balance).to.equal(0);
    expect(eighteen.balance).to.equal(0);
    expect(twentyfour.balance).to.equal(0);
  });

  it('multi-node test 3 (sequential inputs)' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let zero: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);
    let six: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(6.0);
    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    zero.id  = "0";
    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";
    six.id   = "6";
    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(zero);
    tree.insert(one);
    tree.insert(two);
  
    expect(tree.root.id).to.equal(one.id);
    expect(tree.size).to.equal(3);

    tree.insert(three);
    let root: TSMT$BTreeNode<number> = tree.root;

    expect(root.id).to.equal(one.id);
    expect(root.left.id).to.equal(zero.id);
    expect(root.right.id).to.equal(two.id);
    expect(tree.size).to.equal(4);

    tree.insert(four);
    root = tree.root;

    expect(root.left.id).to.equal(zero.id);
    expect(root.right.id).to.equal(three.id);
    expect(three.left.id).to.equal(two.id);
    expect(three.right.id).to.equal(four.id);

    tree.insert(five);
    root = tree.root
    
    expect(root.id).to.equal(three.id);
    expect(root.left.id).to.equal(one.id);
    expect(root.right.id).to.equal(four.id);
    expect(one.left.id).to.equal(zero.id);
    expect(one.right.id).to.equal(two.id);
    expect(four.right.id).to.equal(five.id);

    expect(three.balance).to.equal(0);
    expect(one.balance).to.equal(0);
    expect(four.balance).to.equal(1);
    expect(zero.balance).to.equal(0);
    expect(two.balance).to.equal(0);
    expect(five.balance).to.equal(0);

    tree.insert(six);
    root = tree.root;

    expect(root.id).to.equal(three.id);
    expect(root.left.id).to.equal(one.id);
    expect(root.right.id).to.equal(five.id);
    expect(one.left.id).to.equal(zero.id);
    expect(one.right.id).to.equal(two.id);
    expect(five.left.id).to.equal(four.id);
    expect(five.right.id).to.equal(six.id);
    expect(tree.size).to.equal(7);

    tree.insert(seven);
    root = tree.root;

    expect(root.id).to.equal(three.id);
    expect(six.right.id).to.equal(seven.id);
    expect(root.balance).to.equal(1);
    expect(six.balance).to.equal(1);
    expect(five.balance).to.equal(1);
    expect(one.balance).to.equal(0);

    tree.insert(eight);
    root = tree.root;

    expect(root.id).to.equal(three.id);
    expect(seven.left.id).to.equal(six.id);
    expect(seven.right.id).to.equal(eight.id);
    expect(root.balance).to.equal(1);
    expect(five.balance).to.equal(1);
    expect(one.balance).to.equal(0);

    tree.insert(nine);
    root = tree.root;

    expect(root.id).to.equal(three.id);
    expect(root.left.id).to.equal(one.id);
    expect(root.right.id).to.equal(seven.id);
    expect(one.left.id).to.equal(zero.id);
    expect(one.right.id).to.equal(two.id);
    expect(seven.left.id).to.equal(five.id);
    expect(seven.right.id).to.equal(eight.id);
    expect(five.left.id).to.equal(four.id);
    expect(five.right.id).to.equal(six.id);
    expect(eight.right.id).to.equal(nine.id);

    expect(root.balance).to.equal(1);
    expect(one.balance).to.equal(0);
    expect(seven.balance).to.equal(0);
    expect(five.balance).to.equal(0);
    expect(eight.balance).to.equal(1);
  });

  it('multi-node test 4 (sequential inputs)' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let zero: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);
    let six: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(6.0);
    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    zero.id  = "0";
    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";
    six.id   = "6";
    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(nine);
    tree.insert(eight);
    tree.insert(seven);
    tree.insert(six);
    tree.insert(five);
    tree.insert(four);
    tree.insert(three);
    tree.insert(two);
    tree.insert(one);
    tree.insert(zero);

    let root: TSMT$BTreeNode<number> = tree.root;

    expect(root.id).to.equal(six.id);
    expect(root.left.id).to.equal(two.id);
    expect(root.right.id).to.equal(eight.id);
    expect(two.left.id).to.equal(one.id);
    expect(two.right.id).to.equal(four.id);
    expect(eight.left.id).to.equal(seven.id);
    expect(eight.right.id).to.equal(nine.id);
    expect(four.left.id).to.equal(three.id);
    expect(four.right.id).to.equal(five.id);
    expect(one.left.id).to.equal(zero.id);

    expect(root.balance).to.equal(-1);
    expect(one.balance).to.equal(-1);
    expect(two.balance).to.equal(0);
    expect(eight.balance).to.equal(0);
    expect(four.balance).to.equal(0);
  });

  it('insert by value testt #2', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    tree.insertByValue(3, "3");
    tree.insertByValue(20, "20");
    tree.insertByValue(17, "17");
    tree.insertByValue(4, "4");
    tree.insertByValue(1, "1");

    let root: TSMT$BTreeNode<number> = tree.root;
    let left: TSMT$BTreeNode<number> = root.left;
    let right: TSMT$BTreeNode<number> = root.right;

    expect(tree.size).to.equal(5);
    expect(root.value).to.equal(17);
    expect(left.value).to.equal(3);
    expect(right.value).to.equal(20);
  });
});

describe('AVL Tree Min/Max/Find Tests', () => {

  it('returns null for empty tree' , () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();
   
    expect(tree.size).to.equal(0);
    expect(tree.getMin()).to.be.null;
    expect(tree.getMax()).to.be.null;
    expect(tree.find(1.0)).to.be.null;
  });

  it('returns correct results from 1-node tree' , () => {
    let tree: TSMT$AVLTree<number>  = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode(1.0);
  
    one.id = "1";

    tree.insert(one);
   
    expect(tree.size).to.equal(1);
    expect(tree.getMin().id).to.equal(one.id);
    expect(tree.getMax().id).to.equal(one.id);
    expect(tree.find(1.0).id).to.equal(one.id);
  });

  it('returns correct results from 2-node tree #1' , () => {
    let tree: TSMT$AVLTree<number>  = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);

    one.id = "1";
    two.id = "2";

    tree.insert(one);
    tree.insert(two);

    expect(tree.size).to.equal(2);
    expect(tree.getMin().id).to.equal(one.id);
    expect(tree.getMax().id).to.equal(two.id);
    expect(tree.find(1.0).id).to.equal(one.id);
    expect(tree.find(2.0).id).to.equal(two.id);
    expect(tree.find(3.0)).to.be.null;
  });

  it('returns correct results from 2-node tree #2' , () => {
    let tree: TSMT$AVLTree<number>  = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);

    one.id = "1";
    two.id = "2";

    tree.insert(two);
    tree.insert(one);

    expect(tree.size).to.equal(2);
    expect(tree.getMin().id).to.equal(one.id);
    expect(tree.getMax().id).to.equal(two.id);
    expect(tree.find(1.0).id).to.equal(one.id);
    expect(tree.find(2.0).id).to.equal(two.id);
    expect(tree.find(3.0)).to.be.null;
  });

  it('returns correct results from 3-node tree #1' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    tree.insert(two);
    tree.insert(one);
    tree.insert(three);

    expect(tree.size).to.equal(3);
    expect(tree.getMin().id).to.equal(one.id);
    expect(tree.getMax().id).to.equal(three.id);
    expect(tree.find(1.0).id).to.equal(one.id);
    expect(tree.find(2.0).id).to.equal(two.id);
    expect(tree.find(3.0).id).to.equal(three.id);
    expect(tree.find(5.0)).to.be.null;
  });

  it('returns correct results from 3-node tree #2' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode(3.0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    tree.insert(three);
    tree.insert(two);
    tree.insert(one);

    expect(tree.size).to.equal(3);
    expect(tree.getMin().id).to.equal(one.id);
    expect(tree.getMax().id).to.equal(three.id);
    expect(tree.find(1.0).id).to.equal(one.id);
    expect(tree.find(2.0).id).to.equal(two.id);
    expect(tree.find(3.0).id).to.equal(three.id);
    expect(tree.find(5.0)).to.be.null;
  });

  it('multi-node test #1' , () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(20.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(17.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);

    twenty.id     = "20";
    seventeen.id  = "17";
    twentyfour.id = "24";
    eighteen.id   = "18";
    ten.id        = "10";
    eight.id      = "8";

    tree.insert(ten);
    tree.insert(eighteen);
    tree.insert(eight);
    tree.insert(seventeen);
    tree.insert(twenty);
    tree.insert(twentyfour);

    expect(tree.size).to.equal(6);
    expect(tree.getMin().id).to.equal(eight.id);
    expect(tree.getMax().id).to.equal(twentyfour.id);
    expect(tree.find(18).id).to.equal(eighteen.id);
    expect(tree.find(10).id).to.equal(ten.id);
    expect(tree.find(17).id).to.equal(seventeen.id);
    expect(tree.find(5.0)).to.be.null;
  });

  it('multi-node test #2' , () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode(20.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(17.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);

    twenty.id     = "20";
    seventeen.id  = "17";
    twentyfour.id = "24";
    eighteen.id   = "18";
    ten.id        = "10";
    eight.id      = "8";

    tree.insert(twenty);
    tree.insert(seventeen);
    tree.insert(twentyfour);
    tree.insert(eighteen);
    tree.insert(ten);
    tree.insert(eight);

    expect(tree.size).to.equal(6);
    expect(tree.getMin().id).to.equal(eight.id);
    expect(tree.getMax().id).to.equal(twentyfour.id);
    expect(tree.find(18).id).to.equal(eighteen.id);
    expect(tree.find(10).id).to.equal(ten.id);
    expect(tree.find(17).id).to.equal(seventeen.id);
    expect(tree.find(5.0)).to.be.null;
  });

  it('multi-node test #3' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let zero: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);
    let six: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(6.0);
    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    zero.id  = "0";
    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";
    six.id   = "6";
    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(zero);
    tree.insert(one);
    tree.insert(two);
    tree.insert(three);
    tree.insert(four);
    tree.insert(five);
    tree.insert(six);
    tree.insert(seven);
    tree.insert(eight);
    tree.insert(nine);
   
    expect(tree.size).to.equal(10);
    expect(tree.getMin().id).to.equal(zero.id);
    expect(tree.getMax().id).to.equal(nine.id);
    expect(tree.find(8).id).to.equal(eight.id);
    expect(tree.find(0).id).to.equal(zero.id);
    expect(tree.find(7).id).to.equal(seven.id);
    expect(tree.find(15.0)).to.be.null;
  });

 it('multi-node test #4' , () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let zero: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);
    let six: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(6.0);
    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    zero.id  = "0";
    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";
    six.id   = "6";
    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(nine);
    tree.insert(eight);
    tree.insert(seven);
    tree.insert(six);
    tree.insert(five);
    tree.insert(four);
    tree.insert(three);
    tree.insert(two);
    tree.insert(one);
    tree.insert(zero);
   
    expect(tree.size).to.equal(10);
    expect(tree.getMin().id).to.equal(zero.id);
    expect(tree.getMax().id).to.equal(nine.id);
    expect(tree.find(8).id).to.equal(eight.id);
    expect(tree.find(6).id).to.equal(six.id);
    expect(tree.find(4).id).to.equal(four.id);
    expect(tree.find(15.0)).to.be.null;
  });
});

describe('Inorder Traversal Tests', () => {

  const utils: TSMT$BTreeUtils<number> = new TSMT$BTreeUtils<number>();

  it('inorder returns empty path for null node', () => {
    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(null);
    
    expect(path.length).to.equal(0);
  });

  it('inorder returns singleton path for one-node tree node', () => {
    let node: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    node.id                          = "1";

    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(node);

    expect(path.length).to.equal(1);
    expect(path[0].id).to.equal(node.id);
  });

  it('inorder two-node test #1', () => {
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);
    
    one.id = "1";
    two.id = "2";

    one.right = two;

    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(one);
    
    expect(path.length).to.equal(2);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(two.id);
  });

  it('inorder two-node test #2', () => {
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);
    
    one.id = "1";
    two.id = "2";

    two.left = one;

    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(two);

    expect(path.length).to.equal(2);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(two.id);
  });

  it('inorder three-node test', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    one.left  = two;
    one.right = three;

    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(one);

    expect(path.length).to.equal(3);
    expect(path[0].id).to.equal(two.id);
    expect(path[1].id).to.equal(one.id);
    expect(path[2].id).to.equal(three.id);
  });

  it('inorder multi-node test #1', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";

    four.left  = two;
    four.right = five;
    two.left   = one;
    two.right  = three;

    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(four);

    expect(path.length).to.equal(5);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(two.id);
    expect(path[2].id).to.equal(three.id);
    expect(path[3].id).to.equal(four.id);
    expect(path[4].id).to.equal(five.id);
  });

  it('inorder multi-node test #2', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";

    two.left    = one;
    two.right   = three;
    three.left  = four;
    three.right = five;

    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(two);

    expect(path.length).to.equal(5);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(two.id);
    expect(path[2].id).to.equal(four.id);
    expect(path[3].id).to.equal(three.id);
    expect(path[4].id).to.equal(five.id);
  });

  it('inorder multi-node test #3', () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();

    // this example taken from https://www.cs.swarthmore.edu/~newhall/unixhelp/Java_bst.pdf
    let twentyfive: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(25);
    let fifteen: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(15);
    let fifty: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(50);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10);
    let twentytwo: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(22);
    let thirtyfive: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(35);
    let seventy: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(70);
    let four: TSMT$BTreeNode<number>       = new TSMT$BTreeNode<number>(4);
    let twelve: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(12);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24);
    let thirtyone: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(31);
    let fortyfour: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(44);
    let sixtysix: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(66);
    let ninety: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(90);

    twentyfive.id = "25";
    fifteen.id    = "15";
    fifty.id      = "50";
    ten.id        = "10";
    twentytwo.id  = "22";
    thirtyfive.id = "35";
    seventy.id    = "70";
    four.id       = "4";
    twelve.id     = "12";
    eighteen.id   = "18";
    twentyfour.id = "24";
    thirtyone.id  = "31";
    fortyfour.id  = "44";
    sixtysix.id   = "66";
    ninety.id     = "90";

    tree.insert(twentyfive);
    tree.insert(fifteen);
    tree.insert(fifty);
    tree.insert(ten);
    tree.insert(twentytwo);
    tree.insert(thirtyfive);
    tree.insert(seventy);
    tree.insert(four);
    tree.insert(twelve);
    tree.insert(eighteen);
    tree.insert(twentyfour);
    tree.insert(thirtyone);
    tree.insert(fortyfour);
    tree.insert(sixtysix);
    tree.insert(ninety);

    let root: TSMT$BTreeNode<number>        = tree.root;
    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(root);

    expect(path.length).to.equal(15);
    expect(path[0].id).to.equal(four.id);
    expect(path[1].id).to.equal(ten.id);
    expect(path[2].id).to.equal(twelve.id);
    expect(path[3].id).to.equal(fifteen.id);
    expect(path[4].id).to.equal(eighteen.id);
    expect(path[5].id).to.equal(twentytwo.id);
    expect(path[6].id).to.equal(twentyfour.id);
    expect(path[7].id).to.equal(twentyfive.id);
    expect(path[8].id).to.equal(thirtyone.id);
    expect(path[9].id).to.equal(thirtyfive.id);
    expect(path[10].id).to.equal(fortyfour.id);
    expect(path[11].id).to.equal(fifty.id);
    expect(path[12].id).to.equal(sixtysix.id);
    expect(path[13].id).to.equal(seventy.id);
    expect(path[14].id).to.equal(ninety.id);
  });

  it('inorder multi-node test #4', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

     let zero: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);
    let six: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(6.0);
    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    zero.id  = "0";
    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";
    six.id   = "6";
    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(nine);
    tree.insert(eight);
    tree.insert(seven);
    tree.insert(six);
    tree.insert(five);
    tree.insert(four);
    tree.insert(three);
    tree.insert(two);
    tree.insert(one);
    tree.insert(zero);

    let root: TSMT$BTreeNode<number>        = tree.root;
    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(root);

    // results should be in sorted (ascending) order of value
    expect(path.length).to.equal(10);

    expect(path[0].id).to.equal(zero.id);
    expect(path[1].id).to.equal(one.id);
    expect(path[2].id).to.equal(two.id);
    expect(path[3].id).to.equal(three.id);
    expect(path[4].id).to.equal(four.id);
    expect(path[5].id).to.equal(five.id);
    expect(path[6].id).to.equal(six.id);
    expect(path[7].id).to.equal(seven.id);
    expect(path[8].id).to.equal(eight.id);
    expect(path[9].id).to.equal(nine.id);
  });
});

describe('Preorder Traversal Tests', () => {

  const utils: TSMT$BTreeUtils<number> = new TSMT$BTreeUtils<number>();

  it('preorder returns empty path for null node', () => {
    let path: Array<TSMT$BTreeNode<number>> = utils.preorder(null);
    
    expect(path.length).to.equal(0);
  });

  it('preorder returns singleton path for one-node tree node', () => {
    let node: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    node.id                          = "1";

    let path: Array<TSMT$BTreeNode<number>> = utils.inorder(node);

    expect(path.length).to.equal(1);
    expect(path[0].id).to.equal(node.id);
  });

  it('preorder two-node test #1', () => {
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);
    
    one.id = "1";
    two.id = "2";

    one.right = two;

    let path: Array<TSMT$BTreeNode<number>> = utils.preorder(one);
    
    expect(path.length).to.equal(2);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(two.id);
  });

   it('preorder two-node test #2', () => {
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);
    
    one.id = "1";
    two.id = "2";

    two.left = one;

    let path: Array<TSMT$BTreeNode<number>> = utils.preorder(two);

    expect(path.length).to.equal(2);
    expect(path[0].id).to.equal(two.id);
    expect(path[1].id).to.equal(one.id);
  });

  it('preorder three-node test', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    one.left  = two;
    one.right = three;

    let path: Array<TSMT$BTreeNode<number>> = utils.preorder(one);

    expect(path.length).to.equal(3);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(two.id);
    expect(path[2].id).to.equal(three.id);
  });

  it('preorder multi-node test #1', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";

    four.left  = two;
    four.right = five;
    two.left   = one;
    two.right  = three;

    let path: Array<TSMT$BTreeNode<number>> = utils.preorder(four);

    expect(path.length).to.equal(5);
    expect(path[0].id).to.equal(four.id);
    expect(path[1].id).to.equal(two.id);
    expect(path[2].id).to.equal(one.id);
    expect(path[3].id).to.equal(three.id);
    expect(path[4].id).to.equal(five.id);
  });

  it('preorder multi-node test #2', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";

    two.left   = one;
    two.right  = four;
    four.left  = three;
    four.right = five;

    let path: Array<TSMT$BTreeNode<number>> = utils.preorder(two);

    expect(path.length).to.equal(5);
    expect(path[0].id).to.equal(two.id);
    expect(path[1].id).to.equal(one.id);
    expect(path[2].id).to.equal(four.id);
    expect(path[3].id).to.equal(three.id);
    expect(path[4].id).to.equal(five.id);
  });

  it('preorder multi-node test #3', () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();

    // this example taken from https://www.cs.swarthmore.edu/~newhall/unixhelp/Java_bst.pdf
    let twentyfive: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(25);
    let fifteen: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(15);
    let fifty: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(50);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10);
    let twentytwo: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(22);
    let thirtyfive: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(35);
    let seventy: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(70);
    let four: TSMT$BTreeNode<number>       = new TSMT$BTreeNode<number>(4);
    let twelve: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(12);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24);
    let thirtyone: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(31);
    let fortyfour: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(44);
    let sixtysix: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(66);
    let ninety: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(90);

    twentyfive.id = "25";
    fifteen.id    = "15";
    fifty.id      = "50";
    ten.id        = "10";
    twentytwo.id  = "22";
    thirtyfive.id = "35";
    seventy.id    = "70";
    four.id       = "4";
    twelve.id     = "12";
    eighteen.id   = "18";
    twentyfour.id = "24";
    thirtyone.id  = "31";
    fortyfour.id  = "44";
    sixtysix.id   = "66";
    ninety.id     = "90";

    tree.insert(twentyfive);
    tree.insert(fifteen);
    tree.insert(fifty);
    tree.insert(ten);
    tree.insert(twentytwo);
    tree.insert(thirtyfive);
    tree.insert(seventy);
    tree.insert(four);
    tree.insert(twelve);
    tree.insert(eighteen);
    tree.insert(twentyfour);
    tree.insert(thirtyone);
    tree.insert(fortyfour);
    tree.insert(sixtysix);
    tree.insert(ninety);

    let root: TSMT$BTreeNode<number>        = tree.root;
    let path: Array<TSMT$BTreeNode<number>> = utils.preorder(root);

    expect(path.length).to.equal(15);
    expect(path[0].id).to.equal(twentyfive.id);
    expect(path[1].id).to.equal(fifteen.id);
    expect(path[2].id).to.equal(ten.id);
    expect(path[3].id).to.equal(four.id);
    expect(path[4].id).to.equal(twelve.id);
    expect(path[5].id).to.equal(twentytwo.id);
    expect(path[6].id).to.equal(eighteen.id);
    expect(path[7].id).to.equal(twentyfour.id);
    expect(path[8].id).to.equal(fifty.id);
    expect(path[9].id).to.equal(thirtyfive.id);
    expect(path[10].id).to.equal(thirtyone.id);
    expect(path[11].id).to.equal(fortyfour.id);
    expect(path[12].id).to.equal(seventy.id);
    expect(path[13].id).to.equal(sixtysix.id);
    expect(path[14].id).to.equal(ninety.id);
  });

  it('preorder multi-node test #4', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    let zero: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);
    let six: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(6.0);
    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    zero.id  = "0";
    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";
    six.id   = "6";
    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(nine);
    tree.insert(eight);
    tree.insert(seven);
    tree.insert(six);
    tree.insert(five);
    tree.insert(four);
    tree.insert(three);
    tree.insert(two);
    tree.insert(one);
    tree.insert(zero);

    let root: TSMT$BTreeNode<number>        = tree.root;
    let path: Array<TSMT$BTreeNode<number>> = utils.preorder(root);

    expect(path.length).to.equal(10);
    expect(path[0].id).to.equal(six.id);
    expect(path[1].id).to.equal(two.id);
    expect(path[2].id).to.equal(one.id);
    expect(path[3].id).to.equal(zero.id);
    expect(path[4].id).to.equal(four.id);
    expect(path[5].id).to.equal(three.id);
    expect(path[6].id).to.equal(five.id);
    expect(path[7].id).to.equal(eight.id);
    expect(path[8].id).to.equal(seven.id);
    expect(path[9].id).to.equal(nine.id);
  });
});

describe('Postorder Traversal Tests', () => {

  const utils: TSMT$BTreeUtils<number> = new TSMT$BTreeUtils<number>();

  it('postorder returns empty path for null node', () => {
    let path: Array<TSMT$BTreeNode<number>> = utils.postorder(null);
    
    expect(path.length).to.equal(0);
  });

  it('postorder returns singleton path for one-node tree node', () => {
    let node: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    node.id                          = "1";

    let path: Array<TSMT$BTreeNode<number>> = utils.postorder(node);

    expect(path.length).to.equal(1);
    expect(path[0].id).to.equal(node.id);
  });

  it('postorder two-node test #1', () => {
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);
    
    one.id = "1";
    two.id = "2";

    one.right = two;

    let path: Array<TSMT$BTreeNode<number>> = utils.postorder(one);
    
    expect(path.length).to.equal(2);
    expect(path[0].id).to.equal(two.id);
    expect(path[1].id).to.equal(one.id);
  });

   it('postorder two-node test #2', () => {
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);
    
    one.id = "1";
    two.id = "2";

    two.left = one;

    let path: Array<TSMT$BTreeNode<number>> = utils.postorder(two);

    expect(path.length).to.equal(2);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(two.id);
  });

  it('postorder three-node test', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";

    one.left  = two;
    one.right = three;

    let path: Array<TSMT$BTreeNode<number>> = utils.preorder(one);

    expect(path.length).to.equal(3);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(two.id);
    expect(path[2].id).to.equal(three.id);
  });

  it('postorder multi-node test #1', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";

    four.left  = two;
    four.right = five;
    two.left   = one;
    two.right  = three;

    let path: Array<TSMT$BTreeNode<number>> = utils.postorder(four);

    expect(path.length).to.equal(5);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(three.id);
    expect(path[2].id).to.equal(two.id);
    expect(path[3].id).to.equal(five.id);
    expect(path[4].id).to.equal(four.id);
  });

  it('postorder multi-node test #2', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);

    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";

    two.left   = one;
    two.right  = four;
    four.left  = three;
    four.right = five;

    let path: Array<TSMT$BTreeNode<number>> = utils.postorder(two);

    expect(path.length).to.equal(5);
    expect(path[0].id).to.equal(one.id);
    expect(path[1].id).to.equal(three.id);
    expect(path[2].id).to.equal(five.id);
    expect(path[3].id).to.equal(four.id);
    expect(path[4].id).to.equal(two.id);
  });

  it('postorder multi-node test #3', () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();

    // this example taken from https://www.cs.swarthmore.edu/~newhall/unixhelp/Java_bst.pdf
    let twentyfive: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(25);
    let fifteen: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(15);
    let fifty: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(50);
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10);
    let twentytwo: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(22);
    let thirtyfive: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(35);
    let seventy: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(70);
    let four: TSMT$BTreeNode<number>       = new TSMT$BTreeNode<number>(4);
    let twelve: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(12);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24);
    let thirtyone: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(31);
    let fortyfour: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(44);
    let sixtysix: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(66);
    let ninety: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(90);

    twentyfive.id = "25";
    fifteen.id    = "15";
    fifty.id      = "50";
    ten.id        = "10";
    twentytwo.id  = "22";
    thirtyfive.id = "35";
    seventy.id    = "70";
    four.id       = "4";
    twelve.id     = "12";
    eighteen.id   = "18";
    twentyfour.id = "24";
    thirtyone.id  = "31";
    fortyfour.id  = "44";
    sixtysix.id   = "66";
    ninety.id     = "90";

    tree.insert(twentyfive);
    tree.insert(fifteen);
    tree.insert(fifty);
    tree.insert(ten);
    tree.insert(twentytwo);
    tree.insert(thirtyfive);
    tree.insert(seventy);
    tree.insert(four);
    tree.insert(twelve);
    tree.insert(eighteen);
    tree.insert(twentyfour);
    tree.insert(thirtyone);
    tree.insert(fortyfour);
    tree.insert(sixtysix);
    tree.insert(ninety);

    let root: TSMT$BTreeNode<number>        = tree.root;
    let path: Array<TSMT$BTreeNode<number>> = utils.postorder(root);

    expect(path.length).to.equal(15);
    expect(path[0].id).to.equal(four.id);
    expect(path[1].id).to.equal(twelve.id);
    expect(path[2].id).to.equal(ten.id);
    expect(path[3].id).to.equal(eighteen.id);
    expect(path[4].id).to.equal(twentyfour.id);
    expect(path[5].id).to.equal(twentytwo.id);
    expect(path[6].id).to.equal(fifteen.id);
    expect(path[7].id).to.equal(thirtyone.id);
    expect(path[8].id).to.equal(fortyfour.id);
    expect(path[9].id).to.equal(thirtyfive.id);
    expect(path[10].id).to.equal(sixtysix.id);
    expect(path[11].id).to.equal(ninety.id);
    expect(path[12].id).to.equal(seventy.id);
    expect(path[13].id).to.equal(fifty.id);
    expect(path[14].id).to.equal(twentyfive.id);
  });

  it('postorder multi-node test #4', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    let zero: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);
    let six: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(6.0);
    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    zero.id  = "0";
    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";
    six.id   = "6";
    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(nine);
    tree.insert(eight);
    tree.insert(seven);
    tree.insert(six);
    tree.insert(five);
    tree.insert(four);
    tree.insert(three);
    tree.insert(two);
    tree.insert(one);
    tree.insert(zero);

    let root: TSMT$BTreeNode<number>        = tree.root;
    let path: Array<TSMT$BTreeNode<number>> = utils.postorder(root);

    expect(path.length).to.equal(10);
    expect(path[0].id).to.equal(zero.id);
    expect(path[1].id).to.equal(one.id);
    expect(path[2].id).to.equal(three.id);
    expect(path[3].id).to.equal(five.id);
    expect(path[4].id).to.equal(four.id);
    expect(path[5].id).to.equal(two.id);
    expect(path[6].id).to.equal(seven.id);
    expect(path[7].id).to.equal(nine.id);
    expect(path[8].id).to.equal(eight.id);
    expect(path[9].id).to.equal(six.id);
  });
});

describe('BFS Traversal Tests', () => {

  const utils: TSMT$BTreeUtils<number> = new TSMT$BTreeUtils<number>();

  it('BFS returns empty path for null node', () => {
    let path: Array<TSMT$BTreeNode<number>> = utils.BFS(null);
    
    expect(path.length).to.equal(0);
  });

  it('BFS singleton node test', () => {
    let one: TSMT$BTreeNode<number>         = new TSMT$BTreeNode<number>(1.0);
    let path: Array<TSMT$BTreeNode<number>> = utils.BFS(one);

    expect(path.length).to.equal(1);
  });

  it('BFS 2-node test #1', () => {
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);

    one.id    = "1";
    two.id    = "2";
    one.right = two;

    let path: Array<TSMT$BTreeNode<number>> = utils.BFS(one);

    expect(path.length).to.equal(2);
    expect(path[0].id).to.equal("1");
    expect(path[1].id).to.equal("2");
  });

  it('BFS 2-node test #2', () => {
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);

    one.id   = "1";
    two.id   = "2";
    two.left = one;

    let path: Array<TSMT$BTreeNode<number>> = utils.BFS(two);

    expect(path.length).to.equal(2);
    expect(path[0].id).to.equal("2");
    expect(path[1].id).to.equal("1");
  });

  it('BFS 3-node test', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);

    one.id    = "1";
    two.id    = "2";
    three.id  = "3";
    two.left  = one;
    two.right = three;

    let path: Array<TSMT$BTreeNode<number>> = utils.BFS(two);

    expect(path.length).to.equal(3);
    expect(path[0].id).to.equal("2");
    expect(path[1].id).to.equal("1");
    expect(path[2].id).to.equal("3");
  });

  it('BFS 4-node test #1', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let zero: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(0);

    one.id    = "1";
    two.id    = "2";
    three.id  = "3";
    zero.id   = "0";
    two.left  = one;
    two.right = three;
    one.left  = zero;

    let path: Array<TSMT$BTreeNode<number>> = utils.BFS(two);

    expect(path.length).to.equal(4);
    expect(path[0].id).to.equal("2");
    expect(path[1].id).to.equal("1");
    expect(path[2].id).to.equal("3");
    expect(path[3].id).to.equal("0");
  });

  it('BFS 4-node test #2', () => {
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);

    one.id      = "1";
    two.id      = "2";
    three.id    = "3";
    four.id     = "4";
    two.left    = one;
    two.right   = three;
    three.right = four;

    let path: Array<TSMT$BTreeNode<number>> = utils.BFS(two);

    expect(path.length).to.equal(4);
    expect(path[0].id).to.equal("2");
    expect(path[1].id).to.equal("1");
    expect(path[2].id).to.equal("3");
    expect(path[3].id).to.equal("4");
  });

  it('BFS multi-node test', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    let zero: TSMT$BTreeNode<number>  = new TSMT$BTreeNode(0);
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    let four: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(4.0);
    let five: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(5.0);
    let six: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(6.0);
    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    zero.id  = "0";
    one.id   = "1";
    two.id   = "2";
    three.id = "3";
    four.id  = "4";
    five.id  = "5";
    six.id   = "6";
    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(nine);
    tree.insert(eight);
    tree.insert(seven);
    tree.insert(six);
    tree.insert(five);
    tree.insert(four);
    tree.insert(three);
    tree.insert(two);
    tree.insert(one);
    tree.insert(zero);

    let root: TSMT$BTreeNode<number>        = tree.root;
    let path: Array<TSMT$BTreeNode<number>> = utils.BFS(root);

    expect(path.length).to.equal(10);
    expect(path[0].id).to.equal(six.id);
    expect(path[1].id).to.equal(two.id);
    expect(path[2].id).to.equal(eight.id);
    expect(path[3].id).to.equal(one.id);
    expect(path[4].id).to.equal(four.id);
    expect(path[5].id).to.equal(seven.id);
    expect(path[6].id).to.equal(nine.id);
    expect(path[7].id).to.equal(zero.id);
    expect(path[8].id).to.equal(three.id);
    expect(path[9].id).to.equal(five.id);
  });
});

describe('TSMT$AVLTree<T> Clear/FromArray Tests', () => {

  it('fromArray does nothing on empty or null array', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    tree.fromArray(null);
    
    expect(tree.size).to.equal(0);
    expect(tree.root).to.be.null;

    tree.fromArray([]);

    expect(tree.size).to.equal(0);
    expect(tree.root).to.be.null;
  });

  it('multi-node insert/clear/fromArray test #1', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(nine);
    tree.insert(eight);
    tree.insert(seven);
  
    expect(tree.size).to.equal(3);
    expect(tree.root.id).to.equal(eight.id);

    tree.clear();
    expect(tree.size).to.equal(0);
    expect(tree.root).to.be.null;

    tree.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let root: TSMT$BTreeNode<number> = tree.root;

    expect(root.value).to.equal(3);
    expect(root.left.value).to.equal(1);
    expect(root.right.value).to.equal(7);
  });

  it('multi-node insert/clear/fromArray test #2', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    let seven: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(7.0);
    let eight: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(8.0);
    let nine: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(9.0);

    seven.id = "7";
    eight.id = "8";
    nine.id  = "9";

    tree.insert(nine);
    tree.insert(eight);
    tree.insert(seven);
  
    expect(tree.size).to.equal(3);
    expect(tree.root.id).to.equal(eight.id);

    tree.clear();
    expect(tree.size).to.equal(0);
    expect(tree.root).to.be.null;

    tree.fromArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);

    let root: TSMT$BTreeNode<number> = tree.root;

    expect(root.value).to.equal(6);
    expect(root.left.value).to.equal(2);
    expect(root.right.value).to.equal(8);
  });
});

describe('TSMT$AVLTree<T> Delete Tests', () => {

  it('delete takes no action on empty tree', () => {
    let tree: TSMT$AVLTree<number>   = new TSMT$AVLTree<number>();
    let node: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    
    tree.delete(node);

    expect(tree.size).to.equal(0);
    expect(tree.root).to.be.null;
  });

  it('delete takes no action on null input node', () => {
    let tree: TSMT$AVLTree<number>   = new TSMT$AVLTree<number>();
    let node: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    
    node.id = "1";

    tree.insert(node)
    tree.delete(null);

    expect(tree.size).to.equal(1);
    expect(tree.root.id).to.equal(node.id);
  });

  it('correctly deletes node from singleton tree', () => {
    let tree: TSMT$AVLTree<number>   = new TSMT$AVLTree<number>();
    let node: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    
    node.id = "1";

    tree.insert(node)
    tree.delete(node);

    expect(tree.size).to.equal(0);
    expect(tree.root).to.be.null;
  });

  // noew the fun begins ...
  it('2-node tree test #1', () => {
    let tree: TSMT$AVLTree<number>   = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);
    
    one.id = "1";
    two.id = "2";

    tree.insert(one)
    tree.insert(two);

    tree.delete(two);

    expect(tree.size).to.equal(1);
    expect(tree.root.id).to.equal(one.id);
  });

  it('2-node tree test #2', () => {
    let tree: TSMT$AVLTree<number>   = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);
    
    one.id = "1";
    two.id = "2";

    tree.insert(one)
    tree.insert(two);

    tree.delete(one);

    expect(tree.size).to.equal(1);
    expect(tree.root.id).to.equal(two.id);
    expect(tree.root.hasLeft).to.be.false;
    expect(tree.root.hasRight).to.be.false;
  });

  it('2-node tree test #3', () => {
    let tree: TSMT$AVLTree<number>  = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(2.0);
    
    two.id = "2";
    one.id = "1";

    tree.insert(two)
    tree.insert(one);

    tree.delete(two);

    expect(tree.size).to.equal(1);
    expect(tree.root.id).to.equal(one.id);
    expect(tree.root.hasLeft).to.be.false;
    expect(tree.root.hasRight).to.be.false;
  });

  it('3-node tree test #1', () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    
    two.id   = "2";
    one.id   = "1";
    three.id = "3";

    tree.insert(two)
    tree.insert(one);
    tree.insert(three);

    tree.delete(one);
 
    let root: TSMT$BTreeNode<number> = tree.root;

    expect(tree.size).to.equal(2);
    expect(root.id).to.equal(two.id);
    expect(root.right.id).to.equal(three.id);
    expect(root.hasLeft).to.be.false;
  });

  it('3-node tree test #2', () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    
    two.id   = "2";
    one.id   = "1";
    three.id = "3";

    tree.insert(two)
    tree.insert(one);
    tree.insert(three);

    tree.delete(three);
 
    let root: TSMT$BTreeNode<number> = tree.root;

    expect(tree.size).to.equal(2);
    expect(root.id).to.equal(two.id);
    expect(root.left.id).to.equal(one.id);
    expect(root.hasRight).to.be.false;
  });

  it('3-node tree test #3', () => {
    let tree: TSMT$AVLTree<number>    = new TSMT$AVLTree<number>();
    let one: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(1.0);
    let two: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(2.0);
    let three: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(3.0);
    
    two.id   = "2";
    one.id   = "1";
    three.id = "3";

    tree.insert(two)
    tree.insert(one);
    tree.insert(three);

    tree.delete(two);
 
    let root: TSMT$BTreeNode<number> = tree.root;

    expect(tree.size).to.equal(2);
    expect(root.id).to.equal(three.id);
    expect(root.left.id).to.equal(one.id);
    expect(root.hasRight).to.be.false;
  });

  it('multi-node tree test #1', () => {
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
    
    tree.delete(three);
 
    let root: TSMT$BTreeNode<number> = tree.root;

    expect(tree.size).to.equal(3);
    expect(root.id).to.equal(two.id);
    expect(root.right.id).to.equal(four.id);
    expect(four.hasRight).to.be.false;
    expect(four.hasLeft).to.be.false;
  });

  it('multi-node tree test #2', () => {
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
    
    tree.delete(one);
 
    let root: TSMT$BTreeNode<number> = tree.root;

    expect(tree.size).to.equal(3);
    expect(root.id).to.equal(three.id);
    expect(root.right.id).to.equal(four.id);
    expect(root.left.id).to.equal(two.id);
    expect(four.hasRight).to.be.false;
    expect(four.hasLeft).to.be.false;
    expect(two.hasLeft).to.be.false;
    expect(two.hasRight).to.be.false;
  });

  it('multi-node tree test #3', () => {
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
    
    tree.delete(four);
 
    let root: TSMT$BTreeNode<number> = tree.root;

    // we should no do this, but can get away with it for such a tiny tree - traverse the tree directly post-delete (do not rely on other node references remaining valid)
    expect(tree.size).to.equal(3);
    expect(root.id).to.equal(two.id);
    expect(root.right.id).to.equal(three.id);
    expect(root.left.id).to.equal(one.id);
    expect(three.hasRight).to.be.false;
    expect(three.hasLeft).to.be.false;
    expect(one.hasLeft).to.be.false;
    expect(one.hasRight).to.be.false;
  });

  it('multi-node tree test #4', () => {
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
    
    tree.delete(two);
 
    let root: TSMT$BTreeNode<number> = tree.root;

    expect(tree.size).to.equal(3);
    expect(root.id).to.equal(three.id);
    expect(root.right.id).to.equal(four.id);
    expect(root.left.id).to.equal(one.id);
    expect(four.hasRight).to.be.false;
    expect(four.hasLeft).to.be.false;
    expect(one.hasLeft).to.be.false;
    expect(one.hasRight).to.be.false;

    expect(three.balance).to.equal(0);
    expect(one.balance).to.equal(0);
    expect(four.balance).to.equal(0);
  });

  it('multi-node tree test #5', () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(17.0);
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(20.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    
    ten.id        = "10";
    eight.id      = "8";
    eighteen.id   = "18";
    seventeen.id  = "17";
    twenty.id     = "20";
    twentyfour.id = "24";

    tree.insert(ten)
    tree.insert(eight);
    tree.insert(eighteen);
    tree.insert(seventeen);
    tree.insert(twenty);
    tree.insert(twentyfour);
    
    tree.delete(ten);
 
    let root: TSMT$BTreeNode<number> = tree.root;

    expect(tree.size).to.equal(5);
    expect(root.id).to.equal(eighteen.id);
    expect(root.left.id).to.equal("17");
    expect(root.right.id).to.equal("20");

    // traverse the tree to obtain node information; do not use prior references
    let left: TSMT$BTreeNode<number>  = root.left;
    let right: TSMT$BTreeNode<Number> = root.right;

    expect(left.id).to.equal("17");
    expect(left.value).to.equal(17);
    expect(left.left.id).to.equal("8");
    expect(left.right).to.be.null;

    expect(root.balance).to.equal(0);
    expect(left.balance).to.equal(-1);
    expect(right.balance).to.equal(1);
    expect(left.left.balance).to.equal(0);
    expect(right.right.balance).to.equal(0);
  });

  it('multi-node tree test #6', () => {
    let tree: TSMT$AVLTree<number>         = new TSMT$AVLTree<number>();
    let ten: TSMT$BTreeNode<number>        = new TSMT$BTreeNode<number>(10.0);
    let eight: TSMT$BTreeNode<number>      = new TSMT$BTreeNode<number>(8.0);
    let eighteen: TSMT$BTreeNode<number>   = new TSMT$BTreeNode<number>(18.0);
    let seventeen: TSMT$BTreeNode<number>  = new TSMT$BTreeNode<number>(17.0);
    let fifteen: TSMT$BTreeNode<number>    = new TSMT$BTreeNode<number>(15.0);
    let twenty: TSMT$BTreeNode<number>     = new TSMT$BTreeNode<number>(20.0);
    let twentyfour: TSMT$BTreeNode<number> = new TSMT$BTreeNode<number>(24.0);
    
    ten.id        = "10";
    eight.id      = "8";
    eighteen.id   = "18";
    seventeen.id  = "17";
    fifteen.id    = "15";
    twenty.id     = "20";
    twentyfour.id = "24";

    tree.insert(ten)
    tree.insert(eight);
    tree.insert(eighteen);
    tree.insert(seventeen);
    tree.insert(twenty);
    tree.insert(twentyfour);
    tree.insert(fifteen);
    
    tree.delete(ten);
 
    let root: TSMT$BTreeNode<number>  = tree.root;
    let left: TSMT$BTreeNode<number>  = root.left;
    let right: TSMT$BTreeNode<number> = root.right;

    expect(tree.size).to.equal(6);

    expect(root.id).to.equal(eighteen.id);
    expect(left.id).to.equal("15");
    expect(left.value).to.equal(15);
    expect(right.id).to.equal("20");

    // traverse the tree to obtain node information; do not use prior references
    right = left.right;
    left  = left.left;

    expect(left.id).to.equal("8");
    expect(left.value).to.equal(8);
    expect(right.id).to.equal("17");
    expect(right.value).to.equal(17);
    expect(root.right.right.id).to.equal("24");

    expect(root.balance).to.equal(0);
    expect(root.left.balance).to.equal(0);
    expect(root.right.balance).to.equal(1);
  });

  it('multi-node tree test #7', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    tree.fromArray([10, 8, 18, 17, 20, 24, 15]);

    let node: TSMT$BTreeNode<number> = tree.find(10); 
    expect(node.id).to.equal("0");
    expect(node.value).to.equal(10);

    tree.delete(node);

    node = tree.find(20);
    tree.delete(node);

    let root: TSMT$BTreeNode<number>  = tree.root;
    let left: TSMT$BTreeNode<number>  = root.left;
    let right: TSMT$BTreeNode<number> = root.right;

    expect(tree.size).to.equal(5);
    expect(root.value).to.equal(18);
    expect(left.value).to.equal(15);
    expect(right.value).to.equal(24);
    expect(left.left.value).to.equal(8);
    expect(left.right.value).to.equal(17);

    expect(root.balance).to.equal(-1);
    expect(left.balance).to.equal(0);
    expect(right.balance).to.equal(0);
  });

  it('multi-node tree test #8', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    tree.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
 
    let root: TSMT$BTreeNode<number>  = tree.root;
    let left: TSMT$BTreeNode<number>  = root.left;
    let right: TSMT$BTreeNode<number> = root.right;

    expect(root.value).to.equal(3);
    expect(left.value).to.equal(1);
    expect(right.value).to.equal(7);
    expect(tree.size).to.equal(10);
 
    // delete nodes in order of increasing value
    let node: TSMT$BTreeNode<number> = tree.find(0);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(9);
    expect(root.value).to.equal(3);
    expect(left.value).to.equal(1);
    expect(right.value).to.equal(7);
    expect(left.hasLeft).to.be.false;
    expect(left.right.value).to.equal(2);

    expect(root.balance).to.equal(1);
    expect(left.balance).to.equal(1);
    expect(right.balance).to.equal(0);
    expect(right.right.balance).to.equal(1); 

    node = tree.find(1);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(8);
    expect(root.value).to.equal(7);
    expect(left.value).to.equal(3);
    expect(right.value).to.equal(8);
    expect(left.left.value).to.equal(2);
    expect(left.right.value).to.equal(5);
    expect(right.right.value).to.equal(9);

    expect(root.balance).to.equal(-1);
    expect(left.balance).to.equal(1);
    expect(right.balance).to.equal(1);
    expect(left.left.balance).to.equal(0);
    expect(left.right.balance).to.equal(0);
    expect(right.right.balance).to.equal(0);

    node = tree.find(2);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(7);
    expect(root.value).to.equal(7);
    expect(left.value).to.equal(5);
    expect(right.value).to.equal(8);
    expect(left.left.value).to.equal(3);
    expect(left.right.value).to.equal(6);
    expect(right.right.value).to.equal(9);
    expect(left.left.right.value).to.equal(4);
    expect(left.left.hasLeft).to.be.false;

    expect(root.balance).to.equal(-1);
    expect(left.balance).to.equal(-1);
    expect(right.balance).to.equal(1);
    expect(left.left.balance).to.equal(1);
    expect(left.right.balance).to.equal(0);
    expect(right.right.balance).to.equal(0);

    node = tree.find(3);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(6);
    expect(root.value).to.equal(7);
    expect(left.value).to.equal(5);
    expect(right.value).to.equal(8);
    expect(left.left.value).to.equal(4);
    expect(left.right.value).to.equal(6);
    expect(right.right.value).to.equal(9);

    expect(root.balance).to.equal(0);
    expect(left.balance).to.equal(0);
    expect(right.balance).to.equal(1);
    expect(left.left.balance).to.equal(0);
    expect(left.right.balance).to.equal(0);
    expect(right.right.balance).to.equal(0);

    node = tree.find(4);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(5);
    expect(root.value).to.equal(7);
    expect(left.value).to.equal(5);
    expect(right.value).to.equal(8);
    expect(left.hasLeft).to.be.false;
    expect(left.right.value).to.equal(6);
    expect(right.hasLeft).to.be.false;
    expect(right.right.value).to.equal(9);

    expect(root.balance).to.equal(0);
    expect(left.balance).to.equal(1);
    expect(right.balance).to.equal(1);
    expect(left.right.balance).to.equal(0);
    expect(right.right.balance).to.equal(0);

    node = tree.find(5);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(4);
    expect(root.value).to.equal(7);
    expect(left.value).to.equal(6);
    expect(right.value).to.equal(8);
    expect(left.hasLeft).to.be.false;
    expect(left.hasRight).to.be.false;
    expect(right.hasLeft).to.be.false;
    expect(right.right.value).to.equal(9);

    expect(root.balance).to.equal(1);
    expect(left.balance).to.equal(0);
    expect(right.balance).to.equal(1);
    expect(right.right.balance).to.equal(0);

    node = tree.find(6);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(3);
    expect(root.value).to.equal(8);
    expect(left.value).to.equal(7);
    expect(right.value).to.equal(9);
    expect(left.hasLeft).to.be.false;
    expect(left.hasRight).to.be.false;
    expect(right.hasLeft).to.be.false;
    expect(right.hasRight).to.be.false;

    expect(root.balance).to.equal(0);
    expect(left.balance).to.equal(0);
    expect(right.balance).to.equal(0);

    // continuing only duplicates prior 3-node tests
  });

 it('multi-node tree test #9', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    tree.fromArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
 
    let root: TSMT$BTreeNode<number>  = tree.root;
    let left: TSMT$BTreeNode<number>  = root.left;
    let right: TSMT$BTreeNode<number> = root.right;

    expect(root.value).to.equal(6);
    expect(left.value).to.equal(2);
    expect(right.value).to.equal(8);
    expect(tree.size).to.equal(10);

    // remove nodes in decreasing order
    let node: TSMT$BTreeNode<number> = tree.find(9);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(9);
    expect(root.value).to.equal(6);
    expect(left.value).to.equal(2);
    expect(right.value).to.equal(8);
    expect(right.left.value).to.equal(7);
    expect(right.hasRight).to.be.false;

    expect(root.balance).to.equal(-1);
    expect(left.balance).to.equal(0);
    expect(right.balance).to.equal(-1);

    node = tree.find(8);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(8);
    expect(root.value).to.equal(2);
    expect(left.value).to.equal(1);
    expect(right.value).to.equal(6);
    expect(left.left.value).to.equal(0);
    expect(right.left.value).to.equal(4);
    expect(right.right.value).to.equal(7);
    expect(right.left.left.value).to.equal(3);
    expect(right.left.right.value).to.equal(5);
    expect(right.right.hasLeft).to.be.false;
    expect(right.right.hasRight).to.be.false;

    expect(root.balance).to.equal(1);
    expect(left.balance).to.equal(-1);
    expect(right.balance).to.equal(-1);
    expect(right.left.balance).to.equal(0);

    node = tree.find(7);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(7)
    expect(root.value).to.equal(2);
    expect(left.value).to.equal(1);
    expect(right.value).to.equal(4);

    expect(right.left.value).to.equal(3);
    expect(right.right.value).to.equal(6);
    expect(right.right.hasLeft).to.be.true;
    expect(right.right.hasRight).to.be.false;
    expect(right.right.left.value).to.equal(5);

    expect(root.balance).to.equal(1);
    expect(left.balance).to.equal(-1);
    expect(right.balance).to.equal(1);
    expect(right.left.balance).to.equal(0);
    expect(right.right.balance).to.equal(-1);
    expect(right.right.left.balance).to.equal(0);

    node = tree.find(6);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(6);
    expect(root.value).to.equal(2);
    expect(left.value).to.equal(1);
    expect(right.value).to.equal(4);
    expect(right.left.value).to.equal(3);
    expect(right.right.value).to.equal(5);
    expect(right.right.hasLeft).to.be.false;
    expect(right.right.hasRight).to.be.false;

    expect(root.balance).to.equal(0);
    expect(left.balance).to.equal(-1);
    expect(right.balance).to.equal(0);

    node = tree.find(5);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(5);
    expect(root.value).to.equal(2);
    expect(left.value).to.equal(1);
    expect(right.value).to.equal(4);
    expect(right.left.value).to.equal(3);
    expect(right.hasRight).to.be.false;

    expect(root.balance).to.equal(0);
    expect(left.balance).to.equal(-1);
    expect(right.balance).to.equal(-1);

    node = tree.find(4);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(4);
    expect(root.value).to.equal(2);
    expect(left.value).to.equal(1);
    expect(right.value).to.equal(3);

    expect(left.value).to.equal(1);
    expect(right.hasLeft).to.be.false;
    expect(right.hasRight).to.be.false;

    node = tree.find(3);
    tree.delete(node);

    root  = tree.root;
    left  = root.left;
    right = root.right;

    expect(tree.size).to.equal(3);
    expect(root.value).to.equal(1);
    expect(left.value).to.equal(0);
    expect(right.value).to.equal(2);
    expect(left.hasLeft).to.be.false;
    expect(left.hasRight).to.be.false;
    expect(right.hasLeft).to.be.false;
    expect(right.hasRight).to.be.false;

    // remainder of process duplicates prior 3-node tests
 });

 it('delete by value test', () => {
    let tree: TSMT$AVLTree<number> = new TSMT$AVLTree<number>();

    tree.fromArray([10, 8, 18, 17, 20, 24, 15]);

    let node: TSMT$BTreeNode<number> = tree.find(10); 
    expect(node.id).to.equal("0");
    expect(node.value).to.equal(10);

    tree.deleteByValue(10);
    tree.deleteByValue(20);

    let root: TSMT$BTreeNode<number>  = tree.root;
    let left: TSMT$BTreeNode<number>  = root.left;
    let right: TSMT$BTreeNode<number> = root.right;

    expect(tree.size).to.equal(5);
    expect(root.value).to.equal(18);
    expect(left.value).to.equal(15);
    expect(right.value).to.equal(24);
    expect(left.left.value).to.equal(8);
    expect(left.right.value).to.equal(17);

    expect(root.balance).to.equal(-1);
    expect(left.balance).to.equal(0);
    expect(right.balance).to.equal(0);
  });
});

