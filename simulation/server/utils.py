import json
import os
import pathlib
import threading
import time

file_lock = threading.Lock()

def create_simulation_file(id, simulation_id, name, description):
    script_dir = pathlib.Path(__file__).parent

    with open(os.path.join(script_dir,'demos.json'), 'r') as file:
        demos = json.load(file)
    for demo in demos:
        if demo.get('id') == simulation_id:
            data = demo
    simulations_folder = script_dir / "simulations"
    simulations_folder.mkdir(parents=True, exist_ok=True)
    json_file_path = simulations_folder / f"{id}.json"
    with open(json_file_path, "w") as json_file:
        data["default_setup"]["id"] = id
        json.dump(data["default_setup"], json_file, indent=4)
        
        
import pathlib
import json
import os
import threading

# Global lock object
file_lock = threading.Lock()

def update_file(id, key_chain, new_value):
    time.sleep(0.5)
    script_dir = pathlib.Path(__file__).parent
    simulations_folder = script_dir / "simulations"
    simulations_folder.mkdir(parents=True, exist_ok=True)
    json_file_path = simulations_folder / f"{id}.json"
    
    if not os.path.exists(json_file_path):
        print(f"Error: JSON file '{json_file_path}' not found.")
        return
    
    try:
        # Acquire the lock
        with file_lock:
            with open(json_file_path, "r") as json_file:
                existing_data = json.load(json_file)

            # Traverse the key chain to access the nested key
            nested_data = existing_data
            for key in key_chain[:-1]:
                if isinstance(nested_data, list):
                    nested_data = nested_data[key]
                else:
                    nested_data = nested_data.get(key, {})

            # Update the nested key with the new value
            if isinstance(nested_data, list):
                nested_data[key_chain[-1]] = new_value
            else:
                nested_data[key_chain[-1]] = new_value

            # Increment the step if needed
            existing_data["step"] = existing_data.get("step", 0) + 1

            with open(json_file_path, "w") as json_file:
                json.dump(existing_data, json_file, indent=4)
        
    except Exception as e:
        print(f"Error: {e}")

        
        
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


def split_strings(string, num_chunks):
    chunk_size = len(string) // num_chunks
    chunks = [string[i * chunk_size : (i + 1) * chunk_size] for i in range(num_chunks)]
    return chunks

def xor_strings(*args):
    result = ""
    for chars in zip(*args):
        xor_result = ord(chars[0])
        for char in chars[1:]:
            xor_result ^= ord(char)
        result += chr(xor_result)
    return result

def multicast_coded_message(*chunks):
    return xor_strings(*chunks)

def decode_received_message(received_message, *cached_chunks):
    return xor_strings(received_message, *cached_chunks)
