import json
import os
import pathlib
import threading

file_lock = threading.Lock()

def create_simulation_file(id, name, description):
    data = {
        "id":id,
        "name":name,
        "step":0,
        "description":description,
        "edges": [
        {
            "id": "e1-2",
            "source": "1",
            "target": "2",
            "animated": False,
            "style": {
                "strokeWidth": 3
            }
        },
        {
            "id": "e2-3",
            "source": "2",
            "target": "3",
            "animated": False,
            "style": {
                "strokeWidth": 3
            }
        },
        {
            "id": "e2-4",
            "source": "2",
            "target": "4",
            "animated": False,
            "style": {
                "strokeWidth": 3
            }
        }
    ],
    "nodes": [
        {
            "id": "1",
            "type": "custom",
            "data": {
                "name": "Main server",
                "ip": "127.0.0.1",
                "icon": "server",
                "message": "Prepares the packet."
            },
            "position": {
                "x": -400,
                "y": 150
            }
        },
        {
            "id": "2",
            "type": "custom",
            "data": {
                "name": "Multicast router",
                "ip": "224.0.0.1",
                "icon": "router",
                "message": "Duplicates the packet and sends to receivers."
            },
            "position": {
                "x": -75,
                "y": 150
            }
        },
        {
            "id": "3",
            "type": "custom",
            "data": {
                "name": "Receiver 1",
                "ip": "127.0.0.2",
                "icon": "client",
                "message": "Decodes the packet with own cache."
            },
            "position": {
                "x": 330,
                "y": 0
            }
        },
        {
            "id": "4",
            "type": "custom",
            "data": {
                "name": "Receiver 2",
                "ip": "127.0.0.3",
                "icon": "client",
                "message": "Decodes the packet with own cache."
            },
            "position": {
                "x": 320,
                "y": 310
            }
        }
    ]
    }
    script_dir = pathlib.Path(__file__).parent
    simulations_folder = script_dir / "simulations"
    simulations_folder.mkdir(parents=True, exist_ok=True)
    json_file_path = simulations_folder / f"{id}.json"
    with open(json_file_path, "w") as json_file:
        json.dump(data, json_file, indent=4)
        
        
def update_file(id, key_chain, new_value):
    script_dir = pathlib.Path(__file__).parent
    simulations_folder = script_dir / "simulations"
    simulations_folder.mkdir(parents=True, exist_ok=True)
    json_file_path = simulations_folder / f"{id}.json"
    
    if not os.path.exists(json_file_path):
        print(f"Error: JSON file '{json_file_path}' not found.")
        return
    
    # Acquire the lock
    file_lock.acquire()
    try:
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
    finally:
        # Release the lock in a finally block to ensure it's always released
        file_lock.release()
        
        
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

def xor_strings(str1, str2):
    result = ""
    for char1, char2 in zip(str1, str2):
        result += chr(ord(char1) ^ ord(char2))
    return result

def multicast_coded_message(chunk1, chunk2):
    return xor_strings(chunk1, chunk2)

def decode_received_message(received_message, cached_chunk):
    return xor_strings(received_message, cached_chunk)