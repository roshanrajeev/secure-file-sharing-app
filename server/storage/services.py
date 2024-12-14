from .models import Folder, File
from accounts.models import Account
import uuid

def create_file(*, file: str, folder_uid: str):
    folder = Folder.objects.get(uid=folder_uid)
    return File.objects.create(file=file, folder=folder, name=file.name)

def create_folder(*, user: Account, share_with_all: bool, allowed_emails: list[str]):
    user = None if user.is_anonymous else user
    shared_with = Account.objects.filter(email__in=allowed_emails)
    folder = Folder.objects.create(user=user, share_with_all=share_with_all)
    folder.shared_with.set(shared_with)
    return folder

def bulk_create_files(*, files: list[str], folder_uid: str):
    folder = Folder.objects.get(uid=folder_uid)
    for file_obj in files:
        original_name = file_obj.name
        updated_name = f"{uuid.uuid4()}_{original_name}"
        file_obj.name = updated_name
        file = File(file=file_obj, folder=folder, name=original_name)
        file.save()
    return files
