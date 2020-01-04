import re
from rest_framework import serializers


def validate_text_input(text):
    pattern = '[a-zA-Z]'
    if re.match(pattern, text) is None:
        raise serializers.ValidationError('Name must be a valid word')
    return text
    
def validate_phone_number(number):
    pattern = '[0-9]'

    if re.match(pattern, number) is None:
        raise serializers.ValidationError('Phone number must be of type 07..')
    return number


def validate_password(password):
    pattern = '[A-Za-z0-9@#$%^&+=]{8,}'

    if re.match(pattern, password) is None:
        raise serializers.ValidationError('Password must be atleast 8 characters')
    return password
