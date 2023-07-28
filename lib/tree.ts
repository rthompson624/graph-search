type BinaryTreeNode = {
  key: number;
  left: BinaryTreeNode | undefined;
  right: BinaryTreeNode | undefined;
};

type BisectedCollection = {
  midPointVal: number;
  leftCollection: number[];
  rightCollection: number[];
};

export function getBinaryTree(keys: number[]) {
  const sortedKeys = [...keys].sort();
  const binaryTree = createBinaryTree(undefined, [sortedKeys]);
  return binaryTree;
}

// Create a balanced binary tree
function createBinaryTree(
  root: BinaryTreeNode | undefined,
  collectionQueue: number[][]
) {
  if (collectionQueue.length === 0) {
    return root;
  }
  const bisectedCollection = bisectCollection(collectionQueue[0]);
  const [, ...remainingCollectionQueue] = collectionQueue;
  if (bisectedCollection.leftCollection.length > 0) {
    remainingCollectionQueue.push(bisectedCollection.leftCollection);
  }
  if (bisectedCollection.rightCollection.length > 0) {
    remainingCollectionQueue.push(bisectedCollection.rightCollection);
  }
  if (!root) {
    root = {
      key: bisectedCollection.midPointVal,
      left: undefined,
      right: undefined,
    };
  } else {
    insertBinaryTreeNode(root, bisectedCollection.midPointVal);
  }
  return createBinaryTree(root, remainingCollectionQueue);
}

function insertBinaryTreeNode(node: BinaryTreeNode | undefined, key: number) {
  if (!node) {
    node = {
      key,
      left: undefined,
      right: undefined,
    };
    return;
  }
  if (key === node.key) {
    console.log(`The key ${key} already exists. Record cannot be inserted.`);
  }
  if (key < node.key) {
    if (node.left) {
      insertBinaryTreeNode(node.left, key);
    } else {
      node.left = { key: key, left: undefined, right: undefined };
      return;
    }
  } else {
    if (node.right) {
      insertBinaryTreeNode(node.right, key);
    } else {
      node.right = { key: key, left: undefined, right: undefined };
      return;
    }
  }
}

function bisectCollection(collection: number[]): BisectedCollection {
  if (collection.length === 1) {
    return {
      midPointVal: collection[0],
      leftCollection: [],
      rightCollection: [],
    };
  }
  const midIdx = midPointIdx(collection);
  const midPointVal = collection[midIdx];
  const leftCollection = collection.slice(0, midIdx);
  const rightCollection = collection.slice(midIdx + 1);
  return { midPointVal, leftCollection, rightCollection };
}

function midPointIdx(collection: number[]) {
  const mid = (0 + (collection.length - 1)) >>> 1;
  return mid;
}
