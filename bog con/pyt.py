from flask import Flask, jsonify, request
import time
import hashlib

# Blockchain classes
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
        # The first block in the blockchain
        return Block(0, "0", "Genesis Block")

    def add_block(self, transaction):
        last_block = self.chain[-1]
        new_block = Block(len(self.chain), last_block.hash, transaction)
        self.chain.append(new_block)

# Initialize the blockchain
blockchain = Blockchain()

# Flask App Initialization
app = Flask(__name__)

# Route to rent a bike
@app.route('/rent_bike', methods=['POST'])
def rent_bike():
    transaction_data = request.get_json()

    # Extract bike and user information
    bike_id = transaction_data['bike_id']
    user_id = transaction_data['user_id']
    rental_duration = transaction_data['rental_duration']

    # Create a transaction to add to the blockchain
    transaction = {
        "bike_id": bike_id,
        "user_id": user_id,
        "rental_duration": rental_duration,
        "timestamp": time.time()
    }

    # Add the transaction to the blockchain
    blockchain.add_block(transaction)

    return jsonify({
        "message": "Bike rented successfully!",
        "block_index": len(blockchain.chain) - 1,
        "transaction": transaction
    })

# Route to get the blockchain data
@app.route('/chain', methods=['GET'])
def get_chain():
    chain_data = []
    for block in blockchain.chain:
        chain_data.append({
            "index": block.index,
            "timestamp": block.timestamp,
            "transaction": block.transaction,
            "hash": block.hash,
            "previous_hash": block.previous_hash
        })
    return jsonify(chain_data)

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
