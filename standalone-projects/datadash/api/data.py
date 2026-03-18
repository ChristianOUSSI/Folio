"""API Python - données style Power AMC pour DataDash"""
from http.server import BaseHTTPRequestHandler
import json

SALES_DATA = [
    {"month": "Jan", "value": 2500000},
    {"month": "Fév", "value": 3200000},
    {"month": "Mar", "value": 4100000},
    {"month": "Avr", "value": 3800000},
    {"month": "Mai", "value": 5200000},
    {"month": "Jun", "value": 4800000},
]

USER_DATA = [
    {"name": "Clients actifs", "value": 1200},
    {"name": "Nouveaux clients", "value": 350},
    {"name": "Entreprises", "value": 85},
]

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        data = {"sales": SALES_DATA, "users": USER_DATA}
        body = json.dumps(data).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)
