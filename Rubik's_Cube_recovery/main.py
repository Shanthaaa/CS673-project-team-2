# main.py

from api import app
from config import SERVER_HOST, SERVER_PORT, DEBUG  

def main():
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=DEBUG)

if __name__ == '__main__':
    main()
