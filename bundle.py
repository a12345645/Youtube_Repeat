import os
import re

def check_exists_exit(import_path):
    if not os.path.exists(import_path):
        print(import_path, 'is not exist')
        exit()

def read_file(file_path):
    check_exists_exit(file_path)
    with open(file_path, "r", encoding='utf-8') as file:
        return file.readlines()

def import_file(work_space, file, filename):
    lines = read_file(os.path.join(work_space, filename))
    for line in lines:
        tmp = line.strip()
        pattern = r'<!--(.*?)-->'
        match = re.search(pattern, tmp)
        if match:
            comment = match.group(1).strip()
            if len(comment) >= 3 and comment[:3] == '//#':
                file_name = comment[3:].strip()
                import_file(work_space, file, file_name)
            else:
                file.write(line)
        else:
            file.write(line)
    file.write('\n')

def make_bundle(work_space, input_path, output_path):
    lines = read_file(os.path.join(work_space, input_path))
    with open(output_path, "w", encoding='utf-8') as file:
        for line in lines:
            if len(line) >= 3 and line[:3] == '//~':
                import_path = line[3:].strip()
                import_package(work_space, file, import_path)
            elif len(line) >= 3 and line[:3] == '//#':
                file_name = line[3:].strip()
                import_file(work_space, file, file_name)
            else:
                file.write(line)

def import_package(work_space, file, path):
    check_exists_exit(path)
    tmp_filename = os.path.join(path, path + '.tmp.js')

    print(tmp_filename)
    make_bundle(path, path + '.js', tmp_filename)
    import_file(work_space, file, tmp_filename)

main_path = 'package.js'
output_path = 'out.js'

make_bundle('.', main_path, output_path)

print('done')