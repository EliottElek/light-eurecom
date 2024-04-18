
def get_destined_packet(main_packet):
    """
    Logical function that returns the packet specific to one end user.
    for now, it only returns the main packet.
    """
    return main_packet

class Cache:
    """
    Exemple usage of cache:
    cache = Cache('cache.txt', 2)
    cache.put("combinaison", '10100101111101001')
    print(cache.get("combinaison"))  # Output: 10100101111101001
    """
    def __init__(self, filename, capacity):
        self.filename = filename
        self.capacity = capacity
        # Create the file if it doesn't exist
        try:
            with open(self.filename, 'r'):
                pass
        except FileNotFoundError:
            with open(self.filename, 'w'):
                pass

    def get(self, key):
        with open(self.filename, 'r') as file:
            for line in file:
                k, v = line.strip().split(':')
                if k == str(key):
                    return v
        return None

    def put(self, key, value):
        cache = {}
        with open(self.filename, 'r') as file:
            for line in file:
                k, v = line.strip().split(':')
                cache[k] = v

        cache[str(key)] = str(value)

        # If cache exceeds capacity, remove the oldest entry
        if len(cache) > self.capacity:
            del cache[next(iter(cache))]

        with open(self.filename, 'w') as file:
            for k, v in cache.items():
                file.write(f"{k}:{v}\n")


def xor_chunks(chunk1, chunk2):
    """
    Performs XOR operation between two chunks.
    """
    if isinstance(chunk1, bytes) and isinstance(chunk2, bytes):
        # If both inputs are bytes, perform XOR element-wise
        if len(chunk1) != len(chunk2):
            raise ValueError("Chunks must be of equal size")
        return bytes(a ^ b for a, b in zip(chunk1, chunk2))
    else:
        raise TypeError("Both chunk1 and chunk2 must be bytes-like objects")


def decode_received_file(received_file, cached_chunk):
    """
    Decodes the received file by XORing with the cached chunk.
    """
    if isinstance(received_file, list):
        received_file = bytes(received_file)
    if isinstance(cached_chunk, list):
        cached_chunk = bytes(cached_chunk)
    
    # Ensure both operands are bytes-like objects
    if not isinstance(received_file, bytes) or not isinstance(cached_chunk, bytes):
        raise TypeError("Both received_file and cached_chunk must be bytes-like objects")

    # Perform XOR operation
    return xor_chunks(received_file, cached_chunk)


