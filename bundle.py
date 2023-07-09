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

def do_import_file(work_space, file, line):
    tmp = line.strip()
    if len(tmp) >= 3 and tmp[:3] == '//#':
        file_name = tmp[3:].strip()
        if file_name[-1] == '\\':
            file_name = file_name[0:-1]
            import_file_row(work_space, file, file_name)
        else:
            import_file(work_space, file, file_name)
        return True
    return False

def import_file_row(work_space, file, filename):
    fullpath = os.path.join(work_space, filename.strip())
    print(fullpath)
    lines = read_file(fullpath)
    for line in lines:
        file.write(line[:-1] + ' \\\n')
    file.write('\\\n')

def import_file(work_space, file, filename):
    fullpath = os.path.join(work_space, filename)
    print(fullpath)
    lines = read_file(fullpath)

    for line in lines:
        tmp = line.strip()
        pattern = r'<!--(.*?)-->'
        match = re.search(pattern, tmp)
        if match:
            comment = match.group(1).strip()
            if not do_import_file(work_space, file, comment):
                file.write(line)
        elif not do_import_file(work_space, file, tmp):
            file.write(line)
    file.write('\n')

def make_bundle(work_space, input_path, output_path):
    lines = read_file(os.path.join(work_space, input_path))
    with open(output_path, "w", encoding='utf-8') as file:
        for line in lines:
            if len(line) >= 3 and line[:3] == '//~':
                import_path = line[3:].strip()
                import_package(work_space, file, import_path)
            elif not do_import_file(work_space, file, line):
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

print('done, result at', output_path)