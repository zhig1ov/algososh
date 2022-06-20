export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value
    this.next = next === undefined ? null : next
  }
}

export interface ILinkedList<T> {
  addHead: (value: T) => void
  addTail: (value: T) => void
  deleteHead: () => T | null
  deleteTail: () => T | null
  getNodeIndex: (index: number) => T | null
  insertPos: (value: T, index: number) => void
  removePos: (index: number) => T | null
  getSize: () => number
}

export class LinkedList<T> implements ILinkedList<T> {
  head: Node<T> | null = null
  tail: Node<T> | null = null
  size: number

  constructor(initArr: T[]) {
    this.head = null
    this.size = 0
    initArr?.forEach((item) => this.insertPos(item, 0))
  }

  addHead = (value: T) => {
    let node = new Node<T>(value)
    if (!this.head) {
      this.head = node
      return this
    }
    node.next = this.head
    this.head = node
    this.size++
    return this
  };

  addTail(value: T) {
    let node = new Node(value)
    if (this.size === 0) {
      this.head = node
    }
    let currentNode = this.head
    while (currentNode && currentNode.next !== null) {
      currentNode = currentNode.next
    }
    if (currentNode) currentNode.next = node
    this.size++
  }

  deleteHead() {

    if (!this.head) return null
    let deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {

      this.head = null
      this.tail = null
    }
    this.size--
    return deletedHead ? deletedHead.value : null
  }



  deleteTail() {
    if (this.size === 0) {
      return null
    }
    
    let currentNode = this.head
    let prev = null
    let currentIndex = 0
    while (currentIndex < this.size-1 && currentNode) {
      prev = currentNode
      currentNode = currentNode.next
      currentIndex++
    }
    if (prev && currentNode) prev.next = currentNode.next
    this.size--
    return currentNode ? currentNode.value : null
  }


  insertPos(value: T, index: number) {
    if (index < 0 || index > this.size) {
      return null
    }

    let node = new Node<T>(value)
    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      let current = this.head
      let currentIndex = 0
      let prev = null
      while (currentIndex < index && current) {
        prev = current
        current = current.next
        currentIndex++
      }
      if (prev) prev.next = node
      node.next = current
    }
    this.size++
  }


  removePos(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let curr = this.head

    if (index === 0 && curr) {
      this.head = curr.next
    } else {
      let prev = null
      let currIndex = 0

      while (currIndex < index && curr) {
        prev = curr
        curr = curr.next
        currIndex++
      }

      if (prev && curr) prev.next = curr.next
    }

    this.size--
    return curr ? curr.value : null
  }


  getNodeIndex(index: number) {
    let current = this.head
    let currentIndex = 0

    while (currentIndex < index && current) {
      current = current.next
      currentIndex++
    }
    return current ? current.value : null
  }

  getSize() {
    return this.size
  }
}