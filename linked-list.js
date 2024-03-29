/**
 * Node: node for a singly linked list.
 */
class Node {
  constructor(val) {
    this.val = val;         // Assigning the value to the node.
    this.next = null;       // Pointing to the next node initially set to null.
  }
}

/**
 * LinkedList: chained together nodes.
 */
class LinkedList {
  constructor(vals = []) {
    this.head = null;       // Pointer to the first node.
    this.tail = null;       // Pointer to the last node.
    this.length = 0;        // Length of the linked list.

    // Adding initial values to the linked list.
    for (let val of vals) this.push(val);
  }

  /**
   * _get(idx): retrieve node at idx.
   */
  _get(idx) {
    let cur = this.head;    // Start from the head.
    let count = 0;

    // Traverse until the end of the list or index is found.
    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;       // Move to the next node.
    }

    return cur;             // Return the node at the specified index.
  }

  /**
   * push(val): add new value to end of list.
   */
  push(val) {
    let newNode = new Node(val);  // Create a new node.

    // If the list is empty, set the new node as both head and tail.
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;   // Set the new node as the next of the tail.
      this.tail = newNode;        // Update the tail to the new node.
    }

    this.length += 1;             // Increment the length.
  }

  /**
   * unshift(val): add new value to start of list.
   */
  unshift(val) {
    let newNode = new Node(val);  // Create a new node.

    // If the list is empty, set the new node as head.
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;   // Set the current head as the next of the new node.
      this.head = newNode;        // Update the head to the new node.
    }

    // If the list was empty, update the tail as well.
    if (this.length === 0) this.tail = this.head;

    this.length += 1;             // Increment the length.
  }

  /**
   * pop(): return & remove last item.
   */
  pop() {
    return this.removeAt(this.length - 1);  // Remove and return the last item.
  }

  /**
   * shift(): return & remove first item.
   */
  shift() {
    return this.removeAt(0);  // Remove and return the first item.
  }

  /**
   * getAt(idx): get val at idx.
   */
  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    return this._get(idx).val;  // Return the value at the specified index.
  }

  /**
   * setAt(idx, val): set val at idx to val.
   */
  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this._get(idx);  // Get the node at the specified index.
    cur.val = val;             // Update the value of the node.
  }

  /**
   * insertAt(idx, val): add node w/val before idx.
   */
  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    if (idx === 0) return this.unshift(val);  // If index is 0, insert at the beginning.
    if (idx === this.length) return this.push(val);  // If index is at the end, insert at the end.

    // Inserting in the middle.
    let prev = this._get(idx - 1);          // Get the node before the specified index.
    let newNode = new Node(val);            // Create a new node with the given value.
    newNode.next = prev.next;               // Set the next of the new node to the next of the previous node.
    prev.next = newNode;                    // Update the next of the previous node to the new node.

    this.length += 1;                       // Increment the length.
  }

  /**
   * removeAt(idx): return & remove item at idx.
   */
  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // Special case: remove first item.
    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;          // Update the head to the next node.
      this.length -= 1;                     // Decrement the length.
      if (this.length < 2) this.tail = this.head;  // If there is only one item left, update the tail.
      return val;                           // Return the value of the removed node.
    }

    let prev = this._get(idx - 1);          // Get the node before the specified index.

    // Special case: remove tail.
    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;                     // Remove the reference to the tail.
      this.tail = prev;                     // Update the tail to the previous node.
      this.length -= 1;                     // Decrement the length.
      return val;                           // Return the value of the removed node.
    }

    // Normal case: remove in middle.
    let val = prev.next.val;
    prev.next = prev.next.next;             // Skip the node to be removed.
    this.length -= 1;                       // Decrement the length.
    return val;                             // Return the value of the removed node.
  }

  /**
   * average(): calculate the average of all values in the linked list.
   */
  average() {
    if (this.length === 0) return 0;  // If the list is empty, return 0.

    let total = 0;
    let current = this.head;

    // Calculate the total sum of values.
    while (current) {
      total += current.val;
      current = current.next;       // Move to the next node.
    }

    return total / this.length;     // Return the average.
  }
}

module.exports = LinkedList;  // Export the LinkedList class for external use.
