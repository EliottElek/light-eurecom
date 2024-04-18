def split_message(message):
    """
    Splits the message into 4 equal-sized chunks.
    """
    chunk_size = len(message) // 4
    return [message[i:i+chunk_size] for i in range(0, len(message), chunk_size)]


def create_packet(message):
    """
    Logical function that returns the packet to send to all receivers.
    It takes a bunch of packets as input.
    for now, a simple 'Hello World!' will do, but this is where the xor
    computation will take place.
    """
    # Split message into 4 equal-sized chunks
    chunks = split_message(message)
    return chunks


def xor(*binary_strings):
    """
    Takes as input a destructured list of binary strings ('1010110101101' etc.) and 
    performs a XOR operation on all of them, then returns the result.
    """
    # Ensure all strings have the same length
    max_len = max(len(binary_string) for binary_string in binary_strings)
    padded_strings = [binary_string.zfill(max_len) for binary_string in binary_strings]

    # Perform XOR operation on corresponding bits and generate the result string
    result = ''.join(str(sum(int(bit) for bit in bits) % 2) for bits in zip(*padded_strings))
    
    return result

def xor_chunks(chunk1, chunk2):
    """
    Performs XOR operation between two chunks.
    """
    if len(chunk1) != len(chunk2):
        raise ValueError("Chunks must be of equal size")

    return [bytes(a ^ b for a, b in zip(chunk1, chunk2))]

def encode_message_chunks(chunk1, chunk2):
    """
    Encodes two message chunks by XOR operation.
    """
    return xor_chunks(chunk1, chunk2)