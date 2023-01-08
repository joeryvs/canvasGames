import http.server
import socketserver

import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler


def main():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"http://localhost:{PORT}")
        print(f"http://127.0.0.1:{PORT}")
        print("serving at port", PORT)
        httpd.serve_forever()
    pass


if __name__ == "__main__":
    main()
