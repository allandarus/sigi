import json
import urllib.request
import urllib.error
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000/fleet"

def make_request(endpoint, payload, role="Gestor de Logistica"):
    url = f"{BASE_URL}{endpoint}"
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header('Content-Type', 'application/json')
    req.add_header('role', role)
    
    try:
        response = urllib.request.urlopen(req)
        response_data = json.loads(response.read().decode('utf-8'))
        print(f"[SUCCESS] POST {endpoint}: {response.status}")
        return response_data
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode('utf-8')
        print(f"[ERROR] POST {endpoint}: {e.code} - {error_msg}")
        return None

def main():
    print("--- Iniciando Teste de Integração: Módulo Frota ---")
    
    # 1. Criar Motorista
    driver_payload = {
        "name": "João Pereira",
        "registrationNumber": "MOT-001",
        "costCenter": "Logística SP"
    }
    driver = make_request("/drivers", driver_payload)
    driver_id = driver["id"] if driver else None

    # 2. Criar Veículo
    vehicle_payload = {
        "brand": "Fiat",
        "modelName": "Fiorino",
        "manufactureYear": 2021,
        "modelYear": 2022,
        "initialMileage": 45000,
        "driverId": driver_id
    }
    vehicle = make_request("/vehicles", vehicle_payload)

    # 3. Criar Reservas com dias e destinos randômicos
    now = datetime.now()
    
    # Reserva 1: 2 Trechos (Destinos)
    res_1 = {
        "startDatetime": (now + timedelta(days=1, hours=2)).isoformat(),
        "endDatetime": (now + timedelta(days=1, hours=6)).isoformat(),
        "origin": "Base Central SP",
        "destinations": [{"destination": "Armazém Zona Sul"}, {"destination": "Cliente A"}],
        "activity": "Entrega Expressa",
        "passengerCount": 1,
        "passengers": [{"passengerName": "João Pereira"}]
    }
    make_request("/reservations", res_1, role="Trabalhador FESF")

    # Reserva 2: 3 Trechos (Destinos)
    res_2 = {
        "startDatetime": (now + timedelta(days=2, hours=4)).isoformat(),
        "endDatetime": (now + timedelta(days=2, hours=10)).isoformat(),
        "origin": "Base Central SP",
        "destinations": [{"destination": "Fornecedor X"}, {"destination": "Filial Campinas"}, {"destination": "Cliente B"}],
        "activity": "Coleta e Distribuição",
        "passengerCount": 2,
        "passengers": [{"passengerName": "João Pereira"}, {"passengerName": "Assistente Carlos"}]
    }
    make_request("/reservations", res_2, role="Trabalhador FESF")

    # Reserva 3: 4 Trechos (Destinos)
    res_3 = {
        "startDatetime": (now + timedelta(days=3, hours=1)).isoformat(),
        "endDatetime": (now + timedelta(days=3, hours=8)).isoformat(),
        "origin": "Filial Campinas",
        "destinations": [{"destination": "Ponto 1"}, {"destination": "Ponto 2"}, {"destination": "Ponto 3"}, {"destination": "Base Central SP"}],
        "activity": "Rota Integrada",
        "passengerCount": 1,
        "passengers": [{"passengerName": "João Pereira"}]
    }
    make_request("/reservations", res_3, role="Trabalhador FESF")
    
    print("--- Teste de Integração Concluído ---")

if __name__ == "__main__":
    main()
