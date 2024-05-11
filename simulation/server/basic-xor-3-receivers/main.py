import argparse
import os
from pathlib import Path
import sys
path_root = Path(__file__).parents[2]
sys.path.append(str(path_root))

import subprocess
import time
import uuid

from server.utils import create_simulation_file, update_file

def start_processes(id):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    receiver_process_1 = subprocess.Popen(["python3", os.path.join(script_dir,"receiver.py"), 'receiver1', '-id', id])
    receiver_process_2 = subprocess.Popen(["python3", os.path.join(script_dir,"receiver.py"), 'receiver2', '-id', id])
    receiver_process_3 = subprocess.Popen(["python3", os.path.join(script_dir,"receiver.py"), 'receiver3', '-id', id])
    time.sleep(1)
    sender_process = subprocess.Popen(["python3", os.path.join(script_dir,"sender.py"),'-id', id])
   
    return sender_process, receiver_process_1, receiver_process_2, receiver_process_3


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Multicast Receiver Script')
    parser.add_argument('-id', '--simulation_id', required=True, help='Simulation identifier, to update the JSON file.')
    args = parser.parse_args()
    id = args.simulation_id
    create_simulation_file(id, 2, 'Basic XOR - 3 receivers', "In this example, we're performing a basic multicast flow between two receivers. This simply demonstrates that two receivers, subscribed to a multicast server, receive the same packets.")
    try:
        start_processes(id)
    except Exception as e:
        update_file(id, "status", "error")
        update_file(id, "message", str(e))



