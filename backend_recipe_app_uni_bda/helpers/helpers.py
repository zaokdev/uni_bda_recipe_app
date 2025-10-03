import random
import string


def createId(length):
    # combinación de letras y dígitos
    characters = string.ascii_letters + string.digits
    random_string = "".join(random.choice(characters) for _ in range(length))
    return random_string


# Convierte a formato "texto_de_prueba"
def formatText(text):
    splittedText = text.lower().split()
    return "_".join(splittedText)


# Convierte a formato "Texto de prueba"
def normalizeText(text):
    return " ".join(text.split("_"))
