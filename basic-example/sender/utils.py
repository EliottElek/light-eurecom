def create_packet(packets):
    """
    Logical function that returns the packet to send to all receivers.
    It takes a bunch of packets as input.
    for now, a simple 'Hello World!' will do, but this is where the xor
    computation will take place.
    """
    return "Hello World!"


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