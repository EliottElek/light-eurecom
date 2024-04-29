def split_strings(string, num_chunks):
    chunk_size = len(string) // num_chunks
    chunks = [string[i * chunk_size : (i + 1) * chunk_size] for i in range(num_chunks)]
    return chunks

def xor_strings(str1, str2):
    result = ""
    for char1, char2 in zip(str1, str2):
        result += chr(ord(char1) ^ ord(char2))
    return result

def multicast_coded_message(chunk1, chunk2):
    return xor_strings(chunk1, chunk2)

def decode_received_message(received_message, cached_chunk):
    return xor_strings(received_message, cached_chunk)

# Example usage
V1 = "why so serious"
V2 = "Not os perfect"

# Split videos into chunks
V1_chunks = split_strings(V1, 2)
V2_chunks = split_strings(V2, 2)

# Cache chunks at receivers
R1_cache = [V1_chunks[0], V2_chunks[0]]
R2_cache = [V1_chunks[1], V2_chunks[1]]
print(R1_cache)
print(R2_cache)

# Transmitter codes two chunks together
coded_message = multicast_coded_message(V1_chunks[1], V2_chunks[0])

# Receivers decode the received message
decoded_R1 = decode_received_message(coded_message, R1_cache[1])
decoded_R2 = decode_received_message(coded_message, R2_cache[0])

# Concatenate decoded chunks
final_V1 = R1_cache[0] + decoded_R1
final_V2 = decoded_R2 + R2_cache[1]

print("Receiver 1 can play video V1:", final_V1)
print("Receiver 2 can play video V2:", final_V2)