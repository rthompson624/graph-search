type BinaryTreeNode = {
  value: number;
  left: BinaryTreeNode | undefined;
  right: BinaryTreeNode | undefined;
};

type BisectedCollection = {
  midPointVal: number;
  leftCollection: number[];
  rightCollection: number[];
};

export function getBinaryTree(values: number[]) {
  const sortedValues = [...values].sort();
  const binaryTree = createBinaryTree(undefined, [sortedValues]);
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
      value: bisectedCollection.midPointVal,
      left: undefined,
      right: undefined,
    };
  } else {
    insertBinaryTreeNode(root, bisectedCollection.midPointVal);
  }
  return createBinaryTree(root, remainingCollectionQueue);
}

function insertBinaryTreeNode(node: BinaryTreeNode | undefined, value: number) {
  if (!node) {
    node = {
      value,
      left: undefined,
      right: undefined,
    };
    return;
  }
  if (value === node.value) {
    console.log(`The key ${value} already exists. Record cannot be inserted.`);
  }
  if (value < node.value) {
    if (node.left) {
      insertBinaryTreeNode(node.left, value);
    } else {
      node.left = { value, left: undefined, right: undefined };
      return;
    }
  } else {
    if (node.right) {
      insertBinaryTreeNode(node.right, value);
    } else {
      node.right = { value, left: undefined, right: undefined };
      return;
    }
  }
  // Duplicate key values will fall here and will be ignored
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
