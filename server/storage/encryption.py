from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Protocol.KDF import PBKDF2
from django.conf import settings
from pathlib import Path
import os

class FileEncryption:
    def __init__(self):
        self.key = self._get_or_create_key()
        self.block_size = AES.block_size

    def _get_or_create_key(self):
        key_file = Path(settings.ENCRYPTION_KEY_PATH)
        
        if key_file.exists():
            return key_file.read_bytes()
        
        # Generate a random salt and key
        salt = get_random_bytes(32)
        key = PBKDF2(
            password=settings.SECRET_KEY.encode(),
            salt=salt,
            dkLen=32,  # 256-bit key
            count=100000  # Number of iterations
        )
        
        # Save the key
        key_file.parent.mkdir(parents=True, exist_ok=True)
        key_file.write_bytes(key)
        
        # Save salt separately
        salt_file = key_file.parent / 'salt'
        salt_file.write_bytes(salt)
        
        return key

    def _pad(self, data):
        """PKCS7 padding"""
        padding_length = self.block_size - (len(data) % self.block_size)
        padding = bytes([padding_length] * padding_length)
        return data + padding

    def _unpad(self, data):
        """Remove PKCS7 padding"""
        padding_length = data[-1]
        return data[:-padding_length]

    def encrypt_file(self, file_path):
        """Encrypts a file using AES-256-CBC"""
        # Generate a random IV
        iv = get_random_bytes(self.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)

        with open(file_path, 'rb') as file:
            file_data = file.read()
            padded_data = self._pad(file_data)
            encrypted_data = cipher.encrypt(padded_data)

        # Create encrypted file path
        encrypted_path = f"{file_path}.encrypted"
        with open(encrypted_path, 'wb') as encrypted_file:
            # Write IV followed by encrypted data
            encrypted_file.write(iv + encrypted_data)

        # Remove original file
        os.remove(file_path)
        return encrypted_path

    def decrypt_to_memory(self, encrypted_path):
        """Decrypts a file and returns the data in memory"""
        with open(encrypted_path, 'rb') as file:
            # Read IV from the first block
            iv = file.read(self.block_size)
            encrypted_data = file.read()

        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        decrypted_data = cipher.decrypt(encrypted_data)
        return self._unpad(decrypted_data) 