import os
from datetime import datetime
from pypdf import PdfWriter
import zipfile
from PIL import Image
import sys

# data e hora atual
DATE_TIME =  datetime.now().strftime("%H-%M-%S")

# evento
event = {
    'base_name': "",
    'extension': "",
    'path': "",
    'isdir': False
}

# funcao para pegar o diretorio
def get_dir():
    
    # Recebe o path do arquivo .zip
    path = input("Digite o caminho para gerar o pdf: ")
    path = path.replace("\"","")

    if not os.path.exists(path):
        print("Caminho não existe ou está incorreto")
        return False
    
    event['base_name'] = os.path.basename(path)
    event['extension'] = event['base_name'].split('.')[1]
    event['path'] = path
    
    return True


# Extrai os arquivos e coloca numa pasta
def extract_zip(zip_path, files_destiny_path):
    
    with zipfile.ZipFile(zip_path) as zip_ref:
        zip_ref.extractall(files_destiny_path)

    print(f"{zip_path} extraido para {files_destiny_path}")
    return files_destiny_path


# Converte imagem para pdf
def image_to_pdf(file,save_path):
    img = Image.open(file).convert("RGB")
    img = img.resize((1024, 1024), Image.LANCZOS)
    img.thumbnail((800,800))
    file_name = f"{os.path.basename(file)}-{DATE_TIME}"
    save_path = os.path.join(save_path, f"{file_name}.pdf")
    img.save(save_path)
    os.remove(file)
    return save_path


def create_working_result_directories(current_dir):
    # Verifica e cria uma pasta de trabalho e uma de resultado
    result_directory = os.path.join(current_dir,"resultado")
    work_directory = os.path.join(current_dir,"working")

    if not os.path.exists(work_directory):
        os.mkdir(work_directory)
        print("diretorio de resultado criado")

    if not os.path.exists(result_directory):
        os.mkdir(result_directory)
        print("diretorio de trabalho criado")

    if not os.path.isdir(work_directory)  or not os.path.isdir(result_directory):
        return False
    
    return (result_directory,work_directory)


def create_pdf_list(imgs_dir):
    # Converter imagens do working_space_directory para pdf e cria uma lista:
    for img in os.listdir(imgs_dir):
        pdf_list = []
        if img.lower().endswith(".jpeg") or img.lower().endswith(".jpg") or img.lower().endswith(".png"):
            img_path = os.path.join(imgs_dir,img)
            pdf_list.append(image_to_pdf(img_path,imgs_dir))
    if len(pdf_list) <= 0:
        return False
        
    return pdf_list

def merge_pdf(pdf_list,save_path):
    # Unificar os pdfs:
    writer = PdfWriter()

    for pdf in pdf_list:
        if not pdf.lower().endswith(".pdf"):
            print("Arquivo não é um .pdf")
            return
        writer.append(pdf)

    name_file = DATE_TIME

    event['path'] = os.path.join(save_path,name_file)
    final_path = f"{event['path']}.pdf"
    writer.write(final_path)
    writer.close()
    print("Pdf gerado com sucesso")
    print(f"Local: {final_path}")
    


def working_dir_clear(work_dir):
    # Limpar pasta de trabalho
    for item in os.listdir(work_dir):
        item_path = os.path.join(work_dir,item)
        if os.path.isdir(item_path):
            working_dir_clear(item_path)
            os.rmdir(item_path)
        else:
            os.remove(item_path)


def execute(arg_path=False):

    if not arg_path:
        get_dir(arg_path)
    else:
        arg_path = arg_path.replace('\"', '')
        if not os.path.exists(arg_path):
            print('caminho inserido nao existe')
            return
        if os.path.isdir(arg_path):
            event['isdir'] = True
        event['base_name'] = os.path.basename(arg_path)
        event['extension'] = event['base_name'].split('.')[1]
        event['path'] = arg_path
        
    
    # Pegar o path do diretorio atual
    current_dir = os.getcwd()

    # Cria os diretorios uteis para o aplicativo
    util_dir = create_working_result_directories(current_dir)
    
    if not util_dir:
        print("Erro ao criar diretorios de operacao")
        working_dir_clear(util_dir[1])
        return 
    
    working_dir_clear(util_dir[1])

    if not event['isdir']:
        match event['extension']:

            case 'jpg':
                    base_name = os.path.basename(event['path'])
                    final_path = os.path.join(util_dir[1],base_name)
                    os.rename(event['path'],final_path)
            case 'png':
                    base_name = os.path.basename(event['path'])
                    final_path = os.path.join(util_dir[1],base_name)
                    os.rename(event['path'],final_path)
            case 'jpeg':
                    base_name = os.path.basename(event['path'])
                    final_path = os.path.join(util_dir[1],base_name)
                    os.rename(event['path'],final_path)
            case '.zip':
                extract_zip(event['path'],util_dir[1])
                os.remove(event['path'])
                event['path'] = util_dir[1]
            case _:
                    print('Formato incorrespondente')
                    return
    else:
        # trata diretorios com pasta zip
        for file in os.listdir(event['path']):
            path = os.path.join(event['path'],file)
            final_path = os.path.join(util_dir[1],file)
            os.rename(path,final_path)
    
    pdf_list = create_pdf_list(util_dir[1])

    if not pdf_list:
        print("Erro ao criar lista de pdfs")
        working_dir_clear(util_dir[1])
        return

    merge_pdf(pdf_list,util_dir[0])


if __name__ == '__main__':  
    execute(sys.argv[1])







