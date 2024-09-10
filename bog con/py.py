import hashlib
import time

class Block:
    def __init__(self, index, previous_hash, transaction):
        self.index = index
        self.timestamp = time.time()
        self.transaction = transaction
        self.previous_hash = previous_hash
        self.hash = self.hash_block()

    def hash_block(self):
        block_data = f"{self.index}{self.timestamp}{self.transaction}{self.previous_hash}"
        return hashlib.sha256(block_data.encode()).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]

    def create_genesis_block(self):
        return Block(0, "0", "Genesis Block")

    def add_block(self, transaction):
        last_block = self.chain[-1]
        new_block = Block(len(self.chain), last_block.hash, transaction)
        self.chain.append(new_block)

# Initialize the blockchain
blockchain = Blockchain()
