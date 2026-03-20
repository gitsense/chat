"""
Component: UUID Replacer Script (Python)
Block-UUID: a3106054-42f1-474f-96f3-182d66eb19a0
Parent-UUID: N/A
Version: 1.0.0
Description: Recursively traverses a directory, finds files containing '72a33017-7e51-41fb-b3eb-d56841972aa6', and replaces it with a UUID v4.
Language: Python
Created-at: 2025-04-22T16:00:52.619Z
Authors: Gemini 2.5 Flash (v1.0.0)
"""


import os
import sys
import uuid

# The placeholder string to search for and replace
PLACEHOLDER = '{{GS-UUID}}'

def process_file(filepath):
    """
    Processes a single file, replacing the placeholder if found.

    Args:
        filepath (str): The path to the file.
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if PLACEHOLDER in content:
            new_uuid = str(uuid.uuid4())
            new_content = content.replace(PLACEHOLDER, new_uuid)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"Replaced '{PLACEHOLDER}' with '{new_uuid}' in file: {filepath}")

    except Exception as e:
        print(f"Error reading or writing file {filepath}: {e}")

def traverse_and_replace(directory_path):
    """
    Recursively traverses a directory and replaces the placeholder in files.

    Args:
        directory_path (str): The path to the directory to traverse.
    """
    if not os.path.exists(directory_path):
        print(f"Error: Directory not found at {directory_path}")
        sys.exit(1)

    if not os.path.isdir(directory_path):
        print(f"Error: Provided path is not a directory: {directory_path}")
        sys.exit(1)

    print(f"Traversing directory: {directory_path}")

    for root, _, files in os.walk(directory_path):
        for file in files:
            full_path = os.path.join(root, file)
            process_file(full_path)

# Main execution block
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <directory_path>")
        sys.exit(1)

    target_directory = sys.argv[1]
    traverse_and_replace(target_directory)

    print("UUID replacement process finished.")

