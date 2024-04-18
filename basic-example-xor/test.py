def xor_chunks(chunk1, chunk2):
    """
    Performs XOR operation between two chunks.
    """
    if len(chunk1) != len(chunk2):
        raise ValueError("Chunks must be of equal size")

    return bytes(a ^ b for a, b in zip(chunk1, chunk2))

def split_message(message):
    """
    Splits the message into 4 equal-sized chunks.
    """
    chunk_size = len(message) // 4
    return [message[i:i+chunk_size] for i in range(0, len(message), chunk_size)]

def encode_message_chunks(chunk1, chunk2):
    """
    Encodes two message chunks by XOR operation.
    """
    return xor_chunks(chunk1, chunk2)

def decode_received_file(received_file, cached_chunk):
    """
    Decodes the received file by XORing with the cached chunk.
    """
    return xor_chunks(received_file, cached_chunk)

# Example usage
if __name__ == "__main__":
    # Example message
    message = b"This is a sample message."
    
    # Split message into 4 equal-sized chunks
    chunks = split_message(message)
    
    # Cache chunks at R1 and R2
    R1_cache = [chunks[0], chunks[2]]
    R2_cache = [chunks[1], chunks[3]]

    print(R1_cache)
    print(R2_cache)


    
    # Encode chunks V2 and V3
    encoded_chunks = encode_message_chunks(chunks[1], chunks[2])
    
    # Multicast the coded message file (V2 [XOR] V3)
    received_file = encoded_chunks
    
    # Decode received file at R1
    decoded_chunk_at_R1 = decode_received_file(received_file, R1_cache[1])
    V1_V2_at_R1 = R1_cache[0] + decoded_chunk_at_R1
    
    # Decode received file at R2
    decoded_chunk_at_R2 = decode_received_file(received_file, R2_cache[0])
    V3_V4_at_R2 = decoded_chunk_at_R2 + R2_cache[1]
    
    print("R1 can play:", V1_V2_at_R1.decode())
    print("R2 can play:", V3_V4_at_R2.decode())
