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

/**
 * Typescript Math Toolkit: AVL Tree.  Note that the use of a 0/1 integer variable to represent left/right directions and comparison results is an old trick, 
 * so don't think it came from me :)  A good modern explanation can be found at http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_avl.aspx
 *
 * @author Jim Armstrong (www.algorithmist.net)
 * 
 * @version 1.0
 */

 import {TSMT$BTreeNode} from './BTreeNode';
 import {TSMT$IBTree   } from './IBTree';

 export enum TSMT$NODE_DIRECTION
 {
   LEFT,
   RIGHT
 }

 interface NodeFinished<T>
 {
   node: TSMT$BTreeNode<T>;
   finished: boolean;
 }

 export class TSMT$AVLTree<T> implements TSMT$IBTree<T>
 {
   protected _root: TSMT$BTreeNode<T>;        // reference to root of the AVL Tree
   protected _size: number;                   // size of tree or total number of nodes

   // NOTE:  This implementation used bounded balance factors, -2, -1, 0, 1, 2 as that's what I'm most familiar (and by extension, comfortable) with

 /**
  * Construct a new TSMT$AVLTree<T>
  *
  * @return nothing A new tree is created of the specified type
  */
   constructor()
   {
     this._root = null;
     this._size = 0;
   }

  /**
   * Access the size or number of nodes in the TSMT$AVLTree
   * 
   * @return number - Total number of nodes in the AVLTree
   */
   public get size(): number
   {
     return this._size;
   }

  /**
   * Access the root node in the TSMT$AVLTree
   * 
   * @return number - Total number of nodes in the AVLTree
   */
   public get root(): TSMT$BTreeNode<T>
   {
     return this._root;
   }

  /**
   * Create a new tree from a sequential list of values
   * 
   * @param values: Array<T> Array of raw values
   * 
   * @return nothing
   */
   public fromArray(values: Array<T>): void
   {
     if (values != null && values != undefined && values.length && values.length > 0)
     {
       this.clear();

       const len: number = values.length;
       let i: number;
       let n: TSMT$BTreeNode<T>;

       for (i=0; i<len; ++i)
       {
         n    = new TSMT$BTreeNode<T>(values[i]);
         n.id = this._size.toString();

         this.insert(n);
       }
     }
   }

  /**
   * Clear the current tree 
   * 
   * @return nothing The tree is cleared (all node references are nulled, the tree root is nulled, and tree size set to zero)
   */
   public clear() 
   {
     if (this._size > 0) 
     {
       this.__clear(this._root);
       
       this._size = 0;
       this._root = null;
     }
   }

   protected __clear(node: TSMT$BTreeNode<T>): void
   {
     if (node != null) 
     {
       this.__clear(node.left);
       this.__clear(node.right);

       node = null;
     }   
   }

  /**
   * Insert a node into the tree by value
   * 
   * @param value: T Node data
   * 
   * @param id: string Node id
   *
   * @return nothing A new node is created and inserted into the tree
   */
   public insertByValue(value: T, id: string): void
   {
     if (value != null && value != undefined)
     {
       let node: TSMT$BTreeNode<T> = new TSMT$BTreeNode<T>(value);
       node.id                     = id;
       
       this.insert(node);
     }
   }

  /**
   * Insert a node into the tree
   * 
   * @param node: TSMT$BTreenode<T> Node to be inserted
   *
   * @return nothing Note that all nodes inserted into the tree should be unique 
   */
   public insert(node: TSMT$BTreeNode<T>): void
   {
     if (this._root == null)
     {
       this._root = node;
       this._size = 1;
     }
     else
     {
       let n: TSMT$BTreeNode<T>;
       let path: Array<TSMT$BTreeNode<T>> = new Array<TSMT$BTreeNode<T>>();  // nodes to traverse from insertion point back up the tree (bottom-up)
       let direction: Array<number>       = new Array<number>();             // direction to move at each upward step of the traversal
       let current: number                = 0;                               // pointer to current node in path

       // start at the tree root, search for empty child and save path
       n = this._root;
       for (;;)
       {
         path.push(n);
         direction.push(node.compare(n));
         current++;

         if (n.getChild(direction[current - 1]) == null)
           break;
         else
           n = n.getChild(direction[current - 1]);
       }

       // insert new node at tree leaf
       n.setChild(direction[current - 1], node);
       this._size++;

       if (n.getChild(direction[current - 1]) == null)
         return;

       // move back up the search path
       while (--current >= 0)
       {
         // balance-factor update
         path[current].balance += direction[current] == 0 ? -1 : +1;

         // rebalance or terminate traversal
         if (path[current].balance == 0)
           break;
         else if (Math.abs(path[current].balance) > 1)
         {
           path[current] = this.__insertWithBalance(path[current], direction[current]);

           // adjust parent, then set tree root at end
           if (current != 0)
             path[current - 1].setChild(direction[current - 1], path[current]);
           else
             this._root = path[0];

           break;
         }
       }
     }
   }

  /**
   * Delete  a node into the tree by value
   * 
   * @param value: T Node value
   *
   * @return nothing IF found, the node corresponding to the supplied value is deleted from the tree and the tree is rebaqlanced
   */
   public deleteByValue(value: T): void
   {
     let node: TSMT$BTreeNode<T> = this.find(value);

     if (node != null)
       this.delete(node);
   }

  /**
   * Delete a node from the tree
   * 
   * @paran node: TSMT$BTreeNode<T> Node to delete from the tree
   * 
   * @return nothing If found, the node is deleted and the tree is rebalanced.  Otherwise, no action is taken
   * 
   * NOTE: If you maintain outside references to nodes, information in a node may no longer be valid after a delete; it is important to traverse nodes
   * directly from the tree to obtain information.  When performing multiple deletes, use find() to locate the current tree node with a particular
   * value, then delete that node.
   */
   public delete(node: TSMT$BTreeNode<T>): void
   {
     if (node == null || node == undefined)
       return;

     if (this._size == 0)
       return;

     let n: TSMT$BTreeNode<T>;
     let path: Array<TSMT$BTreeNode<T>> = new Array<TSMT$BTreeNode<T>>();   // node path
     let direction: Array<number>       = new Array<number>();              // directions taken along the path
     let current: number                = 0;                                // pointer to current node in path

     // begin at the root
     n = this._root;

     for (;;)
     {
        // quite if the node can not be located
        if (n == null)
          return;
        else if (n === node)
          break;

        // record nodde path and direction
        direction.push( node.compare(n) );
        path.push(n);

        current++;

        n = n.getChild(direction[current - 1]);
     }

     // node removal - easiest case is when there is only one child
     if (n.left == null || n.right == null)
     {
       // non-null child
       let dir: number = n.left == null ? 1 : 0;

       // adjust the parent
       if (current != 0) 
         path[current - 1].setChild(direction[current - 1], n.getChild(dir));
       else
         this._root = n.getChild(dir);

       n = null;
     }
     else
     {
       // find proper successor
       let next: TSMT$BTreeNode<T> = n.right;
       direction[current]              = 1;
       path[current++]                 = n; // use since remainder of subtree is already in place

       while (next.left != null)
       {
         direction[current] = 0;
         path[current++]    = next;
         
         next = next.left;
       }

       // set id/data of placeholder - tbd (consider replace w/clone in next release)
       n.id   = next.id
       n.data = next.data;

       // fix parent, then unlink
       let dir: number = path[current - 1] === n ? 1 : 0;

       path[current - 1].setChild(dir, next.right);

       next = null; 
     }

     this._size--;

     // traverse up the search path 
     let finished: boolean = false;
     let pair: NodeFinished<T>;

     while (--current >= 0 && !finished)
     {
       path[current].balance += direction[current] != 0 ? -1 : 1;

       // rebalance or terminate traversal
       if (Math.abs(path[current].balance) == 1)
         break;
       else if (Math.abs(path[current].balance) > 1)
       {
          pair      = this.__rebalancePostDelete(path[current], direction[current], finished);
          path[current] = pair['node'];
          finished  = pair['finished'];

          // fix the parent or nothing left to do, so tree has been re-rooted
          if (current != 0)
            path[current - 1].setChild(direction[current - 1], path[current]);
          else
            this._root = path[0];
       }
     }
   }

   // adjust balance factors post-delete - heavily inspired by above reference
   protected __rebalancePostDelete(root: TSMT$BTreeNode<T>, dir: number, completed: boolean): NodeFinished<T>
   {
      let reverse: number      = dir == 0 ? 1 : 0;
      let n: TSMT$BTreeNode<T> = root.getChild(reverse);
      let bal: number          = dir == 0 ? -1 : +1;

      if (n.balance == -bal)
      {
        root.balance = 0;
        n.balance    = 0;

        root = this.singleRotation(root, dir);
      }
      else if (n.balance == bal)
      {
        this.__adjustDoubleBalance(root, reverse, -bal);

        root = this.doubleRotation(root, dir);
      }
      else 
      {
        root.balance = -bal;
        n.balance    = bal;
        completed    = true;

        root = this.singleRotation(root, dir);
      }

      return {node: root, finished: completed};
   }

  /** 
   * Return minimum value in a subtree
   *
   * @param root: TSMT$BTreeNode<T> optional root node for the search - defaults to tree root
   * 
   * @return TSMT$BTreeNode<T> node with minimum value item or null if input root is null
   */
   public getMin(root?: TSMT$BTreeNode<T>): TSMT$BTreeNode<T>
   {
     if (root == null || root == undefined)
       root = this._root;

     if (root == null)
       return root;

     while (root.left != null)
       root = root.left;

     return root;
   }

  /**
   * Return maximimum value in a subtree.
   *
   * @param root: TSMT$BTreeNode<T> optional root node for the search - defaults to tree root
   * 
   * @return TSMT$BTreeNode<T> node with maximum value or null if input root is null
   */
   public getMax(root?: TSMT$BTreeNode<T>): TSMT$BTreeNode<T>
   {
     if (root == null || root == undefined)
       root = this._root;

     if (root == null)
       return root;

     while (root.right != null)
       root = root.right;
            
     return root;
   }

  /**
   * Find an item with a specified value in a subtree
   *
   * @param x: T search value
   * 
   * @param root: TSMT$BTreeNode<T> optional root node for the search - defaults to tree root
   *
   * @return TSMT$BTreeNode<T> Node with the specified value or null if not found
   */
   public find(x: T, root?: TSMT$BTreeNode<T>): TSMT$BTreeNode<T>
   {
     let dir: number;
     let node: TSMT$BTreeNode<T> = new TSMT$BTreeNode<T>(x);

     if (root == null || root == undefined)
       root = this._root;

     while (root != null)
     {
       dir = root.compareTo(node);
     
       if (dir == -1)
         root = root.right;
       else if (dir == 1)
         root = root.left;
       else
         return root;    // match was found
     }

     return null; // no (identical) match
   }

   // adjust balance factors after a double rotation - heavily influenced by above reference
   protected __adjustDoubleBalance(root: TSMT$BTreeNode<T>, dir: number, bal: number): void
   {
     let reverse: number       = dir == 0 ? 1 : 0;
     let n: TSMT$BTreeNode<T>  = root.getChild(dir);
     let nn: TSMT$BTreeNode<T> = n.getChild(reverse);

     if (nn.balance == 0)
     {
       root.balance = 0;
       n.balance    = 0;
     }
     else if (nn.balance == bal)
     {
       root.balance = -bal;
       n.balance    = 0;
     }
     else
     {
       root.balance = 0;
       n.balance    = bal;
     }

      nn.balance = 0;
   } 

   // perform a node insertion with rotation and balance-factor updates
   protected __insertWithBalance(root: TSMT$BTreeNode<T>, dir: number): TSMT$BTreeNode<T>
   {
     let reverse: number = dir == 0 ? 1 : 0;
     let bal: number     = dir == 0 ? -1 : 1;

     // child node
     let n: TSMT$BTreeNode<T> = root.getChild(dir);

     // single- or double-rotation case (no need for complex balance adjust on single-rotation)
     if (n.balance == bal)
     {
       root.balance = 0;
       n.balance    = 0;

       root = this.singleRotation(root, reverse);
     }
     else
     {
       this.__adjustDoubleBalance(root, dir, bal);
       root = this.doubleRotation(root, reverse);
     }

    return root;
   }

  /**
   * Perform a single rotation in the specified direction
   * 
   * @param node: TSMT$BTreeNode<T> Root node for the rotation
   * 
   * @param dir: number Direction (0 - left, 1 - right)
   * 
   * @return TSMT$BTreeNode<T> A single rotation is performed in the specified direction, provided all inputs are valid, and the new root of the subrtree is returned
   */
   public singleRotation(node: TSMT$BTreeNode<T>, dir: number): TSMT$BTreeNode<T>
   {
     if (node == null || (dir != TSMT$NODE_DIRECTION.LEFT && dir != TSMT$NODE_DIRECTION.RIGHT))
       return;

     // reverse of direction 
     let reverse: number = dir == 0 ? 1 : 0;

     // and, the rotation ...
     let newRoot: TSMT$BTreeNode<T> = node.getChild(reverse);

     node.setChild(reverse, newRoot.getChild(dir));
     newRoot.setChild(dir, node);

     return newRoot;
   }

  /**
   * Perform a double rotation in the specified direction
   * 
   * @param node: TSMT$BTreeNode<T> Root node for the rotation
   * 
   * @param dir: number Direction (0 - left, 1 - right)
   * 
   * @return TSMT$BTreeNode<T> A double rotation is performed in the specified direction, provided all inputs are valid, and the new root of the subtree is returned
   */
   public doubleRotation(node: TSMT$BTreeNode<T>, dir: number): TSMT$BTreeNode<T>
   {
     if (node == null || (dir != TSMT$NODE_DIRECTION.LEFT && dir != TSMT$NODE_DIRECTION.RIGHT))
       return;

     // reverse of direction 
     const reverse: number = dir == 0 ? 1 : 0;

     // this process is easier to follow if each rotation is done one at a time
     let r: TSMT$BTreeNode<T> = node.getChild(reverse);
     let s: TSMT$BTreeNode<T> = r.getChild(dir);
     
     // subtree
     r.setChild(dir, s.getChild(reverse));
     s.setChild(reverse, r);
     node.setChild(reverse, s);

     // root
     s = node.getChild(reverse);
     node.setChild(reverse, s.getChild(dir));
     s.setChild(dir, node);

     s.parent = null;

     return s;
   }

 }