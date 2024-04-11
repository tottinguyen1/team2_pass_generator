'''
Detects common patterns like sequences of consecutive characters or 
repeated characters in passwords using regular expressions (regex)
'''
import re

# List of passwords to check
passwords = [
    'password',
    'harder_password',
    'much_h@rder_p@ssword123!',
]

# Regex for sequences of consecutive characters (e.g., 'abc', '123')
consecutive_pattern = r'(?:\d{2,}|abcdefghijklmnopqrstuvwxyz{2,})'

# Regex for repeated characters (e.g., 'aa', '11')
repeated_pattern = r'(.)\1{1,}'

# Function to check for patterns in passwords
def check_patterns(password_list):
    for password in password_list:
        consecutive_match = re.search(consecutive_pattern, password)
        repeated_match = re.search(repeated_pattern, password)

        if consecutive_match:
            print(f"'{password}' contains a sequence: {consecutive_match.group()}")
        else:
            print(f"'{password}' does not contain any sequences.")
        
        if repeated_match:
            print(f"'{password}' contains repeated characters: {repeated_match.group()}")
        else:
            print(f"'{password}' does not contain repeated characters.")

# Run the check
check_patterns(passwords)
