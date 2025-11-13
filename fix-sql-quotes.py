#!/usr/bin/env python3
"""
Script para escapar correctamente las comillas simples en el archivo SQL.
En PostgreSQL, las comillas simples dentro de cadenas deben duplicarse.
"""

import re

def escape_sql_string(content):
    """
    Escapa las comillas simples dentro de las cadenas SQL.
    Las comillas simples dentro de cadenas delimitadas por comillas simples
    deben duplicarse en PostgreSQL.
    """
    lines = content.split('\n')
    result = []
    in_string = False
    string_start = None
    
    for i, line in enumerate(lines):
        new_line = ''
        j = 0
        
        while j < len(line):
            char = line[j]
            
            # Detectar inicio de cadena SQL (comilla simple que no está escapada)
            if char == "'" and (j == 0 or line[j-1] != "'"):
                # Verificar si estamos entrando o saliendo de una cadena
                if not in_string:
                    in_string = True
                    string_start = i
                    new_line += char
                else:
                    # Verificar si es el final de la cadena
                    # Buscar el siguiente carácter no espacio después de la comilla
                    next_char_idx = j + 1
                    while next_char_idx < len(line) and line[next_char_idx] in ' \t':
                        next_char_idx += 1
                    
                    if next_char_idx >= len(line) or line[next_char_idx] in ',)':
                        # Es el final de la cadena
                        in_string = False
                        new_line += char
                    else:
                        # Es una comilla dentro de la cadena, duplicarla
                        new_line += "''"
                j += 1
            elif in_string and char == "'" and j > 0 and line[j-1] == "'":
                # Ya está escapada, mantenerla
                new_line += "''"
                j += 1
            else:
                new_line += char
                j += 1
        
        result.append(new_line)
    
    return '\n'.join(result)

# Leer el archivo original
with open('blog-articles.sql', 'r', encoding='utf-8') as f:
    content = f.read()

# Escapar las comillas
fixed_content = escape_sql_string(content)

# Escribir el archivo corregido
with open('blog-articles-fixed.sql', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("Archivo corregido guardado como blog-articles-fixed.sql")

