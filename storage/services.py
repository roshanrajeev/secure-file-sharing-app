from .models import Folder, File

def create_file(*, file: str, folder_uid: str):
    folder = Folder.objects.get(uid=folder_uid)
    return File.objects.create(file=file, folder=folder, name=file.name)

def create_folder():
    return Folder.objects.create()

